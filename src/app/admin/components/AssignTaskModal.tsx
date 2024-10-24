import { AssignTaskToTherapist } from '@/services/admin/admin-service';
import { ButtonArrow } from '@/utils/svgicons';
import React, { ChangeEvent, FormEvent, useState, useTransition } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
 
interface AssignTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
}
interface TaskData {
  title: string,
  dueDate: string,
  priority: string,
  note: string,
  attachment : string,
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ isOpen, onRequestClose, row }) => {
  const [isPending, startTransition] = useTransition();
  const [taskData, setTaskData]= useState<TaskData>(
    {
    title: "",
    dueDate: "",
    priority: "",
    note: "",
    attachment : "",
    }
  )

  const handleAssignTaskInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAssignTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    startTransition(async () => {
      try {
        const formattedDueDate = new Date(taskData.dueDate).toISOString();
  
        const taskPayload = {
          ...taskData,
          dueDate: formattedDueDate, 
          attachment: "http://example.com/attachments/static-task-file.pdf", 
          priority: "High", 
        };
        const response = await AssignTaskToTherapist(`/admin/therapists/${row?._id}`, taskPayload);
        if (response?.status === 201) {
          toast.success("Task assigned successfully");
          setTaskData({
            title: "",
            dueDate: "",
            priority: "",
            note: "",
            attachment: "",
          });
        } else {
          console.error("Failed to assign task.");
        }
      } catch (error) {
        console.error("An error occurred while assigning the task:", error);
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Assign Task"
      className="modal bg-white w-[90%] max-w-[668px] max-h-[90vh] rounded-xl overflow-auto overflo-custom "
      overlayClassName="overlay"
    >
      <h2 className="text-white bg-[#283C63] py-8 font-gothamMedium px-[50px]  ">Assign Task</h2>
      <form onSubmit={handleAssignTaskSubmit} className='py-[40px] px-[60px]'>
        <div className="grid gap-[30px  ] ">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleAssignTaskInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleAssignTaskInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Priority</label>
            <input type="text" name="priority"
           value={taskData.priority}
           onChange={handleAssignTaskInput} id="" />
          </div>
          <div>
            <label className="block mb-2">Choose File</label>
            <input
              type="file"
              name="attachment"
              value={taskData.attachment}
              onChange={handleAssignTaskInput}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Note</label>            
            <input
              type="text"
              name="note"
              value={taskData.note}
              onChange={handleAssignTaskInput}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
       <div className='flex justify-end'> <button type="submit" className="button mt-5">Submit<ButtonArrow /> </button></div>
      </form>
    </Modal>
  );
};

export default AssignTaskModal;

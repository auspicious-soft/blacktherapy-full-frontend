import { AssignTaskToTherapist } from '@/services/admin/admin-service';
import { ButtonArrow } from '@/utils/svgicons';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, FormEvent, useEffect, useState, useTransition } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';

interface AssignTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
}
interface TaskData {
  title: string;
  dueDate: string;
  priority: string;
  note: string;
  attachment: string;
  assignedBy: string;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ isOpen, onRequestClose, row }) => {
  const session = useSession();
  const userRole = (session as any)?.data?.user?.role;
  const [isPending, startTransition] = useTransition();
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    dueDate: "",
    priority: "",
    note: "",
    attachment: "",
    assignedBy: "",
  });

  useEffect(() => {
    if (userRole) {
      setTaskData((prevData) => ({
        ...prevData,
        assignedBy: userRole,
      }));
    }
  }, [userRole]);
  
  const handleAssignTaskInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData: any) => ({
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
          attachment: "http://example.com/attachments/static-task-file.pdf",
        };
        const response = await AssignTaskToTherapist(`/admin/therapists/tasks/${row?._id}`, taskPayload);
        if (response?.status === 201) {
          toast.success("Task assigned successfully");
          onRequestClose();  
          setTaskData({
            title: "",
            dueDate: "",
            priority: "",
            note: "",
            attachment: "",
            assignedBy: userRole,
          });
        } else {
          toast.error("Failed to assign task.");
        }
      } catch (error) {
        console.error("An error occurred while assigning the task:", error);
        toast.error("An error occurred while assigning the task.");
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Assign Task"
      className="modal bg-white w-[90%] max-w-[668px] max-h-[90vh] rounded-xl overflow-auto overflo-custom"
      overlayClassName="overlay"
    >
      <h2 className="text-white bg-[#283C63] py-8 font-gothamMedium px-[50px]">Assign Task</h2>
      <form onSubmit={handleAssignTaskSubmit} className="py-[40px] px-[60px]">
        <div className="grid gap-[30px]">
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
            <select name="priority" value={taskData.priority} onChange={handleAssignTaskInput} className="w-full p-2 border rounded">
              <option value="">select</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Choose File</label>
            <input
              type="file"
              name="attachment"
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
        <div className="flex justify-end">
          <button type="submit" className="button mt-5">Submit<ButtonArrow /></button>
        </div>
      </form>
    </Modal>
  );
};

export default AssignTaskModal;

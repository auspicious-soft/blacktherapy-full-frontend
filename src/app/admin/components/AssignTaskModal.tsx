import { ButtonArrow } from '@/utils/svgicons';
import React from 'react';
import Modal from 'react-modal';

interface AssignTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  formData: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({ isOpen, onRequestClose, formData, handleInputChange, handleFormSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Assign Task"
      className="modal bg-white w-[90%] max-w-[668px] max-h-[90vh] rounded-xl overflow-auto overflo-custom "
      overlayClassName="overlay"
    >
      <h2 className="text-white bg-[#283C63] py-8 font-gothamMedium px-[50px]  ">Assign Task</h2>
      <form onSubmit={handleFormSubmit} className='py-[40px] px-[60px]'>
        <div className="grid gap-[30px  ] ">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="taskName"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Choose File</label>
            <input
              type="file"
              name="assignedTo"
              value={formData.choosefile}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Note</label>            
            <input
              type="text"
              name="assignedTo"
              value={formData.note}
              onChange={handleInputChange}
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

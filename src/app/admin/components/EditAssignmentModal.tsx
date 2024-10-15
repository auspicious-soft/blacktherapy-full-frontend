import React from 'react';
import Modal from 'react-modal';

interface EditAssignmentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  formData: {
    assignedClinician: string;
    assignedPeerSupport: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const EditAssignmentModal: React.FC<EditAssignmentModalProps> = ({
  isOpen,
  closeModal,
  handleFormSubmit,
  formData, 
  handleInputChange,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2 className="font-gothamMedium text-[18px] text-[#26395e] mb-[30px]">Edit Assignment</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-[30px]">
          <label htmlFor="assignedClinician" className="font-gothamMedium text-[14px] text-[#26395e] mb-2 block">Assigned Clinician:</label>
          <input
            type="text"
            id="assignedClinician"
            name="assignedClinician"
            value={formData.assignedClinician}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-[30px]">
          <label htmlFor="assignedPeerSupport" className="font-gothamMedium text-[14px] text-[#26395e] mb-2 block">Assigned Peer Support:</label>
          <input
            type="text"
            id="assignedPeerSupport"
            name="assignedPeerSupport"
            value={formData.assignedPeerSupport}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAssignmentModal;

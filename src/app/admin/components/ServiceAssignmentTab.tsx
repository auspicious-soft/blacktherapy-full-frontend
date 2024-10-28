import { addServiceAgreements, ServiceAssignmentStats } from '@/services/admin/admin-service';
import { CloseIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import useSWR from 'swr';

interface ServiceAssignmentProps {
  rowId: string;
}
const ServiceAssignmentTab: React.FC<ServiceAssignmentProps> = ({ rowId }) => {
  const { data, error, isLoading } = useSWR(`/admin/client-service-assignment/${rowId}`, ServiceAssignmentStats);
  const serviceInfo = data?.data?.data;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: '',
    ccaInEHR: '',
    ccaCompletedBy: '',
    ccaCompletionDate: '',
    servicesReviewing: '',
    assignedTherapist: '',
    peerSupportTherapist: '',
    pcpInEHR: '',
    pcpCompletionDate: '',
    pcpCompletedBy: '',
    authorizationRequired: '',
    authorizationCompleted: '',
    authorizationCompletedBy: '',
    authorizationStatus: '',
  });

  const openModal = (rowData?: any) => {
    if (rowData) {
      setFormData({ ...rowData });
      setIsUpdateMode(true); 
    } else {
      setFormData({
        id: '',
        ccaInEHR: '',
        ccaCompletedBy: '',
        ccaCompletionDate: '',
        servicesReviewing: '',
        assignedTherapist: '',
        peerSupportTherapist: '',
        pcpInEHR: '',
        pcpCompletionDate: '',
        pcpCompletedBy: '',
        authorizationRequired: '',
        authorizationCompleted: '',
        authorizationCompletedBy: '',
        authorizationStatus: '',
      });
      setIsUpdateMode(false); 
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await addServiceAgreements(`/admin/client-service-assignment/${rowId}`, formData); 
      toast.success('Client details updated successfully');
      // mutate(); 
    } catch (error) {
      console.error('Error updating client details:', error);
      toast.error('Error updating client details'); 
    }
  };

  return (
    <div>
         <div className='flex justify-end mb-[22px]'>
        <button
          onClick={openModal}
          className="!text-sm !h-[40px] !px-[30px] button">Add New
        </button>
      </div>
      {/* {!serviceInfo?.length && (
        <div className='flex justify-end mb-[22px]'>
          <button onClick={() => openModal()} className="!text-sm !h-[40px] !px-[30px] button">Add New</button>
        </div>
      )} */}

      <div className='table-common overflo-custom'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>CCA Completion Date</th>
              <th>Service Received</th>
              <th>PCP in EHR</th>
              <th>Authorization</th>
              <th>Authorization Status</th>
              <th>CCA Date</th>
              <th>Therapist</th>
              <th>PCP Completion</th>
              <th>Authorization Complete</th>
              <th>CCA Completed By</th>
              <th>Assigned Peer</th>
              <th>PCP Completed By</th>
              <th>Authorization Completed By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceInfo?.map((row: any) => (
              <tr key={row?._id}>
                <td>{row?._id}</td>
                <td>{row?.ccaCompletionDate}</td>
                <td>{row?.servicesReviewing}</td>
                <td>{row?.pcpInEHR}</td>
                <td>{row?.authorizationRequired}</td>
                <td>{row?.authorizationStatus}</td>
                <td>{row?.ccaCompletionDate}</td>
                <td>{row?.assignedTherapist}</td>
                <td>{row?.pcpCompletion}</td>
                <td>{row?.authorizationComplete}</td>
                <td>{row?.ccaCompletedBy}</td>
                <td>{row?.peerSupportTherapist}</td>
                <td>{row?.pcpCompletedBy}</td>
                <td>{row?.authorizationCompletedBy}</td>
                <td>
                  {/* Update button for each row */}
                  <button onClick={() => openModal(row)} className='hover:underline font-bold'>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full max-h-[90vh] overflow-scroll overflo-custom"
        overlayClassName="w-full h-full fixed p-3 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]">
          <h2 className="font-gothamMedium !text-white">
            {isUpdateMode ? "Update Service Assignment" : "Add New"}
          </h2>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-5 md:px-[35px] md:py-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-[30px] ">
          <div>
            <label className="block mb-2">CCA in EHR System</label>
            <input type="text" name="ccaInEHR" value={formData.ccaInEHR} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">CCA Completion Date*</label>
            <input type="text" name="ccaCompletionDate" value={formData.ccaCompletionDate} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">CCA Completed By</label>
            <input type="text" name="ccaCompletedBy" value={formData.ccaCompletedBy} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Service Receiving</label>
            <input type="text" name="servicesReviewing" value={formData.servicesReviewing} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Assigned Therapist</label>
            <input type="text" name="assignedTherapist" value={formData.assignedTherapist} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Assigned Peer Support</label>
            <input type="text" name="peerSupportTherapist" value={formData.peerSupportTherapist} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP in EHR:</label>
            <input type="text" name="pcpInEHR" value={formData.pcpInEHR} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP Completion Date*</label>
            <input type="text" name="pcpCompletionDate" value={formData.pcpCompletionDate} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP Completed By</label>
            <input type="text" name="pcpCompletedBy" value={formData.pcpCompletedBy} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Required?</label>
            <input type="text" name="authorizationRequired" value={formData.authorizationRequired} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Completed/ Submitted ?</label>
            <input type="text" name="authorizationCompleted" value={formData.authorizationCompleted} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Complete By</label>
            <input type="text" name="authorizationCompletedBy" value={formData.authorizationCompletedBy} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Status</label>
            <input type="text" name="authorizationStatus" value={formData.authorizationStatus} onChange={handleInputChange} />
          </div>
          </div>
          <div className="mt-5 md:mt-10 flex justify-end">
            <button type="submit" className="button ">
              {isUpdateMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceAssignmentTab;

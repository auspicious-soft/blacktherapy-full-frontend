import { addServiceAssignments, GetTherapistsData, ServiceAssignmentStats, updateServiceAgreements } from '@/services/admin/admin-service';
import { CloseIcon } from '@/utils/svgicons';
import useTherapists from '@/utils/useTherapists';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import useSWR from 'swr';
import CustomSelect from './CustomSelect';

interface ServiceAssignmentProps {
  rowId: string;
}
const formatDate = (date: Date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const ServiceAssignmentTab: React.FC<ServiceAssignmentProps> = ({ rowId }) => {
  const { data, error, isLoading, mutate } = useSWR(`/admin/client-service-assignment/${rowId}`, ServiceAssignmentStats);
  const serviceInfo = data?.data?.data;
  const { therapistData } = useTherapists();

  const [isCreating, setIsCreating] = useState(serviceInfo?.length === 0);
  const [selectedPeers, setSelectedPeers] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    clientId: '',
    ccaInEHR: '',
    ccaCompletionDate: '',
    ccaCompletedBy: '',
    servicesReviewing: '',
    assignedTherapist: '',
    peerSupportTherapist: [],
    pcpInEHR: '',
    pcpCompletionDate: '',
    pcpCompletedBy: '',
    authorizationRequired: false,
    authorizationCompleted: false,
    authorizationCompletedBy: '',
    authorizationStatus: '',
    noOfUnits: 0,
    expirationDate: '',
  });

  useEffect(() => {
    setIsCreating(serviceInfo?.length === 0);
  }, [serviceInfo]);


  const openModal = (row: any) => {
    if (row) {
      setFormData({
        clientId: row.clientId,
        ccaInEHR: row.ccaInEHR,
        ccaCompletedBy: row.ccaCompletedBy,
        ccaCompletionDate: row.ccaCompletionDate,
        servicesReviewing: row.servicesReviewing,
        assignedTherapist: row.assignedTherapist?._id || '',
        peerSupportTherapist: row.peerSupportTherapist || [],
        pcpInEHR: row.pcpInEHR,
        pcpCompletionDate: row.pcpCompletionDate,
        pcpCompletedBy: row.pcpCompletedBy,
        authorizationRequired: row.authorizationRequired,
        authorizationCompleted: row.authorizationCompleted,
        authorizationCompletedBy: row.authorizationCompletedBy,
        authorizationStatus: row.authorizationStatus,
        noOfUnits: row?.noOfUnits,
        expirationDate: row?.expirationDate,
      });

      const selectedPeerOptions = row.peerSupportTherapist?.map((peer: any) => ({
        value: peer._id,
        label: `${peer.firstName} ${peer.lastName}`,
      })) || [];

      setSelectedPeers(selectedPeerOptions);
      setIsUpdateMode(true);
    }
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setIsUpdateMode(false);
    setSelectedPeers([]);
    setModalIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = (name === 'authorizationRequired' || name === 'authorizationCompleted')
      ? value === 'true'
      : value;

    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const handlePeerSupportChange = (selectedOptions: any) => {
    setSelectedPeers(selectedOptions);
    setFormData({
      ...formData,
      peerSupportTherapist: selectedOptions.map((option: any) => option.value),
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateServiceAgreements(`/admin/client-service-assignment/${rowId}`, formData);
      if (response.status === 200) {
        toast.success('Service Assignment details updated successfully');
        mutate();
        closeModal();
      } else {
        toast.error('Failed to update Service Assignment details');
      }
    } catch (error) {
      console.error('Error updating Service Assignment details:', error);
      toast.error('Error updating Service Assignment details');
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addServiceAssignments(`/admin/client-service-assignment/${rowId}`, formData);
      if (response.status === 201) {
        toast.success('Service Assignment details added successfully');
        mutate();
        closeModal();
      } else {
        toast.error('Failed to add Service Assignment details');
      }
    } catch (error) {
      console.error('Error adding Service Assignment details:', error);
      toast.error('Error adding Service Assignment details');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating) {
      handleCreate(e);
    } else {
      handleUpdate(e);
    }
  };

  const handleReview = async () => {
    const reviewedDate = new Date(); 
    try {
      const response = await updateServiceAgreements(`/admin/client-service-assignment/${rowId}`, { reviewedDate });
      if (response.status === 200) {
        toast.success('Service Assignment details updated successfully');
        mutate();
      } else {
        toast.error('Failed to update Service Assignment details');
      }
    } catch (error) {
      console.error('Error updating Service Assignment details:', error);
      toast.error('Error updating Service Assignment details');
    }
  };

  return (
    <div>
      <div className='flex justify-end gap-5 mb-5'>
      {(!serviceInfo || serviceInfo.length === 0) && (
    <button onClick={openModal} className="!text-sm !h-[40px] !px-[30px] button">
      Add New
    </button>
  )}
      <button onClick={handleReview} disabled = {serviceInfo?.[0]?.reviewedDate < new Date().toISOString()}
        className='!text-sm !h-[40px] button'>Mark as Reviewed</button>
      </div>
      <div className='table-common overflo-custom'>
        <table>
          <thead>
            <tr>
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
              <th>Expiry Date</th>
              <th>No. of Units</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
      <tr>
        <td colSpan={5} className="">Loading...</td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan={5} className="text-center text-red-500">Error loading payments data.</td>
      </tr>
    ) :serviceInfo?.length > 0 ? (
            serviceInfo?.map((row: any) => (
              <tr key={row?._id}>
                <td>{new Date(row?.ccaCompletionDate).toLocaleDateString('en-US')}</td>
                <td>{row?.servicesReviewing})</td>
                <td>{row?.pcpInEHR}</td>
                <td>{row?.authorizationRequired ? "Yes" : "No"}</td>
                <td>{row?.authorizationStatus}</td>
                <td>{new Date(row?.ccaCompletionDate).toLocaleDateString('en-US')}</td>
                <td>{row?.assignedTherapist?.firstName} {row?.assignedTherapist?.lastName}</td>
                <td>{new Date(row?.pcpCompletionDate).toLocaleDateString('en-US')}</td>
                <td>{row?.authorizationComplete}</td>
                <td>{row?.ccaCompletedBy}</td>
                <td>{row?.peerSupportTherapist?.map((peer: any) => (
                  <span key={peer._id}>{peer.firstName} {peer.lastName}</span>
                ))}</td>
                <td>{row?.pcpCompletedBy}</td>
                <td>{row?.authorizationCompletedBy ?? ''}</td>
                <td>{new Date(row?.expirationDate).toLocaleDateString('en-US')} </td>
                <td>{row?.noOfUnits} </td>
                <td>
                  <button onClick={() => openModal(row)} className='hover:underline font-bold'>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='w-full flex justify-center p-3 items-center' colSpan={5} >No data found</td>
            </tr>
          )}
          </tbody>

        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full max-h-[90vh] overflow-auto overflo-custom"
        overlayClassName="w-full h-full fixed p-3 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px] p-5 md:py-[25px] md:px-[35px] bg-[#283C63]">
          <h2 className="font-gothamMedium !text-white">
            {isCreating ? "Update Service Assignment" : "Add New"}
          </h2>
          <button onClick={closeModal}>
            <CloseIcon /> 
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-5 md:px-[35px] md:py-10">
          <div className="grid md:grid-cols-2 gap-4 md:gap-[30px] ">
            <div>
              <label className="block mb-2">CCA in EHR</label>
              <input
                type="text"
                name="ccaInEHR"
                value={formData.ccaInEHR}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">CCA Completion Date</label>
              <input
                type="date"
                name="ccaCompletionDate"
                value={formatDate(formData.ccaCompletionDate)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">CCA Completed By</label>
              <input
                type="text"
                name="ccaCompletedBy"
                value={formData.ccaCompletedBy}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">Services Reviewing</label>
              <input
                type="text"
                name="servicesReviewing"
                value={formData.servicesReviewing}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <CustomSelect
                name="Assigned Therapist"
                value={therapistData.find((therapist: any) => {
                  return therapist.value === formData.assignedTherapist
                })} // Ensure it’s the whole object or null
                onChange={(selectedOption: any) => {
                  setFormData({ ...formData, assignedTherapist: selectedOption.value });
                }}
                options={therapistData}
              />

            </div>
            <div>
              <CustomSelect
                required={false}
                name="Peer Support Therapist"
                isMulti
                value={selectedPeers} // Use the selected peers state
                onChange={handlePeerSupportChange}
                options={therapistData}
              />

            </div>
            <div>
              <label className="block mb-2">PCP in EHR</label>
              <input
                type="text"
                name="pcpInEHR"
                value={formData.pcpInEHR}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">PCP Completion Date</label>
              <input
                type="date"
                name="pcpCompletionDate"
                value={formatDate(formData.pcpCompletionDate)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">PCP Completed By</label>
              <input
                type="text"
                name="pcpCompletedBy"
                value={formData.pcpCompletedBy}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">Authorization Required</label>
              <select
                name="authorizationRequired"
                value={formData.authorizationRequired ? 'true' : 'false'}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Authorization Completed</label>
              <select
                name="authorizationCompleted"
                value={formData.authorizationCompleted ? 'true' : 'false'}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Authorization Completed By</label>
              <input
                type="text"
                name="authorizationCompletedBy"
                value={formData.authorizationCompletedBy}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">No. Of Units</label>
              <input
                type="number"
                name="noOfUnits"
                value={formData.noOfUnits}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={formatDate(formData.expirationDate)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block mb-2">Authorization Status</label>
              <input
                type="text"
                name="authorizationStatus"
                value={formData.authorizationStatus}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
          <button type="submit" className="bg-[#283c63] text-white px-4 py-2 rounded">
            {isCreating ? "Update" : "Create"}
          </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceAssignmentTab;

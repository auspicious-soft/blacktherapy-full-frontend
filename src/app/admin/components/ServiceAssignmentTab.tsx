import { CloseIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import Modal from 'react-modal';

// Initial data for the table
const initialData = [
  {
    id: '101',
    ccaCompletionDate: 'Yes',
    serviceReceived: '',
    pcpInEhr: '',
    authorization: '',
    authorizationStatus: 'value',
    ccaDate: '',
    therapist: '',
    pcpCompletion: 'Current Balance',
    authorizationComplete: '',
    ccaCompletedBy: '',
    assignedPeer: '',
    pcpCompletedBy: 'Yes',
    authorizationCompletedBy: '',
  },
];

const ServiceAssignmentTab: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    ccaCompletionDate: '',
    serviceReceived: '',
    pcpInEhr: '',
    authorization: '',
    authorizationStatus: '',
    ccaDate: '',
    therapist: '',
    pcpCompletion: '',
    authorizationComplete: '',
    ccaCompletedBy: '',
    assignedPeer: '',
    pcpCompletedBy: '',
    authorizationCompletedBy: '',
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData([...data, formData]); // Add new data to the table
    setFormData({
      id: '',
      ccaCompletionDate: '',
      serviceReceived: '',
      pcpInEhr: '',
      authorization: '',
      authorizationStatus: '',
      ccaDate: '',
      therapist: '',
      pcpCompletion: '',
      authorizationComplete: '',
      ccaCompletedBy: '',
      assignedPeer: '',
      pcpCompletedBy: '',
      authorizationCompletedBy: '',
    });
    closeModal();
  };

  return (
    <div>
       <div className='flex justify-end mb-[22px]'>  <button
        onClick={openModal}
        className="!text-sm !h-[40px] !px-[30px] button">Add New</button></div>
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
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.ccaCompletionDate}</td>
              <td>{row.serviceReceived}</td>
              <td>{row.pcpInEhr}</td>
              <td>{row.authorization}</td>
              <td>{row.authorizationStatus}</td>
              <td>{row.ccaDate}</td>
              <td>{row.therapist}</td>
              <td>{row.pcpCompletion}</td>
              <td>{row.authorizationComplete}</td>
              <td>{row.ccaCompletedBy}</td>
              <td>{row.assignedPeer}</td>
              <td>{row.pcpCompletedBy}</td>
              <td>{row.authorizationCompletedBy}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
        overlayClassName="w-full h-full fixed p-3 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
       ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
        <h2 className="font-gothamMedium !text-white">Add New</h2>
        <button onClick={closeModal}>
          <CloseIcon />{" "}
        </button>
      </div>
        <form onSubmit={handleSubmit} className='bg-white p-5 md:px-[35px] md:py-10'>
        <div className="grid md:grid-cols-2 gap-4 md:gap-[30px] ">
          <div>
            <label className="block mb-2">CCA in EHR System</label>
            <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">CCA Completion Date*</label>
            <input type="text" name="ccaCompletionDate" value={formData.ccaCompletionDate} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">CCA Completed By</label>
            <input type="text" name="ccaCompletionDate" value="{formData.ccaCompletionDate}" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Service Receiving</label>
            <input type="text" name="serviceReceived" value={formData.serviceReceived} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Assigned Therapist</label>
            <input type="text" name="ccaCompletionDate" value="{formData.ccaCompletionDate}" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Assigned Peer Support</label>
            <input type="text" name="assignedPeer" value={formData.assignedPeer} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP in EHR:</label>
            <input type="text" name="pcpInEhr" value={formData.pcpInEhr} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP Completion Date*</label>
            <input type="text" name="pcpCompletion" value={formData.pcpCompletion} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">PCP Completed By</label>
            <input type="text" name="pcpCompletedBy" value={formData.pcpCompletedBy} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Required?</label>
            <input type="text" name="authorization" value={formData.authorization} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Completed/ Submitted ?</label>
            <input type="text" name="authorizationStatus" value="{formData.authorizationStatus}" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Complete By</label>
            <input type="text" name="authorizationComplete" value={formData.authorizationComplete} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Authorization Status</label>
            <input type="text" name="authorizationStatus" value={formData.authorizationStatus} onChange={handleInputChange} />
          </div>
          {/* <div>
            <label className="block mb-2">CCA Date:</label>
            <input type="text" name="ccaDate" value={formData.ccaDate} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Therapist:</label>
            <input type="text" name="therapist" value={formData.therapist} onChange={handleInputChange} />
          </div>
       
       
          <div>
            <label className="block mb-2">CCA Completed By:</label>
            <input type="text" name="ccaCompletedBy" value={formData.ccaCompletedBy} onChange={handleInputChange} />
          </div>
      
        
          <div>
            <label className="block mb-2">Authorization Completed By:</label>
            <input type="text" name="authorizationCompletedBy" value={formData.authorizationCompletedBy} onChange={handleInputChange} />
          </div> */}
          </div>
          <div className='mt-5 md:mt-10 flex justify-end'><button type="submit" className="button">
            Update</button></div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceAssignmentTab;

import { ButtonArrow } from '@/utils/svgicons';
import React from 'react';
import Modal from 'react-modal';

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  formData: any;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EditClinicianModal: React.FC<EditModalProps> = ({ isOpen, onRequestClose, formData, handleInputChange, handleFormSubmit }) => {
 
 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Assignment"
      className="bg-white w-[90%] rounded-[20px] p-[40px] max-h-[90vh] overflow-scroll overflo-custom "
      overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <h2 className="text-xl font-semibold mb-4">Update Assignment Information</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className='block mb-2' htmlFor="">Email Address</label>
            <input type="email" name="" id="" value={formData.email} onChange={handleInputChange}/>
          </div>
          <div>
            <label className="block mb-2">Would you like a company provided email account?</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
              <option value="Clinician 3">option 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Provider Type?</label>
            <select
              name="assignedPeerSupport"
              value={formData.assignedPeerSupport}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Peer 1">Peer 1</option>
              <option value="Peer 2">Peer 2</option>
              <option value="Peer 3">Peer 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Are you licensed and/or certified?</label>
            <select
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Message 1">Message 1</option>
              <option value="Message 2">Message 2</option>
              <option value="Message 3">Message 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have computer equipment and Wifi to access our platform?</label>
            <select
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Workshop 1">Workshop 1</option>
              <option value="Workshop 2">Workshop 2</option>
              <option value="Workshop 3">Workshop 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have experience working on a telehealth platform?</label>
            <select
              name="video"
              value={formData.video}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Video 1">Video 1</option>
              <option value="Video 2">Video 2</option>
              <option value="Video 3">Video 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have any disciplinary actions (including pending) with any licensing or credentialing board?</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
              <option value="Clinician 3">option 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have independent Malpractice Insurance? If you do not currently have malpractice insurance, it is easy to acquire online! Please STOP and return to this form once you have acquired your malpractice insurance.</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
              <option value="Clinician 3">option 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Insurance Company</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
              <option value="Clinician 3">option 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Have you had a claim filed in the last 6 months.?</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
              <option value="Clinician 3">option 3</option>
            </select>
          </div>
          <div>
          <label className="block mb-2">Profile Image</label>
          <input type="file" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">First Name*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Last Name*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Phone Number*</label>
          <input type="number" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Date of Birth*</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">State*</label>
            <select
              name="assignedClinician"
              value={formData.chhoseaccount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="Clinician 1">option 1</option>
              <option value="Clinician 2">option 2</option>
            </select>
          </div>
          <div>
          <label className="block mb-2">City*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Zip Code*</label>
          <input type="number" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Address Line 1*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Address Line 2*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Licensure/Certification Issued Date *</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Licensure/Certification Expiration *</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">NPI number * <br/> (If applicable,if not write N/A)</label>
          <input type="number" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Taxonomy code(If applicable,if not write N/A) *</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Do you require supervision?</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">License Type *</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Licensure/Certification Number *</label>
          <input type="number" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Licensure/Certification State*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Which licensing board or agency issued your credentials?</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Do you have a supervisor with a valid supervision agreement in place?</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Profile Image</label>
          <input type="file" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Preferred Language?</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Are you fluent in any other languages besides english?</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Year of Experience?</label>
          <input type="date" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Your Approach to Helping?</label>
          <input type="number" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">Clientele*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
          <label className="block mb-2">General Expertise*</label>
          <input type="text" name="" id=""  value={formData.chhoseaccount}  onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Which are your preferred means of online consultation?*</label>
            <select
              name="workshop"
              value={formData.workshop}
              onChange={handleInputChange}
              className=""
            >
              <option value="">Select</option>
              <option value="Workshop 1">Audio</option>
              <option value="Workshop 2">Video</option>
              <option value="Workshop 3">Chat</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-2">About Description*</label>
          <textarea 
          name="description" 
          id=""  
          value={formData.chhoseaccount} 
          rows={4} 
          ></textarea>
          </div>
     <div className='flex justify-end'>
     <button type="submit" className="mt-4 button">Submit <ButtonArrow /></button>
     </div>
      </form>
    </Modal>
  );
};

export default EditClinicianModal;

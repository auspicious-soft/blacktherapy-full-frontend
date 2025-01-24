import { UpdateTherapistData } from '@/services/admin/admin-service';
import { ButtonArrow } from '@/utils/svgicons';
import React, { FormEvent, useEffect, useState, useTransition } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';
import CustomSelect from './CustomSelect';
import { USStates } from '@/data/UsStatesData';
import { ActionMeta, MultiValue, SingleValue } from 'react-select';

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  row: any;
  mutate: any;
}
interface OptionType {
  value: string;
  label: string;
}

const EditClinicianModal: React.FC<EditModalProps> = ({ row, isOpen, onRequestClose, mutate }) => {

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<any>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    state: "",
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "", 
    rolePosition: "",
    licenceType: "",
    salaryDesired: "",
    preferredLanguage: "",
    howLongAtPresentAddress: "",
    skills: "",
    preferredCommunicationMethod: "",
    about: "",
  });

  useEffect(() => {
    if (row) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        email: row?.email,
        firstName: row?.firstName,
        lastName: row?.lastName,
        phoneNumber: row?.phoneNumber,
        gender: row?.otherDetailsOfTherapist?.gender,
        dob: row?.otherDetailsOfTherapist?.dob?.split('T')[0], //
        state: row?.otherDetailsOfTherapist?.state,
        city: row?.otherDetailsOfTherapist?.city,
        zipCode: row?.otherDetailsOfTherapist?.zipCode,
        addressLine1: row?.otherDetailsOfTherapist?.addressLine1,
        addressLine2: row?.otherDetailsOfTherapist?.addressLine2,
        rolePosition: row?.otherDetailsOfTherapist?.rolePosition,
        licenceType: row?.otherDetailsOfTherapist?.licenceType,
        salaryDesired: row?.otherDetailsOfTherapist?.salaryDesired,
        currentEmploymentStatus: row?.otherDetailsOfTherapist?.currentEmploymentStatus,
        currentOrPreviousEmployerName: row?.otherDetailsOfTherapist?.currentOrPreviousEmployerName,
        legalRightToWorkInUS: row?.otherDetailsOfTherapist?.legalRightToWorkInUS,
        highestEducationCompleted: row?.otherDetailsOfTherapist?.highestEducationCompleted,
        skills: row?.otherDetailsOfTherapist?.skills,
        preferredCommunicationMethod: row?.otherDetailsOfTherapist?.preferredCommunicationMethod,
        about: row?.otherDetailsOfTherapist?.about,
      
      }));
    }
  }, [row]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      setFormData((prev: FormData) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else if (type === "date") {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setFormData((prev: FormData) => ({
        ...prev,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prev: FormData) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };


  const handleSelectChange = (selectedOption: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    const value = selectedOption
      ? Array.isArray(selectedOption)
        ? (selectedOption as MultiValue<OptionType>).map(opt => opt.value).join(", ")
        : (selectedOption as OptionType).value
      : null;
    setFormData((prev: FormData) => ({
      ...prev,
      state: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const { ...updatedFormData } = {
          ...formData,
          // profilePic: "http://example.com/attachments/static-profile-pic.jpg",
          // currentResume: "http://example.com/attachments/static-license-file.pdf",
        };

        const response = await UpdateTherapistData(`/admin/therapists/${row?._id}`, updatedFormData);

        if (response?.status === 200) {
          toast.success("Therapist data updated successfully");
          onRequestClose();
          mutate()
        } else {
          toast.error("Failed to update therapist data");
        }
      } catch (error) {
        console.error("Error updating therapist data:", error);
        toast.error("An error occurred while updating the therapist data");
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Assignment"
      className="bg-white w-[90%] rounded-[20px] p-[40px] max-h-[90vh] overflow-auto overflo-custom "
      overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Clinician Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className='block mb-2' htmlFor="">Email Address</label>
            <input type="email" name="email" id="" defaultValue={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">First Name*</label>
            <input type="text" name="firstName" id="" value={formData.firstName} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Last Name*</label>
            <input type="text" name="lastName" id="" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Gender*</label>
            <input type="text" name="lastName" id="" value={formData.gender} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Phone Number*</label>
            <input type="text" name="phoneNumber" id="" value={formData.phoneNumber} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Date of Birth*</label>
            <input type="date" name="dob" id="" value={formData.dob} onChange={handleInputChange} required />
          </div>
          <div>
            <CustomSelect
              name="state"
              value={(USStates as any).find((option: any) => option.value === formData.state) || null} // Find the selected state or fallback to null
              options={(USStates as any)}
              onChange={handleSelectChange}
              placeholder="Select State"
            />

          </div>
          <div>
            <label className="block mb-2">City*</label>
            <input type="text" name="city" id="" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Zip Code*</label>
            <input type="text" name="zipCode" id="" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Address Line 1*</label>
            <input type="text" name="addressLine1" id="" value={formData.addressLine1} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Address Line 2*</label>
            <input type="text" name="addressLine2" id="" value={formData.addressLine2} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Position *</label>
            <input type="text" name="rolePosition" id="" value={formData.rolePosition}  onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">License Type *</label>
            <input type="text" name="licenceType" required value={formData.licenceType} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Salary Desired</label>
            <input type="text" name="salaryDesired" required value={formData.salaryDesired} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Current Employment Status *</label>
            <input type="text" name="currentEmploymentStatus"  value={formData.currentEmploymentStatus} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Current Or Previous Employer Name*</label>
            <input type="text" name="currentOrPreviousEmployerName"  value={formData.currentOrPreviousEmployerName} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Do you have legal rights to work in US?</label>
            <select
              name="legalRightToWorkInUS"
              value={formData.legalRightToWorkInUS}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Highest level of education completed?</label>
            <select
              key={formData.highestEducationCompleted}
              name="highestEducationCompleted"
              value={formData.highestEducationCompleted}
              onChange={handleInputChange}
              required>
              <option value="" disabled>Select</option>
              <option value="None">None</option>
              <option value="High School/ GED">High School/ GED</option>
              <option value="College">College</option>
              <option value="Graduate School">Graduate School</option>
              <option value="Advanced Degree/ Professional School">Advanced Degree/ Professional School</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">General Expertise*</label>
            <input type="text" name="skills"  value={formData.skills} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Which are your preferred means of online consultation?*</label>
            <select
              key={formData.preferredCommunicationMethod}
              name="preferredCommunicationMethod"
              value={formData.preferredCommunicationMethod}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
              <option value="Chat">Chat</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-2 mt-3">About Description*</label>
          <input type="text" required name="about" value={formData.about} onChange={handleInputChange} />
          {/* <textarea 
          
          name="about" 
          required  
          value={formData.about} 
          onChange={handleInputChange}
          rows={4} 
          ></textarea> */}
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="mt-4 button" disabled={isPending}> 
            Submit <ButtonArrow />
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditClinicianModal;

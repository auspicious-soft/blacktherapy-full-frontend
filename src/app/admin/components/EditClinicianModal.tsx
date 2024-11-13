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
interface FormData {
  email: string,
  companyProvidedEmail: boolean,
  providerType: string,
  licensedAndCertified: boolean,
  computerAndWifi: boolean,
  expInTeleHealthPlatform: boolean,
  anyDisciplinaryActionTaken: boolean,
  independentMalpracticeInsurance: boolean,
  insuranceCompanyName: string,
  claimedFilledInLast6Months: boolean,
  profilePic: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  dob: string,
  state: string | null,
  city: string,
  zipCode: string,
  addressLine1: string,
  addressLine2: string,
  licenseOrCertificationExpiryDate: string;
  licenseOrCertificationIssuedDate: string,
  PNPINumber: string,
  taxonomyCode: string,
  requireSupervision: boolean,
  licenceType: string,
  licenceOrCertificationNumber: number,
  licenceOrCertificationState: string,
  licensingBoardOrAgency: string,
  validSupervisionAgreement: string,
  licenseOrCertificationFile: string,
  preferredLanguage: string,
  fluencyOtherThanEnglish: boolean,
  yearsOfExperience: number,
  helpingApproach: string,
  clientele: string,
  generalExpertise: string,
  preferredCommunicationMethod: string,
  aboutYou: string,
}

const EditClinicianModal: React.FC<EditModalProps> = ({ row, isOpen, onRequestClose, mutate }) => {

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    companyProvidedEmail: false,
    providerType: "",
    licensedAndCertified: false,
    computerAndWifi: false,
    expInTeleHealthPlatform: false,
    anyDisciplinaryActionTaken: false,
    independentMalpracticeInsurance: false,
    insuranceCompanyName: "",
    claimedFilledInLast6Months: false,
    profilePic: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    state: "",
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    licenseOrCertificationExpiryDate: "",
    licenseOrCertificationIssuedDate: "",
    PNPINumber: "",
    taxonomyCode: "",
    requireSupervision: false,
    licenceType: "",
    licenceOrCertificationNumber: 0,
    licenceOrCertificationState: "",
    licensingBoardOrAgency: "",
    validSupervisionAgreement: "",
    licenseOrCertificationFile: "",
    preferredLanguage: "",
    fluencyOtherThanEnglish: false,
    yearsOfExperience: 0,
    helpingApproach: "",
    clientele: "",
    generalExpertise: "",
    preferredCommunicationMethod: "",
    aboutYou: "",
  });

  useEffect(() => {
    if (row) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: row?.email,
        companyProvidedEmail: row?.otherDetailsOfTherapist?.companyProvidedEmail === "true",
        providerType: row?.providerType,
        licensedAndCertified: row?.otherDetailsOfTherapist?.licensedAndCertified === "true",
        computerAndWifi: row?.otherDetailsOfTherapist?.computerAndWifi === "true",
        expInTeleHealthPlatform: row?.otherDetailsOfTherapist?.expInTeleHealthPlatform === "true",
        anyDisciplinaryActionTaken: row?.otherDetailsOfTherapist?.anyDisciplinaryActionTaken === "true",
        independentMalpracticeInsurance: row?.otherDetailsOfTherapist?.independentMalpracticeInsurance === "true",
        insuranceCompanyName: row?.otherDetailsOfTherapist?.insuranceCompanyName,
        claimedFilledInLast6Months: row?.otherDetailsOfTherapist?.claimedFilledInLast6Months === "true",
        profilePic: row?.otherDetailsOfTherapist?.profilePic,
        firstName: row?.firstName,
        lastName: row?.lastName,
        phoneNumber: row?.phoneNumber,
        dob: row?.otherDetailsOfTherapist?.dob?.split('T')[0], //
        state: row?.otherDetailsOfTherapist?.state,
        city: row?.otherDetailsOfTherapist?.city,
        zipCode: row?.otherDetailsOfTherapist?.zipCode,
        addressLine1: row?.otherDetailsOfTherapist?.addressLine1,
        addressLine2: row?.otherDetailsOfTherapist?.addressLine2,
        licenseOrCertificationExpiryDate: row?.otherDetailsOfTherapist?.licenseOrCertificationExpiryDate?.split('T')[0],
        licenseOrCertificationIssuedDate: row?.otherDetailsOfTherapist?.licenseOrCertificationIssuedDate?.split('T')[0],
        PNPINumber: row?.otherDetailsOfTherapist?.PNPINumber,
        taxonomyCode: row?.otherDetailsOfTherapist?.taxonomyCode,
        requireSupervision: row?.otherDetailsOfTherapist?.requireSupervision === "true",
        licenceType: row?.otherDetailsOfTherapist?.licenceType,
        licenceOrCertificationNumber: row?.otherDetailsOfTherapist?.licenceOrCertificationNumber,
        licenceOrCertificationState: row?.otherDetailsOfTherapist?.licenceOrCertificationState,
        licensingBoardOrAgency: row?.otherDetailsOfTherapist?.licensingBoardOrAgency,
        validSupervisionAgreement: row?.otherDetailsOfTherapist?.validSupervisionAgreement,
        licenseOrCertificationFile: row?.otherDetailsOfTherapist?.licenseOrCertificationFile,
        preferredLanguage: row?.otherDetailsOfTherapist?.preferredLanguage,
        fluencyOtherThanEnglish: row?.otherDetailsOfTherapist?.fluencyOtherThanEnglish === "true",
        yearsOfExperience: row?.otherDetailsOfTherapist?.yearsOfExperience,
        helpingApproach: row?.otherDetailsOfTherapist?.helpingApproach,
        clientele: row?.otherDetailsOfTherapist?.clientele,
        generalExpertise: row?.otherDetailsOfTherapist?.generalExpertise,
        preferredCommunicationMethod: row?.otherDetailsOfTherapist?.preferredCommunicationMethod,
        aboutYou: row?.otherDetailsOfTherapist?.aboutYou,
      }));
    }
  }, [row]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Handle boolean conversion for select inputs
    // if (type === "select-one") {
    //   const booleanValue = value === "true"; // Convert string "true"/"false" to boolean
    //   setFormData((prev: FormData) => ({
    //     ...prev,
    //     [name]: booleanValue,
    //   }));
    // } else
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
          profilePic: "http://example.com/attachments/static-profile-pic.jpg",
          licenseOrCertificationFile: "http://example.com/attachments/static-license-file.pdf",
        };

        const response = await UpdateTherapistData(`/admin/therapists/${row?._id}`, updatedFormData);

        if (response?.status === 200) {
          toast.success("Therapist data updated successfully");
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
            <label className="block mb-2">Would you like a company provided email account?</label>
            <select
              name="companyProvidedEmail"
              value={formData.companyProvidedEmail ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Provider Type?</label>
            <select
              name="providerType"
              value={formData.providerType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="Licensed Therapist">Licensed Therapist</option>
              <option value="Peer Support Specialist">Peer Support Specialist</option>
              <option value="Paraprofessional">Paraprofessional</option>
              <option value="Qualified Professional">Qualified Professional</option>
              <option value="Associate Professional">Associate Professional</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Are you licensed and/or certified?</label>
            <select
              name="licensedAndCertified"
              value={formData.licensedAndCertified ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have computer equipment and Wifi to access our platform?</label>
            <select
              name="computerAndWifi"
              value={formData.computerAndWifi ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have experience working on a telehealth platform?</label>
            <select
              name="expInTeleHealthPlatform"
              value={formData.expInTeleHealthPlatform ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have any disciplinary actions (including pending) with any licensing or credentialing board?</label>
            <select
              name="anyDisciplinaryActionTaken"
              value={formData.anyDisciplinaryActionTaken ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Do you have independent Malpractice Insurance? If you do not currently have malpractice insurance, it is easy to acquire online! Please STOP and return to this form once you have acquired your malpractice insurance.</label>
            <select
              name="independentMalpracticeInsurance"
              value={formData.independentMalpracticeInsurance ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Insurance Company</label>
            <input type="text" name="insuranceCompanyName" value={formData.insuranceCompanyName} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2">Have you had a claim filed in the last 6 months.?</label>
            <select
              name="claimedFilledInLast6Months"
              value={formData.claimedFilledInLast6Months ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Profile Image</label>
            <input type="file" name="profilePic" id="" onChange={handleInputChange} />
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
            <label className="block mb-2">Licensure/Certification Issued Date *</label>
            <input type="date" name="licenseOrCertificationIssuedDate" id="" value={formData.licenseOrCertificationIssuedDate} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Licensure/Certification Expiration *</label>
            <input type="date" name="licenseOrCertificationExpiryDate" required value={formData.licenseOrCertificationExpiryDate} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">NPI number * <br /> (If applicable,if not write N/A)</label>
            <input type="text" name="PNPINumber" required value={formData.PNPINumber} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Taxonomy code(If applicable,if not write N/A) *</label>
            <input type="text" name="taxonomyCode" required value={formData.taxonomyCode} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Do you require supervision?</label>
            <select
              name="requireSupervision"
              value={formData.requireSupervision ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

          </div>
          <div>
            <label className="block mb-2">License Type *</label>
            <input type="text" name="licenceType" required value={formData.licenceType} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Licensure/Certification Number *</label>
            <input type="number" minLength={9} name="licenceOrCertificationNumber" required value={formData.licenceOrCertificationNumber} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Licensure/Certification State*</label>
            <input type="text" name="licenceOrCertificationState" required value={formData.licenceOrCertificationState} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Which licensing board or agency issued your credentials?</label>
            <input type="text" name="licensingBoardOrAgency" required value={formData.licensingBoardOrAgency} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Do you have a supervisor with a valid supervision agreement in place?</label>
            <input type="text" name="validSupervisionAgreement" required value={formData.validSupervisionAgreement} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Add file</label>
            <input type="file" name="licenseOrCertificationFile" onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Preferred Language?</label>
            <input type="text" name="preferredLanguage" required value={formData.preferredLanguage} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Are you fluent in any other languages besides english?</label>
            <select
              name="fluencyOtherThanEnglish"
              value={formData.fluencyOtherThanEnglish ? "true" : "false"}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Year of Experience?</label>
            <input type="number" name="yearsOfExperience" required value={formData.yearsOfExperience} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Your Approach to Helping?</label>
            <input type="text" name="helpingApproach" required value={formData.helpingApproach} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">Clientele*</label>
            <input type="text" name="clientele" required value={formData.clientele} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block mb-2">General Expertise*</label>
            <input type="text" name="generalExpertise" required value={formData.generalExpertise} onChange={handleInputChange} />
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
          <input type="text" name="aboutYou" value={formData.aboutYou} onChange={handleInputChange} />
          {/* <textarea 
          
          name="aboutYou" 
          required 
          value={formData.aboutYou} 
          onChange={handleInputChange}
          rows={4} 
          ></textarea> */}
        </div>
        <div className='flex justify-end'>
          <button type="submit" className="mt-4 button">Submit <ButtonArrow /></button>
        </div>
      </form>
    </Modal>
  );
};

export default EditClinicianModal;

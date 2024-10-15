"use client";
import { ButtonSvg, ToggleClose } from "@/utils/svgicons";
import React, { useState, useCallback, useEffect } from "react";

// Reference form fields
const referenceFields = [
  { label: "Name", key: "name", type: "text", placeholder: "Enter name" },
  { label: "Phone", key: "phone", type: "tel", placeholder: "Enter phone number" },
  { label: "Email", key: "email", type: "email", placeholder: "Enter email" },
  { label: "Company/Position", key: "company", type: "text", placeholder: "Enter company/position" },
];

interface ReferenceFormProps {
  formData: { [key: string]: string }[];  // Updated to array of objects
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }[]>>; // Updated type
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const References: React.FC<ReferenceFormProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep,
}) => {
  const [isValid, setIsValidState] = useState(false);

  // Initialize with 3 rows if not already
  useEffect(() => {
    if (formData.length < 3) {
      setFormData([
        { name: "", phone: "", email: "", company: "" },
        { name: "", phone: "", email: "", company: "" },
        { name: "", phone: "", email: "", company: "" },
      ]);
    }
  }, [formData, setFormData]);

  // Handle input change for each field
  const handleInputChange = (index: number, field: string, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: value,
    };
    setFormData(newFormData);
  };

  // Add more reference fields
  const addMoreFields = () => {
    setFormData([...formData, { name: "", phone: "", email: "", company: "" }]);
  };

  // Delete a specific field set
  const deleteField = (index: number) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  // Validate the form
  const validateForm = useCallback(() => {
    const valid = formData.every(
      (entry) => entry.name && entry.phone && entry.email && entry.company
    );
    setIsValidState(valid);
    setIsValid(valid); // Also setting the parent validation state
  }, [formData, setIsValid]);

  // Trigger validation whenever form data changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Handle next step
  const handleNext = () => {
    if (isValid) {
      nextStep();
    }
  };
  const handleContinue = () => {
     nextStep();
  };
  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        References
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        <p className="text-gray-500 md:text-base text-sm mb-5">
          Please list three professional references other than relatives or previous employers
        </p>
        {formData.map((data, index) => (
          <div key={index} className="reference-item relative grid lg:grid-cols-4 gap-4 my-4">
            {referenceFields.map((field) => (
              <div key={field.key} className="mb-4">
                <label className="block text-[#283c63] text-sm mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={data[field.key]}
                  onChange={(e) => handleInputChange(index, field.key, e.target.value)}
                  className="text-[#686C78] w-full px-[18px] h-[45px] text-sm py-2 border border-[#dbe0eb] rounded-[20px] focus:outline-none focus:ring-1 focus:border-[#283C63]"
                  required
                />
              </div>
            ))}
            {/* Show delete button only for rows after the 3rd */}
            {index >= 3 && (
              <button
                type="button"
                onClick={() => deleteField(index)}
                className="delete-btn delete-btn absolute top-0 right-0 "
              > <ToggleClose/>
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addMoreFields}
          className="button mt-5"
        >
          Add more
        </button>

        
        <div className="flex justify-end mt-[50px]">
          <button onClick={handleContinue} className="button">
            Continue <ButtonSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default References;

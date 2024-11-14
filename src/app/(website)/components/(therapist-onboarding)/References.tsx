"use client";
import { ButtonSvg, ToggleClose } from "@/utils/svgicons";
import React, { useState, useCallback, useEffect } from "react";

// Reference form fields
const referenceFields = [
  { label: "Name", key: "name", type: "text", placeholder: "Enter name" },
  { label: "Phone", key: "phone", type: "tel", placeholder: "Enter phone number" },
  { label: "Email", key: "email", type: "email", placeholder: "Enter email" },
  { label: "Company/Position", key: "companyPosition", type: "text", placeholder: "Enter company/position" },
];

interface ReferenceFormProps {
  formData: {
    professionalReferences: Array<{
      name: string;
      phone: string;
      email: string;
      companyPosition: string;
    }>;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
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
    if (formData.professionalReferences.length < 3) {
      setFormData((prevData: any) => ({
        ...prevData,
        professionalReferences: [
          ...prevData.professionalReferences,
          { name: "", phone: "", email: "", companyPosition: "" },
          { name: "", phone: "", email: "", companyPosition: "" },
          { name: "", phone: "", email: "", companyPosition: "" },
        ].slice(0, 3), // Ensure only 3 rows are initialized
      }));
    }
  }, [formData, setFormData]);

  // Handle input change for each field
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedReferences = formData.professionalReferences.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    setFormData((prevData: any) => ({
      ...prevData,
      professionalReferences: updatedReferences,
    }));
  };

  // Add more reference fields
  const addMoreFields = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      professionalReferences: [
        ...prevData.professionalReferences,
        { name: "", phone: "", email: "", companyPosition: "" },
      ],
    }));
  };

  // Delete a specific field set
  const deleteField = (index: number) => {
    const updatedReferences = formData.professionalReferences.filter((_, i) => i !== index);
    setFormData((prevData: any) => ({
      ...prevData,
      professionalReferences: updatedReferences,
    }));
  };

  // Validate the form
  const validateForm = useCallback(() => {
    const valid = formData.professionalReferences.every(
      (entry) => entry.name && entry.phone && entry.email && entry.companyPosition
    );
    setIsValidState(valid);
    setIsValid(valid); // Also setting the parent validation state
  }, [formData.professionalReferences, setIsValid]);

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

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        References
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        <p className="text-gray-500 md:text-base text-sm mb-5">
          Please list three professional references other than relatives or previous employers
        </p>
        {formData.professionalReferences.map((data, index) => (
          <div key={index} className="reference-item relative grid lg:grid-cols-4 gap-4 my-4">
            {referenceFields.map((field) => (
              <div key={field.key} className="mb-4">
                <label className="block text-[#283c63] text-sm mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={data[field.key as keyof typeof data]}
                  onChange={(e) => handleInputChange(index, field.key, e.target.value)}
                  className="text-[#686C78] w-full px-[18px] h-[45px] text-sm py-2 border border-[#dbe0eb] rounded-[20px] focus:outline-none focus:ring-1 focus:border-[#283C63]"
                  required
                />
              </div>
            ))}
            {index >= 3 && (
              <button
                type="button"
                onClick={() => deleteField(index)}
                className="delete-btn absolute top-0 right-0"
              >
                <ToggleClose />
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
          <button onClick={handleNext} className="button">
            Continue <ButtonSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default References;

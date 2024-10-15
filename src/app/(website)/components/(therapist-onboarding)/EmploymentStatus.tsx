"use client";
import React, { useCallback, useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const EmploymentStatusQuestions = [
  {
    question: "What is your current employment status?",
    type: "radio",
    options: ["Employed", "Self-Employed", "Unemployed", "Student"],
  },
  {
    question: "Current or Previous Employer Name",
    type: "text",
    placeholder: "",
  },
  {
    question: "City, State",
    type: "text",
  },
  {
    question: "Role/Position",
    type: "text",
  },
  {
    question: "Rate of Pay",
    type: "number",
  },
  {
    question: "Start Date",
    type: "date",
  },
  {
    question: "End Date",
    type: "date",
  },
  {
    question: "Reason for Leaving",
    type: "text",
  },
  {
    question: "Supervisor's Name",
    type: "text",
  },
  {
    question: "Job Description",
    type: "text",
  },
  {
    question: "Current Resume",
    type: "file",
  },
];

interface EmploymentStatusProps {
  formData: { [key: string]: any }; // Adjusted to support different types
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const EmploymentStatus: React.FC<EmploymentStatusProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  
  const validateStep = useCallback(() => {
    const isValid = EmploymentStatusQuestions.every((q, index) => {
      const value = formData[`employee_${index}`];
      // Check if the value is a string and not empty for text fields
      return (typeof value === 'string' && value.trim() !== '') || (q.type === 'file' && value instanceof File);
    });
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  const handleContinue = () => {
    // Validate and proceed to next step if valid
    if (EmploymentStatusQuestions.every((q, index) => formData[`employee_${index}`])) {
      nextStep();
    }
  };

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
      Employment Details
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {EmploymentStatusQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            question={q.question}
            index={`employee_${index}`}
            total={EmploymentStatusQuestions.length}
            type={q.type}
            placeholder={q.placeholder}
            options={q.options}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        
        <div className="flex justify-end mt-[50px]">
          <button onClick={handleContinue} className="button">
            Continue <ButtonSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentStatus;

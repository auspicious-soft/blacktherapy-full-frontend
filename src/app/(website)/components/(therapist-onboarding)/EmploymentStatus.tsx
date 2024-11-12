"use client";
import React, { useCallback, useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const EmploymentStatusQuestions = [
  {
    question: "What is your current employment status?",
    key: "currentEmploymentStatus",
    type: "radio",
    options: ["Employed", "Self-Employed", "Unemployed", "Student"],
  },
  {
    question: "Current or Previous Employer Name",
    key: "currentOrPreviousEmployerName",
    type: "text",
    placeholder: "",
  },
  {
    question: "City, State",
    key: "employmentCityState",
    type: "text",
  },
  {
    question: "Role/Position",
    key: "rolePosition",
    type: "text",
  },
  {
    question: "Rate of Pay",
    key: "rateOfPay",
    type: "number",
  },
  {
    question: "Start Date",
    key: "startDate",
    type: "date",
  },
  {
    question: "End Date",
    key: "endDate",
    type: "date",
  },
  {
    question: "Reason for Leaving",
    key: "reasonForLeaving",
    type: "text",
  },
  {
    question: "Supervisor's Name",
    key: "supervisorName",
    type: "text",
  },
  {
    question: "Job Description",
    key: "jobDescription",
    type: "text",
  },
  {
    question: "Current Resume",
    key: "currentResume",
    type: "file",
  },
];  

interface EmploymentStatusProps {
  formData: any; // Adjusted to support different types
  setFormData: React.Dispatch<React.SetStateAction<any>>;
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
    const isValid = EmploymentStatusQuestions.every(q => {
      const value = formData[q.key];
      
      // Check if value is a string and if it's not empty after trimming
      if (typeof value === 'string') {
        return value.trim() !== "";
      }
  
      // For other types (like number, boolean), just check if they're not falsy
      return value !== undefined && value !== null && value !== "";
    });
  
    setIsValid(isValid);
  }, [formData, setIsValid]);
  

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (EmploymentStatusQuestions.every(q => formData[q.key])) {
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
            name={q.key}
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

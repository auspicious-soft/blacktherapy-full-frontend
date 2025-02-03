"use client";
import React, { useCallback, useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";
const personalDetailsQuestions = [
  { question: "First name", key: "firstName", type: "text", placeholder: "John" },
  { question: "Last name", key: "lastName", type: "text", placeholder: "Doe" },
  { question: "Phone number", key: "phoneNumber", type: "number", placeholder: "+415868135" },
  { question: "Gender", key: "gender", type: "radio", options: ["Male", "Female", "Other"] },
  { question: "Date of birth", key: "dob", type: "date", placeholder: "DD/MM/YY" },
  { question: "City", key: "city", type: "text", placeholder: "City" },
  { question: "State", key: "state", type: "text", placeholder: "State" },
  { question: "Country", key: "country", type: "text", placeholder: "Country" },
  { question: "Zip Code", key: "zipCode", type: "number", placeholder: "Zip Code" },
  { question: "Address Line 1", key: "addressLine1", type: "text", placeholder: "Address Line" },
  { question: "Address Line 2", key: "addressLine2", type: "text", placeholder: "N/A if not there" },
  { question: "How long at present address?", key: "howLongAtPresentAddress", type: "text", placeholder: "Value" },
  { question: "Salary desired in $ (month)", key: "salaryDesired", type: "number", placeholder: "Value" },
];

interface PersonalDetailsProps { 
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {

  const validateStep = useCallback(() => {
    const isValid = personalDetailsQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (personalDetailsQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
      Personal Details
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {personalDetailsQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            question={q.question}
            name={q.key}
            index={`personal_${index}`}
            total={personalDetailsQuestions.length}
            type={q.type}
            placeholder={q.placeholder}
            options={q.options}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        
        <div className="flex justify-end mt-[50px]">
        <button onClick={handleContinue} className="button">Continue <ButtonSvg /></button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
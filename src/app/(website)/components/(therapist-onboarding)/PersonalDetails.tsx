"use client";
import React, { useCallback, useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";
const personalDetailsQuestions = [
  {
    question: "First name",
    type: "text",
    placeholder: "John",
  },
  {
    question: "Last name",
    type: "text",
    placeholder: "Doe",
  },
  {
    question: "Phone number",
    type: "number",
    placeholder: "+415868135",
  },
  {
    question: "Gender",
    type: "radio",
    options: ["Male", "Female" ,"Other"],
  },
  {
    question: "Date of birth",
    type: "date",
    placeholder: "DD/MM/YY",
  },
  {
    question: "City",
    type: "text",
    placeholder: "city"
  },
  {
    question: "State",
    type: "select",
    options: ["option 1", "option 2", "option 3", "option 4" ],
    placeholder: "State",
  },
  {
    question: "Country",
    type: "select",
    options: ["option 1", "United States", "option 3" ],
    placeholder: "Country",
  },
  {
    question: "Zip Code",
    type: "number",
    placeholder: "Zip Code",
  },
  {
    question: "Address Line 1",
    type: "text",
    placeholder: "Address Line",
  },
  {
    question: "Address Line 2",
    type: "text",
    placeholder: "Address Line",
  },
  {
    question: "How long at present address?",
    type: "number",
    placeholder: "value",
  },
  {
    question: "Salary desired",
    type: "number",
    placeholder: "value",
  }
];

interface PersonalDetailsProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
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
    const isValid = personalDetailsQuestions.every(
      (q, index) => formData[`personal_${index}`] && formData[`personal_${index}`].trim() !== ""
    );
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    // Validate and proceed to next step if valid
    if (personalDetailsQuestions.every((q, index) => formData[`personal_${index}`])) {
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
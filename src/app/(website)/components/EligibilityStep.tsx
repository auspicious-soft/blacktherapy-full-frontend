"use client";
import React, { useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const questions = [
  {
    question: "What is your primary email?",
    type: "text",
    placeholder: "Type your email",
  },
  {
    question: "Would you like a company provided email account?",
    type: "radio",
    options: ["Yes", "No"],
    placeholder: "",
  },
  {
    question: "Provider Type?",
    type: "select",
    options: ["Therapist", "Peer Support Specialist", "Paraprofessional", "Qualified Professional", "Associate Professional", "Other" ],
    placeholder: "Select type",
  },
  {
    question: "Are you licensed and certified?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have computer equipment and Wifi to access our platform?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have experience working on a telehealth platform?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "Do you have any disciplinary actions (including pending) with any licensing or credentialing board?",
    type: "radio",
    options: ["Yes", "No"],
  },
];

interface EligibilityStepProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const EligibilityStep: React.FC<EligibilityStepProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  useEffect(() => {
    validateStep();
  }, [formData]);

  const validateStep = () => {
    const isValid = questions.every(
      (q, index) => formData[index] && formData[index].trim() !== ""
    );
    setIsValid(isValid);
  };
  const handleContinue = () => {
    // Additional validation if needed
    nextStep();
  };
  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        Eligibility
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {questions.map((q, index) => (
          <QuestionComponent
            key={index}
            question={q.question}
            index={index}
            total={questions.length}
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

export default EligibilityStep;

"use client";
import React, { useCallback, useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const UploadDocumentQuestions = [
  {
    question: "Supervision Agreement",
    key: "superVisionAgreement",
    type: "file",
  },
];

interface UploadDocumentProps {
  formData: { [key: string]: any }; // Adjusted to support different types
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const UploadDocuments: React.FC<UploadDocumentProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep,
}) => {
  const validateStep = useCallback(() => {
    // Always set isValid to true since the upload is optional
    setIsValid(true);
  }, [setIsValid]);
  
  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
      Upload Documents
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {UploadDocumentQuestions.map((q, index) => (
          <QuestionComponent
            required = {false}
            key={index}
            name={q.key}
            question={q.question}
            index={`uploads_${index}`}
            total={UploadDocumentQuestions.length}
            type={q.type}
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

export default UploadDocuments;
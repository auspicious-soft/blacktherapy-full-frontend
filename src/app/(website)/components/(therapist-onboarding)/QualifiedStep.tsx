"use client";
import React, { useCallback, useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const QualifiedStepQuestions = [ 
  {
    question: "How are you qualified for this Position?",
    key: "howAreQualifiedForPosition",
    type: "text",
  },
  {
    question: "An application form sometimes makes it difficult for an individual to adequately summarize a complete background. Use the space below to summarize any additional information necessary to describe your full qualifications for the specific position for which you are applying.",
    key: "additionalInformation",
    type: "text",
    placeholder: "",
  },
];

interface QualifiedStepProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const QualifiedStep: React.FC<QualifiedStepProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {

  const validateStep = useCallback(() => {
    const isValid = QualifiedStepQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (QualifiedStepQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };


  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
    
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {QualifiedStepQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            name={q.key}
            question={q.question}
            index={`qualify_${index}`}
            total={QualifiedStepQuestions.length}
            type={q.type}
            placeholder={q.placeholder}
            // options={q.options}
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

export default QualifiedStep;

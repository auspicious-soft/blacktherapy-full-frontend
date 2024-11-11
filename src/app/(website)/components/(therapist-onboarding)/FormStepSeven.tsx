"use client";
import React, { useCallback, useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const FormStepSevenQuestions = [
  {
    question: "HAVE YOU EVER BEEN CONVICTED OF A FELONY OR MISDEMEANOR?", 
    key: "felonyOrMisdemeanor",
    type: "select",
    options: ["Please select", "NO", "FELONY", "MISDEMEANOR"],
  },
  {
    question: "If yes, explain number of conviction(s), nature of offense(s) leading to conviction(s), how recently such offense(s) was/were committed, sentence(s) imposed, and type(s) of rehabilitation.",
    key: "ifFelonyOrMisdemeanor",
    type: "text",
  },
  {
    question: "Have you lived in the state of North Carolina for the past five (5) years?",
    key: "livedInNorthCarolina",
    type: "select",
    options: ["Please select", "No", "Yes"]
  },
  {
    question: "If no, please list the states that you have resided",
     key: "ifNotLivedInNorthCarolina",
    type: "text",
    placeholder: "value",
  },
  {
    question: "Do you have Driver License?",
     key: "validDriverLicense",
    type: "select",
    options: ["Please select", "No", "Yes"]
  },
  {
    question: "Do you have Reliable Transportation?",
     key: "reliableTransportation",
    type: "select",
    options: ["Please select", "No", "Yes"]
  },
  {
    question: "Can you submit verification of your legal right to work in the United States?",
     key: "legalRightToWorkInUS",
    type: "select",
    options: ["Please select", "No", "Yes"]
  },
  {
    question: "Are you able to perform the essential functions of the position for which you are applying either with or without reasonable accommodations?",
    key: "reasonableAccommodation",
    type: "select",
    options: ["Please select", "No", "Yes"]
  },
  {
    question: "Driver’s license or State ID Number",
     key: "driverLicenseOrStateId",
    type: "text",
  },
  {
    question: "State of Issue",
     key: "stateOfIssue",
    type: "text",
  },
  {
    question: "Expiration date",
     key: "expirationDate",
    type: "date",
  },
];

interface FormStepSevenProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const FormStepSeven: React.FC<FormStepSevenProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep,
}) => {
  const validateStep = useCallback(() => {
    const isValid = FormStepSevenQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (FormStepSevenQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };
      return (
        <div className="form-main">
          <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
           
          </h2>
          <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
            {FormStepSevenQuestions.map((q, index) => (
              <QuestionComponent
                key={index}
                name={q.key}
                question={q.question}
                index={`formseven_${index}`}
                total={FormStepSevenQuestions.length}
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
export default FormStepSeven;

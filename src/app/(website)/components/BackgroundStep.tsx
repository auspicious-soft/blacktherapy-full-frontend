"use client";
import React, { useEffect } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";
const BgQuestions = [
  {
    question: "",
    type: "radio",
    options: ["Agree", "Disagree"],
  },

];
 
interface CertificationStepProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const BackgroundStep: React.FC<CertificationStepProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  useEffect(() => {
    validateStep();
  }, [formData]);

  const validateStep = () => {
    const isValid = BgQuestions.every(
      (q, index) => formData[`bgg_${index}`] && formData[`bgg_${index}`].trim() !== ""
    );
    setIsValid(isValid);
  };
  const handleContinue = () => {
    // Additional validation if needed
    nextStep();
  };
  return (
    <div className="form-main background-consent">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
      Background Check Consent
      </h2> 
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
      <div className="mb-[40px] max-w-[998px] mx-auto text-center text-[#686c78] text-base leading-7">Do you hereby authorize The Ship Group Services (the “Company”) and/or its agents to make investigation of your background, references, character, past employment, consumer reports, education, and criminal history record information which may be in any state or local files, including those maintained by both public and private organizations, and all public records, for the purpose of confirming the information contained on my application and/or obtaining other information which may be material to my qualifications for employment. A telephone facsimile (fax) or xerographic copy of this consent shall be considered as valid as the original consent.</div>
        {BgQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            question={q.question}
            index={`bgg_${index}`}
            total={BgQuestions.length}
            type={q.type}
            options={q.options}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
         <div className="flex justify-end mt-[50px]">
        <button onClick={handleContinue}className="button">Continue <ButtonSvg /></button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundStep;

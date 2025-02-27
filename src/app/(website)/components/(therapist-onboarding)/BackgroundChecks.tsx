"use client";
import React, { useCallback, useEffect, useRef } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";
import SignatureCanvas from "react-signature-canvas";

const BackgroundQuestions = [
  {
    question: "I agree and understand that by signing my electronic signature, it is the legal equivalent of my manual/handwritten signature and I consent to be legally bound to this agreement.",
    key: "consentAgreement",
    type: "radio",
    options: ["I Agree", "No"],
  },
  {
    question: "First Name",
    key: "consentFirstName",
    type: "text",
    placeholder: "",
  },
  {
    question: "Last Name",
    key: "consentLastName",
    type: "text",
  },
  {
    question: "Date",
    key: "consentDate",
    type: "date",
  },
];
 interface BackgroundProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const BackgroundChecks: React.FC<BackgroundProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const validateStep = useCallback(() => {
    const isValid = BackgroundQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (BackgroundQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setFormData((prev) => ({
        ...prev,
        signature: "",
      }));
    }
  };

  const saveSignature = async () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      const canvas = sigCanvasRef.current.getTrimmedCanvas();
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png');
      });
      const signatureFile = new File([blob as any], 'signature2.png', { type: 'image/png' })

      // const signature = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
      setFormData((prev: any) => ({
        ...prev,
        consentSignature: signatureFile,
      }));

    } 
  };


  return (
    <div className="form-main">
     <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        Background Checks
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        <p className="text-[#283c63] font-semibold text-xl mb-4 text-center">Authorization for Background Checks</p>
        <p className="text-gray-500 mb-10">
          I, hereby authorize THE SHIP GROUP TECHNOLOGIES and/or its agents to conduct a background check which may be used to determine my eligibility for employment, promotion, or retention. I understand that this report may contain personal information gained through personal interviews or found in any state or local files and public records, including but not limited to information about my character, reputation, living conditions, consumer reports, education, criminal record, drug testing, and previous employment. 
          <br />I understand that the purpose of this background check is to verify the information included in my application and to obtain additional information that may be pertinent to my qualifications for employment. I understand that this disclosure is allencompassing, allowing THE SHIP GROUP TECHNOLOGIES to obtain background reports from third-party organizations throughout the course of my employment to the extent permitted by the law. <br />
          I understand that this background check is necessary if I wish to meet all the criteria for the position I am applying for and that a successful background check is not a guarantee of employment. I also understand that I have the right, upon written request within a reasonable timeframe, to request a copy of my background report. <br />
          I agree that THE SHIP GROUP TECHNOLOGIES may contact my references, previous employers, and any applicable third party to confirm all the details that have been included in my application, and I hereby release all parties from any liabilities on account of this disclosure. I further authorize that a photocopy of this authorization may be considered as valid as the original.
        </p>
        {BackgroundQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            name={q.key}
            question={q.question}
            index={`background_${index}`}
            total={BackgroundQuestions.length}
            type={q.type}
            placeholder={q.placeholder}
            options={q.options}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        {/* Signature Section */}
        <div className="max-w-[802px] mx-auto  mt-5 relative">
            <p className="mb-2 text-[#283c63]  ">Signature</p>
            <SignatureCanvas
              ref={sigCanvasRef}
              canvasProps={{
                width: 800,
                height: 200,
                className: "signature pencil-cursor border border-gray-300 rounded-lg"
              }}
              penColor="#4c4c4c"
              onEnd={saveSignature}
            />
          <button onClick={clearSignature} className="absolute top-8 right-0 bg-[#283c63] text-white rounded-lg px-3 py-1   ">Clear</button>
        </div>

        <div className="flex justify-end mt-[50px]">
          <button onClick={handleContinue} className="button">Continue <ButtonSvg /></button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundChecks;

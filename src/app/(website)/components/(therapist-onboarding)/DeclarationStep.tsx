"use client";
import React, { useCallback, useEffect, useRef } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";
import SignatureCanvas from "react-signature-canvas";

const DeclarationQuestions = [
  {
    question: "I agree and understand that by signing my electronic signature, it is the legal equivalent of my manual/handwritten signature and I consent to be legally bound to this agreement.",
    key: "againConsentAgreement",
    type: "radio",
    options: ["I Agree", "No"],
  },
  {
    question: "First Name",
    key: "againConsentFirstName",
    type: "text",
    placeholder: "",
  },
  {
    question: "Last Name",
    key: "againConsentLastName",
    type: "text",
  },
  {
    question: "Date",
    key: "againConsentDate",
    type: "date",
  },
]; 

interface BackgroundProps {
  formData: { [key: string]: string };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const DeclarationStep: React.FC<BackgroundProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const validateStep = useCallback(() => {
    const isValid = DeclarationQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (DeclarationQuestions.every(q => formData[q.key])) {
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

  const saveSignature = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      const signatureData = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
      setFormData((prev) => ({
        ...prev,
        signature: signatureData,
      }));
    }
  };

  return (
    <div className="form-main">
     <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
      
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        <p className="text-[#283c63] font-semibold text-xl mb-4 text-center">Authorization for Background Checks</p>
 <div className="onboarding-form declaration-text">
 <p className="">
        I hereby certify that the information contained in this application form is true and correct to the best of my knowledge and agree to have any of the statements checked unless I have indicated to the contrary. 
    </p>
    <p>I authorize the references listed above, as well as all other individuals contacted, to provide any and all information concerning my previous employment and any other pertinent information that they may have. </p>
    <p>Further, I release all parties and persons from any and all liability for any damages that may result from furnishing such information as well as from the use or disclosure of such information by the employing organization or any of its agents, employees or representatives. </p>
    <p>I understand that any misrepresentation or falsification, or material omission of information on this application may result in my failure to receive an offer or, if I am hired, my termination from employment. </p>
    <p>In consideration of my employment, I agree to conform to the rules and standards of the organization. 
<br /><br />
I further agree that my employment can be terminated at will, or my compensation altered at will by the organization, with or without cause, and with or without notice, at any time, either at my option or at the option of the employer.</p>
    <p> I understand that no employee or representative of this organization, other than its Director or Director of Operations, has the authority to enter into an agreement for employment for any specified period of time, or to make any express or implied agreement contrary to the foregoing. </p>
    <p>Further, the Director of this organization may not alter the <span>atwill nature of the employment relationship or enter into any employment agreement for a specified time unless the Director  and I both sign a written agreement that clearly and expressly specifies the intent to do so. </span>
<br /><br />
<span>I agree that this shall constitute a final and fully binding integrated agreement with respect to the atw </span>ill nature of my employment relationship and that there are no oral or collateral agreements regarding this issue. </p>
    <p>Except as required in the performance of my duties, I understand and agree that I will not at any time during or after my employment use or disseminate any confidential information or any other information of a secret, proprietary, or generally undisclosed nature relating to this employer, or its programs, clients, employees, plans or procedures (all of which constitute trade secrets). I agree to deliver to this employer/organization any copies of confidential information, or other company property, upon termination of the employment relationship or at any time upon request. </p>
 <p>I also agree not to solicit employees or clients of this employer/organization either during or for one year after employment to leave the organization and commence work with another company. 
<br /><br />
I also understand that all offers of employment are conditioned on receipt of satisfactory responses to reference requests and the provision of satisfactory proof of an applicant’s identity and legal authority to work in the United States.
<br /><br />
 I certify that I have received separate written notification disclosures and authorization request so that this employer/organization may obtain a consumer report on me. This report may be used in connection with my application for employment and for other employmentrelated purposes.</p>
 <p><span>In addition to the terms outlined in the employment agreement, I hereby grant permission for the organization&lsquo;s staff and administration to sign, enter into agreements, communicate, and share information with state agencies, insurance panels, and other thirdparty</span> partners as it relates to my employment. This includes, but is not limited to, verification of information, advertising, and credentialing processes. I understand that this authorization is necessary for the organization to fulfill its obligations and ensure compliance with relevant regulations and standards. I acknowledge that the organization will handle my personal information with the utmost confidentiality and in accordance with applicable privacy laws and policies.</p>

 
 </div>
        {DeclarationQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            name={q.key}
            question={q.question}
            index={`declare_${index}`}
            total={DeclarationQuestions.length}
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


export default DeclarationStep;

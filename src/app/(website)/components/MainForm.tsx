"use client";
import React, { useState } from "react";
import InsuranceForm from "@/app/(website)/components/InsuranceForm";
import OutOfPocketForm from "@/app/(website)/components/OutOfPocketForm";
import EmployerForm from "@/app/(website)/components/EmployerForm";

interface ClientFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MainForm: React.FC<ClientFormProps> = ({ formData, setFormData }) => {
  const [formType, setFormType] = useState<string | null>(null);

  const handleChoice = (choice: string) => {
    setFormType(choice);

    setFormData((prevData: any) => ({
      ...prevData,
      insuranceCoverage: 
        choice === "insurance" ? "yes" :
        choice === "out-of-pocket" ? "no" :
        "through EAP"
    }));
  };

  const handleBack = () => {
    setFormType(null);
  };

  return (
    <div className="container py-[40px] ">
      {!formType && (
        <div className="max-w-[800px] mx-auto rounded-[20px] bg-white p-5 md:p-[40px]">
          <h2 className="section-title text-center mb-4">Want to check how much insurance will pay for?</h2>
          
          {/* Insurance Button */}
          <button
            onClick={() => handleChoice("insurance")}
            className="text-sm md:text-base text-left px-5 py-[10px] text-white bg-[#283C63] w-full rounded-md mb-2"
          >
            Yes, let&apos;s check my insurance coverage <br />
            Most insured people pay a copay of $25 or less
          </button>

          {/* Out-of-pocket Button */}
          <button
            onClick={() => handleChoice("out-of-pocket")}
            className="text-sm md:text-base text-left px-5 py-[10px] text-white bg-[#283C63] w-full rounded-md mb-2"
          >
            I&apos;ll pay out-of-pocket <br />
            Black Therapy Network is less expensive on average than in-person therapy
          </button>

          {/* Employer Button */}
          <button
            onClick={() => handleChoice("employer")}
            className="text-sm md:text-base text-left px-5 py-[10px] text-white bg-[#283C63] w-full rounded-md mb-2"
          >
            I&apos;ll use my benefit through my EAP, employer, or organization
          </button>
        </div>
      )}

      {formType === "insurance" && <InsuranceForm formData={formData} setFormData={setFormData} onBack={handleBack} />}
      {formType === "out-of-pocket" && <OutOfPocketForm formData={formData} setFormData={setFormData} onBack={handleBack} />}
      {formType === "employer" && <EmployerForm formData={formData} setFormData={setFormData} onBack={handleBack} />}
    </div>
  );
};

export default MainForm;

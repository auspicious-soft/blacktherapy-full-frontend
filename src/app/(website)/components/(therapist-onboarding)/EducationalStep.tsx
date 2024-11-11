"use client";
import React, { useCallback, useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg, DeleteIcon } from "@/utils/svgicons";

const EducationalQuestions = [
  {
    question: "Highest Level of Education Completed",
    key: "highestEducationCompleted",
    type: "select",
    options: [
      "None",
      "High School/ GED",
      "College",
      "Graduate School",
      "Advanced Degree/ Professional School",
    ],
  },
  {
    question: "NAME OF SCHOOL",
    key: "schoolName",
    type: "text",
  },
  {
    question: "LOCATION (City and State)",
    key: "location",
    type: "text",
  },
  {
    question: "MAJOR & DEGREE EARNED",
    key: "majorDegree",
    type: "text",
    placeholder: "value",
  },
  {
    question: "Licensure & Certification",
    key: "licenseOrCertification",
    type: "textarea",
  },
  {
    question: "Describe your skills",
    key: "skills",
    type: "textarea",
  },
  {
    question: "How many hours can you work weekly?",
    key: "weeklyHours",
    type: "number",
  },
  {
    question: "Employment desired",
    key: "employmentDesired",
    type: "select",
    options: ["Full-Time Only", "Part-Time Only", "Full or Part Time"],
    placeholder: "option",
  },
]; 

interface EducationalProps {
  formData: { [key: string]: any }; 
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const EducationalStep: React.FC<EducationalProps> = ({
  formData,
  setFormData,
  setIsValid, 
  nextStep,
}) => {

  const validateStep = useCallback(() => {
    const isValid = EducationalQuestions.every(q => formData[q.key] && formData[q.key].trim() !== "");
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  
  const handleContinue = () => {
    if (EducationalQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prevData) => {
      const updatedDays = prevData.currentAvailability.includes(day)
        ? prevData.currentAvailability.filter((d: any) => d !== day)
        : [...prevData.currentAvailability, day];
      return { ...prevData, currentAvailability: updatedDays };
    });
  };

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        Educational Details
      </h2>
      <div className="bg-white rounded-[20px] p-5 md:p-[50px]">
        {EducationalQuestions.map((q, index) => (
          <QuestionComponent
            key={index}
            name={q.key}
            question={q.question}
            index={`education_${index}`}
            total={EducationalQuestions.length}
            type={q.type}
            placeholder={q.placeholder}
            options={q.options}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <div className="pt-10 grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
          <p className=" text-[#283c63]">Current Availability</p>
            <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))]">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <div key={day} className="custom-checkbox relative flex items-center">
                  <input
                    type="checkbox"
                    id={day}
                    name="currentAvailability"
                    checked={formData?.currentAvailability.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                  />
                  <label htmlFor={day} className="text-[#283c63] text-sm">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

        <div className="flex justify-end mt-[50px]">
          <button onClick={handleContinue} className="button">
            Continue <ButtonSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalStep;

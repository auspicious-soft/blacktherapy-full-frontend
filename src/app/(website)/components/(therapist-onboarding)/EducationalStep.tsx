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
    placeholder: "Select an option",
  },
  {
    question: "Start Time",
    key: "startTime",
    type: "time",
  },
  {
    question: "End Time",
    key: "endTime",
    type: "time",
  },
  {
    question: "Current Availability",
    key: "currentAvailability",
    type: "checkbox",
    options: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
  // Initialize currentAvailability if not already an array
  useEffect(() => {
    if (!Array.isArray(formData.currentAvailability)) {
      setFormData((prevData) => ({
        ...prevData,
        currentAvailability: [],
      }));
    }
  }, [setFormData, formData.currentAvailability]);

  // Handle changes for the availability checkboxes
  const handleCheckboxChange = (day: string) => {
    setFormData((prevData) => {
      const currentAvailability = prevData.currentAvailability || [];
      const updatedAvailability = currentAvailability.includes(day)
        ? currentAvailability.filter((d: string) => d !== day)
        : [...currentAvailability, day];
      return { ...prevData, currentAvailability: updatedAvailability };
    });
  };

  // Validation function to check required fields
  const validateStep = useCallback(() => {
    const isValid = EducationalQuestions.every(
      (q) =>
        formData[q.key] &&
        (Array.isArray(formData[q.key]) ? formData[q.key].length > 0 : formData[q.key].trim() !== "")
    );
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep, formData]);

  const handleContinue = () => {
    if (EducationalQuestions.every(q => formData[q.key])) {
      nextStep();
    }
  };


  return (
    <div className="form-main">
      <h2 className="section-title mb-7 text-center">Educational Details</h2>
      <div className="bg-white rounded-[20px] p-5">
        {EducationalQuestions.map((q, index) =>
          q.key === "currentAvailability" ? (
            <div key={q.key} className="mb-4 md:mb-8 grid md:grid-cols-2 gap-3 md:gap-5 items-center">
              <p className="text-[#283c63]">Current Availability</p>
          <div className="flex flex-wrap gap-2 justify-between">
          {q.options?.map((day) => (
                <label key={day} className="custom-checkbox relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.currentAvailability.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                    className="mr-2"
                  />
                  <span className="text-sm text-[#283c63]">{day}</span>
                </label>
              ))}
          </div>
            </div>
          ) : (
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
          )
        )}

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
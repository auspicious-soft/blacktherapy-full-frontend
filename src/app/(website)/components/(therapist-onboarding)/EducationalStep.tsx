"use client";
import React, { useCallback, useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg, DeleteIcon } from "@/utils/svgicons";

const EducationalQuestions = [
  {
    question: "Highest Level of Education Completed",
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
    type: "text",
  },
  {
    question: "LOCATION (City and State)",
    type: "text",
  },
  {
    question: "MAJOR & DEGREE EARNED",
    type: "text",
    placeholder: "value",
  },
  {
    question: "Do you require supervision?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "Licensure & Certification",
    type: "textarea",
  },
  {
    question: "Describe your skills",
    type: "textarea",
  },
  {
    question: "How many hours can you work weekly?",
    type: "number",
  },
  {
    question: "Employment desired",
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
  const [availabilityRows, setAvailabilityRows] = useState([{ id: Date.now() }]); // Initial row

  const validateStep = useCallback(() => {
    const isValid = EducationalQuestions.every((q, index) => {
      const value = formData[`education_${index}`];
      if (q.type === "checkbox") {
        return Array.isArray(value) && value.length > 0;
      }
      if (q.type === "select") {
        return value && value.trim() !== "";
      }
      return typeof value === "string" && value.trim() !== "";
    });
    setIsValid(isValid);
  }, [formData, setIsValid]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  const handleContinue = () => {
    const isEducationalValid = EducationalQuestions.every((q, index) => {
      const value = formData[`education_${index}`];
      if (q.type === "checkbox") {
        return Array.isArray(value) && value.length > 0;
      }
      return value && value.trim() !== "";
    });

    const isAvailabilityValid = availabilityRows.every((row, index) => {
      const availability = ["Mon", "Tues", "Wends", "Thurs", "Fri", "Sat", "Sun"].every(day => {
        return formData[`availability_${row.id}`]?.[day]?.trim() !== "";
      });
      return index === 0 ? availability : true; // First row is required
    });

    if (isEducationalValid && isAvailabilityValid) {
      nextStep();
    } else {
      alert("Please fill all the required fields.");
    }
  };

  const addAvailabilityRow = () => {
    setAvailabilityRows([...availabilityRows, { id: Date.now() }]); // Add a new row
  };

  const removeAvailabilityRow = (id: number) => {
    setAvailabilityRows(availabilityRows.filter(row => row.id !== id)); // Remove row
  };

  const handleAvailabilityChange = (id: number, day: string, value: string) => {
    const updatedFormData = { ...formData };
    if (!updatedFormData[`availability_${id}`]) {
      updatedFormData[`availability_${id}`] = {};
    }
    updatedFormData[`availability_${id}`][day] = value; // Update availability
    setFormData(updatedFormData);
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

        <div className="pt-10">
          <p className=" text-[#283c63]">Current Availability</p>
          {availabilityRows.map((row, idx) => (
            <div key={row.id} className="grid grid-cols-7 pr-[30px] relative mt-2">
              {["Mon", "Tues", "Wends", "Thurs", "Fri", "Sat", "Sun"].map(day => (
                <div key={day} className="flex flex-col mr-2">
                  <label className="text-[#283c63] text-sm pl-2">{day}</label>
                  <input
                    type="text"
                    onChange={(e) => handleAvailabilityChange(row.id, day, e.target.value)}
                    className="border rounded-[20px] py-2 px-4 text-sm "
                  />
                </div>
              ))}
              {idx > 0 && ( // Only show delete button for rows beyond the first one
                <button onClick={() => removeAvailabilityRow(row.id)} className="absolute right-0 top-6 "><DeleteIcon/> </button>
              )}
            </div>
          ))}
          <button onClick={addAvailabilityRow} className="button !h-[45px] mt-5">Add More</button>
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

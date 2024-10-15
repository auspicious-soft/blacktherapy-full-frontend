"use client"
import React, { useEffect, useState } from "react";
import QuestionComponent from "@/app/(website)/components/QuestionComponent";
import { ButtonSvg } from "@/utils/svgicons";

const preferredCommunicationQuestions = [
  {
    question: "Which are your preferred means of online consultation?",
    type: "select",
    options: ["Audio", "Video", "Chat"],
    placeholder: "Audio, Video, Chat",
  },
  {
    question: "Preferred language",
    type: "text",
    placeholder: "Type Language",
  },
  {
    question: "Are you fluent in any other languages besides English?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    question: "Years of experience",
    type: "text",
    placeholder: "5 Years",
  },
  {
    question: "Your Approach to Helping?",
    type: "text",
    placeholder: "Your approach",
  },
  {
    question: "Clientele",
    type: "select",
    options: ["Adults (24+)", "Children (less than 12)", "Teenagers (13-18)", "Young adults (18-24)"],
    placeholder: "Select",
  },
  {
    question: "General expertise",
    type: "select",
    options: ["Adolescent Mental Health", "Anger Management", "Anxiety", "Cultural Adjustment", "Depression", "Family Issues", "Life Coaching", "Identity Development", "Life Transitions", "Relationship Issues", "Self-Esteem", "Trauma", "Race & Cultural Identity", "Work Stress", "Women's Issues", "Assertiveness", "Imposter Syndrome", "Self-Care", "Abandonment Issues", "Worthlessness"],
    placeholder: "Select",
  },
  {
    question: "About you",
    type: "text",
    placeholder: "About you",
  },
];

const availabilityQuestions = [
  {
    question: "Time will you be available? Start Time",
    type: "time",
  },
  {
    question: "End Time",
    type: "time",
  },
  {
    question: "Choose any day of the week to repeat this availability.",
    type: "checkbox",
    options: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },
];
 
interface MyProfileStepProps {
  formData: { [key: string]: any };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  setIsValid: (isValid: boolean) => void;
  nextStep: () => void;
}

const MyProfileStep: React.FC<MyProfileStepProps> = ({
  formData,
  setFormData,
  setIsValid,
  nextStep
}) => {
  const [activeTab, setActiveTab] = useState("Preferred Communication");

  useEffect(() => {
    validateStep();
  }, [formData]);
  const handleContinue = () => {
    // Additional validation if needed
    nextStep();
  };
  const validateStep = () => {
    const isPreferredCommunicationValid = preferredCommunicationQuestions.every(
      (q, index) => {
        const value = formData[`preferred_${index}`];
        if (q.type === 'checkbox') {
          return Array.isArray(value) && value.length > 0;
        }
        if (q.type === 'select') {
          return value && value.trim() !== "";
        }
        return typeof value === 'string' && value.trim() !== "";
      }
    );

    const isAvailabilityValid = availabilityQuestions.every(
      (q, index) => {
        const value = formData[`availability_${index}`];
        if (q.type === 'checkbox') {
          return Array.isArray(value) && value.length > 0;
        }
        return typeof value === 'string' && value.trim() !== "";
      }
    );

    setIsValid(isPreferredCommunicationValid && isAvailabilityValid);
  };

  const renderQuestions = (questions: any[], prefix: string) => {
    return questions.map((q, index) => (
      <QuestionComponent
        key={index}
        question={q.question}
        index={`${prefix}_${index}`}
        total={questions.length}
        type={q.type}
        placeholder={q.placeholder}
        options={q.options}
        formData={formData}
        setFormData={setFormData}
      />
    ));
  };

  return (
    <div className="form-main">
      <h2 className="section-title mb-7 md:m-0 text-center md:absolute top-[45px] left-[50%] md:translate-x-[-50%]">
        My Profile
      </h2>
 
      <div className="bg-white rounded-[20px] p-[20px] md:p-[50px]">


        <div className="tabs flex flex-wrap items-center justify-center gap-2 mb-[40px]">
          <button
            className={`tab ${activeTab === "Preferred Communication" ? "active bg-[#283C63] text-white" : ""} text-sm md:text-base border border-[#283c63] px-[15px] md:px-[30px] py-4 rounded-[5px]`}
            onClick={() => setActiveTab("Preferred Communication")}
          >
            Preferred Communication
          </button>
          <button
            className={`tab ${activeTab === "Availability" ? "active bg-[#283C63] text-white" : ""} text-sm md:text-base border border-[#283c63] px-[15px] md:px-[30px] py-4 rounded-[5px]`}
            onClick={() => setActiveTab("Availability")}
          >
            Availability
          </button>
        </div>
        {activeTab === "Availability" && <div className="mb-[40px] mx-auto max-w-[998px] text-center text-[#686c78] text-base leading-7">Please provide us your current availability, as service are provided based on the availability of clinician and client. This can be update anytime. We required our clinician to enter their availability for the month.</div>
        }
        {activeTab === "Preferred Communication" && renderQuestions(preferredCommunicationQuestions, "preferred")}
        {activeTab === "Availability" && renderQuestions(availabilityQuestions, "availability")}
        <div className="flex justify-end mt-[50px]">
        <button onClick={handleContinue} className="button">Continue <ButtonSvg /></button>
        </div>
      </div>

    </div>
  );
};

export default MyProfileStep;

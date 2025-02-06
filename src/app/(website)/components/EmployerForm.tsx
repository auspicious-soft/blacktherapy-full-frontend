import React, { useState } from "react";
import PersonalInfoForm from "@/app/(website)/components/PersonalInfoForm";
import IntroSection from "@/app/(website)/components/IntroSection";
import { submitClientForm } from "@/utils/client-signup";

interface EmployerFormProps {
  onBack: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const employerQuestions = [
  { key: "organisationName", question: "Organization name", type: "text", placeholder: "Enter name" },
  { key: "organisationEmail", question: "Email", type: "text", placeholder: "Email" },
  {
    key: "reasonForLookingHelp",
    question: "To begin, tell us why you're looking for help today.",
    type: "radio",
    options: [
      "I'm feeling anxious or panicky",
      "I'm having difficulty in my relationship",
      "A traumatic experience [past or present]",
      "I'm navigating addiction or difficulty with substance abuse",
      "I'm feeling down or depressed.",
      "I'm dealing with stress at work or school",
      "Something else",
    ],
  },
  {
    key: "rateSleepingHabits",
    question: "How would you rate your sleeping habits?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    key: "rateCurrentPhysicalHealth",
    question: "How would you rate your current physical health?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    key: "howYouKnewUs",
    question: "How did you hear about us?",
    type: "radio",
    options: [
      "My doctor",
      "Search Engine/Online",
      "Insurance provider",
      "Previous therapist",
      "Court",
      "Friend/Family",
      "Community Organization",
      "Media/Ad",
    ],
  },
  {
    key: "gender",
    question: "What gender do you identify with?",
    type: "radio",
    options: [
      "Male",
      "Female",
      "Transgender female",
      "Transgender male",
      "Gender queer",
      "Gender variant",
      "Other",
      "Non Binary",
    ],
  },
  {
    key: "mainIssueBrief",
    question: "Briefly describe the main issues or concerns that bring you to therapy?",
    type: "textarea",
    placeholder: "",
  },
  // Add more questions as needed
];
const questionDistribution = [2, 1, 1, 1, 1, 1, 1]

const EmployerForm: React.FC<EmployerFormProps> = ({ onBack, formData, setFormData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questionDistribution.length + 2; 

  const getQuestionIndicesForStep = (step: number) => {
    const startIndex = questionDistribution.slice(0, step).reduce((sum, count) => sum + count, 0);
    const endIndex = startIndex + questionDistribution[step];
    return { startIndex, endIndex };
  };

  const handleAnswerChange = (name: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill in all required fields before continuing.");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };


  const validateCurrentStep = () => {
    const { startIndex, endIndex } = getQuestionIndicesForStep(currentStep);

    for (let i = startIndex; i < endIndex; i++) {
      const questionKey = employerQuestions[i].key;
      if (!formData[questionKey]) {
        return false;
      }
    } 
    return true;
  };

  // const clientFormSubmit = async () => {
  //   await submitClientForm(formData, setFormData);
  // };

  const renderQuestions = () => {
    const { startIndex, endIndex } = getQuestionIndicesForStep(currentStep);

    return employerQuestions.slice(startIndex, endIndex).map((question, index) => (
      <div key={question.key} className="grid mb-4">
      <label className="text-[15px] md:text-lg text-[#283C63] mb-2">{question.question}</label>
      {question.type === "textarea" ? (
        <textarea
        required
          name={question.key}
          placeholder={question.placeholder}
          className="py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]"
          value={formData[question.key] || ""}
          onChange={(e) =>
            handleAnswerChange(question.key, e.target.value)
          }
        />
      ) : question.type === "select" ? (
        <select
        required
          name={question.key}
          className="text-[#686C78] border border-[#dbe0eb] rounded-[20px] px-4 py-3"
          value={formData[question.key] || ""}
          onChange={(e) =>
            handleAnswerChange(question.key, e.target.value)
          }
        >
          <option value="">Select an option</option>
          {question.options?.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : question.type === "radio" ? (
        <div className="flex flex-col">
          {question.options?.map((option, i) => (
            <label key={i} className="text-[15px] md:text-lg custom-radio step-form-radio relative flex items-center mb-2">
              <input
                required
                type="radio"
                name={question.key}
                value={option}
                checked={formData[question.key] === option}
                onChange={() =>
                  handleAnswerChange(question.key, option)
                }
                className="mr-2"
              />
              <span className="text-sm md:text-base w-full text-[#283C63] py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]">
                {option}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <input
        required
          type={question.type}
          name={question.key}
          placeholder={question.placeholder}
          className="text-sm md:text-base py-[10px] px-4 border border-[#dbe0eb] rounded-[20px] text-[#686C78]"
          value={formData[question.key] || ""}
          onChange={(e) =>
            handleAnswerChange(question.key, e.target.value)
          }
        />
      )}
    </div>
    ));
  };

  return (
    <div className="max-w-[800px] mx-auto rounded-[20px] bg-white p-5 md:p-[40px]">
    {/* Render questions for steps within questionDistribution */}
    {currentStep < questionDistribution.length
      ? renderQuestions()
      : (currentStep === questionDistribution.length
          ? <IntroSection onContinue={handleContinue} />
          : <PersonalInfoForm formData={formData} setFormData={setFormData} />
        )
    }
    {/* <div className="flex justify-between mt-4">
      <button onClick={handleBack} className="button">
        Back
      </button>
      {currentStep < totalSteps - 1 ? (
        <button onClick={handleContinue} className="button">
          Continue
        </button>
      ) : (
        <button onClick={clientFormSubmit} className="button">
          Submit 1  
        </button>
      )}
    </div> */}
  </div>
  );
};

export default EmployerForm;

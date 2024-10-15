import React, { useState } from "react";
import PersonalInfoForm from "@/app/(website)/components/PersonalInfoForm";
import IntroSection from "@/app/(website)/components/IntroSection";


interface OutOfPocketFormProps {
  onBack: () => void;
}

const outOfPocketQuestions = [
  {
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
    question: "How would you rate your sleeping habits?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    question: "How would you rate your current physical health?",
    type: "radio",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    question: "How did you here about us?",
    type: "radio",
    options: [
      "My doctor",
      "Serach Engine/Online",
      "Insurance provider",
      "Previous therapist",
      "Court",
      "Friend/Family",
      "Community Organization",
      "Media/Ad",
    ],
  },
  {
    question: "What gender do you identify with?",
    type: "radio",
    options: [
      "Male",
      "Female",
      "Transgender female",
      "Transgender male",
      "Gender queer",
      "Gender variant",
      "other",
      "Non Binary",
    ],
  },
  {
    question: "Briefly describe the main issues or concerns that bring you to therapy?",
    type: "textarea",
    placeholder: "",
  },
  // Add more questions as needed
];

const OutOfPocketForm: React.FC<OutOfPocketFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswerChange = (answer: string, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please answer all questions before continuing.");
    }
  };

  const handleNext =() => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const validateStep = (step: number) => {
    let startIndex = 0;
    let endIndex = 0;

    if (currentStep === 0) {
      startIndex = 0;
      endIndex = 1;
    } else if (currentStep === 1) {
      startIndex = 1;
      endIndex = 2;
    } else if (currentStep === 2) {
      startIndex = 2;
      endIndex = 3;
    } else if (currentStep === 3) {
      startIndex = 3;
      endIndex = 4;
    } else if (currentStep === 4) {
      startIndex = 4;
      endIndex = 5;
    }  else if (currentStep === 5) {
      startIndex = 5;
      endIndex = outOfPocketQuestions.length;
    }

    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[i] || answers[i].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const renderQuestions = () => {
    let startIndex = 0;
    let endIndex = 0;

    if (currentStep === 0) {
      startIndex = 0;
      endIndex = 1;
    } else if (currentStep === 1) {
      startIndex = 1;
      endIndex = 2;
    } else if (currentStep === 2) {
      startIndex = 2;
      endIndex = 3;
    } else if (currentStep === 3) {
      startIndex = 3;
      endIndex = 4;
    } else if (currentStep === 4) {
      startIndex = 4;
      endIndex = 5;
    }  else if (currentStep === 5) {
      startIndex = 5;
      endIndex = outOfPocketQuestions.length;
    }

    return outOfPocketQuestions.slice(startIndex, endIndex).map((question, index) => (
      <div key={index + startIndex} className="grid mb-4">
        <label className="text-[15px] md:text-lg text-[#283C63] mb-2">{question.question}</label>
        {question.type === "textarea" ? (
          <textarea
            placeholder={question.placeholder}
            className="text-sm md:text-base py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          />
        ) : question.type === "select" ? (
          <select
            className="text-[#686C78] border border-[#dbe0eb] rounded-[20px] px-4 py-[10px]"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          >
            <option value="">Select an option</option>
            {question.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        ) : question.type === "radio" ? (
          <div className="flex flex-col">
            {question.options?.map((option, i) => (
              <label key={i} className="text-[15px] md:text-lg custom-radio step-form-radio relative flex items-center mb-2">
                <input
                  type="radio"
                  name={`radio_${index + startIndex}`}
                  value={option}
                  checked={answers[index + startIndex] === option}
                  onChange={() => handleAnswerChange(option, index + startIndex)}
                  className="mr-2"
                />
                <span className="text-sm md:text-base w-full text-[#283C63] py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type={question.type}
            placeholder={question.placeholder}
            className="text-sm md:text-base py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]"
            value={answers[index + startIndex] || ""}
            onChange={(e) => handleAnswerChange(e.target.value, index + startIndex)}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-[800px] mx-auto rounded-[20px] bg-white p-5 md:p-[40px]">
      {currentStep < Math.ceil(outOfPocketQuestions.length / 2) 
        ? renderQuestions() 
        : (currentStep === Math.ceil(outOfPocketQuestions.length / 2) 
            ? <IntroSection onContinue={handleNext}/> 
            : <PersonalInfoForm />
          )
      }
      <div className="flex justify-between">
        <button onClick={handleBack} className="button">Back</button>
        {currentStep < Math.ceil(outOfPocketQuestions.length / 2) && (
          <button onClick={handleContinue} className="button">Continue</button>
        )}
      </div>
    </div>
  );
};

export default OutOfPocketForm;
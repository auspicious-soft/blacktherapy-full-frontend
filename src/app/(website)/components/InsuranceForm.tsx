import React, { useState } from "react";
import PersonalInfoForm from "@/app/(website)/components/PersonalInfoForm";
import IntroSection from "@/app/(website)/components/IntroSection";

interface InsuranceFormProps {
  onBack: () => void;
}

const insuranceQuestions = [
  {
    question: "Find your insurance",
    type: "select",
    options: [
    "Aetna",
    "Blue Cross and Blue Shield of North Carolina",
    "Blue Cross Blue Shield of Massachusetts",
    "Cigna",
    "Oscar Health W",
    "Oxford",
    "United Healthcare",
    "1199SEllJ Funds",
    "90 Degree Benefits - Caprock (Aetna)",
    "90 Degree Benefits - Caprock (Cigna)",
    "All Savers Insurance",
    "Allegiance",
    "Allied (Aetna)",
    "Allied (Cigna)",
    "Ameriben Solutions. Inc. (Aetna)",
    "90 Degree Benefits - Caprock (Cigna)",
    "All Savers Insurance",
    "Allegiance",
    "Allied (Aetna)",
    "Allied (Cigna)",
    "Ameriben Solutions_ Inc. (Aetna)",
    "Ameriben Solutions, Inc. (Cigna)",
    "ASR Physicians Care",
    "AvMed",
    "Banner I Aetna",
    "Benefit and Risk Management Services",
    "Blue Benefits Administrators",
    "Boon",
    "Boon Chapman Administrators",
    "Christian Brothers Services",
    "Cigna Select Great-West Healthcare Services",
    "EBMS (Aetna)",
    "EBMS (Cigna)",
    "Evernorth",
    "GEHA (Aetna)",
    "GEHA (United Healthcare)",
    "Golden Rule Insurance",
    "Gravie Administrative Services (Aetna)",
    "Gravie Administrative Services (Cigna)",
    "Harvard Pilgrim Healthcare",
    "Health Plans, Inc. (Cigna)",
    "Health Plans, Inc. (Harvard Pilgrim)",
    "HealthPartners",
    "Indecs",
    "Lucent Health (Aetna)",
    "Lucent Health (Cigna)",
    "Medica",
    "Medical Mutual of Ohio (Aetna)",
    "Medical Mutual of Ohio (Cigna)",
    "Meritain Health",
    "MVP Healthcare",
    "Nippon Life Benefits",
    "Piedmont Community Health Plan",
    "Preferred One",
    "Providence Health Plan",
    "Providence Insurance and Administrative Services",
    "Surest (formerly BIND)",
    "Trustmark - CoreSource AZ, IL, IN, MD, MN, NC, PA (Aetna)",
    "Trustmark - CoreSource AZ, IL, IN, MD, MN, NC, PA (Cigna)",
    "Trustmark - CoreSource Detroit (Aetna)",
    "Trustmark - CoreSource Detroit (Cigna)",
    "Trustmark - CoreSource Kansas City (Aetna)",
    "Trustmark - CoreSource Kansas City (Cigna)",
    "Trustmark - CoreSource Little Rock (Aetna)",
    "Trustmark - CoreSource Little Rock (Cigna)",  
    "Trustmark - CoreSource OH (Aetna)",
    "Trustmark - CoreSource OH (Cigna)",
    "Trustmark - Small Business Benefits (Aetna)",
    "Trustmark - Small Business Benefits (Cigna)",
    "Tufts Health Plan",
    "UMR",
    "United Healthcare Student Resources (Student Insurance)",
    "WebTPA (Cigna)",
    "Wellfleet",
    "Emblem",
    "Empire Blue Cross Blue Shield",
    "Medicaid",
    "Medicare",
    "Kaiser Permanente of Colorado",
    "Kaiser Permanente of Georgia",
    "Kaiser Permanente of Northern CA",
    "Kaiser Permanente of Southern CA",
    "Kaiser Permanente of the Mid Atlantic",
    "Kaiser Permanente of the Northwest",
    "Humana",
    "Anthem Blue Cross California",
    "Anthem Blue Cross and Blue Shield Colorado",
    "Anthem Blue Cross and Blue Shield Connecticut",
    "Anthem Blue Cross and Blue Shield Indiana",
    "Anthem Blue Cross and Blue Shield Kentucky",
  "  Anthem Blue Cross and Blue Shield Maine",
"Anthem Blue Cross and Blue Shield Missouri",
"Anthem Blue Cross and Blue Shield Nevada",
"Anthem Blue Cross and Blue Shield New Hampshire",
"Anthem Blue Cross and Blue Shield Ohio",
"Anthem Blue Cross and Blue Shield Virginia",
"Anthem Blue Cross and Blue Shield Wisconsin",
"Arkansas Blue Cross and Blue Shield",
"Blue Cross & Blue Shield of Mississippi",
"Blue Cross Blue Shield of Arizona",
"Anthem Blue Cross Blue Shield of Georgia",
"Blue Cross Blue Shield of Michigan",
"Blue Cross Blue Shield of North Dakota",
"Blue Cross Blue Shield of Wyoming",
"Blue Cross and Blue Shield of Alabama",
"Blue Cross and Blue Shield of Hawaii",
"Blue Cross and Blue Shield of Illinois",
"Blue Cross and Blue Shield of Kansas",
"Blue Cross and Blue Shield of Kansas City",
"Blue Cross and Blue Shield of Louisiana",
"Blue Cross and Blue Shield of Minnesota",
"Blue Cross and Blue Shield of Montana",
"Blue Cross and Blue Shield of Nebraska",
"Blue Cross and Blue Shield of New Mexico",
"Blue Cross and Blue Shield of Oklahoma",
"Blue Cross and Blue Shield of Rhode Island",
"Blue Cross and Blue Shield of South Carolina",
"Blue Cross and Blue Shield of Texas",
"Blue Cross and Blue Shield of Vermont",
"Blue Cross of Idaho",
"Blue Shield of California",
"BlueCross BlueShield of Puerto Rico",
"BlueCross BlueShield of Tennessee",
"BlueCross BlueShield of Western New York",
"BlueShield of Northeastern New York",
"Capital BlueCross Pennsylvania",
"CareFirst BlueCross BlueShield",
"CareFirst BlueCross BlueShield (Maryland)",
"Excellus BlueCross BlueShield New York",
"Florida Blue",
"Highmark Blue Cross Blue Shield Delaware",
"Highmark Blue Cross Blue Shield Pennsylvania",
"Highmark Blue Cross Blue Shield West Virginia",
"Highmark Blue Shield Pennsylvania",
"Highmark Blue Cross Blue Shield West Virginia",
"Highmark Blue Shield Pennsylvania",
"Horizon Blue Cross and Blue Shield of New Jersey",
"Independence Blue Cross Pennsylvania",
"Premera Blue Cross Washington",
"Premera Blue Cross and Blue Shield of Alaska",
"Regence BlueCross BlueShield of Oregon",
"Regence BlueCross BlueShield of Utah",
"Regence BlueShield of Washington",
"Regence BlueShield of Idaho",
"Wellmark Blue Cross and Blue Shield",
"FirstCarolinaCare",
"Centene",
"Molina",
"Health Alliance Plan (HAP)",
"Physicians Health",
"Plan Priority Health",
"Kaiser Permanente of Washington",
"AmeriHealth",
"Health Alliance Medical Plans",
"Magellan",
"Beacon Health",
"Regence Group Administrators (RGA)",
"LifeWise Health Plan of Washington",
"Healthcare Management Administrators (HMA)",
"CareFirst BlueCross BlueShield (DC/Virginia)",
"Wellcare - NC Medicaid",
"United Healthcare - NC Medicaid",
"Healthy Blue - NC Medicaid",
"AmeriHealth Caritas - NC Medicaid",
"Carolina Complete - NC Medicaid",
"North Carolina Medicaid",
"Alliance Health - NC Medicaid",
"Eastpointe - NC Medicaid",
"Sandhills Center - NC Medicaid",
"Trillium Health Resources - NC Medicaid",
"Vaya Health - NC Medicaid",
"South Carolina Medicaid",
"Medical Home Network: South Carolina Solutions",
"Humana Healthy Horizons of SC - SC Medicaid",
"First Choice by Select Health - SC Medicaid",
"- SC Medicaid",
"Molina Healthcare of South Carolina - SC Medicaid",
"Healthy Blue by Blue Choice of SC - SC Medicaid",
"Absolute Total Care - SC Medicaid",
    ],
  },
  {
    question: "Member / Subscriber ID",
    type: "text",
    placeholder: "Enter value",
  },
  {
    question: "Subscriber first name",
    type: "text",
    placeholder: "Enter value",
  },
  {
    question: "Subscriber last name",
    type: "text",
    placeholder: "Enter value",
  },
  {
    question: "Date of Birth",
    type: "date",
    placeholder: "Enter any additional notes",
  },
  // mainform-----------
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
    question: "Briefly describe the main issues or concerns that bring you to therapy?",
    type: "textarea",
    placeholder: "",
  },
  // Add more questions as needed
];

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const handleAnswerChange = (answer: string, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const validateCurrentStep = () => {
    let startIndex = 0;
    let endIndex = 0;
    if (currentStep === 0) {
      startIndex = 0;
      endIndex = 1;
    } else if (currentStep === 1) {
      startIndex = 1;
      endIndex = 5;
    } else if (currentStep === 2) {
      startIndex = 5;
      endIndex = 6;
    } else if (currentStep === 3) {
      startIndex = 6;
      endIndex = 7;
    } else if (currentStep === 4) {
      startIndex = 7;
      endIndex = 8;
    } else if (currentStep === 5) {
      startIndex = 8;
      endIndex = 9;
    } else if (currentStep === 6) {
      startIndex = 9;
      endIndex = insuranceQuestions.length;
    }
  

    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[i]) {
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill in all required fields before continuing.");
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

  const renderQuestions = () => {
    let startIndex = 0;
    let endIndex = 0;

    if (currentStep === 0) {
      startIndex = 0;
      endIndex = 1;
    } else if (currentStep === 1) {
      startIndex = 1;
      endIndex = 5;
    } else if (currentStep === 2) {
      startIndex = 5;
      endIndex = 6;
    } else if (currentStep === 3) {
      startIndex = 6;
      endIndex = 7;
    } else if (currentStep === 4) {
      startIndex = 7;
      endIndex = 8;
    } else if (currentStep === 5) {
      startIndex = 8;
      endIndex = 9;
    } else if (currentStep === 6) {
      startIndex = 9;
      endIndex = insuranceQuestions.length;
    }


    return insuranceQuestions
      .slice(startIndex, endIndex)
      .map((question, index) => (
        <div key={index + startIndex} className="grid mb-4">
          <label className="text-[15px] md:text-lg text-[#283C63] mb-2">{question.question}</label>
          {question.type === "textarea" ? (
            <textarea
              placeholder={question.placeholder}
              className="py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]"
              value={answers[index + startIndex] || ""}
              onChange={(e) =>
                handleAnswerChange(e.target.value, index + startIndex)
              }
            />
          ) : question.type === "select" ? (
            <select
              className="text-[#686C78] border border-[#dbe0eb] rounded-[20px] px-4 py-3"
              value={answers[index + startIndex] || ""}
              onChange={(e) =>
                handleAnswerChange(e.target.value, index + startIndex)
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
                    type="radio"
                    name={`radio_${index + startIndex}`}
                    value={option}
                    checked={answers[index + startIndex] === option}
                    onChange={() =>
                      handleAnswerChange(option, index + startIndex)
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
              type={question.type}
              placeholder={question.placeholder}
              className="text-sm md:text-base py-[10px] px-4 border border-[#dbe0eb] rounded-[20px] text-[#686C78]"
              value={answers[index + startIndex] || ""}
              onChange={(e) =>
                handleAnswerChange(e.target.value, index + startIndex)
              }
            />
          )}
        </div>
      ));
  };

  return (
    <div className="max-w-[800px] mx-auto rounded-[20px] bg-white p-5 md:p-[40px]">
      {currentStep < Math.ceil(insuranceQuestions.length / 2) 
        ? renderQuestions() 
        : (currentStep === Math.ceil(insuranceQuestions.length / 2) 
            ? <IntroSection onContinue={handleNext}/> 
            : <PersonalInfoForm />
          )
      }
      <div className="flex justify-between">
        <button onClick={handleBack} className="button">
          Back
        </button>
        {currentStep < Math.ceil(insuranceQuestions.length / 2) && (
          <button onClick={handleContinue} className="button">
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default InsuranceForm;

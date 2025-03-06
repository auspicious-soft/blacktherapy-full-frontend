import React, { useState } from "react";
import PersonalInfoForm from "@/app/(website)/components/PersonalInfoForm";
import IntroSection from "@/app/(website)/components/IntroSection";
import { submitClientForm } from "@/utils/client-signup";
import ReactLoader from "@/components/ReactLoader";


interface OutOfPocketFormProps {
  onBack: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const outOfPocketQuestions = [
  {
    key: "mainIssueBrief",
    question: "Briefly describe the main issues or concerns that bring you to therapy?",
    type: "textarea",
    placeholder: "",
  },
  {
    key: "reasonForLookingHelp",
    question: "To begin, tell us why you're looking for help today. (Select all that apply)",
    type: "radio",
    options: [
      "I'm feeling anxious or panicky",
      "I'm having difficulty in my relationship",
      "A traumatic experience (past or present)",
      "I'm navigating addiction or difficulty with substance abuse",
      "I'm feeling down or depressed",
      "I'm dealing with stress at work or school",
      "I'm struggling with self-esteem or confidence",
      "I'm experiencing grief or loss",
      "I'm struggling with anger management",
      "I'm having difficulty with family dynamics",
      "I'm exploring personal growth and self-improvement",
      "Something else (open text field)"
    ],
    isMulti: true
  },
  {
    question: "Have you had therapy before?",
    key: "seenTherapistBefore",
    type: "radio",
    options: [
      "Yes, and it was helpful",
      "Yes, but it wasn’t helpful",
      "No, this is my first time",
      "No, but I’ve tried self-help or other support methods",
    ]
  },
  {
    question: "Have you ever been diagnosed with a mental health condition?",
    key: "diagnosedWithMentalHealthCondition",
    type: "radio",
    options: [
      "Yes",
      "No",
      "Not Sure"
    ],
    isExapandable: true
  },
  {
    question: "Do you have a history of suicidal thoughts or self-harm?",
    key: "historyOfSuicidalThoughts",
    type: "radio",
    options: [
      "Yes, within the past year",
      "Yes, more than a year ago",
      "No"
    ]
  },
  {
    question: "What kind of therapy style works best for you?",
    key: "therapyStyle",
    type: "radio",
    options: [
      "I prefer structured therapy (goal-oriented, cognitive-behavioral therapy, solutions-focused)",
      "I prefer a safe space to talk openly without structure",
      "I’m not sure yet (help me find the best approach!)",
    ]
  },
  {
    question: "How do you prefer to communicate with your therapist?",
    key: "communicationPreference",
    type: "radio",
    options: [
      "Video sessions",
      "Phone calls",
      "Chat messaging",
      "No preference",
    ]
  },
  {
    question: "Are you currently experiencing major life changes? (Select all that apply)",
    key: "majorLifeChanges",
    type: "radio",
    options: [
      "Recent breakup or divorce",
      "Job loss or career change",
      "Loss of a loved one",
      "Moving to a new place",
      "Becoming a parent",
      "Health issues",
      "Financial stress",
      "None of the above"
    ],
    isMulti: true
  },
  {
    question: "“How do you typically manage stress? (Select all that apply)",
    key: "manageStress",
    type: "radio",
    options: [
      "Exercise or physical activity",
      "Talking to friends/family",
      "Prayer/meditation",
      "Journaling or creative expression",
      "Avoiding or distracting myself (TV, social media, etc.)",
      "Drinking or using substances",
      "I struggle to manage stress"
    ],
    isMulti: true
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
    question: "What is your current relationship status",
    key: "relationshipStatus",
    type: "radio",
    options: [
      "Single",
      "In a relationship",
      "Married",
      "Separated/divorced",
      "Widowed",
    ]
  },
  {
    question: "Do you currently live with others?",
    key: "liveWithOthers",
    type: "radio",
    options: [
      "Yes, with family/partner",
      "Yes, with roommates",
      "No, I live alone",
    ]
  },
  {
    question: "What days/times are you available for therapy? (Select all that apply)",
    key: "availableTimes",
    type: "radio",
    options: [
      "Weekdays – mornings",
      "Weekdays – afternoons",
      "Weekdays – evenings",
      "Weekends"
    ],
    isMulti: true
  },
  {
    question: "Would you like to add unlimited messaging with your therapist?",
    key: "unlimitedMessaging",
    type: "radio",
    options: [
      "Yes",
      "No, just live sessions for now",
    ]
  },
  {
    key: "howYouKnewUs",
    question: "How did you hear about us?",
    type: "radio",
    options: [
      "Search Engine (Google, Bing, etc.)",
      "Social Media (Facebook, Instagram, Twitter)",
      "Friend/Family Referral",
      "Previous therapist",
      "Community Organization",
      "Podcast/YouTube/Media",
      "Court or Legal Referral",
      "Other (open text field)",
    ],
  },
];

const questionDistribution = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const OutOfPocketForm: React.FC<OutOfPocketFormProps> = ({ onBack, formData, setFormData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questionDistribution.length + 2;

  const handleAnswerChange = (name: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // New handler for multi-select options
  const handleMultiAnswerChange = (name: string, value: string) => {
    setFormData((prevData: any) => {
      // Initialize an empty array if the field doesn't exist yet
      const currentValues = prevData[name] || [];

      // If the value is already selected, remove it; otherwise, add it
      if (currentValues.includes(value)) {
        return {
          ...prevData,
          [name]: currentValues.filter((item: string) => item !== value)
        };
      } else {
        return {
          ...prevData,
          [name]: [...currentValues, value]
        };
      }
    });
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

  const getQuestionIndicesForStep = (step: number) => {
    const startIndex = questionDistribution.slice(0, step).reduce((sum, count) => sum + count, 0);
    const endIndex = startIndex + questionDistribution[step];
    return { startIndex, endIndex };
  };

  const validateCurrentStep = () => {
    const { startIndex, endIndex } = getQuestionIndicesForStep(currentStep);

    for (let i = startIndex; i < endIndex; i++) {
      const question = outOfPocketQuestions[i];
      const questionKey: any = question.key;

      // For multi-select questions, check if at least one option is selected
      if (question.isMulti) {
        const selectedOptions = formData[questionKey] || [];
        if (selectedOptions.length === 0) {
          return false;
        }
      }
      else if (!formData[questionKey]) {
        return false;
      }
      else if (question.isExapandable && formData["diagnosedWithMentalHealthCondition"] === "Yes" && !formData["diagnosedWithMentalHealthConditionYes"]) {
        return false;
      }
    }
    return true;
  };

  const renderQuestions = () => {
    const { startIndex, endIndex } = getQuestionIndicesForStep(currentStep);
    return outOfPocketQuestions.slice(startIndex, endIndex).map((question: any, index) => (
      <div key={question.key} className="grid mb-4">
        <label className="text-[15px] md:text-lg text-[#283C63] mb-2">{question.question}</label>
        {question.type === "textarea" ? (
          <textarea
            required
            name={question.key}
            placeholder={question.placeholder}
            className="py-[10px] px-4 border border-[#dbe0eb] rounded-[20px] text-black"
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
            {question.options?.map((option: any, i: any) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) :
          question.type === "radio" && question.isMulti ? (
            <div className="flex flex-col">
              {question.options?.map((option: any, i: any) => {
                const selectedOptions = formData[question.key] || [];
                return (
                  <label key={i} className="text-[15px] md:text-lg custom-checkbox step-form-checkbox relative flex items-center mb-2">
                    <input
                      type="checkbox"
                      name={question.key}
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() =>
                        handleMultiAnswerChange(question.key, option)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm md:text-base !w-full text-[#283C63] py-[10px] px-4 border-2 !border-[#e3e7ef] !rounded-2xl">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          ) :
            question.type === "radio" ? (
              <div className="flex flex-col">
                {question.options?.map((option: any, i: any) => {
                  return (
                    <>
                      <label key={i} className="text-[15px] md:text-lg custom-radio step-form-radio relative flex items-center mb-2">
                        <input
                          required
                          type="radio"
                          name={question.key}
                          value={option}
                          checked={formData[question.key] === option}
                          onChange={() => {
                            handleAnswerChange(question.key, option);
                            if (question.isExapandable && (option === "No" || option === "Not Sure")) {
                              setFormData((prevData: any) => ({
                                ...prevData,
                                diagnosedWithMentalHealthConditionYes: ""
                              }));
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm md:text-base w-full !select-none ![-webkit-user-select:none] text-[#283C63] py-[10px] px-4 border border-[#dbe0eb] rounded-[20px]">
                          {option}
                        </span>
                      </label>

                      {(question.isExapandable) && (formData[question.key] === "Yes") && (i == 0) && <textarea
                        required
                        name="diagnosedWithMentalHealthConditionYes"
                        placeholder="Which condition"
                        className="py-[10px] px-4 border border-[#dbe0eb] rounded-[20px] my-4 text-black"
                        value={formData["diagnosedWithMentalHealthConditionYes"] || ""}
                        onChange={(e) => {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            diagnosedWithMentalHealthConditionYes: e.target.value
                          }))
                        }}
                      />}
                    </>
                  )
                })}
              </div>
            ) : (
              <input
                required
                type={question.type}
                name={question.key}
                placeholder={question.placeholder}
                className="text-sm md:text-base py-[10px] px-4 border border-[#dbe0eb] rounded-[20px] !text-[#686C78] "
                value={formData[question.key] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.key, e.target.value)
                }
              />
            )}
      </div>
    ));
  };
  const [isPending, startTransition] = React.useTransition();
  const clientFormSubmit = async () => {
    startTransition(async () => {
      await submitClientForm(formData, setFormData);
    })
  };

  return (
    <div className="max-w-[800px] mx-auto rounded-[20px] bg-white p-5 md:p-[40px]">
      {/* Render questions for steps within questionDistribution */}
      {currentStep < questionDistribution.length ?
        renderQuestions()
        :
        (
          // currentStep === questionDistribution.length ? <IntroSection onContinue={handleContinue} />
          //   :
          <PersonalInfoForm formData={formData} setFormData={setFormData} />
        )
      }
      <div className="flex justify-between mt-4">
        <button onClick={handleBack} className="button" disabled={isPending}>
          Back
        </button>
        {currentStep < totalSteps - 2 ? (
          <button onClick={handleContinue} className="button" disabled={isPending}>
            Continue
          </button>
        ) : (
          !isPending ? (
            <button disabled={isPending} onClick={clientFormSubmit} className="button">Submit</button>
          ) : (
            <div className="p-3">
              <ReactLoader />
            </div>
          )
        )}
      </div>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        </div>
      )}
    </div>
  );
};

export default OutOfPocketForm;

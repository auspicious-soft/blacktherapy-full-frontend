"use client";
import React, { useState } from "react";
import PersonalDetails from "@/app/(website)/components/(therapist-onboarding)/PersonalDetails";
import ApplicationCompleted from "@/app/(website)/components/ApplicationCompleted";
import { WelcomeProcess } from "@/app/(website)/components/(therapist-onboarding)/WelcomeProcess";
import ApplicationProcess from "@/app/(website)/components/(therapist-onboarding)/ApplicationProcess";
import CompensationPay from "@/app/(website)/components/(therapist-onboarding)/CompensationPay";
import EmploymentStatus from "@/app/(website)/components/(therapist-onboarding)/EmploymentStatus";
import EducationalStep from "@/app/(website)/components/(therapist-onboarding)/EducationalStep";
import FormStepSeven from "@/app/(website)/components/(therapist-onboarding)/FormStepSeven";
import References from "@/app/(website)/components/(therapist-onboarding)/References";
import QualifiedStep from "@/app/(website)/components/(therapist-onboarding)/QualifiedStep";
import BackgroundChecks from "@/app/(website)/components/(therapist-onboarding)/BackgroundChecks";
import UploadDocuments from "@/app/(website)/components/(therapist-onboarding)/UploadDocuments";
import DeclarationStep from "@/app/(website)/components/(therapist-onboarding)/DeclarationStep";

const steps = [
  { component: WelcomeProcess, requiresValidation: false },
  { component: ApplicationProcess, requiresValidation: false },
  { Component: CompensationPay, requiresValidation: true },
  { component: PersonalDetails, requiresValidation: true },
  { component: EmploymentStatus, requiresValidation: true },
  { component: EducationalStep, requiresValidation: true },
  { component: FormStepSeven, requiresValidation: true },
  { component: References, requiresValidation: true },
  { component: QualifiedStep, requiresValidation: true},
  { component: BackgroundChecks, requiresValidation: true },
  { component: UploadDocuments, requiresValidation: true },
  { component: ApplicationCompleted, requiresValidation: false},
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    licenceType:"",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    howLongAtPresentAddress: "",
    salaryDesired: "",
    currentEmploymentStatus: "",
    currentOrPreviousEmployerName: "",
    employementCityState: "",
    rolePosition: "",
    rateOfPay: "",
    startDate: "",
    endDate: "",
    reasonForLeaving: "",
    supervisorName: "",
    jobDescription: "",
    currentResume: "",
    highestEducationCompleted: "",
    schoolName: "",
    location: "",
    majorDegree: "",
    licenseOrCertification: "",
    skills: "",
    weeklyHours: "",
    employmentDesired: "",
    currentAvailability: [],
    felonyOrMisdemeanor: "",
    ifFelonyOrMisdemeanor: "",
    livedInNorthCarolina: "",
    ifNotLivedInNorthCarolina: "",
    validDriverLicense: "",
    reliableTransportation: "",
    legalRightToWorkInUS: "",
    reasonableAccommodation: "",
    driverLicenseOrStateId: "",
    stateOfIssue: "",
    expirationDate: "",
    professionalReferences: [
      {
        name: "",
        phone: "",
        email: "",
        companyPosition: "",
    }
    ],
    howAreQualifiedForPosition: "",
    additionalInformation: "",
    consentAgreement: false,
    consentFirstName: "",
    consentLastName: "",
    consentDate: "",
    consentSignature: "",
    superVisionAgreement: "",
    againConsentAgreement: false,
    againConsentFirstName: "",
    againConsentLastName: "",
    againConsentDate: "",
    againConsentSignature: "",
    backgroundCheckCompleted: false,
  });

  const [referenceFormData, setReferenceFormData] = useState<{ [key: string]: string }[]>([
    { name: "", phone: "", email: "", company: "" },
  ]);

  const [isValid, setIsValid] = useState(false);

  const nextStep = () => {
    const step = steps[currentStep - 1];
    const requiresValidation = step.requiresValidation && !isValid;

    if (!requiresValidation || isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert("Please fill the required fields");
    }
    console.log(formData, "form submitted!");
  };

  const prevStep = () => {
    if (currentStep > 1) {
      console.log("Going back a step");
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
const submitForm =() => {
  // const step = steps[currentStep - 1];
  // const requiresValidation = step.requiresValidation && !isValid;

  // if (!requiresValidation || isValid) {
  //   setCurrentStep((prevStep) => prevStep + 1);
  // } else {
  //   alert("Please fill the required fields");
  // }
 console.log(formData, "form submitted!");
};
  const renderStep = () => {
  switch (currentStep) {
      case 1:
        return <WelcomeProcess requiresValidation={false} nextStep={nextStep} />
      case 2:
        return <ApplicationProcess requiresValidation={false} nextStep={nextStep} />
      case 3:
        return <CompensationPay formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 4:
        return <PersonalDetails formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 5:
        return <EmploymentStatus formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 6:
        return <EducationalStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 7:
        return <FormStepSeven formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep}/>
      case 8:
        return <References formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep}/>
      case 9:
        return <QualifiedStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep}/>
      case 10:
        return <BackgroundChecks formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep}/>
      case 11:
        return <UploadDocuments formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep}/>
      case 12:
        return <DeclarationStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />;
      case 13 :
        return <ApplicationCompleted/>
      default:
        return null;
    }
  };

  const buttonStyle = {
    background: "#CCE9FA",
    borderRadius: "7px",
    padding: "10px 20px",
    color: "#686C78",
  };

  return (
    <div>
      <div className="navigation flex items-center justify-between mb-5 md:mb-8">
        {(currentStep >= 1 && currentStep <= 12) && (
          <button
            disabled={currentStep === 1}
            className="button"
            onClick={prevStep}
            style={buttonStyle}
          >
            &lt;&lt; Previous
          </button>
        )}
        {currentStep < 12 && (
          <button className="button" onClick={nextStep} style={buttonStyle}>
            Next &gt;&gt;
          </button>
        )}
        {currentStep === 12 && (<button className="button" onClick={submitForm} style={buttonStyle}>Submit </button>)}
      </div>
      {renderStep()}
    </div>
  );
};

export default OnboardingForm;

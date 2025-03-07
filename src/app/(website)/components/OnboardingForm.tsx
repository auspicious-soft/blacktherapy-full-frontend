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
import { submitForm } from "@/utils/onboarding-submit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactLoader from "@/components/ReactLoader";

const steps = [
  { component: WelcomeProcess, requiresValidation: false },
  // { component: ApplicationProcess, requiresValidation: false },
  // { Component: CompensationPay, requiresValidation: true },
  { component: PersonalDetails, requiresValidation: true },
  { component: EmploymentStatus, requiresValidation: true },
  { component: EducationalStep, requiresValidation: true },
  { component: FormStepSeven, requiresValidation: true },
  { component: References, requiresValidation: true },
  { component: QualifiedStep, requiresValidation: true },
  { component: BackgroundChecks, requiresValidation: true },
  { component: UploadDocuments, requiresValidation: false },
  { component: ApplicationCompleted, requiresValidation: false },
];

const OnboardingForm = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const session = useSession()
  const currentStepDefault = (session as any)?.data?.user?.onboardingCompleted === 'true' ? 13 : 1
  const userEmail = session?.data?.user?.email;
  const [currentStep, setCurrentStep] = useState(currentStepDefault)
  const [formData, setFormData] = useState<any>({
    // licenceType: "",
    email: userEmail,
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
    employmentCityState: "",
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
    startTime: "",
    endTime: "",
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
  });

  const [isValid, setIsValid] = useState(false);

  const nextStep = () => {
    const step = steps[currentStep - 1];
    console.log('currentStep: ', currentStep);
    console.log('step: ', step);
    const requiresValidation = step.requiresValidation && !isValid;

    if (!requiresValidation || isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert("Please fill the required fields");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    startTransition(async () => {
      await submitForm(formData, userEmail as string, router);
    })
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeProcess requiresValidation={false} nextStep={nextStep} />
      // case 2:
      //   return <ApplicationProcess requiresValidation={false} nextStep={nextStep} />
      // case 3:
      //   return <CompensationPay formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 2:
        return <PersonalDetails formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 3:
        return <EmploymentStatus formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 4:
        return <EducationalStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 5:
        return <FormStepSeven formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 6:
        return <References formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 7:
        return <QualifiedStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 8:
        return <BackgroundChecks formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 9:
        return <UploadDocuments formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />
      case 10:
        return <DeclarationStep formData={formData} setFormData={setFormData} setIsValid={setIsValid} nextStep={nextStep} />;
      case 11:
        return <ApplicationCompleted />
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
        {(currentStep >= 1 && currentStep <= 10) && (
          <button
            disabled={currentStep === 1}
            className="font-bold button"
            onClick={prevStep}
            style={buttonStyle}
          >
            &lt;&lt; Previous
          </button>
        )}
        {currentStep < 10 && (
          <button className="font-bold button" onClick={nextStep} style={buttonStyle}>
            Next &gt;&gt;
          </button>
        )}
        {currentStep === 10 && (<>{!isPending ? <button className="button" onClick={handleSubmit} style={buttonStyle}>Submit </button> : <ReactLoader />}</>)}
      </div>
      {renderStep()}
      {
        loading && <div className="text-white fixed inset-0 flex items-center justify-center bg-white bg-opacity-20 z-50">
          <ReactLoader />
        </div>
      }
    </div>
  );
};

export default OnboardingForm;

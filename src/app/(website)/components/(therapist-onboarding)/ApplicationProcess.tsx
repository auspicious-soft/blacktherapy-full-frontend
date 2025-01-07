import React from "react";

const ApplicationProcess = ({
  nextStep,
  requiresValidation,
}: {
  nextStep: () => void;
  requiresValidation: boolean;
}) => {
  return (
    <div className="onboarding-form">
      <p className="text-gray-500 md:text-base text-sm mb-5">
        <b>Apply Today: </b> <br />
        If you’re passionate about providing transformative mental health care
        and want the freedom to manage your own schedule, join The Black Therapy
        Network. <br /> We look forward to welcoming you to our team and helping you
        empower our community through dedicated and sensitive care.
      </p>
      <div className="text-gray-500 md:text-base text-sm"> 
        <b>Application Process:</b>
        <ul className="list-decimal pl-8 my-5">
            <li>Complete this Employment Application.</li>
            <li>Self Schedule an Interview.</li>
            <li>Our team will make a decision and follow up within one week of your interview.</li>
            <li>If an offer is made, sign the Offer Letter sent via email from OnPay and begin Onboarding process.</li>
        </ul>
        We&apos;re excited about your interest in joining our team. Start your journey with The Black Therapy Network today!
      </div>
    </div>
  );
};
export default ApplicationProcess;

import { FormIconOne, FormIconThree, FormIconTwo } from "@/utils/svgicons";
import React from "react";

const IntroSection: React.FC<{ onContinue: () => void}> = ({ onContinue }) => {
//const IntroSection: React.FC = () => {
  return (
    <div className="relative mb-4 text-[#283C63]">
      <div className="text-center">
      <h2 className="text-[30px]">You&apos;re off to a great start</h2>
      <p className="mb-4">Only a few more steps before you can book a session:</p>
      </div>
        <div className="flex items-center gap-5 mb-3">
          <p> <FormIconOne /> </p>
          <p>Select your insurance or employer or choose to self-pay</p>
        </div>
        <div className="flex items-center gap-5 mb-3">
          <p><FormIconTwo />  </p>
          <p>Answer some questions about your medical history and health</p>
        </div>
        <div className="flex items-center gap-5 mb-3">
          <p><FormIconThree /> </p>
          <p>We&apos;ll take it from there and find you a therapist that meets your needs</p>
        </div>
      <div className="">
        <button onClick={onContinue} className="button absolute right-0 bottom-[-56px] md:bottom-[-70px] ">Continue</button>
      </div>
    </div>
  );
};

export default IntroSection;

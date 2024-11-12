import Image from "next/image";
import React, { useState } from "react";
import form1 from "@/assets/images/formimg1.png";
import form2 from "@/assets/images/formimg2.png";

interface CompensationPayProps {
    nextStep: () => void;
    //equiresValidation: boolean;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    setIsValid: (isValid: boolean) => void;
  }
const options = [
  { value: "", label: "Please select" },
  { value: "LCSW", label: "Licensed Clinical Social Workers (LCSW)" },
  {
    value: "LCSW-A",
    label: "Licensed Clinical Social Work Associate (LCSW-A)",
  },
  { value: "LPC", label: "Licensed Professional Counselor (LPC)" },
  {
    value: "LPC-A",
    label: "Licensed Professional Counselor Associate (LPC-A)",
  },
  { value: "LPCS", label: "Licensed Professional Counselor Supervisor (LPCS)" },
  {
    value: "LCMHC-A",
    label: "Licensed Clinical Mental Health Counselor Associate (LCMHC-A)",
  },
  {
    value: "LCMHC",
    label: "Licensed Clinical Mental Health Counselor (LCMHC)",
  },
  {
    value: "LCMHCS",
    label: "Licensed Clinical Mental Health Counselor Supervisor (LCMHCS)",
  },
  {
    value: "LMFT-A",
    label: "Licensed Marriage and Family Therapist Associate (LMFT-A)",
  },
  { value: "LMFT", label: "Licensed Marriage and Family Therapist (LMFT)" },
  { value: "LCAS", label: "Licensed Clinical Addiction Specialist (LCAS)" },
  {
    value: "LCAS-A",
    label: "Licensed Clinical Addiction Specialist Associate (LCAS-A)",
  },
];

const CompensationDetails: React.FC<{ selectedOption: string }> = ({
  selectedOption,
}) => {
  switch (selectedOption) {
    case "LPC":
    case "LPCS":
    case "LCMHC":
    case "LCMHCS":
    case "LMFT":
    case "LCAS": 
        return (
            <div>
              <h3>Compensation for Fully Licensed Therapists</h3>
              <p>
                At The Ship Group, we value the expertise and dedication of our
                fully licensed therapists. Compensation is structured to reflect
                experience and the type of services provided. Below is the
                compensation breakdown for fully licensed therapists:
              </p>
              <p>
                <span className="underline">Psychotherapy Session Rate:</span>
                Therapists are paid a flat rate based on experience, with rates
                ranging from $35 $45 per billable hour for psychotherapy sessions.
              </p>
              <p>
                {" "}
                <span className="underline  ">Assessment Rate (CCA):</span>
                For completing Comprehensive Clinical Assessments (CCA), therapists
                will receive $40$50 per assessment, depending on experience.
              </p>
              <p>
                We are committed to offering competitive rates that reflect the
                qualifications and contributions of our licensed professionals.
              </p>
            </div>
          );
    case "LCSW":
      return (
        <div>
          <h3>Compensation for Associate Licensed Therapists </h3>
          <p>
            At The Ship Group, we value the expertise and dedication of our
            fully licensed therapists. Compensation is structured to reflect
            experience and the type of services provided. Below is the
            compensation breakdown for fully licensed therapists:
          </p>
          <p>
            <span className="underline">Psychotherapy Session Rate:</span>
            Therapists are paid a flat rate based on experience, with rates
            ranging from $35 $45 per billable hour for psychotherapy sessions.
          </p>
          <p>
            {" "}
            <span className="underline  ">Assessment Rate (CCA):</span>
            For completing Comprehensive Clinical Assessments (CCA), therapists
            will receive $40$50 per assessment, depending on experience.
          </p>
          <p>
            We are committed to offering competitive rates that reflect the
            qualifications and contributions of our licensed professionals.
          </p>
        </div>
      );
    case "LCSW-A":
    case "LPC-A":
    case "LCMHC-A":
    case "LMFT-A":
        case "LCAS-A": 
      return (
        <div>
          <h3>Compensation for Associate Licensed Therapists</h3>
          <p>
            At The Ship Group, we use a tiered pay structure to ensure that our
            associate licensed therapists are compensated fairly based on the
            number of hours worked each week. Understanding this structure will
            help you anticipate your earnings and how your paycheck is
            calculated.
          </p>
          <p>
            <span>Assessment Rate (CCA):</span>
            For every Comprehensive Clinical Assessment (CCA) you conduct, you
            will be paid between $35 $40 per assessment, depending on your
            experience level. This will be a fixed payment per assessment,
            regardless of the number of hours worked.
          </p>
          <p>
            <span>Psychotherapy Session Rate:</span>
            Your rate for psychotherapy sessions is based on a tiered pay
            structure. This means that your hourly rate increases as you
            accumulate more session hours during the week. Here’s how it works:
          </p>
          <p>
            Hours Worked (per week) Rate per Billable Hour:
            <ul>
              <li>First 5 hours $25/hour</li>
              <li>510 hours $30/hour</li>
              <li>1015 hours $35/hour</li>
              <li>1520 hours $40/hour</li>
              <li>2025 hours $45/hour</li>
              <li>2530 hours $50/hour</li>
              <li>3035 hours $55/hour</li>
              <li>Beyond 35 hours $60/hour</li>
            </ul>
          </p>
          <p className="underline font-semibold">
            How Your Paycheck is Calculated:
          </p>
          <p>
            <span>Assessment Rate (CCA):</span>
         For each CCA you complete, you’ll receive $35$40 based on your
            experience.
          </p>
          <p>
            <span>Psychotherapy Session Rate:</span>
             Your first 5 hours of psychotherapy sessions in a week will be paid at $25/hour. If you work more than 5 hours, your next hours (510 hours) will be paid at $30/hour, and so on. As you accumulate more hours, your hourly rate increases.
          </p>
          <p><span>Example:</span> <br />
        If you work 12 hours in a week: <br />
        The first 5 hours will be paid at $25/hour. <br />
        The next 5 hours (510 hours) will be paid at $30/hour. <br />
        The remaining 2 hours (1012 hours) will be paid at $35/hour. <br />
        By the end of the week, your pay will reflect the progressive rates based on how many hours you worked. <br /> <br />
        This structure allows you to earn more as you increase your session hours each week, providing a clear pathway for increased compensation based on your workload. If you have any questions about how your paycheck is calculated or need further clarification, please don’t hesitate to reach out!</p>
       <div className="bg-white py-5">
       <Image src={form1} alt="" height={800} width={800}/>
       <Image src={form2} alt="" height={800} width={800}/>
       </div>
        
        </div>
      );
    case "LPCS":
      return <div>Lorem ipsum dolor sit amet.</div>;
    default:
      return null;
  }
};

const CompensationPay: React.FC<CompensationPayProps> = ({ formData, setFormData, setIsValid, nextStep }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // Update formData directly with licenceType
    setFormData((prevData: any) => ({
      ...prevData,
      licenceType: value,
    }));

    setIsValid(value !== ""); // Optionally mark as valid if an option is selected
  };

  return (
    <div className="onboarding-form">
      <p className="text-gray-500 md:text-base text-sm">
        <b>Compensation and Pay Structure</b>
        <br />
        At The Black Therapy Network, we value your expertise and dedication to
        our mission of providing quality mental health care. We offer
        competitive compensation and a flexible pay schedule to accommodate your
        professional growth and financial goals.
        <br /> <span className="underline">Pay Schedule:</span> Biweekly
        <br /> <span className="underline">Payment Method:</span> All payments
        are processed via direct deposit.
      </p>
      <p className="text-gray-500 md:text-base text-sm my-5">
        <b>Pay Structure:</b>
        <ul>
          <li>
            <span className="underline">Fully Licensed Therapists: </span>
            Receive a flat rate for services provided.
          </li>
          <li>
            <span className="underline">Associate Licensed Therapists:</span>Are
            compensated for OPT sessions on a tiered pay structure, determined
            by hours worked.
          </li>
          <li>
            <span>Earning Potential:</span>Your earning potential at The Black
            Therapy Network is uncapped. As you provide compassionate care to
            our clients, you have the opportunity to earn as much as you desire.
            We believe in rewarding our therapists for their dedication and
            commitment.
          </li>
        </ul>
      </p>
      <p>
        <b>Notes Submission Policy:</b>
        <ul>
          <li>
            <span>Progress Notes: </span>
            Must be signed and submitted to the system within 48 hours of the end of each session.
          </li>
          <li>
            <span>Assessments (CCA): </span>Must be signed and submitted within 72 hours of the completion of a session.
          </li>
          <li>
            <span>Late Document Submission Policy:</span>Late notes and assessments are paid at half of your hourly/fixed rate. Documentation will be subject to a 50% deduction if submitted late.
            commitment.
          </li>
        </ul>
      </p>
      <p>
        <b>Pay Process:</b>
        <ul>
          <li>
            <span>Submit Clinical Documentation: </span>After successfully completing a session, ensure that all clinical documentation, including progress notes and/or assessments are submitted on time.
          </li>
          <li>
            <span>Invoice Submission: </span>Once your documentation is accepted, submit an invoice for the individual session through our portal.
          </li>
          <li>
            <span>Payment: </span>After invoice approval, payment will be processed biweekly via direct deposit.
          </li>
        </ul>
      </p>
      <p>
        <b>Application Instructions:</b>
        <ul>
            <li>Please select your license type using the dropdown box below:</li>
            <li>*Fully licensed therapists may optin to the tiered pay structure if desired.</li>
            <li>This approach ensures clarity and transparency about the compensation structure while emphasizing the potential for earning based on dedication and performance.</li>
        </ul>

      </p>
      <div className="mb-6">
        <label htmlFor="licensure-type" className="block text-[#283C63] mb-2 text-lg ">
          Licensure Type&nbsp;
        </label>
        <select
          id="licensure-type"
          value={formData.licenceType || ""}
          onChange={handleSelectChange}
          className="bg-transparent text-[#686C78] w-full px-[18px] h-[45px] py-2 border border-[#dbe0eb] rounded-[20px]  "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <CompensationDetails selectedOption={formData.licenceType}  />
      
    </div>
  );
};

export default CompensationPay;

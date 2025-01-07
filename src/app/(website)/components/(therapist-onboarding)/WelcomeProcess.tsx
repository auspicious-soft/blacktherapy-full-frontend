export const WelcomeProcess = ({
  nextStep,
  requiresValidation,
}: {
  nextStep: () => void;
  requiresValidation: boolean;
}) => {
  return (
    <div>
      <h2 className="section-title mb-[10px] md:mb-5">
        Remote Mental Health Therapist Employment Application
      </h2>
      <p className="text[#13233B] md:text-lg text-base font-semibold text-center mb-5">
        Welcome to The Black Therapy Network
      </p>
      <p className="text-gray-500 md:text-base text-sm mb-5">
        Thank you for your interest in joining The Black Therapy Network as a
        Remote Licensed Mental Health Therapist role. We are dedicated to
        providing professional, affordable, and personalized therapy to the
        African American community through a secure online platform.
      </p>
      <p className="text-gray-500 md:text-base text-sm">
        <b>Job Responsibilities: </b>
        <ul className="list-disc pl-8 my-5">
            <li>Conduct evidencebased therapy sessions with highfunctioning patients (ages 10 to 18+).</li>
            <li>Complete diagnostic assessments and create measurable treatment plans.</li>
            <li>Develop rapport and sustain therapeutic relationships.</li>
            <li>Provide culturally reflective services tailored to individual client needs.Utilize evidencebased approaches and mindfulnessbased practices.</li>
            <li>Must be comfortable with technology and navigating new EHR systems.</li>
            <li>Excellent writing skills.</li>
        </ul>
      </p>
      <div className="text-gray-500 md:text-base text-sm">
        <b>Requirements: </b>
        <ul className="list-disc pl-8 my-5">
            <li>Master’s degree in the mental health field from an accredited institution.</li>
            <li>Active licensure in good standing for clinical practice in North Carolina (LPC, LMHC, LMHCA, LMFT, LCSW, LCSWA, LCAS, LCAS-A).</li>
            <li>Associate Licensure Require Supervision Agreement Prior to starting.</li>
            <li>Monthly Virtual Clinical Meetings Attendance.</li>
            <li>Monthly Calendar Availability.</li>
            <li>Case Load Availability.</li>
            <li>Able to pass a background check and be credentialed by Insurance Panels, state and federal programs.</li>
            <li>Malpractice Insurance.</li>
            <li>Minimum caseload requirement.</li>
            <li>Listing on popular therapy platforms under our agency.</li>
        </ul>
      </div>
      <p className="text-gray-500 md:text-base text-sm">
    <b>About The Black Therapy Network: </b>
    The Black Therapy Network is dedicated to meeting the mental health needs of the African American community. We offer flexible remote opportunities that allow you to balance personal commitments with professional growth. 
    <br />
    Our parent company, The Ship Group Services LLC, and administrative offices are based in Charlotte, North Carolina.  
      <b>What We Offer:</b>
      <ul className="list-disc pl-8 my-5">
        <li>Competitive compensation based on experience and qualifications.</li>
        <li>Comprehensive support and resources to help you meet clinical goals.</li>
        <li>*Opportunities for professional development and growth within our network.</li>
      </ul>
      </p>
    </div>
  );
};

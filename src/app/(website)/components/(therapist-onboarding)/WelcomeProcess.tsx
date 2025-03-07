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
      <div className="welcome-container">
        <h1 className="text-[30px] font-bold">Welcome to The Black Therapy Network</h1>
        <br />
        <p>
          Thank you for your interest in joining <strong>The Black Therapy Network</strong> as a{' '}
          <strong>Remote Licensed Mental Health Therapist</strong>. We are committed to providing{' '}
          <strong>accessible, culturally competent therapy</strong> for the Black community nationwide.
        </p>
        <br />
        <p>
          This is more than just a platform—it’s a movement. We connect therapists with clients who need
          support, offering a flexible, remote-first opportunity to make an impact.
        </p>
        <br />

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', padding: 3  }}>Job Responsibilities:</h2>
        <ul>
          <li>Provide <strong>virtual therapy sessions</strong> to individuals seeking culturally competent care.</li>
          <li>Conduct <strong>diagnostic assessments</strong> and develop <strong>personalized treatment plans</strong>.</li>
          <li>Build and maintain <strong>strong therapeutic relationships</strong> with clients.</li>
          <li>Use <strong>evidence-based and mindfulness practices</strong> tailored to each client’s needs.</li>
          <li>Maintain accurate <strong>session notes and documentation</strong> in the provided platform.</li>
          <li>Participate in <strong>ongoing professional development</strong> and training opportunities.</li>
        </ul>
        <br />

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', padding: 3  }}>Requirements:</h2>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Licensed Therapists:</h3>
        <ul>
          <li><strong>Master’s degree or higher</strong> in a mental health-related field.</li>
          <li>
            <strong>Active independent licensure</strong> in any U.S. state (
            <em>LPC, LMHC, LPCC, LCPC, LMFT, LCSW, LISW, PsyD, PhD</em>).
          </li>
        </ul>
        <br />
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', padding: 3  }}>Associate-Level Therapists:</h3>
        <ul>
          <li>
            Must have <strong>active associate licensure</strong> (
            <em>LPC-A, APC, LPCA, LAC, LCSW-A, LMSW, CSWA, LSWAIC, LMFT-A, LAMFT</em>) in any U.S. state.
          </li>
          <li>A <strong>Supervision Agreement</strong> is required before starting.</li>
        </ul>
        <br />
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', padding: 3  }}>General Requirements:</h3>
        <ul>
          <li>
            <strong>Ability to provide virtual therapy</strong> in a secure, HIPAA-compliant environment.
          </li>
          <li>Comfortable with <strong>technology and online therapy platforms</strong>.</li>
          <li>
            <strong>Strong written and verbal communication skills</strong> for documentation and client
            engagement.
          </li>
          <li>
            Must have <strong>reliable internet and a private space</strong> for conducting virtual sessions.
          </li>
        </ul>
        <br />

        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Compensation & Benefits:</h2>
        <p>
          We believe in <strong>fair and competitive compensation</strong> for our therapists. Earnings are
          based on <strong>session rates, experience, and caseload volume</strong>.
        </p>
        <ul>
          <li><strong>Competitive per-session pay</strong> with opportunities for increased earnings.</li>
          <li><strong>Flexible scheduling</strong> – Set your own hours and availability.</li>
          <li>
            <strong>Full support team</strong> – We handle marketing, client matching, and platform management.
          </li>
          <li>
            <strong>Opportunities for professional growth</strong> within a network of culturally competent
            providers.
          </li>
        </ul>
        <p><em>Exact pay structure will be discussed during the onboarding process.</em></p>
        <br />

        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Next Steps:</h2>
        <ol>
          <li><strong>Complete your application</strong> by submitting the required details and supporting documents.</li>
          <li><strong>Our team will review your application</strong> and contact you with next steps.</li>
          <li>Once onboarded, <strong>set your availability and begin accepting clients</strong>.</li>
        </ol>
        <br />
        <p>
          We’re excited to welcome you to <strong>The Black Therapy Network</strong>, where your expertise
          is needed, valued, and celebrated.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
interface BiopsychosocialAssessmentProps {
  selectedRow: any;
  setSelectedRow: (value: any) => void;
}

const BiopsychosocialAssessment = (props: BiopsychosocialAssessmentProps) => {
  const { selectedRow: formData, setSelectedRow: setFormData } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Biopsychosocial Assessment</h2>

      {/* Basic Information */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter client name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assessment Date</label>
            <input
              type="date"
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Clinician Name</label>
            <input
              type="text"
              name="clinicianName"
              value={formData.clinicianName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter clinician name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Individuals Present</label>
            <input
              type="text"
              name="individualsPresent"
              value={formData.individualsPresent}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter names"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Introductions (names/preferred names and pronouns/identities)
            </label>
            <textarea
              name="introductions"
              value={formData.introductions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter introductions"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Safety Assessment */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Safety Assessment</h3>
        <p className="mb-4 text-sm text-gray-700">
          Complete ASQ assessment and safety plan if any questions are answered &quot;Yes&quot;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              In the past few weeks have you wished you were dead?
            </label>
            <select
              name="wishDead"
              value={formData.wishDead}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              In the past few weeks, have you felt that you or your family would be better off if you were dead?
            </label>
            <select
              name="familyBetterOff"
              value={formData.familyBetterOff}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              In the past week, have you been having thoughts about killing yourself?
            </label>
            <select
              name="suicidalThoughts"
              value={formData.suicidalThoughts}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Have you ever tried to kill yourself?</label>
            <select
              name="suicideAttempt"
              value={formData.suicideAttempt}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          {formData.suicideAttempt === 'Yes' && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">If yes, how?</label>
                <textarea
                  name="suicideAttemptDetails"
                  value={formData.suicideAttemptDetails}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                  placeholder="Describe the attempt"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">When?</label>
                <input
                  type="text"
                  name="suicideAttemptWhen"
                  value={formData.suicideAttemptWhen}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                  placeholder="Enter the time or date"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Are you having thoughts of killing yourself right now?
            </label>
            <select
              name="currentSuicidalThoughts"
              value={formData.currentSuicidalThoughts}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          {formData.currentSuicidalThoughts === 'Yes' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Please describe:</label>
              <textarea
                name="currentSuicidalThoughtsDetails"
                value={formData.currentSuicidalThoughtsDetails}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                placeholder="Describe your thoughts"
              ></textarea>
            </div>
          )}
        </div>
      </section>

      {/* Current Situation */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Biological</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">What got us here to this moment?</label>
            <textarea
              name="presentingProblem"
              value={formData.presentingProblem}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter details"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current concerns</label>
            <textarea
              name="currentConcerns"
              value={formData.currentConcerns}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter concerns"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Signs and symptoms</label>
            <textarea
              name="signsSymptoms"
              value={formData.signsSymptoms}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe signs and symptoms"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Treatment history</label>
            <textarea
              name="treatmentHistory"
              value={formData.treatmentHistory}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter treatment history"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Counseling history & diagnoses</label>
            <textarea
              name="counselingHistory"
              value={formData.counselingHistory}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter history and diagnoses"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mental health history</label>
            <textarea
              name="mentalHealthHistory"
              value={formData.mentalHealthHistory}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter mental health history"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">History of trauma and abuse</label>
            <textarea
              name="traumaHistory"
              value={formData.traumaHistory}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe any trauma"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Treatment goals</label>
            <textarea
              name="treatmentGoals"
              value={formData.treatmentGoals}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter treatment goals"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Psychosocial */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Psychosocial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current living condition</label>
            <textarea
              name="livingCondition"
              value={formData.livingCondition}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe living condition"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Family & significant relationships</label>
            <textarea
              name="familyRelationships"
              value={formData.familyRelationships}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe relationships"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Family mental health history including substance use
            </label>
            <textarea
              name="familyMentalHealth"
              value={formData.familyMentalHealth}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter family mental health history"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Criminal/legal issues</label>
            <textarea
              name="legalIssues"
              value={formData.legalIssues}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter legal issues (if any)"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leisure/recreation: What do you like to do with your friends/for fun?
            </label>
            <textarea
              name="leisure"
              value={formData.leisure}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter leisure activities"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Where do you go to school and what is your grade?</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter school name and grade"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you have any problems at school?</label>
            <textarea
              name="schoolProblems"
              value={formData.schoolProblems}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe any problems"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Who is supportive at school?</label>
            <textarea
              name="schoolSupport"
              value={formData.schoolSupport}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter support details"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Do you have a part-time job?</label>
            <input
              type="text"
              name="partTimeJob"
              value={formData.partTimeJob}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Yes/No or details"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">What substances have you used?</label>
            <textarea
              name="substanceUse"
              value={formData.substanceUse}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="List substances"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Support systems</label>
            <textarea
              name="supportSystems"
              value={formData.supportSystems}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe support systems"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ongoing stressors/challenges</label>
            <textarea
              name="ongoingStressors"
              value={formData.ongoingStressors}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe stressors"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Medical History */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Medical History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Are you being treated for a physical medical condition?
            </label>
            <select
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          {formData.medicalCondition === 'Yes' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">If yes, please describe</label>
              <textarea
                name="medicalConditionDetails"
                value={formData.medicalConditionDetails}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                placeholder="Describe condition"
              ></textarea>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="List medications"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sleep</label>
            <textarea
              name="sleep"
              value={formData.sleep}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe sleep patterns"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Movement</label>
            <textarea
              name="movement"
              value={formData.movement}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Physical movement details"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Substance use history</label>
            <textarea
              name="substanceUseHistory"
              value={formData.substanceUseHistory}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe history"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cultural/ethnic strengths, supports, challenges
            </label>
            <textarea
              name="culturalInfo"
              value={formData.culturalInfo}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Describe cultural info"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Orientation and gender identity information</label>
            <textarea
              name="orientationGender"
              value={formData.orientationGender}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter details"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Employment or school information (strengths, supports, stressors/challenges)
            </label>
            <textarea
              name="employmentInfo"
              value={formData.employmentInfo}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter details"
            ></textarea>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Strengths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What are some helpful ways you deal with problems or challenges?
            </label>
            <textarea
              name="copingStrategies"
              value={formData.copingStrategies}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter coping strategies"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Who do you turn to when you need help?</label>
            <textarea
              name="supportNetwork"
              value={formData.supportNetwork}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter support network"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              What are you good at? What do you like about yourself?
            </label>
            <textarea
              name="personalStrengths"
              value={formData.personalStrengths}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
              placeholder="Enter your personal strengths"
            ></textarea>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BiopsychosocialAssessment
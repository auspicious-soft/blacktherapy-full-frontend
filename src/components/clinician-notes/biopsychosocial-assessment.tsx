import React, { useState } from 'react';
import { SoapInterface } from './soap';

interface FormData {
  // Basic Information
  clientName: string;
  assessmentDate: string;
  startTime: string;
  clinicianName: string;
  individualsPresent: string;
  introductions: string;

  // Safety Assessment
  wishDead: string;
  familyBetterOff: string;
  suicidalThoughts: string;
  suicideAttempt: string;
  suicideAttemptDetails: string;
  suicideAttemptWhen: string;
  currentSuicidalThoughts: string;
  currentSuicidalThoughtsDetails: string;

  // Current Situation
  presentingProblem: string;
  currentConcerns: string;
  signsSymptoms: string;
  treatmentHistory: string;
  counselingHistory: string;
  mentalHealthHistory: string;
  traumaHistory: string;
  treatmentGoals: string;

  // Psychosocial
  livingCondition: string;
  familyRelationships: string;
  familyMentalHealth: string;
  legalIssues: string;
  leisure: string;
  school: string;
  schoolProblems: string;
  schoolSupport: string;
  partTimeJob: string;
  substanceUse: string;
  supportSystems: string;
  ongoingStressors: string;

  // Medical History
  medicalCondition: string;
  medicalConditionDetails: string;
  medications: string;
  sleep: string;
  movement: string;
  substanceUseHistory: string;
  culturalInfo: string;
  orientationGender: string;
  employmentInfo: string;

  // Strengths
  copingStrategies: string;
  supportNetwork: string;
  personalStrengths: string;
}

interface BiopsychosocialAssessmentProps {
  selectedRow: any
  setSelectedRow: (value: any) => void
  notesType: "" | "SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note"
  setNotesType: (value: "" | "SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note") => void
}

const BiopsychosocialAssessment = (props: BiopsychosocialAssessmentProps) => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    assessmentDate: '',
    startTime: '',
    clinicianName: '',
    individualsPresent: '',
    introductions: '',
    wishDead: 'No',
    familyBetterOff: 'No',
    suicidalThoughts: 'No',
    suicideAttempt: 'No',
    suicideAttemptDetails: '',
    suicideAttemptWhen: '',
    currentSuicidalThoughts: 'No',
    currentSuicidalThoughtsDetails: '',
    presentingProblem: '',
    currentConcerns: '',
    signsSymptoms: '',
    treatmentHistory: '',
    counselingHistory: '',
    mentalHealthHistory: '',
    traumaHistory: '',
    treatmentGoals: '',
    livingCondition: '',
    familyRelationships: '',
    familyMentalHealth: '',
    legalIssues: '',
    leisure: '',
    school: '',
    schoolProblems: '',
    schoolSupport: '',
    partTimeJob: '',
    substanceUse: '',
    supportSystems: '',
    ongoingStressors: '',
    medicalCondition: 'No',
    medicalConditionDetails: '',
    medications: '',
    sleep: '',
    movement: '',
    substanceUseHistory: '',
    culturalInfo: '',
    orientationGender: '',
    employmentInfo: '',
    copingStrategies: '',
    supportNetwork: '',
    personalStrengths: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );

  const TextInput = ({ label, name, value, type = "text" }: { label: string; name: string; value: string; type?: string }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const TextArea = ({ label, name, value }: { label: string; name: string; value: string }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-32"
      />
    </div>
  );

  const Select = ({ label, name, value, options }: { label: string; name: string; value: string; options: string[] }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Biopsychosocial Assessment</h2>

      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Client Name" name="clientName" value={formData.clientName} />
          <TextInput label="Assessment Date" name="assessmentDate" value={formData.assessmentDate} type="date" />
          <TextInput label="Start Time" name="startTime" value={formData.startTime} type="time" />
          <TextInput label="Clinician Name" name="clinicianName" value={formData.clinicianName} />
          <TextInput label="Individuals Present" name="individualsPresent" value={formData.individualsPresent} />
          <TextArea label="Introductions (names/preferred names and pronouns/identities)" name="introductions" value={formData.introductions} />
        </div>
      </FormSection>

      <FormSection title="Safety Assessment">
        <div className="mb-4">
          Complete ASQ assessment and safety plan if any questions are answered &quot;Yes&quot;
        </div>
        <div className="space-y-4">
          <Select 
            label="In the past few weeks have you wished you were dead?" 
            name="wishDead" 
            value={formData.wishDead}
            options={['No', 'Yes']}
          />
          <Select 
            label="In the past few weeks, have you felt that you or your family would be better off if you were dead?" 
            name="familyBetterOff"
            value={formData.familyBetterOff}
            options={['No', 'Yes']}
          />
          <Select 
            label="In the past week, have you been having thoughts about killing yourself?" 
            name="suicidalThoughts"
            value={formData.suicidalThoughts}
            options={['No', 'Yes']}
          />
          <Select 
            label="Have you ever tried to kill yourself?" 
            name="suicideAttempt"
            value={formData.suicideAttempt}
            options={['No', 'Yes']}
          />
          {formData.suicideAttempt === 'Yes' && (
            <>
              <TextArea label="If yes, how?" name="suicideAttemptDetails" value={formData.suicideAttemptDetails} />
              <TextInput label="When?" name="suicideAttemptWhen" value={formData.suicideAttemptWhen} />
            </>
          )}
          <Select 
            label="Are you having thoughts of killing yourself right now?" 
            name="currentSuicidalThoughts"
            value={formData.currentSuicidalThoughts}
            options={['No', 'Yes']}
          />
          {formData.currentSuicidalThoughts === 'Yes' && (
            <TextArea 
              label="Please describe:" 
              name="currentSuicidalThoughtsDetails" 
              value={formData.currentSuicidalThoughtsDetails} 
            />
          )}
        </div>
      </FormSection>

      <FormSection title="Current Situation">
        <TextArea label="What got us here to this moment?" name="presentingProblem" value={formData.presentingProblem} />
        <TextArea label="Current concerns" name="currentConcerns" value={formData.currentConcerns} />
        <TextArea label="Signs and symptoms" name="signsSymptoms" value={formData.signsSymptoms} />
        <TextArea label="Treatment history" name="treatmentHistory" value={formData.treatmentHistory} />
        <TextArea label="Counseling history & diagnoses" name="counselingHistory" value={formData.counselingHistory} />
        <TextArea label="Mental health history" name="mentalHealthHistory" value={formData.mentalHealthHistory} />
        <TextArea label="History of trauma and abuse" name="traumaHistory" value={formData.traumaHistory} />
        <TextArea label="Treatment goals" name="treatmentGoals" value={formData.treatmentGoals} />
      </FormSection>

      <FormSection title="Psychosocial">
        <TextArea label="Current living condition" name="livingCondition" value={formData.livingCondition} />
        <TextArea label="Family & significant relationships" name="familyRelationships" value={formData.familyRelationships} />
        <TextArea label="Family mental health history including substance use" name="familyMentalHealth" value={formData.familyMentalHealth} />
        <TextArea label="Criminal/legal issues" name="legalIssues" value={formData.legalIssues} />
        <TextArea label="Leisure/recreation: What do you like to do with your friends/for fun?" name="leisure" value={formData.leisure} />
        <TextInput label="Where do you go to school and what is your grade?" name="school" value={formData.school} />
        <TextArea label="Do you have any problems at school?" name="schoolProblems" value={formData.schoolProblems} />
        <TextArea label="Who is supportive at school?" name="schoolSupport" value={formData.schoolSupport} />
        <TextInput label="Do you have a part-time job?" name="partTimeJob" value={formData.partTimeJob} />
        <TextArea label="What substances have you used?" name="substanceUse" value={formData.substanceUse} />
        <TextArea label="Support systems" name="supportSystems" value={formData.supportSystems} />
        <TextArea label="Ongoing stressors/challenges" name="ongoingStressors" value={formData.ongoingStressors} />
      </FormSection>

      <FormSection title="Medical History">
        <Select 
          label="Are you being treated for a physical medical condition?" 
          name="medicalCondition"
          value={formData.medicalCondition}
          options={['No', 'Yes']}
        />
        {formData.medicalCondition === 'Yes' && (
          <TextArea label="If yes, please describe" name="medicalConditionDetails" value={formData.medicalConditionDetails} />
        )}
        <TextArea label="Medications" name="medications" value={formData.medications} />
        <TextArea label="Sleep" name="sleep" value={formData.sleep} />
        <TextArea label="Movement" name="movement" value={formData.movement} />
        <TextArea label="Substance use history" name="substanceUseHistory" value={formData.substanceUseHistory} />
        <TextArea label="Cultural/ethnic strengths, supports, challenges" name="culturalInfo" value={formData.culturalInfo} />
        <TextArea label="Orientation and gender identity information" name="orientationGender" value={formData.orientationGender} />
        <TextArea label="Employment or school information (strengths, supports, stressors/challenges)" name="employmentInfo" value={formData.employmentInfo} />
      </FormSection>

      <FormSection title="Strengths">
        <TextArea label="What are some helpful ways you deal with problems or challenges?" name="copingStrategies" value={formData.copingStrategies} />
        <TextArea label="Who do you turn to when you need help?" name="supportNetwork" value={formData.supportNetwork} />
        <TextArea label="What are you good at? What do you like about yourself?" name="personalStrengths" value={formData.personalStrengths} />
      </FormSection>
    </div>
  );
};

export default BiopsychosocialAssessment;
import CustomSelect from '@/app/admin/components/CustomSelect';
import { ageOptions, articulations, attireOptions, cooperationOptions, delusions, eyeContactOptions, gait, groomingOptions, jusdgement, mannerisms, moodOptions, perception, perceptions, posture, psychomotorActivity, rate, responseLatency, thoughtContent, thoughtProcess, tone, weightOptions } from '@/utils/constant';
import React from 'react';

interface MentalStatusExamProps {
  selectedRow: any;
  setSelectedRow: (value: any) => void;
}

const MentalStatusExam = (props: MentalStatusExamProps) => {
  const { selectedRow: formData, setSelectedRow: setFormData } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (selectedOption: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: selectedOption }));
  };

 
  return (
    <div className="max-w-4xl mx-auto p-3 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Mental Status Exam</h2>

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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Appearance/Behavior */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Appearance/Behavior</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Appearance</label>
            <CustomSelect
              value={formData.ageAppearance}
              onChange={handleSelectChange('ageAppearance')}
              options={ageOptions as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight Appearance</label>
            <CustomSelect
              value={formData.weightAppearance}
              onChange={handleSelectChange('weightAppearance')}
              options={weightOptions as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attire</label>
            <CustomSelect
              value={formData.attire}
              onChange={handleSelectChange('attire')}
              options={attireOptions as any}
              isMulti={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grooming</label>
            <CustomSelect
              value={formData.grooming}
              onChange={handleSelectChange('grooming')}
              options={groomingOptions as any}
              isMulti={true}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.appearanceComments}
              onChange={handleChange}
              name="appearanceComments"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Demeanor/Interaction */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Demeanor/Interaction</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mood/Affect</label>
            <CustomSelect
              value={formData.moodAffect}
              onChange={handleSelectChange('moodAffect')}
              options={moodOptions as any}
              isMulti
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Eye Contact</label>
            <CustomSelect
              value={formData.eyeContact}
              onChange={handleSelectChange('eyeContact')}
              options={eyeContactOptions as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cooperation</label>
            <CustomSelect
              value={formData.cooperation}
              onChange={handleSelectChange('cooperation')}
              options={cooperationOptions as any}
              isMulti={true}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.demeanorComments}
              onChange={handleChange}
              name="demeanorComments"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Speech */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Speech</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Articulation</label>
            <CustomSelect
              value={formData.articulation}
              onChange={handleSelectChange('articulation')}
              options={articulations as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <CustomSelect
              value={formData.tone}
              onChange={handleSelectChange('tone')}
              options={tone as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
            <CustomSelect
              value={formData.rate}
              onChange={handleSelectChange('rate')}
              options={rate as any}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Latency</label>
            <CustomSelect
              value={formData.responseLatency}
              onChange={handleSelectChange('responseLatency')}
              options={responseLatency as any}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.speechComments}
              onChange={handleChange}
              name="speechComments"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Cognition */}
      <section className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Cognition</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Perception */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Perception</label>
            <CustomSelect
              value={formData.perception}
              onChange={handleSelectChange('perception')}
              options={perception as any}
            />
          </div>

          {/* Judgment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judgment</label>
            <CustomSelect
              value={formData.judgment}
              onChange={handleSelectChange('judgment')}
              options={jusdgement as any}
            />
          </div>

          {/* Impulse Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Impulse Control</label>
            <CustomSelect
              value={formData.impulseControl}
              onChange={handleSelectChange('impulseControl')}
              options={jusdgement as any}
            />
          </div>

          {/* Insight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insight</label>
            <CustomSelect
              value={formData.insight}
              onChange={handleSelectChange('insight')}
              options={jusdgement as any}
            />
          </div>

          {/* Gait */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gait</label>
            <CustomSelect
              value={formData.gait}
              onChange={handleSelectChange('gait')}
              options={gait as any}
            />
          </div>

          {/* Posture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Posture</label>
            <CustomSelect
              value={formData.posture}
              onChange={handleSelectChange('posture')}
              options={posture as any}
            />
          </div>

          {/* Psychomotor Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Psychomotor Activity</label>
            <CustomSelect
              value={formData.psychomotorActivity}
              onChange={handleSelectChange('psychomotorActivity')}
              options={psychomotorActivity as any}
            />
          </div>

          {/* Mannerisms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mannerisms</label>
            <CustomSelect
              value={formData.mannerisms}
              onChange={handleSelectChange('mannerisms')}
              options={mannerisms as any}
            />
          </div>

          {/* Thought Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thought Content</label>
            <CustomSelect
              value={formData.thoughtContent}
              onChange={handleSelectChange('thoughtContent')}
              options={thoughtContent as any}
            />
          </div>

          {/* Thought Process */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thought Process</label>
            <CustomSelect
              value={formData.thoughtProcess}
              onChange={handleSelectChange('thoughtProcess')}
              options={thoughtProcess as any}
            />
          </div>

          {/* Delusions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delusions</label>
            <CustomSelect
              value={formData.delusions}
              onChange={handleSelectChange('delusions')}
              options={delusions as any}
            />
          </div>

          {/* Perceptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Perceptions</label>
            <CustomSelect
              value={formData.perceptions}
              onChange={handleSelectChange('perceptions')}
              options={perceptions as any}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.cognitionComments}
              onChange={handleChange}
              name="cognitionComments"
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default MentalStatusExam;
import React from 'react';

export interface SoapInterface {
    selectedRow: any
    setSelectedRow: (value: any) => void
}
const SOAPNoteForm = (props: SoapInterface) => {
    const { selectedRow: formData, setSelectedRow: setFormData } = props;

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        // Handle nested fields (subjective, objective, assessment, plan)
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData((prevState: any) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: value
                }
            }));
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-3 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">SOAP Note Form</h2>
            <div className="space-y-6">
                {/* Provider and Client Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                        <input
                            type="text"
                            name="providerName"
                            value={formData?.providerName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                            placeholder="Enter provider name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Client&apos;s Name</label>
                        <input
                            disabled
                            type="text"
                            name="clientName"
                            value={formData?.clientName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                            placeholder="Enter client's name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Client&apos;s DOB</label>
                        <input
                            type="date"
                            name="clientDob"
                            value={formData?.clientDob}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Service</label>
                        <input
                            type="date"
                            name="dateOfService"
                            value={formData?.dateOfService}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                            required
                        />
                    </div>
                </div>

                {/* Subjective Section */}
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Subjective: Client’s history and current status</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Medical or Mental History, Complaints and/or problems</label>
                            <textarea
                                name="subjective.medicalHistory"
                                value={formData.subjective?.medicalHistory || ""}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                                placeholder="Enter medical history"
                            />
                        </div>
                    </div>
                </div>

                {/* Objective Section */}
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Objective: Quantitative, factual, and measurable data</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Physical and Psychological Observations</label>
                            <textarea
                                name="objective.physicalObservations"
                                value={formData.objective?.physicalObservations || ""}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                                placeholder="Enter physical observations"
                            />
                        </div>
                    </div>
                </div>

                {/* Assessment Section */}
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment: Create your official assessment</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DSM Criteria/Therapeutic Model |  Clinical and professional knowledge</label>
                            <textarea
                                name="assessment.dsmCriteria"
                                value={formData.assessment?.dsmCriteria || ""}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                                placeholder="Enter DSM criteria or therapeutic model"
                            />
                        </div>

                    </div>
                </div>

                {/* Plan Section */}
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan: Outline your plan for future sessions</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Next Steps for Upcoming Sessions | How you&apos;ll implement your treatment plan</label>
                            <textarea
                                name="plan.nextSteps"
                                value={formData.plan?.nextSteps || ""}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#283c63] focus:border-[#283c63] sm:text-sm"
                                placeholder="Enter next steps"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SOAPNoteForm;
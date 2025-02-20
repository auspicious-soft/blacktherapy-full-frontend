import React, { useState } from 'react'
import SoapNote from './clinician-notes/soap'
import MedicalStatusExam from './clinician-notes/medical-status-exam'
import BiopsychosocialAssessment from './clinician-notes/biopsychosocial-assessment'
import PieNote from './clinician-notes/pie.note'

interface ISelectedRow {
    selectedRow: any
    setSelectedRow: (value: any) => void
}
const ExtraFields = (props: ISelectedRow) => {
    const { selectedRow, setSelectedRow } = props
    const [notesType, setNotesType] = useState<"SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note" | "">("")
    const renderExtraFields = (notesType: "SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note" | "") => {
        if (notesType !== "") {
            switch (notesType) {
                case "SOAP Note":
                    return <SoapNote {...props} />
                case "Mental Status Exam":
                    return <MedicalStatusExam />
                case "Biopsychosocial Assessment":
                    return <BiopsychosocialAssessment />
                case "Pie Note":
                    return <PieNote />
                default:
                    return null
            }
        }
        else return null
    }
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor="progressNotes" className="font-medium">
                Progress Notes
            </label>
            <textarea
                id="progressNotes"
                value={selectedRow.progressNotes}
                onChange={(e) =>
                    setSelectedRow((prev: any) => ({
                        ...prev,
                        progressNotes: e.target.value
                    }))
                }
                className="border p-2 rounded"
                required
            />
            <div className="flex gap-3 w-full">
                <div className='flex-1'>
                    <label className="block mb-2">Services Provided</label>
                    <select
                        required
                        name="assignedClinician"
                        value={selectedRow.servicesProvided || ""}
                        onChange={(e) =>
                            setSelectedRow((prev: any) => ({
                                ...prev,
                                servicesProvided: e.target.value,
                            }))
                        }
                        className="border p-2 rounded"
                    >
                        <option value="">--Select--</option>
                        <option value="Psychiatric Diagnostic Evaluation (Assessment)">
                            Psychiatric Diagnostic Evaluation (Assessment)
                        </option>
                        <option value="Psychotherapy (Individual)">Psychotherapy (Individual)</option>
                        <option value="Peer Support Service">Peer Support Service</option>
                        <option value="Psychotherapy (couple)">Psychotherapy (couple)</option>
                        <option value="Psychotherapy (Group)">Psychotherapy (Group)</option>
                        <option value="Nurse (RN) Assessment">Nurse (RN) Assessment</option>
                        <option value="Peer Support">Peer Support</option>
                        <option value="Personal Care Service">Personal Care Service</option>
                        <option value="DWI Assessment">DWI Assessment</option>
                        <option value="Intensive in-home Respite">Intensive in-home Respite</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <div className='flex-1'>
                        <label className="block mb-2">Request Type</label>
                        <select
                            required
                            name="requestType"
                            value={selectedRow.requestType || ""}
                            onChange={(e) =>
                                setSelectedRow((prev: any) => ({
                                    ...prev,
                                    requestType: e.target.value,
                                }))
                            }
                            className="border p-2 rounded"
                        >
                            <option value="">--Select--</option>
                            <option value="Payment">Payment</option>
                            <option value="Reimbursement">Reimbursement</option>
                            <option value="Other Services Provided">Other Services Provided</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex w-full gap-3">
                <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
                    <label className="block mb-2">Duration (Hours)</label>
                    <input
                        required
                        type="text"
                        value={selectedRow.duration || ""}
                        onChange={(e) =>
                            setSelectedRow((prev: any) => ({
                                ...prev,
                                duration: e.target.value,
                            }))
                        }
                        name="duration"
                        id="duration"
                        placeholder=""
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-2">Notes Type</label>
                    <select
                        required
                        name="notesType"
                        value={notesType}
                        onChange={(e) => setNotesType(e.target.value as any)}
                        className="border p-2 rounded"
                    >
                        <option value="">--Select--</option>
                        <option value="SOAP Note">SOAP Note</option>
                        <option value="Mental Status Exam">Mental Status Exam</option>
                        <option value="Biopsychosocial Assessment">Biopsychosocial Assessment</option>
                        <option value="Pie Note">Pie Note</option>
                    </select>
                </div>
            </div>
            <div className='flex-1 text-[#707070]'>
                {renderExtraFields(notesType)}
            </div>
        </div>
    )
}

export default ExtraFields
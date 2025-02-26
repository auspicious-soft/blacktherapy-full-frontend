'use client'
import React, { useEffect, useState, useTransition } from 'react';
import { format } from 'date-fns';
import Link from 'next/link'
import { EditIcon } from '@/utils/svgicons';
import Modal from 'react-modal';
import ReactLoader from './ReactLoader';
import { toast } from 'sonner';
import useSWR, { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import { updateAppointmentData } from '@/services/admin/admin-service';
import ExtraFields from './extra-completed-fields';
import { uploadPaymentInvoiceOnAppointment } from '@/components/Pdf-template/payment-complete-invoice';
import { uploadSoapNoteOnAppointment } from '@/components/Pdf-template/soap-note-pdf';
import { uploadPieNoteOnAppointment } from '@/components/Pdf-template/pie-note-pdf';
import { uploadBiopsychosocialAssessment } from '@/components/Pdf-template/biopsychosocial-pdf';
import { uploadMentalStatusExam } from '@/components/Pdf-template/medical-status-pdf';
import { getImageUrlOfS3 } from '@/utils';
import { useSession } from 'next-auth/react';
import { getTherapistsProfileData } from '@/services/therapist/therapist-service.';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
    mutate: KeyedMutator<AxiosResponse<any, any>>
}

const EventModal: React.FC<ModalProps> = ({ isOpen, onClose, event, mutate }) => {
    const session = useSession()
    const therapistId = session?.data?.user?.id;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedRow, setSelectedRow] = useState<any>({})
    const [isCompletedFieldsDisable, setIsCompletedFieldsDisable] = useState(false);
    const [notesType, setNotesType] = useState<"SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note" | "">("")
    const { data: therapistData } = useSWR(`/therapist/${therapistId}`, getTherapistsProfileData)
    const therapistSignatures = getImageUrlOfS3(therapistData?.data?.data?.consentSignature)

    useEffect(() => {
        setSelectedRow({
            appointmentDate: event.appointmentDate,
            appointmentTime: event.appointmentTime,
            status: event.status,
            progressNotes: event.progressNotes,
            servicesProvided: event.servicesProvided,
            requestType: event.requestType,
            duration: event.duration,
            clientName: event.clientName,
            clientId: event.clientId,
            _id: event.id
        });
        setIsCompletedFieldsDisable(event.status === 'Completed');
    }, [isEditModalOpen, event]);

    if (!isOpen || !event) return null;

    const startTime = event.start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
    const endTime = event.end.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { appointmentDate, appointmentTime, status, progressNotes, servicesProvided, requestType, duration, ...rest } = selectedRow
        const otherPayload = {
            appointmentDate,
            appointmentTime,
            status,
            progressNotes,
            servicesProvided,
            requestType,
            duration,
        }
        const payload = { ...otherPayload, sessionNotesData: rest }
        delete payload.sessionNotesData.sessionNotesData
        if (payload.duration && isNaN(Number(payload.duration))) {
            toast.error("Duration must be a number")
            return
        }

        startTransition(async () => {
            try {
                if (payload.status === 'Completed' && payload.duration) {
                    const { key } = await uploadPaymentInvoiceOnAppointment({ ...selectedRow, ...payload, therapistEmail: session?.data?.user?.email, therapistName: session?.data?.user?.name });
                    (payload as any).invoice = key;

                    switch (notesType) {
                        case 'SOAP Note': {
                            const { uploadedKey } = await uploadSoapNoteOnAppointment({ ...selectedRow, _id: selectedRow._id, clientId: { ...selectedRow.clientId, email: selectedRow.clientId.email }, signature: therapistSignatures });
                            (payload as any).sessionNotes = uploadedKey;
                            break;
                        }
                        case 'Pie Note': {
                            const { uploadedKey } = await uploadPieNoteOnAppointment({ ...selectedRow, _id: selectedRow._id, clientId: { ...selectedRow.clientId, email: selectedRow.clientId.email }, signature: therapistSignatures });
                            (payload as any).sessionNotes = uploadedKey;
                            break;
                        }
                        case 'Biopsychosocial Assessment': {
                            const { uploadedKey } = await uploadBiopsychosocialAssessment({ ...selectedRow, _id: selectedRow._id, clientId: { ...selectedRow.clientId, email: selectedRow.clientId.email }, signature: therapistSignatures });
                            (payload as any).sessionNotes = uploadedKey;
                            break;
                        }
                        case 'Mental Status Exam': {
                            const { uploadedKey } = await uploadMentalStatusExam({ ...selectedRow, _id: selectedRow._id, clientId: { ...selectedRow.clientId, email: selectedRow.clientId.email }, signature: therapistSignatures });
                            (payload as any).sessionNotes = uploadedKey;
                        }
                    }
                }
                const response = await updateAppointmentData(`/admin/appointments/${selectedRow?._id}`, payload);
                if (response.status === 200) {
                    toast.success("Appointment updated successfully")
                    mutate()
                    setSelectedRow({})
                    setIsEditModalOpen(false)
                }
            }
            catch (error) {
                toast.error("An error occurred while updating the assignment");
            }
            //   finally {
            //   setIsEditModalOpen(false);
            // }
        })
    }

    const isBioT = notesType !== 'Biopsychosocial Assessment' ? 'max-w-2xl' : 'max-w-4xl'
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                        <div className='cursor-pointer' onClick={() => setIsEditModalOpen(true)}>
                            <EditIcon />
                        </div>
                    </div>
                    <p><strong>Appointment Date:</strong> {format(event.start, 'MM/dd/yyyy')}</p>
                    <p><strong>Appointment Time:</strong> {startTime} - {endTime}</p>
                    <p><strong>Status:</strong> {event.status}</p>
                    <div className="mt-4 flex gap-4 ">
                        <Link href={`/therapist/assignments/video-chat/${event.id}`} className="px-4 py-2 bg-[#283C63] text-white rounded-lg hover:bg-[#283C63]">
                            Open Appointment
                        </Link>
                        <button onClick={onClose} className="px-4 py-2 font-bold  text-black rounded-lg ">
                            Close
                        </button>
                    </div>
                </div>
            </div>
            {
                isEditModalOpen && (
                    <Modal
                        isOpen={isEditModalOpen}
                        onRequestClose={() => setIsEditModalOpen(false)}
                        contentLabel="Edit Event"
                        shouldCloseOnEsc={false}
                        shouldCloseOnOverlayClick={false}
                        className={`overflow-auto ${isBioT ? 'max-w-2xl' : 'max-w-4xl'} overflo-custom max-h-[95vh] child-modal bottom-0 !bg-white rounded-lg w-full p-5 shadow-lg z-[2000] h-auto !top-auto ${isEditModalOpen ? 'modal-open' : ''}`}
                        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-[2000]"
                    >
                        <h3 className="font-semibold">Edit Appointment Details</h3>
                        <div className="p-3">
                            <form onSubmit={(e) => handleSubmit(e)}
                                className="space-y-4"
                            >
                                <div className="flex flex-col">
                                    <label htmlFor="clientName" className="font-medium">
                                        Client Name
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        id="clientName"
                                        value={event?.clientName || ""}
                                        className="border p-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="appointmentDate" className="font-medium">
                                        Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        id="appointmentDate"
                                        value={selectedRow?.appointmentDate ? format(new Date(selectedRow.appointmentDate), "yyyy-MM-dd") : ""}
                                        onChange={(e) =>
                                            setSelectedRow((prev: any) => ({
                                                ...prev,
                                                appointmentDate: e.target.value,
                                            }))
                                        }
                                        className="border p-2 rounded"
                                        required
                                    />
                                </div>

                                {/* Appointment Time */}
                                <div className="flex flex-col">
                                    <label htmlFor="appointmentTime" className="font-medium">
                                        Appointment Time
                                    </label>
                                    <input
                                        type="time"
                                        id="appointmentTime"
                                        value={selectedRow.appointmentTime}
                                        onChange={(e) =>
                                            setSelectedRow((prev: any) => ({
                                                ...prev,
                                                appointmentTime: e.target.value,
                                            }))
                                        }
                                        className="border p-2 rounded"
                                        required
                                    />
                                </div>
                                {/* Status */}
                                <div className="flex flex-col">
                                    <label htmlFor="status" className="font-medium">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={selectedRow.status}
                                        onChange={(e) =>
                                            setSelectedRow((prev: any) => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                        className="border p-2 rounded"
                                        required
                                        disabled={isCompletedFieldsDisable}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Not Attended">Not Attended</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                {
                                    (selectedRow?.status === 'Completed' && !isCompletedFieldsDisable) && (
                                        <ExtraFields selectedRow={selectedRow} setSelectedRow={setSelectedRow} notesType={notesType} setNotesType={setNotesType} />
                                    )
                                }
                                {/* Submit Button */}
                                <div className="sticky !-bottom-5 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-end gap-2">
                                    <button className="text-black p-2 rounded-md font-semibold" onClick={() => setIsEditModalOpen(false)}>
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#283C63] text-white px-4 py-2 rounded"
                                    >
                                        {!isPending ? 'Save Changes' : <ReactLoader color="#fff" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                )
            }
        </>
    );
};

export default EventModal;
'use client'
import React, { useEffect, useState, useTransition } from 'react';
import { format } from 'date-fns';
import Link from 'next/link'
import { EditIcon } from '@/utils/svgicons';
import Modal from 'react-modal';
import ReactLoader from './ReactLoader';
import { toast } from 'sonner';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import { updateAppointmentData } from '@/services/admin/admin-service';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
    mutate: KeyedMutator<AxiosResponse<any, any>>
}

const EventModal: React.FC<ModalProps> = ({ isOpen, onClose, event, mutate }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedRow, setSelectedRow] = useState<any>({})
    const [isCompletedFieldsDisable, setIsCompletedFieldsDisable] = useState(false);

    useEffect(() => {
        setSelectedRow({
            appointmentDate: event.appointmentDate,
            appointmentTime: event.appointmentTime,
            status: event.status,
            progressNotes: event.progressNotes,
            servicesProvided: event.servicesProvided,
            requestType: event.requestType,
            duration: event.duration
        });
        setIsCompletedFieldsDisable(event.status === 'Completed');
    }, [isEditModalOpen, event]);

    if (!isOpen || !event) return null;

    const startTime = event.start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const endTime = event.end.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const payload = {
            appointmentDate: selectedRow.appointmentDate,
            appointmentTime: selectedRow.appointmentTime,
            status: selectedRow.status,
            progressNotes: selectedRow.progressNotes,
            servicesProvided: selectedRow.servicesProvided,
            requestType: selectedRow.requestType,
            duration: selectedRow.duration
        };
        if (payload.duration && isNaN(Number(payload.duration))) {
            toast.error("Duration must be a number");
            return;
        }
        startTransition(async () => {
            try {
                const response = await updateAppointmentData(`/admin/appointments/${event.id}`, payload);
                if (response.status === 200) {
                    toast.success("Appointment updated successfully");
                    mutate();
                    onClose();
                }
            } catch (error) {
                toast.error("An error occurred while updating the assignment");
            } finally {
                setIsEditModalOpen(false);
            }
        });
    };

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
                        className={`overflo-custom max-h-[95vh] max-w-xl child-modal bottom-0 !bg-white rounded-lg w-full p-5 shadow-lg z-[2000] h-auto !top-auto ${isEditModalOpen ? 'modal-open' : ''}`}
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
                                        </div>
                                    )
                                }
                                {/* Submit Button */}
                                <div className="flex justify-end gap-2">
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
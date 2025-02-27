/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import "./EventModal.css";
import { CalendarEvent } from "@/components/calender";
import { EditIcon } from "@/utils/svgicons";
import Modal from "react-modal";
import useTherapists from "@/utils/useTherapists";
import CustomSelect from "./CustomSelect";
import { toast } from "sonner";
import { lockUnlockNote, updateAppointmentData } from "@/services/admin/admin-service";
import useSWR, { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";
import ReactLoader from "@/components/ReactLoader";
import { nonMilitaryTime, getImageUrlOfS3 } from "@/utils";
import ExtraFields from "@/components/extra-completed-fields";
import { uploadPaymentInvoiceOnAppointment } from "@/components/Pdf-template/payment-complete-invoice";
import { uploadSoapNoteOnAppointment } from "@/components/Pdf-template/soap-note-pdf";
import { uploadPieNoteOnAppointment } from "@/components/Pdf-template/pie-note-pdf";
import { uploadBiopsychosocialAssessment } from "@/components/Pdf-template/biopsychosocial-pdf";
import { uploadMentalStatusExam } from "@/components/Pdf-template/medical-status-pdf";
import { getTherapistsProfileData } from "@/services/therapist/therapist-service.";
import { IoIosDocument } from "react-icons/io";
import { EyeIcon, LockIcon, UnlockIcon } from "lucide-react";

interface EventModalProps {
  event?: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  mutate: KeyedMutator<AxiosResponse<any, any>>
}

interface TaskData {
  title: string;
  note: string;
  dueDate: string;
  appointmentId: string;
  isCurrentlyLocked: boolean;
  clientName: string;
  appointmentDate: string;
}
const EventModal = ({ event, isOpen, onClose, events, mutate }: EventModalProps) => {
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    note: "",
    dueDate: "",
    appointmentId: "",
    isCurrentlyLocked: false,
    clientName: "",
    appointmentDate: ""
  });
  const { therapistData } = useTherapists(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState<any>();
  const [isCompletedFieldsDisable, setIsCompletedFieldsDisable] = useState(false);
  const [notesType, setNotesType] = useState<"SOAP Note" | "Mental Status Exam" | "Biopsychosocial Assessment" | "Pie Note" | "">("");
  const eventsToShowInModal = events?.filter((ev: any) => (new Date(ev.appointmentDate).toLocaleDateString() === new Date(event!?.start).toLocaleDateString()) && (ev.appointmentTime === event?.start?.toTimeString().slice(0, 5)));
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (Object.keys(therapistData).length > 0) {
      setSelectedClinician(therapistData.find((therapist: any) => therapist.value === selectedRow?.therapistId?._id));
    }
  }, [selectedRow?.therapistId?._id, isEditModalOpen])

  useEffect(() => {
    if (selectedRow) {
      setIsCompletedFieldsDisable(selectedRow.status === 'Completed' && selectedRow.sessionNotes);
    }
  }, [selectedRow]);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedClinician(selectedOption);
  }

  const handleUnlockConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const dueDate = new Date(taskData.dueDate);
        const formattedDueDate = dueDate.toISOString().split('T')[0];
        const requestBody = {
          isLocked: false,
          title: taskData.title,
          note: taskData.note,
          dueDate: formattedDueDate
        };

        const response = await lockUnlockNote(`admin/lock-unlock-note/${taskData.appointmentId}`, requestBody);

        if (response.status === 200) {
          toast.success("Note unlocked successfully");
          setIsUnlockModalOpen(false);
          mutate()
        } else {
          toast.error("Failed to unlock note");
        }
      }
      catch (error) {
        console.error("Error unlocking note:", error);
        toast.error("An error occurred while unlocking the note");
      }
    });
  };

  const handleLockUnlockNote = async (appointmentId: string, isCurrentlyLocked: boolean, clientName: string, appointmentDate: string, appointmentTime: string) => {

    if (isCurrentlyLocked) {
      setTaskData({
        title: `Review notes for ${clientName}`,
        note: `Please review the session notes for appointment on ${format(new Date(appointmentDate), "MM/dd/yyyy")} at ${nonMilitaryTime(appointmentTime)}`,
        dueDate: new Date().toISOString().split('T')[0],
        appointmentId,
        isCurrentlyLocked,
        clientName,
        appointmentDate
      });
      setIsUnlockModalOpen(true);
      return;
    }

    startTransition(async () => {
      try {
        const requestBody = { isLocked: true }
        const response = await lockUnlockNote(`admin/lock-unlock-note/${appointmentId}`, requestBody);
        if (response.status === 200) {
          toast.success("Note unlocked successfully");
          setIsUnlockModalOpen(false);
          mutate()
        } else {
          toast.error("Failed to unlock note");
        }
      }
      catch (error) {
        console.error("Error unlocking note:", error);
        toast.error("An error occurred while unlocking the note");
      }
    })

  };


  if (!event || !isOpen) return null;

  const openEditModal = (row: any) => {
    // Prepare the selected row with all necessary fields for notes
    setSelectedRow({
      ...row,
      _id: row._id,
      clientId: row.clientId || { email: '' }, // Ensure clientId exists with email property
      progressNotes: row.progressNotes || '',
      servicesProvided: row.servicesProvided || '',
      requestType: row.requestType || '',
      duration: row.duration || ''
    });
    setIsEditModalOpen(true);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Prepare basic payload
    const payload: any = {
      therapistId: selectedClinician?.value,
      appointmentDate: selectedRow.appointmentDate,
      appointmentTime: selectedRow.appointmentTime,
      status: selectedRow.status
    };

    // Add session notes data if status is Completed
    if (selectedRow.status === 'Completed') {
      const { appointmentDate, appointmentTime, status, progressNotes, servicesProvided, requestType, duration, ...rest } = selectedRow;

      // Add the notes fields to the payload
      payload.progressNotes = progressNotes;
      payload.servicesProvided = servicesProvided;
      payload.requestType = requestType;
      payload.duration = duration;
      payload.sessionNotesData = { ...rest, notesType };

      // Validate duration
      if (payload.duration && isNaN(Number(payload.duration))) {
        toast.error("Duration must be a number");
        return;
      }

      // Delete any nested sessionNotesData to avoid circular references
      if (payload.sessionNotesData.sessionNotesData) {
        delete payload.sessionNotesData.sessionNotesData;
      }
    }

    startTransition(async () => {
      try {
        if (payload.status === 'Completed' && !isCompletedFieldsDisable) {
          // Get therapist's signature for PDF documents
          const { data: therapistData } = await getTherapistsProfileData(`/therapist/${selectedRow.therapistId._id}`)
          const therapistSignatures = getImageUrlOfS3(therapistData?.data?.consentSignature);

          // Generate invoice
          const { key } = await uploadPaymentInvoiceOnAppointment({
            ...selectedRow,
            ...payload,
            therapistEmail: selectedRow.therapistId?.email || '',
            therapistName: `${selectedRow.therapistId?.firstName || ''} ${selectedRow.therapistId?.lastName || ''}`
          });
          payload.invoice = key;

          // Generate appropriate notes based on selected type
          switch (notesType) {
            case 'SOAP Note': {
              const { uploadedKey } = await uploadSoapNoteOnAppointment({ ...selectedRow, signature: therapistSignatures });
              payload.sessionNotes = uploadedKey;
              break;
            }
            case 'Pie Note': {
              const { uploadedKey } = await uploadPieNoteOnAppointment({ ...selectedRow, signature: therapistSignatures });
              payload.sessionNotes = uploadedKey;
              break;
            }
            case 'Biopsychosocial Assessment': {
              const { uploadedKey } = await uploadBiopsychosocialAssessment({ ...selectedRow, signature: therapistSignatures });
              payload.sessionNotes = uploadedKey;
              break;
            }
            case 'Mental Status Exam': {
              const { uploadedKey } = await uploadMentalStatusExam({ ...selectedRow, signature: therapistSignatures });
              payload.sessionNotes = uploadedKey;
              break;
            }
          }
        }

        // Submit the updated appointment data
        const response = await updateAppointmentData(`/admin/appointments/${selectedRow._id}`, payload);
        if (response.status === 200) {
          toast.success("Appointment updated successfully");
          mutate();
        }
      }
      catch (error) {
        toast.error("An error occurred while updating the appointment");
        console.error(error);
      }
      finally {
        setIsEditModalOpen(false);
      }
    });
  }


  return (
    <div className="modal table-common overflo-custom">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between p-3">
          <h2 className="pb-3">Details for {event.title} |  {format(event.start, "MM/dd/yyyy")} | {event.start?.toTimeString().slice(0, 5)}</h2>
          <button className="bg-[#26395e] p-2 rounded-md" onClick={onClose}>Close</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-common border-2 !min-w-[6rem]">
            <thead>
              <tr>
                <th>Therapist Assigned</th>
                <th>Client Name</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
                <th>Clinician Notes</th>
                <th>Payment Invoice</th>
              </tr>
            </thead>
            <tbody className="border-2">
              {eventsToShowInModal.length > 0 ? eventsToShowInModal?.map((relatedEvent: any) => {
                return (
                  <tr key={relatedEvent.id}>
                    <td>{relatedEvent.therapistId?.firstName} {relatedEvent.therapistId?.lastName}</td>
                    <td>{relatedEvent.clientName}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-black`}>
                        <span className={`px-2 py-1 rounded-full text-black ${relatedEvent.status === 'Completed'
                          ? 'text-[#4ec091] bg-[#cbffb2]'
                          : relatedEvent.status === 'Pending'
                            ? 'text-white bg-yellow-500'
                            : relatedEvent.status === 'Rejected'
                              ? 'text-red-500 bg-red-200'
                              : relatedEvent.status === 'Approved'
                                ? 'text-indigo-500 bg-indigo-200'
                                : 'text-gray-500 bg-gray-200'}`}>
                          {relatedEvent.status}
                        </span>
                      </span>
                    </td>
                    <td>{format(new Date((relatedEvent.appointmentDate)), "MM/dd/yyyy")}</td>
                    <td>{nonMilitaryTime(relatedEvent.appointmentTime)}</td>
                    <td>
                      <button onClick={() => openEditModal(relatedEvent)} className="flex items-center justify-center">
                        <EditIcon />
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* View Notes Button */}
                        <button
                          onClick={() => {
                            if (relatedEvent.status === 'Completed' && relatedEvent.sessionNotes) {
                              window.open(getImageUrlOfS3(relatedEvent.sessionNotes), '_blank');
                            } else {
                              toast.error("No clinician notes available for this appointment");
                            }
                          }}
                          className="flex items-center justify-center"
                          disabled={!(relatedEvent.status === 'Completed' && relatedEvent.sessionNotes)}
                          title={relatedEvent.status === 'Completed' && relatedEvent.sessionNotes ? "View Notes" : "No notes available"}
                        >
                          <EyeIcon color='#26395e' size={20} />
                        </button>

                        {/* Lock/Unlock Button - Only show for completed appointments with notes */}
                        {relatedEvent.status === 'Completed' && relatedEvent.sessionNotes && (
                          <button
                            onClick={() => handleLockUnlockNote(
                              relatedEvent._id,
                              relatedEvent.isLocked || false,
                              relatedEvent.clientName,
                              relatedEvent.appointmentDate,
                              relatedEvent.appointmentTime
                            )}
                            title={relatedEvent.isLocked ? "Unlock the note" : "Lock the note"}
                            className="flex items-center justify-center"
                            disabled={isPending}
                          >
                            {relatedEvent.isLocked ? (
                              <LockIcon size={20} color="red" className="font-bold" />
                            ) : (
                              <UnlockIcon size={20} color="#4CAF50" className="font-bold" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <button
                        className='flex items-center justify-center'
                        onClick={() => {
                          const paymentInvoice: any = relatedEvent?.paymentRequest?.invoice
                          if (paymentInvoice) {
                            window.open(getImageUrlOfS3(paymentInvoice), '_blank');
                          }
                        }}
                        disabled={!(relatedEvent?.paymentRequest?.invoice)}
                      >
                        <IoIosDocument color='#26395e' size={20} /><span className='pl-1'>{`${relatedEvent?.paymentRequest?.identifier ? `#${relatedEvent?.paymentRequest?.identifier}` : ''}`}</span>
                      </button>
                    </td>
                  </tr>
                )
              })
                :
                <tr>
                  <td colSpan={8} className="text-center">No appointments scheduled for this time</td>
                </tr>
              }
            </tbody>
          </table>
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
            className={`overflow-auto  max-h-[95vh] child-modal bottom-0 !bg-white rounded-lg w-full p-5 shadow-lg z-[2000] h-auto !top-auto ${isEditModalOpen ? 'modal-open' : ''}`}
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
                    value={selectedRow?.clientName || ""}
                    className="border p-2 rounded"
                    required
                  />
                </div>

                {/* Therapist Name */}
                <div className="flex flex-col">
                  <CustomSelect
                    name="Assigned Clinician"
                    value={selectedClinician}
                    options={therapistData || []}
                    onChange={handleSelectChange}
                    placeholder="Select"
                    required={true}
                  />
                </div>

                {/* Appointment Date */}
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
                    value={selectedRow?.appointmentTime || ""}
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
                    value={selectedRow?.status || ""}
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

                {/* Clinician Notes - Show when status is completed */}
                {
                  (selectedRow?.status === 'Completed' && !isCompletedFieldsDisable) && (
                    <ExtraFields
                      isClinicianNotesEdit={false}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      notesType={notesType}
                      setNotesType={setNotesType}
                    />
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
      {/* Unlock Confirmation Modal */}
      {isUnlockModalOpen && (
        <Modal
          isOpen={isUnlockModalOpen}
          onRequestClose={() => setIsUnlockModalOpen(false)}
          contentLabel="Unlock Note"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
          className="overflow-auto max-w-3xl max-h-[95vh] bottom-0 !bg-white rounded-lg w-full p-5 shadow-lg z-[2000] h-auto !top-auto"
          overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-[2000]"
        >
          <h3 className="font-semibold">Unlock Note Confirmation</h3>
          <div className="p-3">
            <form onSubmit={handleUnlockConfirmSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="font-medium">Title</label>
                <input
                  type="text"
                  id="title"
                  value={taskData.title}
                  onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="note" className="font-medium">Note</label>
                <textarea
                  id="note"
                  value={taskData.note}
                  onChange={(e) => setTaskData(prev => ({ ...prev, note: e.target.value }))}
                  className="border p-2 rounded"
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="dueDate" className="font-medium">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="border p-2 rounded"
                  required
                />
              </div>

              <div className="sticky !-bottom-5 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  className="text-black p-2 rounded-md font-semibold"
                  onClick={() => setIsUnlockModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#283C63] text-white px-4 py-2 rounded"
                  disabled={isPending}
                >
                  {!isPending ? 'Confirm Unlock' : <ReactLoader color="#fff" />}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventModal;
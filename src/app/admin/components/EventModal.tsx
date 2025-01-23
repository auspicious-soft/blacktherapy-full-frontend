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
import { updateAppointmentData } from "@/services/admin/admin-service";
import { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";
import ReactLoader from "@/components/ReactLoader";

interface EventModalProps {
  event?: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  mutate: KeyedMutator<AxiosResponse<any, any>>
}
const EventModal = ({ event, isOpen, onClose, events, mutate }: EventModalProps) => {
  const { therapistData } = useTherapists(true);
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState<any>()
  const eventsToShowInModal = events.filter((ev: any) => (new Date(ev.appointmentDate).toLocaleDateString() === new Date(event!?.start).toLocaleDateString()) && (ev.appointmentTime === event?.start?.toTimeString().slice(0, 5)));
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (Object.keys(therapistData).length > 0) {
      setSelectedClinician(therapistData.find((therapist: any) => therapist.value === selectedRow?.therapistId?._id))
    }
  }, [selectedRow?.therapistId?._id, isEditModalOpen])

  const handleSelectChange = (selectedOption: any) => {
    setSelectedClinician(selectedOption);
  }

  if (!event || !isOpen) return null;
  const openEditModal = (row: any) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const payload = {
      therapistId: selectedClinician?.value,
      appointmentDate: selectedRow.appointmentDate,
      appointmentTime: selectedRow.appointmentTime,
      status: selectedRow.status
    }
    startTransition(async () => {
      try {
        const response = await updateAppointmentData(`/admin/appointments/${selectedRow._id}`, payload)
        if (response.status === 200) {
          toast.success("Appointment updated successfully")
          mutate()
        }
      }
      catch (error) {
        toast.error("An error occurred while updating the assignment");
      }
      finally {
        setIsEditModalOpen(false)
      }
    })
  }
  return (
    <div className="modal table-common overflo-custom">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between p-3">
          <h2 className="pb-3">Details for {event.title} |  {format(event.start, "MM/dd/yyyy")} | {event.start?.toTimeString().slice(0, 5)}</h2>
          <button className="bg-[#26395e] p-2 rounded-md" onClick={onClose}>Close</button>
        </div>
        <table className="table-common border-2 !min-w-[6rem] overflow-auto">
          <thead>
            <tr>
              <th>Therapist Assigned</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {eventsToShowInModal.length > 0 ? eventsToShowInModal?.map((relatedEvent: any) => {
              return (
                <tr key={relatedEvent.id}>
                  <td >{relatedEvent.therapistId?.firstName} {relatedEvent.therapistId?.lastName}</td>
                  <td >{relatedEvent.clientName}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-black`} >
                      {relatedEvent.status}
                    </span>
                  </td>
                  <td >{format(new Date((relatedEvent.appointmentDate)), "MM/dd/yyyy")}</td>
                  <td >{(relatedEvent.appointmentTime)}</td>
                  <td>
                    <button onClick={() => openEditModal(relatedEvent)} className="">
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              )
            })
              :
              <tr>
                <td colSpan={6} className="text-center">No appointments scheduled for this time</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      {
        isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            contentLabel="Edit Event"
            className={`overflow-auto child-modal bottom-0 !bg-white rounded-t-lg w-full p-5 shadow-lg z-[2000] h-[560px] !top-auto ${isEditModalOpen ? 'modal-open' : ''}`}
            overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-[2000]"
          >
            <h3 className="font-semibold">Appointment Details</h3>
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
                    onChange={(e) =>
                      setSelectedRow((prev: any) => ({
                        ...prev,
                        clientName: e.target.value,
                      }))
                    }
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
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Attended">Not Attended</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
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
    </div>
  );
};

export default EventModal;
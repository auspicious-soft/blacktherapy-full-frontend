'use client'
import React from "react";
import { format, isValid } from "date-fns";
import "./EventModal.css";
import { CalendarEvent } from "@/components/calender";
import { EditIcon } from "@/utils/svgicons";
import Modal from "react-modal";
import useTherapists from "@/utils/useTherapists";
import { useSession } from "next-auth/react";

interface EventModalProps {
  event?: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
}
const EventModal = ({ event, isOpen, onClose, events }: EventModalProps) => {
  const id = useSession().data?.user?.id
  const therapistsData = useTherapists();
  const [selectedRow, setSelectedRow] = React.useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const eventsToShowInModal = events.filter((ev: any) => (new Date(ev.appointmentDate).toLocaleDateString() === new Date(event!.start).toLocaleDateString()) && (ev.appointmentTime === event?.start?.toTimeString().slice(0, 5)));
  if (!event || !isOpen) return null;
  const openEditModal = (row: any) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
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
            {eventsToShowInModal.map((relatedEvent: any) => {
              return (
                <tr key={relatedEvent.id}>
                  <td >{relatedEvent.therapistId?.firstName} {relatedEvent.therapistId?.lastName}</td>
                  <td >{relatedEvent.clientName}</td>
                  <td >{relatedEvent.status}</td>
                  <td >{format(new Date((relatedEvent.appointmentDate)), "MM/dd/yyyy")}</td>
                  <td >{(relatedEvent.appointmentTime)}</td>
                  <td>
                    <button onClick={() => openEditModal(relatedEvent)} className="">
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Updated Appointment:", selectedRow);
                  setIsEditModalOpen(false);
                }}
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
                  <label htmlFor="therapistId" className="font-medium">
                    Therapist Name
                  </label>
                  <select
                    id="therapistId"
                    value={selectedRow?.therapistId?._id || ""}
                    onChange={(e) =>
                      setSelectedRow((prev: any) => ({
                        ...prev,
                        therapistId: therapistsData.therapistData.find((t: any) => t.value === e.target.value),
                      }))
                    }
                    className="border p-2 rounded"
                    required
                  >
                    {therapistsData.therapistData.map((therapist: any) => (
                      <option key={therapist.value} value={therapist.value}>
                        {therapist.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Appointment Date */}
                <div className="flex flex-col">
                  <label htmlFor="appointmentDate" className="font-medium">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    value={
                      selectedRow?.appointmentDate
                        ? format(new Date(selectedRow.appointmentDate), "yyyy-MM-dd")
                        : ""
                    }
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
                  </select>
                </div>
                {/* Submit Button */}
                <div className="flex justify-end gap-2">
                  <button className="text-black p-2 rounded-md" onClick={() => setIsEditModalOpen(false)}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#283C63] text-white px-4 py-2 rounded"
                  >
                    Save Changes
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
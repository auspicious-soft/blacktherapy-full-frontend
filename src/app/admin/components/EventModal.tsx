import React from "react";
import { format, isValid } from "date-fns";
import "./EventModal.css";
import { CalendarEvent } from "@/components/calender";

const EventModal: React.FC<{
  event?: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  events: CalendarEvent[];
  groupEventsByHour: {
    [key: string]: CalendarEvent[];
  }
}> = ({ event, isOpen, onClose, groupEventsByHour }) => {

  if (!event || !isOpen) return null;

  // Check if the event.start is a valid date before trying to format it
  const startDate = event.start ? new Date(event.start) : null;
  const isStartDateValid = startDate && isValid(startDate);

  if (!isStartDateValid) {
    console.error("Invalid event start date:", event.start);
    return <div>Invalid event date</div>; // Optionally show some error message
  }

  const hourKey = format(startDate, "yyyy-MM-dd HH");
  const relatedEvents = groupEventsByHour[hourKey] || [];

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Details for {event.title}</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* {relatedEvents.map((relatedEvent) => (
              <tr key={relatedEvent.id}>
                <td>{relatedEvent.title}</td>
                <td>{relatedEvent.clientName}</td>
                <td>{relatedEvent.status}</td>
                <td>{format(relatedEvent.start, "HH:mm")}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventModal;


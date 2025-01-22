"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, View, Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToolbarProps } from "react-big-calendar";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import EventModal from "./EventModal";
import { getAppoinmentsForCalender } from "@/services/admin/admin-service";

export interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const CALENDAR_VIEWS = [
  // { key: "month", label: "Month" },
  { key: "week", label: "Week" },
  { key: "day", label: "Day" },
  { key: "work_week", label: "Work Week" },
] as const;

const AdminCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("week");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const userId = session?.data?.user?.id;

  const { data } = useSWR(userId ? `/admin/appointments` : null, getAppoinmentsForCalender);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [])

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .rbc-time-view {
            min-height: 500px !important;
          }
          .rbc-calendar {
            height: 600px !important;
          }
    
          .rbc-timeslot-group {
            min-height: 60px !important;
          }
            .rbc-label ,.rbc-button-link{
            color: black !important;
          }
    
          / Specific styling for month view /
          .rbc-month-view .rbc-header {
            padding: 8px !important;
            font-weight: 600 !important;
            min-heigth: 600px !important;
          }
          .rbc-month-view .rbc-date-cell {
            padding: 8px !important;
            font-weight: 500 !important;
          }
    
          / Week view styling /
          .rbc-week-view .rbc-time-view,
          .rbc-week-view .rbc-time-content {
            min-height: 600px !important;
          }
          .rbc-week-view .rbc-time-slot,
          .rbc-day-view .rbc-time-slot {
           min-height: 40px;           
           background-color: #f4f4f4;  
           }
    
          / Day view styling /
          .rbc-day-view .rbc-time-view,
          .rbc-day-view .rbc-time-content {
            min-height: 600px !important;
          }
    
          / Work Week view styling /
          .rbc-work-week-view .rbc-time-view,
          .rbc-work-week-view .rbc-time-content {
            min-height: 500px !important;
          }
         .rbc-day-slot .rbc-event-label{
           text-wrap: wrap!important;
          }
          .rbc-event {
            background-color: #283C63 !important;
            color: white !important;
            font-size: 11px !important;
            padding: 2px !important;
            border-radius: 4px !important;
            position: relative !important;
            z-index: 1 !important;
            width: calc(100% - 1px) !important;
            height: 20px !important;
            text-wrap: wrap;
          }
    
        
          .rbc-time-slot {
            height: auto !important;
          }
    
          .rbc-timeslot-group {
            min-height: 100px !important;
          }
    
          .time-slot-content {
            display: flex !important;
            flex-direction: column !important;
            gap: 2px !important;
            padding: 4px !important;
            min-height: 100px !important;
          }
    
          .event-container {
            position: relative !important;
            height: 30px !important;
            margin-bottom: 8px !important;
          }
    
          .rbc-events-container {
            margin-right: 0 !important;
          }
          .rbc-day-slot .rbc-event, .rbc-day-slot .rbc-background-event{
          left: 0% !important; 
          text-wrap: wrap !important;
          min-height: 35px !important;
        }
          .custom-event-wrapper {
            position: absolute !important;
            width: 100% !important;
            height: 100% !important;
          }
    
          .rbc-events-container rbc-event {
        left: 0% !important;
    }
    //     .time-slot-content > .event-container:nth-child(2) .rbc-event {
    //   left: 0% !important;
    // }
          @media (max-width: 768px) {
            .rbc-toolbar {
              flex-direction: column;
            }
            .rbc-toolbar-label {
              margin: 8px 0;
            }
            .rbc-event {
              font-size: 10px !important;
              padding: 4px !important;
              height: 25px !important;
            }
    
            .event-container {
              height: 25px !important;
              margin-bottom: 6px !important;
            }
    
            .time-slot-content {
              gap: 6px !important;
            }
          }
    
          .rbc-time-view .rbc-row {
            min-height: auto !important;
          }
        `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [])

  const initialEvents: CalendarEvent[] = useMemo(() => {
    if (!data) return []
    const appointmentData = data?.data?.data
    const uniqueAppointments = appointmentData.reduce((acc: any, current: any) => {
      const x = acc.find((item: any) => item.appointmentDate === current.appointmentDate && item.appointmentTime === current.appointmentTime);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return (
      uniqueAppointments?.map((appointment: any) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const [hour, minute] = appointment.appointmentTime?.split(":")?.map(Number);
        const start = new Date(appointmentDate.setHours(hour, minute));
        const end = addMinutes(start, 60);

        const eventObj = {
          id: appointment._id,
          title: `${new Date(appointment.appointmentDate.split("T")[0]).toLocaleDateString('en-US', { weekday: 'long' })}`,
          start,
          end,
          clientName: appointment.clientName,
          status: appointment.status,
        };
        return eventObj
      }) || []
    )
  }, [data]);
  // Add new state for timeslot selection
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null  >(null);

  // Modify the groupEventsByHour logic to be more precise
  const groupEventsByTime = useMemo(() => {
    const grouped: { [key: string]: CalendarEvent[] } = {};

    initialEvents.forEach((event) => {
      const timeKey = format(event.start, "yyyy-MM-dd HH:mm");
      if (!grouped[timeKey]) {
        grouped[timeKey] = [];
      }
      grouped[timeKey].push(event);
    });

    return grouped;
  }, [initialEvents]);

  const handleEventSelect = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const EventWrapper = useCallback(({ event, index }: { event: CalendarEvent; index: number }) => {
    return (
      <div className="event-container flex flex-col">
        <div className={`rbc-event relative ${index === 1 ? "left-[0%]" : ""}`} onClick={() => handleEventSelect(event)}>
          <div className="rbc-event-content">{event.title}</div>
        </div>
      </div>
    );
  }, [handleEventSelect]);

  const TimeSlotWrapper: React.FC<React.PropsWithChildren<{}>> = useCallback(({ children }) => {
    if (!children) return null;

    const slotDate = new Date(children as string);
    if (isNaN(slotDate.getTime())) {
      return <div className="time-slot-content">{children}</div>;
    }

    const timeKey = format(slotDate, "yyyy-MM-dd HH:mm");
    const events = groupEventsByTime[timeKey] || [];

    const handleSlotClick = () => {
      if (events.length > 0) {
        setSelectedTimeslot(timeKey);
        setIsModalOpen(true);
      }
    };

    return <div className="time-slot-content" onClick={handleSlotClick} style={{ cursor: events.length ? 'pointer' : 'default' }}>
      {events.map((event, index) => (
        <EventWrapper key={event.id} event={event} index={index} />
      ))}
      {children}
    </div>
  }
    , [EventWrapper, groupEventsByTime]
  );

  const CustomToolbar: React.FC<ToolbarProps<CalendarEvent, object>> = ({ onNavigate, label, }) => {
    const buttonClass = "px-3 py-2 rounded-md transition-colors duration-200 text-sm whitespace-nowrap";
    const activeButtonClass = "bg-[#283C63] text-white";
    const inactiveButtonClass = "hover:bg-gray-100 text-black";

    return (
      <div className="flex flex-col gap-4 p-3 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between width-full">
          <div>
            <button
              onClick={() => onNavigate("PREV")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate("NEXT")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-black"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <span className="text-lg font-semibold text-black">{label}</span>
          <button
            onClick={() => onNavigate("TODAY")}
            className="ml-2 flex items-center text-black gap-2 px-3 py-2 bg-white border rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <CalendarIcon className="w-4 h-4" />
            Today
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 justify-center">
          {CALENDAR_VIEWS.map(({ key, label: viewLabel }) => (
            <button
              key={key}
              onClick={() => setView(key as View)}
              className={`${buttonClass} ${view === key ? activeButtonClass : inactiveButtonClass
                }`}
            >
              {viewLabel}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-5 min-h-[calc(100vh-200px)]">
      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">My Calendar</h2>
      <div className="!min-h-[calc(100vh-200px)] border rounded-lg overflow-hidden bg-white shadow-sm">
        <Calendar
          localizer={localizer}
          events={initialEvents}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventSelect}
          views={CALENDAR_VIEWS.reduce(
            (acc, { key }) => ({ ...acc, [key]: true }),
            {}
          )}
          defaultView="week"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          className="!min-h-[calc(100vh-200px)]"
          components={{
            toolbar: CustomToolbar,
            timeSlotWrapper: TimeSlotWrapper,
          }}
          step={60}
          timeslots={1}
        />
      </div>

      {isModalOpen && <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTimeslot(null);
          setSelectedEvent(null);
        }}
        events={data?.data?.data}
      />}
    </div>
  );
};

export default AdminCalendar;
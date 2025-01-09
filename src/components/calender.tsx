// components/MyCalendar.tsx
"use client"
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToolbarProps } from 'react-big-calendar';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { getTherapistAssignments } from '@/services/therapist/therapist-service.';
import EventModal from './EventModal';
// import CustomEvent from './CustomEvents'; // Import the CustomEvent component

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
    locales: { 'en-US': enUS },
});

const CALENDAR_VIEWS = [
    { key: 'month', label: 'Month' },
    { key: 'week', label: 'Week' },
    { key: 'day', label: 'Day' },
    { key: 'work_week', label: 'Work Week' }
] as const;

const MyCalendar: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>('week');
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const session = useSession();
    const userId = session?.data?.user?.id;

    const { data, error, isLoading, mutate } = useSWR(userId ? `/therapist/${session?.data?.user?.id}/clients` : null, getTherapistAssignments);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      / General styles for all views /
      .rbc-time-view {
        min-height: 700px !important;
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
        min-height: 600px !important;
      }
     .rbc-day-slot .rbc-event-label{
       text-wrap: wrap!important;
      }
     
      / Mobile-specific adjustments /
      @media (max-width: 768px) {
        .rbc-toolbar {
          flex-direction: column;
        }
        .rbc-toolbar-label {
          margin: 8px 0;
        }
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);
    const initialEvents: CalendarEvent[] = useMemo(() => {
        if (!data) return [];

        return data?.data?.data?.map((appointment: any) => {
            const appointmentDate = new Date(appointment.appointmentDate);
            const [hour, minute] = appointment.appointmentTime.split(':').map(Number);
            const start = new Date(appointmentDate.setHours(hour, minute));
            const end = addMinutes(start, 60);

            return {
                id: appointment._id,
                title: `${appointment.clientName}`,
                start,
                end,
                clientName: appointment.clientName,
                status: appointment.status,
            };
        }) || [];
    }, [data]);

    const handleEventSelect = useCallback((event: CalendarEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true); 
    }, []);

    const CustomToolbar: React.FC<ToolbarProps<CalendarEvent, object>> = ({ onNavigate, label }) => {
        const buttonClass = "px-3 py-2 rounded-md transition-colors duration-200 text-sm whitespace-nowrap";
        const activeButtonClass = "bg-[#283C63] text-white";
        const inactiveButtonClass = "hover:bg-gray-100 text-black";

        return (
            <div className="flex flex-col gap-4 p-3 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between width-full">
                    <div>
                        <button
                            onClick={() => onNavigate('PREV')}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black duration-200"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigate('NEXT')}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-black"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <span className="text-lg font-semibold">
                        {label}
                    </span>
                    <button
                        onClick={() => onNavigate('TODAY')}
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
                            className={`${buttonClass} ${view === key ? activeButtonClass : inactiveButtonClass}` }
                        >
                            {viewLabel}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const eventStyleGetter = useCallback(() => ({
        style: {
            fontSize: '12px',
            padding: '4px 4px',
            backgroundColor: '#283C63',
            color: 'white',
            whiteSpace: "normal",
            border: 'none',
            borderRadius: '4px',
            margin:'2px',
        }
    }), []);

    const TimeSlotWrapper: React.FC<React.PropsWithChildren<{}>> = useCallback(({ children }) => (
     
        <div className="text-sm font-medium ">
            {children}
        </div>
    ), []);

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
                    views={CALENDAR_VIEWS.reduce((acc, { key }) => ({ ...acc, [key]: true }), {})}
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
                    eventPropGetter={eventStyleGetter}
                    step={60}
                    timeslots={1}
                    min={new Date(0, 0, 0, 1, 0)}
                    max={new Date(0, 0, 0, 23, 59)}
                    messages={{
                        work_week: 'Work Week'
                    }}
                />
            </div>


            <EventModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                event={selectedEvent} 
            />
        </div>
    );
};

export default MyCalendar;


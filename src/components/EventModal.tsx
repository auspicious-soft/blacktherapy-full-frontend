import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any; 
}

const EventModal: React.FC<ModalProps> = ({ isOpen, onClose, event }) => {
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

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <p><strong>Client Name:</strong> {event.clientName}</p>
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
    );
};

export default EventModal;

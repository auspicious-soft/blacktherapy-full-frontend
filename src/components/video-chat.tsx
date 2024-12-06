import React, { useState, useEffect } from 'react';
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { createVideoSDKMeeting } from '@/utils';
import { toast } from 'sonner';
import { generateVideoSDKToken } from '@/actions';
import { redirect, useRouter } from 'next/navigation';

// Participant View Component
const ParticipantView = ({ participantId }: { participantId: string }) => {
    const micRef = React.useRef<HTMLAudioElement>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

    const videoStream = React.useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);
                micRef.current.srcObject = mediaStream;
                micRef.current.play().catch((err) => console.error("Audio play failed", err));
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div className="participant-view">
            <p>
                {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline
                    url={videoStream}
                    playing
                    muted
                    height="200px"
                    width="300px"
                />
            )}
        </div>
    );
};

// Controls Component
const Controls = () => {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const router = useRouter()
    return <div className="flex flex-col items-center space-y-4">
        <button
            onClick={() => {
                leave()
                router.back()
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Leave Meeting
        </button>
        <button
            onClick={() => toggleMic()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Toggle Mic
        </button>
        <button
            onClick={() => toggleWebcam()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
            Toggle Camera
        </button>
    </div>

};

// Meeting View Component
const MeetingView = ({ meetingId }: { meetingId: string }) => {
    const [joined, setJoined] = useState(false);
    const { join, participants } = useMeeting({
        onMeetingJoined: () => setJoined(true),
        onMeetingLeft: () => setJoined(false),
    });
    
    useEffect(() => {
        join()
    }, [])

    return (
        <div className="meeting-container">
            <h3>Meeting ID: {meetingId}</h3>
            {joined ? (
                <div>
                    <Controls />
                    {[...(participants as any).keys()].map((participantId) => (
                        <ParticipantView key={participantId} participantId={participantId} />
                    ))}
                </div>
            ) : (
                <p>Joining the meeting...</p>
            )}
        </div>
    );
};

// Main Video Chat Component
export const VideoChatPage = ({ appointmentId, userType, userId }: { appointmentId: string, userType: 'therapist' | 'client', userId: string }) => {
    const [meetingId, setMeetingId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const initializeMeeting = async () => {
            try {
                // Create or join a meeting using the appointmentId as room ID
                const roomId = await createVideoSDKMeeting(appointmentId, userId);
                const generatedToken = await generateVideoSDKToken(roomId, userId);

                setMeetingId(roomId);
                setToken(generatedToken);
            }
            catch (error) {
                console.error('Failed to initialize meeting:', error);
                toast.error('Failed to initialize meeting');
            }
        }
        initializeMeeting();
    }, [appointmentId, userId]);

    if (!meetingId || !token) {
        return <p>Initializing meeting...</p>;
    }

    return (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: `${userType === 'therapist' ? 'My Therapist' : 'My Client'} id - ${userId}`,
                debugMode: true,
                defaultCamera: 'front',
            }}
            token={token}
        >
            <MeetingView meetingId={meetingId} />
        </MeetingProvider>
    );
};

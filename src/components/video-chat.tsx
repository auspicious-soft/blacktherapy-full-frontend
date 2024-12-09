import React, { useState, useEffect, useRef } from 'react';
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { createVideoSDKMeeting } from '@/utils';
import { toast } from 'sonner';
import { generateVideoSDKToken } from '@/actions';
import { useRouter } from 'next/navigation';

// Participant View Component
const ParticipantView = ({ participantId, userType }: { participantId: string, userType: 'therapist' | 'client' }) => {
    const micRef = React.useRef<HTMLAudioElement>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName, setQuality } = useParticipant(participantId);

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
        setQuality('high')
    }, [micStream, micOn, setQuality])

    return (
        <div className="w-full">
            <p>
                {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn ? (
                <div className={`'p-[1px] rounded-lg`} style={
                    isLocal ? { transform: "scaleX(-1)", WebkitTransform: "scaleX(-1)" } : {}
                }>
                    <ReactPlayer
                        playsinline
                        url={videoStream}
                        playing
                        muted
                        height={`100%`}
                        width={`100%`}
                    />
                </div>
            ) :
                <p className='font-bold text-[30px]'>
                    Webcam Disabled
                </p>}
        </div>
    );
};

// Controls Component
const Controls = () => {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const router = useRouter()
    return <div className="flex justify-center items-center gap-x-2 p-4">
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
        <button
            onClick={() => {
                leave()
                router.back()
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
        >
            Leave Meeting
        </button>
    </div>

};

// Meeting View Component
const MeetingView = ({ meetingId, userType, token }: { meetingId: string, userType: 'therapist' | 'client', token: string }) => {
    const [joined, setJoined] = useState(false);
    const { join, participants } = useMeeting({
        onMeetingJoined: () => setJoined(true),
        onMeetingLeft: () => setJoined(false),
    })
    // const joinRef = useRef(join)

    useEffect(() => {
        if (meetingId && token) {
            join()
        }
    }, [meetingId, token]);

    return (
        <div className="w-full">
            <h3>Meeting ID: {meetingId}</h3>
            {joined ? (
                <div className='w-full'>
                    <Controls />
                    <div className='w-full flex gap-8 space-between '>
                        {[...(participants as any).keys()].map((participantId) => (
                            <div key={participantId}>
                                <ParticipantView participantId={participantId} userType={userType} />
                            </div>
                        ))}
                    </div>
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
                const { roomId, token }: any = await createVideoSDKMeeting(appointmentId, userId)
                setMeetingId(roomId)
                setToken(token)
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
            <MeetingView meetingId={meetingId} userType={userType} token={token} />
        </MeetingProvider>
    );
};

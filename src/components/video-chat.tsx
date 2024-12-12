import React, { useState, useEffect, useRef } from 'react';
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { createVideoSDKMeeting } from '@/utils';
import { toast } from 'sonner';
import { generateVideoSDKToken } from '@/actions';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getTherapistsProfileData } from '@/services/therapist/therapist-service.';
import { getProfileService } from '@/services/client/client-service';
import { FaMicrophoneLinesSlash } from "react-icons/fa6";
import { FaMicrophoneLines } from "react-icons/fa6";
import { BiSolidCameraOff } from "react-icons/bi";
import { ImCamera } from "react-icons/im";


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
        <div className={isLocal ? 'w-1/3' : 'w-full'}>
            <p>
                {displayName} | <p className='flex items-center justify-center'> Webcam: {webcamOn ? <ImCamera className='ml-2'/> : <BiSolidCameraOff className='ml-2'/>} | Mic: {micOn ? <FaMicrophoneLines className='ml-2'/> : <FaMicrophoneLinesSlash className='ml-2'/>} </p>
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

    return (
        <div className="flex justify-center items-center gap-x-2 p-4">
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
    )

};

// Meeting View Component
const MeetingView = ({ meetingId, userType, token }: { meetingId: string, userType: 'therapist' | 'client', token: string }) => {
    const router = useRouter()
    const [joined, setJoined] = useState(false);
    const { join, participants, leave } = useMeeting({
        onMeetingJoined: () => setJoined(true),
        onMeetingLeft: () => setJoined(false),
    })

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            leave();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [leave]);

    useEffect(() => {
        if (token) {
            router.refresh()
            join()
        }
    }, [meetingId, token]);

    return (
        <div className="w-full">
            <h3>Meeting ID: {meetingId}</h3>
            {joined ? (
                <div className='w-full'>
                    <Controls />
                    <div className='w-full sm:flex gap-8 space-between '>
                        {[...(participants as any).keys()].reverse().map((participantId) => {
                            return (
                                <div key={participantId}>
                                    <ParticipantView participantId={participantId} userType={userType} />
                                </div>
                            )
                        })}
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
    const [token, setToken] = useState<string | null>(null)

    const { data } = useSWR(userType == 'therapist' ? `/therapist/${userId}` : null, getTherapistsProfileData)
    const therapistName = data?.data?.data?.firstName + ' ' + data?.data?.data?.lastName

    const { data: client } = useSWR(userType == 'client' ? `/client/${userId}` : null, getProfileService)
    const clientName = client?.data?.data?.firstName + '' + client?.data?.data?.lastName

    const requestCameraAndMicrophonePermissions = async () => {
        try {
            const micPermission = await navigator.permissions.query({ name: 'microphone' } as any);
            const cameraPermission = await navigator.permissions.query({ name: 'camera' } as any);

            if (micPermission.state === 'denied' || cameraPermission.state === 'denied') {
                // Handle denied permissions
                console.error("Permissions denied");
                return;
            }

            // Request permissions if they are not granted
            if (micPermission.state === 'prompt' || cameraPermission.state === 'prompt') {
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            }
        } catch (error) {
            console.error("Error requesting permissions:", error);
        }
    }
    const isSafari = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('safari') && !userAgent.includes('chrome');
    }

    useEffect(() => {
        const initializeMeeting = async () => {
            if (isSafari()) {
                // const permissionsGranted = await requestCameraAndMicrophonePermissions();
                // if (!permissionsGranted) {
                //     toast.error('Camera and microphone access are required');
                //     return;
                // }
                await requestCameraAndMicrophonePermissions();
            }
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
                name: `${userType === 'therapist' ? therapistName : clientName}  - ${userId}`,
                debugMode: true,
                defaultCamera: 'front',
            }}
            token={token}
        >
            <MeetingView meetingId={meetingId} userType={userType} token={token} />
        </MeetingProvider>
    );
};

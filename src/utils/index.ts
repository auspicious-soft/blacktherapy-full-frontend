import stripe from "@/config/stripe"
import { getAxiosInstance } from "./axios"
import { toast } from "sonner"
import jwt, { Algorithm } from 'jsonwebtoken';
import { generateVideoSDKToken } from "@/actions";

export const getStripeProductNameById = async (id: string) => {
    return (await stripe.products.retrieve(id)).name
}

export const getSubscriptionByItsId = async (id: string) => {
    return (await stripe.subscriptions.retrieve(id))
}

export const getImageUrlOfS3 = (subPath: string): string => {
    const path = `${process.env.NEXT_PUBLIC_AWS_BUCKET_PATH}${subPath}`
    return path
}

export const getAppointmentDetails = async (id: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/client/appointment-by-id/${id}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch appointment details")
    }
}

export const getChatHistory = async (id: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/chats/chat-history/${id}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch chat history")
    }
}

export const getQueriesHistory = async (roomId: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/chats/queries-history/${roomId}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch queries history")
    }
}

export const getTicketDetails = async (roomId: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/client/tickets/get-ticket-by-room-id/${roomId}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch ticket details")
    }
}



export const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
}

// Function to create a meeting room
export const createVideoSDKMeeting = async (appointmentId: string, participantId: string) => {
    const token = await generateVideoSDKToken(appointmentId, participantId);

    // Check if the meeting exists
    const checkResponse = await fetch(`https://api.videosdk.live/v1/meetings/${appointmentId}`, {
        method: 'GET',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
    });

    if (checkResponse.ok) {
        // Meeting already exists
        return appointmentId;
    }

    // Create a new meeting if it doesn't exist
    const response = await fetch('https://api.videosdk.live/v1/meetings', {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });

    if (!response.ok) {
        throw new Error('Failed to create meeting room');
    }

    const data = await response.json();
    return data.meetingId;
};

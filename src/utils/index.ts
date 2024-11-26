import stripe from "@/config/stripe"
import { getAxiosInstance } from "./axios"
import { toast } from "sonner"

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
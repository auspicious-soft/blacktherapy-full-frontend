import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";

export const signUpTherapistService = async (payload: any) => await axiosInstance.post(`/therapist/signup`, payload)

export const getTherapistDashboardStats = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}
 
export const getTherapistAssignments = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const getTherapistWellness = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const postPaymentRequest = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}

export const getAllClientsInTherapistPanel = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const addOnboardingFormData = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}

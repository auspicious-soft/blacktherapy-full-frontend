import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";
import stripe from "stripe";

export const addClientSignupData = async (route: string, payload: any) => axiosInstance.post(route, payload)
export const changePasswordService = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.patch(route, payload)
}

export const getProfileService = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const updateProfileService = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.put(route, payload)
}


export const getClientWellness = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const getClientAppointments = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const postAnAppointment = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}

export const getClientSecretService = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}
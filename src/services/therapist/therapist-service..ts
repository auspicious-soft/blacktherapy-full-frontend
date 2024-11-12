import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";

export const signUpTherapistService = async (payload: any) => await axiosInstance.post(`/therapist/signup`, payload)

export const addOnboardingFormData = async (route:string, payload: any) =>{
    console.log('payload:', payload);
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
  }
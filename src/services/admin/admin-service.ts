import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";

export const loginService = async (payload: any) => {
  if ( payload.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && payload.password) {
    return await axiosInstance.post(`/admin/login`, payload);
  }
  // else if () {

  // }
}
//-----Dashboard Page-----
export const getAdminDashboardStats = async(route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}
//-------Assignment Page----
export const getAppoinmentsData = async(route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
//------Client page------------
export const getClientsPageData = async(route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const ClientsBilllingStats = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const ServiceAssignmentStats = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetClientAttachments = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetClientNotes = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}

//------Add New Client------------
export const AddNewClient = async (payload: any) =>{
  console.log('payload:', payload);
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/clients', payload)
}

import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";

export const loginService = async (payload: any) => {
  if ( payload.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && payload.password) {
    return await axiosInstance.post(`/admin/login`, payload);
  }
  // else if () {

  // }
}

export const getAdminDashboardStats = async(route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}
export const getAppoinmentsData = async(route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
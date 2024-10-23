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
export const AddClientNotesData = async (route:string, payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}

//------Add New Client------------
export const AddNewClient = async (payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/clients', payload)
}
//-----Get Payments Data------------
export const GetPaymentsData = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}

//-------------Client wellness page-------
export const GetClientWellness = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddNewWellness = async (payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/wellness', payload)
}
export const DeleteWellness = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};

//---------Add User------------------
export const GetUserDetails = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddNewUser = async (payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/users', payload)
}
export const DeleteUser = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};
export const AssignTaskToUser = async (payload: any, route: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}

//----------- Clinician/Therapist page --------------
export const GetTherapistsData = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetEmployeeRecordsData = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetEmployeeNotesData = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddEmployeeNotesData = async (route:string, payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}


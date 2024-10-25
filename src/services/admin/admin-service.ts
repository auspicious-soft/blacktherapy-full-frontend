import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";

export const loginService = async (payload: any) => {
  if (payload.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && payload.password) {
    return await axiosInstance.post(`/admin/login`, { email: payload.email, password: payload.password });
  }
  if (payload.role === 'client') {
    return await axiosInstance.post(`/client/login`, { email: payload.email, password: payload.password });;
  }
  if (payload.role === 'therapist') {
    return await axiosInstance.post(`/therapist/login`, { email: payload.email, password: payload.password });
  }

}
//-----Dashboard Page-----
export const getAdminDashboardStats = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
//-------Assignment Page----
export const getAppoinmentsData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const updateAssignments = async (route:string, payload: any) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.patch(route, payload)
}

//------Client page------------
export const getClientsPageData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const ClientsBilllingStats = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const ServiceAssignmentStats = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetClientAttachments = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetClientNotes = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddClientNotesData = async (route: string, payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}
export const deleteClientData = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};

//------Add New Client------------
export const AddNewClient = async (payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/clients', payload)
}
//-----Get Payments Data------------
export const GetPaymentsData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const UpdatePaymentRequest = async (route: string, payload: any) => {
  console.log('payload:', payload);
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.patch(route, payload);
};


//-------------Client wellness page-------
export const GetClientWellness = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddNewWellness = async (payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/wellness', payload)
}
export const DeleteWellness = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};

//---------Add User------------------
export const GetUserDetails = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddNewUser = async (payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post('/admin/users', payload)
}
export const DeleteUser = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};
export const AssignTaskToUser = async (route: string, payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}

//----------- Clinician/Therapist page --------------
export const GetTherapistsData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const GetEmployeeRecordsData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}

export const GetEmployeeNotesData = async (route: string) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const AddEmployeeNotesData = async (route: string, payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}
export const DeleteClinician = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};
export const AssignTaskToTherapist = async (route: string, payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}


//----------update/EDIT therapist---- pending
export const UpdateTherapistData = async (route: string, payload: any) => {
  console.log('payload:', payload);
  console.log('route:', route);
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.put(route, payload)
}


export const AddNewTherapist = async (route: string, payload: any) => {
  console.log('payload:', payload);
  console.log('route:', route);
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}


//=-------------Update Therapist Details
export const UpdateTherapistDetails = async (route: string, payload: any) => {
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.post(route, payload)
}

//-------View Tasks----------
export const getTasksData = async (route: string) =>{
  const axiosInstance = await getAxiosInstance()
  return axiosInstance.get(route)
}
export const deleteTaskData = async (route: any) => {
  const axiosInstance = await getAxiosInstance();
  return axiosInstance.delete(route);
};
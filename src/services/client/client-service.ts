import stripe from "@/config/stripe";
import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios";


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

export const getClientSecretToShowPaymentIntentService = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}

export const getCustomerSubscriptionDetails = async (stripeCustomerId: string) => {
    return await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: "all"
    })
}

export const getCustomersCurrentSubscription = async (planOrSubscriptionId: string) => {
    return await stripe.subscriptions.retrieve(planOrSubscriptionId)
}

export const getCustomerSubscriptionsAllInvoices = async (subscriptionAndCustomerId: string) => {
    const subscriptionId = subscriptionAndCustomerId.split('~')[0]
    const customerId = subscriptionAndCustomerId.split('~')[1]
    return await stripe.invoices.list({
        subscription: subscriptionId,
        customer: customerId,
        status: 'paid'
    } )
}
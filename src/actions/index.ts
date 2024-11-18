'use server'

import { signIn, signOut } from "@/auth"
import { loginService } from "@/services/admin/admin-service"
import { cookies } from "next/headers"

export const loginAction = async (payload: any) => {
    try {
        const res: any = await loginService(payload)
        if (res && res?.data?.success) {
            await signIn('credentials', {
                email: payload.email,
                name: res?.data?.data.firstName + ' ' + res?.data?.data.lastName,
                _id: res?.data?.data?._id,
                role: res?.data?.data?.role,
                onboardingCompleted: res?.data?.data?.onboardingCompleted,
                status: res?.data?.data?.onboardingApplication?.status,
                redirect: false,
            })
        }
        return res.data
    } catch (error: any) {
        return error?.response?.data
    }
}


export const logoutAction = async () => {
    try {
        await signOut()
    } catch (error: any) {
        return error?.response?.data
    }
}

export const getTokenCustom = async () => {
    const cookiesOfNextAuth = cookies().get(process.env.JWT_SALT as string)
    return cookiesOfNextAuth?.value!
}

export const getStripePk = async () => {
    return process.env.STRIPE_PUBLISHABLE_KEY as string
}
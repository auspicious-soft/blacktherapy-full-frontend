'use server'

import { signIn, signOut } from "@/auth"
import { loginService } from "@/services/admin/admin-service"
import { cookies } from "next/headers"

export const loginAction = async (payload: any) => {
    try {
        const res: any = await loginService(payload)
        console.log('res:', res);
        if (res.data.success) {
            await signIn('credentials', {
                email: payload.email,
                name: res?.data?.data.firstName + ' ' + res?.data?.data.lastName,
                _id: res?.data?.data?.id,
                role: res?.data?.data?.role,
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
    const cookiesOfNextAuth = cookies().get("authjs.session-token")
    return cookiesOfNextAuth?.value!
}
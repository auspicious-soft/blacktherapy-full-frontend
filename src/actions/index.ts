'use server'

import { signIn, signOut } from "@/auth"
import { loginService } from "@/services/admin/admin-service"
import { cookies } from "next/headers"
import { createS3Client } from "@/config/s3"
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

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


export const getImageUrl = async (imageKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
    }
    try {
        const command = new GetObjectCommand(params)
        const url = await getSignedUrl(await createS3Client(), command
            // , { expiresIn: 3600 }
        )
        return url;
    } catch (error) {
        throw error
    }
}

// Generate a signed URL to upload a file to S3 presigned
export const generateSignedUrlToUploadOn = async (fileName: string, fileType: string, userEmail: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `projects/${userEmail}/my-media/${fileName}`,
        ContentType: fileType
    }
    try {
        const command = new PutObjectCommand(uploadParams)
        const signedUrl = await getSignedUrl(await createS3Client(), command)
        return signedUrl
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error
    }
}

export const generateSignedUrlOfProfilePic = async (fileName: string, fileType: string, userEmail: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `clients/${userEmail}/profile/${fileName}`,
        ContentType: 'image/png'
    }
    try {
        const command = new PutObjectCommand(uploadParams)
        const signedUrl = await getSignedUrl(await createS3Client(), command)
        return signedUrl
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error
    }
}

export const deleteImageFromS3 = async (imageKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey
    }

    try {
        const command = new DeleteObjectCommand(params)
        await (await createS3Client()).send(command)
        console.log(`Successfully deleted ${imageKey} from S3`)
    } catch (error) {
        console.error("Error deleting image from S3:", error)
        throw error
    }
}

export const generateSignedUrlOfAppointment = async (fileName: string, fileType: string, userEmail: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `appointments/${userEmail}/my-appointment-files/${fileName}`,
        ContentType: fileType
    }
    try {
        const command = new PutObjectCommand(uploadParams)
        const signedUrl = await getSignedUrl(await createS3Client(), command)
        return signedUrl
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error
    }
}
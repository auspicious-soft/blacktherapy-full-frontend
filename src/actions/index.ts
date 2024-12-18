'use server'

import { signIn, signOut } from "@/auth"
import { loginService } from "@/services/admin/admin-service"
import { cookies } from "next/headers"
import { createS3Client } from "@/config/s3"
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import jwt, { Algorithm } from "jsonwebtoken"

export const loginAction = async (payload: any) => {
    try {
        const res: any = await loginService(payload)
        if (res && res?.data?.success) {
            await signIn('credentials', {
                email: payload.email,
                name: res?.data?.data?.user?.firstName + ' ' + res?.data?.data?.user?.lastName,
                _id: res?.data?.data?.user?._id,
                role: res?.data?.data?.user?.role,
                onboardingCompleted: res?.data?.data?.user?.onboardingCompleted,
                status: res?.data?.data?.user?.onboardingApplication?.status,
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

export const generateSignedUrlOfProfilePicTherapist = async (fileName: string, fileType: string, userEmail: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `therapists/${userEmail}/profile/${fileName}`,
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

export const generateSignedUrlOfQueries = async(fileName: string, fileType: string, userEmail: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `queries/${userEmail}/my-queries-files/${fileName}`,
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

export const generateVideoSDKToken = async (roomId: string, participantId: string) => {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

    if (!API_KEY || !SECRET_KEY) {
        throw new Error('VideoSDK API credentials are missing');
    }

    const payload = {
        apikey: API_KEY,
        permissions: ['allow_join'], // Allow direct joining
        version: 2,
        roomId: roomId,
        participantId: participantId,
        roles: [''],
    };

    const options = {
        expiresIn: '120m', // Token valid for 2 hours
        algorithm: 'HS256' as Algorithm
    };

    const token = jwt.sign(payload, SECRET_KEY, options);
    return token
}
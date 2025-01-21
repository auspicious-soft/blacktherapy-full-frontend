'use client'
import Image from 'next/image'
import React from 'react'
import SuccessImage from '@/assets/images/client-signup-success.png'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { getProfileService } from '@/services/client/client-service'
import Link from 'next/link'

const ClientSignupSuccess = () => {
    const session = useSession()
    const id = session?.data?.user?.id
    if (id) {
        window.location.href = `/customer/dashboard`
    }
    else return (
        <div className='border flex justify-center items-center flex-col p-4'>
            <Image src={SuccessImage} alt="Successful Registration" width={500} height={500} className='w-50 h-50' />
            <p className='p-3'>Registration successful! Click <Link href="/login" className='text-blue-500'>here</Link> to login.</p>
        </div>
    )
}

export default ClientSignupSuccess

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplicationCompleted from '../components/ApplicationCompleted';
import OnboardingForm from '../components/OnboardingForm';

const Page = async () => {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }

    else if ((session as any)?.user?.role === 'therapist' && (session as any)?.user?.onboardingCompleted === 'true') {
        if ((session as any)?.user?.status === 'Active') {
            redirect('/therapist/dashboard')
        }
        else return <ApplicationCompleted />
    }
    else if ((session as any)?.user?.role !== 'therapist') {
        return <div className='w-full h-screen flex items-center justify-center'>
            No Page Found
        </div>
    }
    else {
        return (
            <div className='container pt-[50px] pb-[80px] relative '>
                <title>BTN | Onboarding</title>
                <OnboardingForm />
            </div>
        )
    }


}

export default Page;

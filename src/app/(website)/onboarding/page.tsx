import OnboardingForm from '@/app/(website)/components/OnboardingForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }

    else if ((session as any)?.user?.onboardingCompleted === 'true' && (session as any)?.user?.status === 'Active' && (session as any)?.user?.role === 'therapist') {
        redirect('/therapist/dashboard')
    }

    return (
        <div className='container pt-[50px] pb-[80px] relative '>
            <title>BTN | Onboarding</title>
            <OnboardingForm/>
        </div>
    )

}

export default Page;

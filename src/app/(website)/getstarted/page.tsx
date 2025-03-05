'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaqTitle, GettingStart } from '@/utils/svgicons';
// import GetStartedImage from '@/assets/images/started-banner.jpg';
import GetStartedImage from '@/assets/images/starter-banner.jpg';
import MainForm from '@/app/(website)/components/MainForm';
import OutOfPocketForm from '../components/OutOfPocketForm';

const Page = () => {
    const [showMainForm, setShowMainForm] = useState(false);
    const [formData, setFormData] = useState<any>({
        // role: 'client',
        serviceSubscribed: '', // Options: 'me', 'us', 'teen'
        insuranceCoverage: '',
        insuranceCompany: {
            memberOrSubscriberId: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            insuranceCompanyName: ''
        },
        organisationName: '',
        organisationEmail: '',
        reasonForLookingHelp: '',
        rateSleepingHabits: '',
        rateCurrentPhysicalHealth: '',
        howYouKnewUs: '',
        gender: '',
        mainIssueBrief: '',
        firstName: '',
        lastName: '',
        dob: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        state: '',
        city: '',
        zipCode: '',
        addressLine1: '',
        addressLine2: '',
        status: 'Active Client',
        // isOnline: false,
        // profilePic: ''
    });

    const handleStartClick = (serviceType: string) => {
        setFormData((prev: any) => ({ ...prev, serviceSubscribed: serviceType }));
        setShowMainForm(true);
    };
    const handleBack = () => {
        setShowMainForm(false);
    };

    return (
        <div className="container pt-[50px] py-[40px] md:pb-[100px]">
            {showMainForm ? (
                // <MainForm formData={formData} setFormData={setFormData} />
                <OutOfPocketForm formData={formData} setFormData={setFormData} onBack={handleBack} />
            ) : (
                <div className="grid md:grid-cols-2 items-center gap-5">
                    <div className="order-2 md:order-none">
                        <h2 className="section-title">Therapy for Us, By Us – Start Your Healing Journey Today</h2>
                        <p className="text-gray-500 text-base md:mt-[40px] mb-5">
                            Choose Your Therapy Type, and We&apos;ll Match You With a Culturally Competent Therapist.
                        </p>
                        <div className="md:max-w-[489px] space-y-5">
                            {/* Individual Therapy Card */}
                            <div onClick={() => handleStartClick('me')} className="cursor-pointer flex items-center justify-between bg-[#CCE9FA] rounded-[20px] p-5">
                                <div className="flex items-center gap-4 md:gap-[27px]">
                                    <p className="start"><FaqTitle /></p>
                                    <div className='max-w-[250px]'>
                                        <h3 className="text-slate-600 text-[18px] md:text-[22px]">Individual</h3>
                                        <p>One-on-One Support for Your Mental Well-Being</p>
                                    </div>
                                </div>
                                     <div className="flex flex-col items-end text-end gap-2">
                                    <button > <GettingStart />  </button>
                                    <p className='text-xs max-w-14'>
                                        Find My Therapist
                                    </p>
                                </div>
                            </div>

                            {/* Couple Therapy Card */}
                            <div onClick={() => handleStartClick('us')} className="cursor-pointer flex items-center justify-between bg-[#FFBBCD] rounded-[20px] p-5">
                                <div className="flex items-center gap-4 md:gap-[27px]">
                                    <p className="start"><FaqTitle /></p>
                                    <div className='max-w-[250px]'>
                                        <h3 className="text-slate-600 text-[18px] md:text-[22px]">Couple</h3>
                                        <p>Strengthen Your Relationship with Expert Guidance</p>
                                    </div>
                                </div>
                                     <div className="flex flex-col items-end text-end gap-2">
                                    <button > <GettingStart />  </button>
                                    <p className='text-xs max-w-14'>
                                        Find My Therapist
                                    </p>
                                </div>
                            </div>

                            {/* Teen Therapy Card */}
                            <div onClick={() => handleStartClick('teen')} className="cursor-pointer flex items-center justify-between bg-[#FFD899] rounded-[20px] p-5">
                                <div className="flex items-center gap-4 md:gap-[27px]">
                                    <p className="start"><FaqTitle /></p>
                                    <div className='max-w-[250px]'>
                                        <h3 className="text-slate-600 text-[18px] md:text-[22px]">Teens</h3>
                                        <p>Helping Teens Navigate Life with Confidence</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end text-end gap-2">
                                    <button > <GettingStart />  </button>
                                    <p className='text-xs max-w-14'>
                                        Find My Therapist
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-none">
                        <Image src={GetStartedImage} alt="get started" className="rounded-[20px] w-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;

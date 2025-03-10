"use client";
import { ButtonSvg, LineOne, LineTwo, StepOne, StepSecond, StepThree } from '@/utils/svgicons';
import BannerSection from '@/app/(website)/components/BannerSection';
import React, { useState } from 'react';
import banner from "@/assets/images/banner-img1.png"
import GetStartedCard from '@/app/(website)/components/GetStartedCard';
import NumberCard from '@/app/(website)/components/NumberCard';
import RequirementsImage from '@/assets/images/requirements.jpg'
import ListImage from '@/assets/images/li-list.svg'
import Image from 'next/image';
import { DropDown, FaqTitle } from '@/utils/svgicons';
import Link from 'next/link';
import ApplyNowButton from '@/components/apply-now-button';



const Page: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Join Our Therapist Network', url: '/therapistnetwork' }
  ];
  const heading = 'Join the Black Therapy Network: Your Platform for Growth & Impact';
  const imageUrl = banner;

  return (
    <div className="main">
      <title>Join Our Network | Black Therapy Network</title>
      <BannerSection breadcrumbs={breadcrumbs} heading={heading} imageUrl={imageUrl} />
      <GetStarted />
      <Requirements />
      <FaqSection />
    </div>
  )
}

export default Page;

const GetStarted: React.FC = () => {
  return (
    <div className='get-started-section mt-[32px] mb-[40px] lg:mt-[90px] lg:mb-[100px]'>
      <div className="container">

        {/* <div className='grid lg:grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[10px] lg:gap-[20px] items-center mb-[25px] lg:mb-[60px]'>
                  <h2 className='section-title'>
                    How to 
                    get started?
                  </h2>
                  <p className='text-gray-500 text-sm md:text-base font-normal md:leading-7  '>
                    Submit your application and we&apos;ll email you. Complete onboarding and training with a mentor. Then, set your hours and start checking in on clients daily, 5 days a week.
                  </p>
               </div>

               <div className='step-box'>

                  <div className='step-row grid lg:grid-cols-[minmax(0,_9fr)_minmax(0,_3fr)] gap-[10px] items-center lg:gap-[20px]'>
                   <div className='step-number lg:text-center lg:order-2'> 
                       <NumberCard 
                         Count='01' 
                       />
                     </div>
                      <div className='step-icon lg:order-1'>
                        <GetStartedCard 
                         background="#CCE9FA" 
                         icon={<StepOne  />} 
                         title='Submit your application'
                         text='After we receive your application, we&apos;ll reach out via email.'
                        />
                     </div>
                  </div> 
                  <div className='step-row relative z-10 grid lg:grid-cols-[minmax(0,_3fr)_minmax(0,_9fr)] items-center my-8  gap-[10px] md:my-10 lg:my-0 lg:gap-[20px] lg:py-[132px]'>
                    <div className='absolute top-0 left-[8%] z-[-1] hidden lg:block'><LineOne /></div>
                   <div className='step-number lg:text-center'> 
                       <NumberCard 
                         Count='02'
                       />
                     </div>
                      <div className='step-icon'>
                        <GetStartedCard 
                         background="#FFBBCD" 
                         icon={<StepSecond />}  
                         title='Complete onboarding and training'
                         text='Receive "on the job" training with a mentor about how to use The Black Therapy Network.'
                        />
                     </div>
                     <div className='absolute bottom-[2px] left-[33.6%] z-[-1] hidden lg:block'><LineTwo /></div>
                  </div>
                  <div className='step-row grid lg:grid-cols-[minmax(0,_6fr)_minmax(0,_6fr)] gap-[10px] items-center lg:gap-[20px]'>
                   <div className='step-number lg:text-right lg:pr-[80px]'>  
                       <NumberCard 
                         Count='03'
                       />
                     </div>
                      <div className='step-icon'>
                        <GetStartedCard 
                         background="#FFD899"  
                         icon={<StepThree />}  
                         title='Start getting clients'
                         text='Set your caseload and hours, and check in on clients daily, 5 days/week.'
                        />
                     </div>
                  </div>

               </div> */}
        <div className="partner-info p-6 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4 text-[30px]">Why Partner with BTN?</h2>
          <p className="mb-4">
            At <strong>Black Therapy Network (BTN)</strong>, we connect Black therapists with clients seeking culturally competent care. Enjoy <strong>flexible scheduling</strong>, a <strong>steady client stream</strong>, and <strong>hassle-free practice management</strong> while making a real difference.
          </p>
          <ul className="space-y-2 text-black ">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Competitive Pay & Reliable Income</strong> – No need to search for clients.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Work On Your Terms</strong> – Set your schedule & client load.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>No Admin Hassles</strong> – We handle billing & scheduling.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Support Your Community</strong> – Provide therapy in a space that values cultural competence.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Requirements: React.FC = () => {
  const items = [
    { text: '✔ Active Clinical License in the state(s) where you provide services' },
    { text: '✔ Professional Malpractice Liability Insurance (Minimum $1M/$3M policy)' },
    { text: '✔ Fully Completed CAQH Application & NPI Number (National Provider Identifier)' },
    { text: '✔ Reliable Internet Connection & Private Workspace' },
    { text: '✔ Completed Background Check' },
    { text: '✔ Minimum 10 client sessions per week' },
  ];
  const otherItems = [
    { text: '✔ Enrolled in Clinical Supervision with an Approved Supervisor' },
    { text: '✔ Meet State-Specific Supervision Requirements' },
    { text: '✔ Submit Required Documentation (Supervision Affidavit, Insurance, etc.)' },
  ];
  return (
    <div className='requirements-section'>
      <div className='container'>
        <div className='bg-[#283C63] grid lg:grid-cols-[minmax(0,_6fr)_minmax(0,_6fr)] items-center rounded-[20px] gap-[20px] py-[40px] px-[20px] lg:py-[48px] lg:px-[56px]'>
          <div>
            <h2 className='section-title !text-[#fff]'>Who Can Join?</h2>
            <p className='text-[#fff] my-[15px] lg:my-[25px]'>To participate in <b>The Black Therapy Network</b>, therapists must meet the following requirements:
            </p>
            <ul className='list-none p-0'>
              <h3 className='text-white font-bold text-[20px]'>Licensed Therapists (LCSW, LPC, LMHC, LMFT, etc.) </h3>
              {items.map((item, index) => (
                <li key={index} className='text-[#fff] font-[400] my-[12px] flex items-center gap-[10px] lg:gap-[20px] lg:my-[23px]'>
                  <Image src={ListImage} alt={item.text} style={{ width: '25px', height: '25px' }} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <ul className='list-none p-0'>
              <h3 className='text-white font-bold text-[20px]'>Pre-Licensed Associate Therapists (Under Supervision) </h3>
              {otherItems.map((item, index) => (
                <li key={index} className='text-[#fff] font-[400] my-[12px] flex items-center gap-[10px] lg:gap-[20px] lg:my-[23px]'>
                  <Image src={ListImage} alt={item.text} style={{ width: '25px', height: '25px' }} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

          </div>
          <div>
            <div className='auto w-full max-w-[480px] ml-auto mr-auto'>
              <Image src={RequirementsImage} alt='RequirementsImage' className='rounded-[20px]' />
              <div className='p-6 mt-[24px] bg-[#F4FFFE] rounded-[20px]'>
                <p className=' text-[#686C78] leading-[28px] mb-5'>The Black Therapy Network only work with clients in the state(s) where they are licensed and allowed to practice independently</p>
                <ApplyNowButton />
              </div>
            </div>
          </div>
        </div>
        <div className="compensation-section bg-white rounded-[20px] p-6 mt-6 shadow-lg border border-gray-100">
          <h2 className="text-[#283C63] text-xl font-bold mb-4">Compensation & Payment</h2>
          <ul className="space-y-2 mb-5">
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Therapists can earn $1,500+ weekly or $6,000+ monthly</strong>, based on experience, licensure type, and completed sessions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Bi-weekly direct deposit payments.</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Bonuses & incentives available</strong></span>
            </li>
          </ul>

          <h2 className="text-[#283C63] text-xl font-bold mb-4">Why BTN?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>No Upfront Fees</strong> – Unlike other platforms, joining BTN is free.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Culturally Competent Client Matching</strong> – Work with clients looking for therapists like you.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Flexible Caseload</strong> – You choose your client load.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Professional Development & Continuing Education</strong> – Gain access to networking, peer groups, professional development opportunities, trainings, and industry insights to enhance your skills and career growth.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#283C63] mr-2 font-bold">•</span>
              <span className="text-[#686C78]"><strong>Associate Licensure Program</strong> – Structured development and mentorship for pre-licensed therapists to help meet licensure requirements while gaining hands-on experience*.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqData = [
    {
      title: 'Does BTN offer support for pre-licensed associate therapists?',
      content: 'Yes! Our Associate Licensure Program provides structured supervision, mentorship, and hands-on experience to help associate therapists meet licensure requirements while growing their clinical skills.',
    },
    {
      title: 'Who is BTN designed for?',
      content: 'BTN is designed for licensed therapists and pre-licensed associate therapists looking to provide culturally competent care to Black clients in a supportive, flexible environment.'
    },
    {
      title: 'How do I apply?',
      content: 'Simply complete our online application, and we’ll review your credentials before reaching out with next steps.'
    },
    {
      title: 'What are the qualifications to join BTN?',
      content: 'Therapists must hold an active license to practice in their state (e.g., LCSW, LPC, LMFT, PsyD, etc.). Pre-licensed therapists must be enrolled in a supervision program. All therapists must have professional liability insurance and experience in providing culturally competent care.'
    },
    {
      title: 'How does BTN match therapists with clients?',
      content: 'We match clients with therapists based on specialty, availability, and location (if applicable). Therapists can accept or decline clients based on fit and schedule.'
    },
    {
      title: 'Can I work with clients outside my licensed state?',
      content: 'No, you must have an active license in the state where your clients reside. If you are licensed in multiple states, you can see clients in any of those states.'
    },
    {
      title: 'How many clients do I have to take?',
      content: 'It’s up to you! We recommend a minimum of 5+ sessions per week, but you control your caseload and can adjust it as needed.'
    },
    {
      title: 'What is the earning potential?',
      content: 'Therapists can earn $1,500+ weekly or $6,000+ monthly, depending on experience, licensure type, and session volume. The more sessions you take, the more you earn!'
    },
    {
      title: 'What are the payment rates for therapy sessions?',
      content: 'Our pay structure varies based on licensure type and experience. Compensation details are provided during the onboarding process.'
    },
    {
      title: 'When do I get paid?',
      content: 'BTN pays bi-weekly via direct deposit based on completed sessions.'
    },
    {
      title: 'Can I work at another practice or job while working with BTN?',
      content: 'Yes! BTN offers flexible scheduling and does not require exclusivity, allowing you to maintain other employment or private practice work.'
    },
    {
      title: 'Do I need to market myself to find clients?',
      content: 'No! BTN provides a steady stream of clients, so you don’t have to worry about marketing, advertising, or outreach. Additionally, BTN offers a referral fee when therapists bring new clients to the platform.'
    },
    {
      title: 'Do I need my own malpractice insurance?',
      content: 'Yes, all therapists must carry professional liability insurance with a minimum coverage of $1M/$3M.'
    },
    {
      title: 'Is there a fee to join BTN?',
      content: 'No, joining BTN is completely free for therapists. We only charge clients for services.'
    },
    {
      title: 'What kind of support does BTN provide to therapists?',
      content: 'BTN offers ongoing support, peer networking, workshops, and continuing education opportunities to help you grow in your career.'
    },
    {
      title: 'What types of therapy services can I provide?',
      content: 'Therapists can offer individual, couples, and family therapy based on their licensure and expertise. Group therapy options may also be available.'
    },
    {
      title: 'Does BTN provide therapy materials, EHR systems, or billing support?',
      content: 'Yes, BTN provides an electronic health record (EHR) system for scheduling, documentation, and billing.'
    },
    {
      title: 'Do I have to handle client billing or insurance claims?',
      content: 'BTN does not accept insurance at this time but plans to in the future. Currently, therapists do not need to handle any billing as all payments are managed through BTN\'s platform.'
    },
    {
      title: 'How does scheduling work?',
      content: 'You set your own schedule and availability through our online platform. Clients can book appointments based on your open time slots.'
    },
    {
      title: 'What happens if a client cancels a session?',
      content: 'BTN operates on a subscription-based model. Clients can cancel sessions, but refunds or rescheduling options depend on their subscription plan. Therapists will be compensated according to BTN\'s cancellation policy, which ensures fair payment for last-minute cancellations. More details will be provided during onboarding.'
    },
    {
      title: 'Can I see clients in-person, or is BTN fully virtual?',
      content: 'BTN is a fully virtual platform. All sessions must be conducted online through our secure system.'
    },
    {
      title: 'What are the technology requirements for working with BTN?',
      content: 'Therapists must have a reliable internet connection, a secure and private space for sessions, and a HIPAA-compliant device (computer or tablet with a webcam and microphone) for virtual sessions.'
    },
    {
      title: 'Can I refer my own clients to BTN?',
      content: 'Yes! If you bring clients to the platform, you may be eligible for referral incentives.'
    },
    {
      title: 'How do I contact support if I have issues?',
      content: 'BTN provides dedicated therapist support via email and phone during business hours. We also offer a therapist resource center with FAQs, training materials, and troubleshooting guides.'
    },
    {
      title: 'What if I need to take a break from seeing clients?',
      content: 'You can adjust your availability or temporarily pause your practice on BTN. We ask that you provide notice to avoid disruptions in client care.'
    }
  ];


  const [dropdownStates, setDropdownStates] = useState<boolean[]>(
    faqData.map((_, index) => index === 0)
  );

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="about-dropdown container py-[40px] md:py-[100px]">
      <div className='md:pb-[20px]'>
        <div className='flex items-center justify-center'>
          <ApplyNowButton />
        </div>
        <h2 className='section-title mb-3 md:mb-5'>Frequently Asked Questions</h2>
      </div>
      <div className="">
        <div className="">
          {faqData.map((dropdown, index) => (
            <>
              <div className='md:mb-[10px] mb-3' key={index}>
                <h2
                  className={`md:text-lg text-base py-[10px] px-3 md:p-5 bg-[#283C63] rounded-[20px] !text-white cursor-pointer flex justify-between md:items-center ${dropdownStates[index] ? 'active' : ''
                    }`}
                  onClick={() => toggleDropdown(index)}
                >
                  <span className='flex md:items-center gap-[10px] md:gap-5'> <FaqTitle /> {dropdown.title}</span>
                  <span className='drop mt-1 md:mt-0'><DropDown /></span>
                </h2>
                <div
                  className={`transition-max-height duration-300 ease-in-out overflow-hidden ${dropdownStates[index] ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                  <p className='text-base md:leading-7 mt-3 md:mt-5 text-[#686C78] px-3 pb-[20px] md:px-[62px]' dangerouslySetInnerHTML={{ __html: dropdown.content }} />
                  {(index == 2) && <div className='flex items-center justify-center m-10'>
                    <ApplyNowButton />
                  </div>}
                </div>
              </div>

            </>
          ))}
          For additional questions, contact BTN Support at <b className=''>support@blacktherapy.net</b> or visit our Therapist Help Center.
          {<div className='flex items-center justify-center m-10'>
            <ApplyNowButton />
          </div>}
        </div>
      </div>
    </div>
  );

};
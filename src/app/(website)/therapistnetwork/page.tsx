"use client";
import { ButtonSvg, LineOne, LineTwo, StepOne, StepSecond, StepThree} from '@/utils/svgicons';
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



const Page: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Join Our Therapist Network', url: '/therapistnetwork' }
  ];
  const heading = 'Normalizing:Therapy in Black Community';
  const imageUrl = banner;

  return (
    <div className="main"> 
    <title>Our Network | Black Therapy Network</title>
        <BannerSection  breadcrumbs={breadcrumbs} heading={heading} imageUrl={imageUrl} />
        <GetStarted />
        <Requirements />
        <FaqSection />
    </div> 
  )
}

export default Page;

const GetStarted: React.FC = () => {
   return(
        <div className='get-started-section mt-[32px] mb-[40px] lg:mt-[90px] lg:mb-[100px]'>
            <div className="container"> 

               <div className='grid lg:grid-cols-[minmax(0,_5fr)_minmax(0,_7fr)] gap-[10px] lg:gap-[20px] items-center mb-[25px] lg:mb-[60px]'>
                  <h2 className='section-title'>
                    How to get started?
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

               </div>

            </div> 
        </div>
   );
};

const Requirements: React.FC = () => {
  const items = [
    { text: 'Clinical License' },
    { text: 'Individual professional malpractice liability insurance policy' },
    { text: 'Submission of a fully completed, signed CAQH application' },
    { text:  'Individual NPI number' },
    { text: 'Reliable internet connection' },
    { text: 'Completed background check' },
    { text: 'Current residence in the USA' },
    
  ];
return (
   <div className='requirements-section'>
     <div className='container'>
         <div className='bg-[#283C63] grid lg:grid-cols-[minmax(0,_6fr)_minmax(0,_6fr)] items-center rounded-[20px] gap-[20px] py-[40px] px-[20px] lg:py-[48px] lg:px-[56px]'>
            <div>
              <h2 className='section-title !text-[#fff]'>Requirements</h2>   
              <p className='text-[#fff] my-[15px] lg:my-[25px]'>To participate in The Black Therapy Network, therapists are required to possess the following:</p>
              <ul className='list-none p-0'>
                 {items.map((item, index) => (
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
                   <Link href="/signup" className='button'>Apply Now <ButtonSvg /></Link>
                   </div>
                </div>
            </div>
         </div>
     </div>
      
   </div>
);
};

const FaqSection: React.FC = () => {
  const faqData = [
    {
      title: 'How do I apply to become a BlackTherapy Network therapist?',
      content: 'To become a contractor, submit your application here. Once your application is accepted, you&apos;ll begin an “on-the-job” training with a peer mentor for your first 4 weeks on the BlackTherapy Network.',
    },
    {
      title: 'How is therapy delivered on BlackTherapy Network?',
      content: 'Connect virtually with clients on our secure, HIPAA-compliant app. We offer asynchronous messaging via text and audio—this means your clients’ messages don’t require an immediate response, and you always have the flexibility to process and thoughtfully engage on your own schedule. Depending on the client’s plan, we also offer Live Sessions (Video, Audio, and Chat).',
    },
    {
      title: 'Who are BlackTherapy Network clients? How do I get clients?',
      content: 'BlackTherapy Network clients include employees seeking counseling through their organization&apos;s benefits, individuals covered under by our insurance partners (Optum, Aetna, Cigna Beacon, Anthemor Premera), and those who sign up directly through the platform. BlackTherapy Network matches you with clients based on state of residency, as well as your areas of expertise. We’ll always handle patient eligibility.',
    },
    { 
      title: "How much do BlackTherapy Network therapists make as an independent contractor?",
      content: `
         <div class="inner">
          <p>With BlackTherapy Network, you earn money both for conducting live sessions with clients and when you message with them. You can also earn a clinical engagement bonus that is based on the average number of clinical hours spent with clients on the platform per week.</p>
          <p><strong>Here are our rates for live sessions:</strong><br>30 minute session: $34.50<br>45 minute session: $50.93<br>60 minute session: $67.90</p>
          <p>For asynchronous sessions, you&apos;ll receive a rate of ~$25 per session, depending on the plan type.</p>
          <p><strong>Examples:</strong><br><strong>If a provider works 5 hours in a week</strong>, 3 hours of live sessions and 2 hours of message sessions weekly, they can expect to make <strong>$1,385 total monthly ($1,135 base pay and $250 bonus pay)</strong>.</p>
          <p><strong>If a provider works 11 hours in a week</strong>, with 7 hours of live sessions and 4 hours of message sessions weekly, they can expect to make <strong>$3,316 total monthly ($2,566 base pay and $750 bonus pay</strong>).</p>
          <p><strong>If a provider works 40 hours in a week</strong>, with 25 hours of live sessions and 15 hours of message sessions weekly, they can expect to make <strong>$13,253 total monthly ($9,253 base pay and $4000 bonus pay)</strong>.</p>
          <p>We also offer full-time, salaried employment for therapists—the total value of these compensation packages including tax, health insurance, and 401K contributions are competitive with these rates for full-time billable hours.</p>
        </div>
      `,
    },
    {
      title: "What is the time commitment of being a BlackTherapy Network therapist?",
      content: "As an Independent Contractor, you can dedicate as much time as you want to BlackTherapy Network. Our job is to help make your job easier and more convenient. You&apos;ll have flexibility in your schedule, and receive as many referrals you&apos;d like while practicing the craft you love.",
    },
    {
      title: "Is it possible to be a BlackTherapy Network therapist alongside other work?",
      content: "BlackTherapy Network can be your primary source of income or supplement existing work. As a BlackTherapy Network therapist, you&apos;ll also be eligible for bonuses based on continued engagement with clients.",
    },
  ];

  const [dropdownStates, setDropdownStates] = useState<boolean[]>(
    faqData.map((_, index) => index === 0)
  );

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return(
    <div className="about-dropdown container py-[40px] md:py-[100px]">
      <div className='md:pb-[20px]'>
        <h2 className='section-title mb-3 md:mb-5'>Frequently Asked Questions</h2>
      </div>
      <div className="">
        <div className="">
          {faqData.map((dropdown, index) => (
            <div className='md:mb-[10px] mb-3' key={index}>
              <h2
                className={`md:text-lg text-base py-[10px] px-3 md:p-5 bg-[#283C63] rounded-[20px] !text-white cursor-pointer flex justify-between md:items-center ${
                    dropdownStates[index] ? 'active' : ''
                  }`}
                onClick={() => toggleDropdown(index)}
              >
                <span className='flex md:items-center gap-[10px] md:gap-5'> <FaqTitle /> {dropdown.title}</span> 
                <span className='drop mt-1 md:mt-0'><DropDown /></span>
              </h2>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  dropdownStates[index] ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                <p className='text-base md:leading-7 mt-3 md:mt-5 text-[#686C78] px-3 pb-[20px] md:px-[62px]' dangerouslySetInnerHTML={{ __html: dropdown.content }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};
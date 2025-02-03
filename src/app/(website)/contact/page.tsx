
import BannerSection from '@/app/(website)/components/BannerSection';
import React from 'react';
import banner from "@/assets/images/banner-img1.png"
import { CallIcon, EmailIcon, LocationIcon, SubmitIcon } from '@/utils/svgicons';
import ContactInfoCard from '@/app/(website)/components/ContactInfoCard';

const Page: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Contact Us', url: '/contact' }
  ];
  const heading = 'Let’s get in Touch'; 
  const imageUrl = banner;

  return (
    <div className="main"> 
        <BannerSection  breadcrumbs={breadcrumbs} heading={heading} imageUrl={imageUrl} />
        <ContactForm />
        <ContactInfo />
    </div> 
  )
}

export default Page; 

const ContactForm: React.FC = () => {
  return (
    <div className='contact-outer'>
      <div className='container'>
        <div className='bg-white border-[1px] border-[#7FAEB5] py-[30px] px-[20px] rounded-[20px] mt-[40px] lg:mt-[100px] lg:p-[50px]'>
          <h2 className='section-title text-center text-[#283C63] mb-[25px] lg:mb-[50px]'>Fill In the form below</h2>
          <form className="w-full max-w-[1000px] ml-auto mr-auto">
            <div className="grid gap-x-[24px] lg:grid-cols-[minmax(0,_6fr)_minmax(0,_6fr)] ">
              <div className='form-feild'>
                <label htmlFor="frm-first" className="sr-only">First Name</label>
                <input id="frm-first" type="text" name="first" autoComplete="given-name" placeholder='First Name*' required />
              </div>
              <div className='form-feild'>
                <label htmlFor="frm-last" className="sr-only">Last Name</label>
                <input id="frm-last" type="text" name="last" autoComplete="family-name" placeholder='Last Name' />
              </div>
            </div>
            <div className="grid gap-x-[24px] lg:grid-cols-[minmax(0,_6fr)_minmax(0,_6fr)] ">
              <div className='form-feild'>
                <label htmlFor="frm-email" className="sr-only">Email</label>
                <input id="frm-email" type="email" name="email" autoComplete="email" placeholder='Email*' required />
              </div>
              <div className='form-feild'>
                <label htmlFor="frm-phone" className="sr-only">Phone</label>
                <input id="frm-phone" type="text" name="phone" autoComplete="tel" placeholder='Phone Number' />
              </div>
            </div>
            <div className='form-feild'>
              <label htmlFor="frm-type" className="sr-only">Type of Contact</label>
              <select id="frm-type" aria-label="Type of Contact" required>
                <option value="">Subject*</option>
                <option value="1">I am a registered client and I need support.</option>
                <option value="2">I am a current BetterHelp therapist and I need support.</option>
                <option value="3">I am a therapist interested in joining or a current applicant.</option>
                <option value="4">I have a question about the service.</option>
                <option value="5">I have a billing related question.</option>
                <option value="6">I have a press-related question.</option>
                <option value="7">I have a business-related inquiry.</option>
                <option value="8">I am interested in BetterHelp for my organization.</option>
              </select>
            </div>
            <div className='form-feild'>
              <textarea id="frm-message"  name="message" placeholder='Message*'></textarea>
            </div>
            <div className="started-button flex justify-center">
              <button className='button' type="submit">Get Started <SubmitIcon /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactInfo: React.FC = () => {
  return(
    <div className='container'> 
      <div className='grid md:grid-cols-3 gap-[10px] lg:gap-[24px] mb-[40px] mt-[40px] lg:mt-[50px] lg:mb-[100px]'>  
        <ContactInfoCard
        icon={<EmailIcon  />} 
        text={ 
          <>
            <p>hello@theblacktherapynetwork.com</p>
          </>
        }
        />

        <ContactInfoCard
          icon={<CallIcon />} 
          text={ 
            <>
               <p>888-383-6002 (Call)</p>
               <p>980-333-4063 (Fax)</p>
            </>
          }
        />

      <ContactInfoCard
          icon={<LocationIcon />} 
          text={ 
            <>
              <p>P.O. BOX 42915 Charlotte, NC 28215</p>
              <p>The Ship Group Services The Black Therapy Network 3126 Milton Road, Ste 222B Charlotte, NC 28215</p>
            </>
          } 
        />
        </div>
   </div>
  );
  
};
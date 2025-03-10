"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import about3 from '@/assets/images/img10.png' // Adjust the import based on your project structure
import { DropDown } from '@/utils/svgicons';

const dropdownData = [
  {
    title: 'Our mission',
    content: (
      <div className="bg-white rounded-lg p-4 mt-4">
        <p className="mb-4 text-gray-800 text-base md:leading-7">
          The Black Therapy Network is committed to providing 
          <strong> accessible, culturally affirming online therapy </strong> 
          for the African American community. We create a safe, supportive space 
          where individuals, couples, and families can heal, grow, and build resilience.
        </p>
        
        <p className="text-gray-800 text-base md:leading-7">
          Through our specialized approach, we empower clients to lead healthier, 
          more fulfilling lives—rooted in their cultural identities, experiences, and strengths.
        </p>
      </div>
    ),
  },
  {
    title: 'Our Vision',
    content: (
      <div className="bg-white rounded-lg p-4 mt-4">
        <p className="mb-4 text-gray-800 text-base md:leading-7">
          We strive to be the 
          <strong> premier online therapy platform </strong> 
          for Black individuals, couples, and families—offering care that truly 
          understands their experiences.
        </p>
        
        <p className="text-gray-800 text-base md:leading-7">
          By prioritizing 
          <strong> inclusivity, innovation, and high-quality care</strong>, 
          we aim to 
          <strong> dismantle the stigma </strong> 
          surrounding mental health in the Black community. Our vision is a future 
          where every person feels empowered to prioritize their emotional well-being 
          <strong> without hesitation</strong>.
        </p>
      </div>
    ),
  },
];

const AboutThird: React.FC = () => {
  const [dropdownStates, setDropdownStates] = useState<boolean[]>(
    dropdownData.map((_, index) => index === 0)
  );

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="about-dropdown container py-[50px] md:py-[100px]">
      <div className="gap-5 md:gap-0 md:p-[35px] p-5 lg:py-[50px] lg:pl-[80px] lg:pr-[50px] grid md:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] bg-[#283C63] rounded-[20px]">
        <div className="md:pr-[55px]">
          {dropdownData.map((dropdown, index) => (
            <div className='border-b-[1px] pb-8 mb-3 border-slate-500' key={index}>
              <h2
                className={`section-title !text-white cursor-pointer flex justify-between items-center ${
                    dropdownStates[index] ? 'active' : ''
                  }`}
                onClick={() => toggleDropdown(index)}
              >
                {dropdown.title}
                <span className='drop'><DropDown /></span>
              </h2>
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  dropdownStates[index] ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                {dropdown.content}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Image src={about3} alt="about2" className="rounded-[20px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default AboutThird;
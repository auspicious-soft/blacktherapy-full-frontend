"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import about3 from '@/assets/images/img10.png' // Adjust the import based on your project structure
import { DropDown } from '@/utils/svgicons';

const dropdownData = [
  {
    title: 'Our mission',
    content: 'At the Black Therapy Network, our mission is to provide accessible and culturally sensitive online therapy services exclusively for the African American community. We are committed to fostering mental and emotional well-being by offering a safe, supportive, and affirming space where individuals, couples, and children can explore their inner worlds, heal from past wounds, and cultivate resilience. Through our specialized approach, we aim to empower our clients to lead healthier, more fulfilling lives, rooted in their unique identities and experiences.',
  },
  {
    title: 'Our Vision',
    content: 'Our vision at the Black Therapy Network is to create a transformative impact within the African American community by becoming a beacon of healing, growth, and cultural understanding. We aspire to be the go-to platform where individuals, couples, and families find exceptional online therapy services tailored to their specific needs and cultural background. Through our commitment to innovation, inclusivity, and quality care, we envision a future where the stigma surrounding mental health in the African American community is dismantled, and every person feels empowered to prioritize their emotional well-being without hesitation.',
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
      <div className="gap-5 md:gap-0 md:p-[35px] p-5 lg:py-[50px] lg:pl-[80px] lg:pr-[50px]  grid md:grid-cols-[minmax(0,_7fr)_minmax(0,_5fr)] bg-[#283C63] rounded-[20px]">
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
                <p className='text-white text-base md:leading-7 mt-5'>{dropdown.content}</p>
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

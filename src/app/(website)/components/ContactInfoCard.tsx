import React from 'react'
interface ContactInfoCardProps{
   icon: React.ReactNode
   text: React.ReactNode;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, text }) => {  
  return (
       <div className='custom-css flex flex-col bg-white border-[1px] border-[#7FAEB5] p-[20px] rounded-[20px] lg:p-[30px] '>
          <div  className='border-[#7FAEB5] border-b min-h-[58px] flex items-center pb-[10px] mb-[15px] lg:mb-[30px]'>
             {icon}
          </div>
          <div>
             <div className='text-sm md:text-base text-[#686C78] leading-[28px]'>{text}</div> 
          </div>
      </div>
  )
}
export default ContactInfoCard
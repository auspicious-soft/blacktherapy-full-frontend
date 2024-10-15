import React from 'react'
interface GetStartedCardProps{
   icon: React.ReactNode
   title: string
   text: string
   background: string
}

const GetStartedCard: React.FC<GetStartedCardProps> = ({ icon, title, text, background }) => {  
  return (
       <div className='flex gap-[20px] items-center'>
        <div  className='grid place-items-center rounded-[20px] min-w-[90px] h-[80px] md:min-w-[180px] md:h-[128px]' style={{ backgroundColor: background }}> {icon}</div>
      <div>
        <h4 className='text-base mb-[5px] md:text-[22px] lg:mb-[12px]'>{title}</h4>
        <p className='text-sm md:text-base text-[#686C78]'>{text}</p> 
      </div>
    </div>
  )
}
export default GetStartedCard
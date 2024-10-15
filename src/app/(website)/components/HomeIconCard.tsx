import { BriefIcon } from '@/utils/svgicons'
import React from 'react'
interface HomeIconCardProps {
    icon: React.ReactNode
    maintitle: string
    text: string
  }
  const HomeIconCard: React.FC<HomeIconCardProps> = ({ icon, maintitle, text }) => {
  return (
    <div className='flex gap-5'>
      <div>
        <div  className='w-[50px] h-[50px] md:w-[70px] md:h-[70px] grid place-items-center bg-[#ffffff33] rounded-[5px] border border-white/opacity-50 '> {icon}</div>
      </div>
      <div>
        <h3 className='text-white text-base md:text-xl'>{maintitle}</h3>
        <p className='text-zinc-300 text-sm md:text-base'>{text}</p>
      </div>
    </div>
  )
}
export default HomeIconCard

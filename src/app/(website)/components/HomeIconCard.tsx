import React from 'react'

interface HomeIconCardProps {
  icon: React.ReactNode
  maintitle: string
  text: string
}

const HomeIconCard: React.FC<HomeIconCardProps> = ({ icon, maintitle, text }) => {
  return (
    <div className='hover:scale-105 ease-in cursor-pointer flex gap-5 items-start transition-transform hover:translate-x-1'>
      <div>
        <div className='w-[55px] h-[55px] md:w-[70px] md:h-[70px] grid place-items-center bg-[#ffffff26] rounded-[10px] border border-white/20 shadow-md transition-all hover:bg-[#ffffff33]'>
          {icon}
        </div>
      </div>
      <div>
        <h3 className='text-white text-base md:text-xl font-medium mb-1'>{maintitle}</h3>
        <p className='text-zinc-300 text-sm md:text-base'>{text}</p>
      </div>
    </div>
  );
};

export default HomeIconCard
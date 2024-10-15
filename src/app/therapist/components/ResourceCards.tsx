
import { CardButton } from '@/utils/svgicons';
import React from 'react';
interface ResourceCardsProps {
    icon: React.ReactNode; 
    title: string;
    value: string;
  };
const ResourceCards: React.FC<ResourceCardsProps> = ({icon, title, value}) => {
    return (
        <>
        <div className="hover-transition overflow-hidden relative bg-[#e0f2fc] rounded-[10px] border text-center border-[#CCE9FA] md:py-[44px] md:px-[15px] p-[15px]">
        <div className='hover-wrap'>
       <div className='flex justify-center'> {icon} </div>
       <h4 className='md:text-[18px]  mt-[30px]  mb-[15px]'>{title} </h4>
        <p className='leading-normal text-xs text-[#686C78]'>{value}</p>
       </div>
       <div className='text-right mt-[9px]'>
        <button className='transition-button '> <CardButton /></button>
       </div>
        </div>
        </>
    );
}

export default ResourceCards;

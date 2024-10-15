import { SearchIcon } from '@/utils/svgicons';
import React from 'react';

const SearchBar = () => {
    return (
        <div className='w-[280px]'>
            <label htmlFor="" className='relative flex w-full '>
            <input type="search" name="" id="" placeholder="Search" className='!h-[46px] placeholder:text-[#26395E] w-full px-5 pl-[50px] focus-visible:outline-none bg-transparent rounded-r-none rounded-l-[8px] py-[10px] border border-r-0 border-[#D9DCE2] text-[#26395E] '/>
            <span className='absolute left-5 top-[15px] '><SearchIcon /> </span>
            <button className='button !h-[46px] ml-[-5px]'>Go</button>
            </label>
        </div>
    );
}

export default SearchBar;

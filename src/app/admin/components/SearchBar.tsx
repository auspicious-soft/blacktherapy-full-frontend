import { SearchIcon } from '@/utils/svgicons';
import React, { useEffect, useState } from 'react';
interface SearchBarProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = (props: SearchBarProps) => {
    const { setQuery } = props;
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => {
            setQuery(`${inputValue ? 'description=' :''}${inputValue.trim()}`);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, setQuery]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    return (
        <div className='w-[280px]'>
            <label htmlFor="" className='relative flex w-full '>
            <input type="search"
             value={inputValue}
             onChange={handleInputChange}
             name="" id="" placeholder="Search" className='!h-[46px] placeholder:text-[#26395E] w-full px-5 pl-[50px] focus-visible:outline-none bg-transparent rounded-r-none rounded-l-[8px] py-[10px] border border-r-0 border-[#D9DCE2] text-[#26395E] '/>
            <span className='absolute left-5 top-[15px] '><SearchIcon /> </span>
            <button className='button !h-[46px] ml-[-5px]'>Go</button>
            </label>
        </div>
    );
}

export default SearchBar;

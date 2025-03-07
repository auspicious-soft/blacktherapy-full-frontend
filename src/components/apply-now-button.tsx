import { ButtonSvg } from '@/utils/svgicons'
import Link from 'next/link'
import React from 'react'

const ApplyNowButton = () => {
    return (
        <Link
            href="/signup"
            className='button bg-[#283C63] text-white py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-all hover:bg-[#1a2a4d] animate-bounce hover:animate-none relative overflow-hidden group'
        >
            <span className="relative z-10">Apply Now</span>
            <span className="relative z-10"><ButtonSvg /></span>
            <span className="absolute inset-0 bg-[#283C63] opacity-30 group-hover:opacity-60 transition-opacity"></span>
            <span className="absolute -inset-1 bg-white/20 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
        </Link>
    )
}

export default ApplyNowButton
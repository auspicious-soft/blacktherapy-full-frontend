'use client';
import Image from 'next/image';
import React from 'react';


export const SeventhSection: React.FC = () => {
  const iOSUrl = "https://apps.apple.com/us/app9856jihfh";
  const androidUrl = "https://play.google.com/store/apps/details?id=your-app-id";

  return (
    <div className="text-center p-5">
      <h2 className="text-3xl font-bold">💡 &quot;Therapy at Your Fingertips – Download Our App&quot;</h2>
      <p className="text-base p-5">Get matched with a therapist, schedule sessions, and access mental health resources—all from your phone.</p>
    <div className="flex mt-5 mb-4 items-center w-full justify-center "> 
      <a href={iOSUrl} className="mx-2.5" target='_blank'>
        <Image src="https://static.vecteezy.com/system/resources/thumbnails/024/170/865/small_2x/badge-google-play-and-app-store-button-download-free-png.png" alt="Download on the App Store" width={135} height={40} 
        className='h-[40px] mix-blend-multiply'/>
      </a>
      <a href={androidUrl} className="mx-2.5" target='_blank'>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={135} height={40} 
        className=''/>
      </a>
    </div>
    </div>
  );
};


import React from "react";
import Image, { StaticImageData } from 'next/image';
import ReactLoader from "@/components/ReactLoader";

interface CardProps {
  image: string | StaticImageData;
  text: string;
  profilelink: string;
  isLoading?: boolean;
}

const TherapyCard: React.FC<CardProps> = ({ image, text, profilelink, isLoading }) => {
  console.log('isLoading: ', isLoading);
  return (
    <div className="therapy-card">
      {!isLoading ? <a href={profilelink}>
        <Image src={image} alt={text} width={300} height={200} className="aspect-square rounded-[20px] object-cover" unoptimized />
        <h2 className="text-slate-700 text-base md:text-2xl mt-2 md:mt-5">{text}</h2>
      </a>
        :
        <ReactLoader />
      }
    </div>
  );
};

export default TherapyCard;

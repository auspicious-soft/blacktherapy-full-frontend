"use client"
import React, { useState } from "react";
import image1 from "@/assets/images/img1.png"
import image2 from "@/assets/images/img2.png"
import image3 from "@/assets/images/img3.png"
import image4 from "@/assets/images/img4.png"
import image5 from "@/assets/images/img5.png"
import image6 from "@/assets/images/img6.png"
import TherapyCard from "@/app/(website)/components/TherapyCard";
import { ButtonSvg } from "@/utils/svgicons";


const data = [
  { id: 1, image: image1, text: "Our Therapist", profilelink: "#" },
  { id: 2, image: image2, text: "Our Therapist", profilelink: "#" },
  { id: 3, image: image3, text: "Our Therapist", profilelink: "#" },
  { id: 4, image: image4, text: "Our Therapist", profilelink: "#" },
  { id: 5, image: image5, text: "Our Therapist", profilelink: "#" },
  { id: 6, image: image6, text: "Our Therapist", profilelink: "#" },
  // Add more items as needed
];

const OurTherapist: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(4);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <div className="container py-[40px] md:py-[100px]">
     <div className="">
     <div className="grid md:grid-cols-4 grid-cols-2 md:gap-x-5 gap-x-3 gap-y-5 md:gap-y-10 ">
        {data.slice(0, visibleItems).map((item) => (
          <TherapyCard key={item.id} image={item.image} text={item.text} profilelink={item.profilelink}/>
        ))}
      </div>
      {visibleItems < data.length && (
       <div className="pt-[30px] md:pt-[60px]">
         <button className="button mx-auto" onClick={handleLoadMore}>
          Load More
          <ButtonSvg />
        </button>
       </div>
      )}
     </div>
    </div>
  );
};

export default OurTherapist;

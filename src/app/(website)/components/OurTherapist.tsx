"use client"
import React, { useEffect, useState } from "react";
import profilePic from "@/assets/images/profile.png";

import TherapyCard from "@/app/(website)/components/TherapyCard";
import { ButtonSvg } from "@/utils/svgicons";
import useSWR from "swr";
import { GetTherapistsData } from "@/services/admin/admin-service";
import { getImageUrlOfS3 } from "@/utils";
import ReactLoader from "@/components/ReactLoader";


const OurTherapist: React.FC = () => {
  const { data, error, mutate } = useSWR(`/admin/therapists`, GetTherapistsData)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    if (!data || data == undefined) {
      setLoading(true)
    }
    if (data) {
      setLoading(false)
    }
  }, [data])
  const therapistsData = data?.data?.data
  const [visibleItems, setVisibleItems] = useState(4);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <div className="container py-[40px] md:py-[100px]">
      <div className="">
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-x-5 gap-x-3 gap-y-5 md:gap-y-10 ">
          {therapistsData?.slice(0, visibleItems).map((item: any) => {
            return (
              <TherapyCard isLoading={isLoading} key={item.id} image={item?.otherDetailsOfTherapist?.profilePic ? getImageUrlOfS3(item?.otherDetailsOfTherapist?.profilePic) : profilePic} text={item.firstName + ' ' + item.lastName} profilelink={item.profilelink} />
            )
          })}
        </div>
        {visibleItems < therapistsData?.length && (
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

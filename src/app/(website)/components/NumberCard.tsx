import React from "react";
interface NumberCardProps{
    Count: string
}

const NumberCard: React.FC<NumberCardProps> = ({Count}) => {
 return(
     <span className="font-antic text-[60px] text-[#CCE9FA] leading-[60px] md:text-[120px] ">{Count}</span> 
 )
}
export default NumberCard 
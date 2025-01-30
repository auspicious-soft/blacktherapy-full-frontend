"use client"

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter();
    return (
        <IoMdArrowRoundBack
            onClick={() => router.back()}
            className="text-black text-lg cursor-pointer"
        />
    );
};

export default BackButton;
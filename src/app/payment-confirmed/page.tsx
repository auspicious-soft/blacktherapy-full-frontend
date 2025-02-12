import React, { Suspense } from "react";
import ReactLoader from "@/components/ReactLoader";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import paymentConfirmedImage from "@/assets/images/payment-confirmed.svg";
import Link from "next/link";
import BackButton from "@/components/back-button";
import VideoPlayer from "@/app/(website)/components/VideoPlayer";


const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const session = await auth();
    if (!session) redirect("/login");
    const sessionId = searchParams?.session_id;
    if (!sessionId) {
        redirect("/customer/dashboard");
    }

    return (
        <Suspense fallback={<ReactLoader />}>
            <div className="p-2">
                <BackButton />
            </div>
            <div className="sm:flex justify-center items-center h-[calc(100%-1rem)] w-full gap-4">
                <div className="p-4 flex w-full flex-col items-center gap-4">
                    <VideoPlayer url="/tut-btn.mp4" muted={false} controls />
                    <p className="font-bold">This is how you book an appointment</p>
                </div>
                <div className="bg-white mr-4 p-8 rounded-lg shadow-md text-center max-w-md w-full sm:h-full flex flex-col">
                    {/* Image */}
                    <div className="mb-6">
                        <Image
                            src={paymentConfirmedImage}
                            alt="Payment Confirmed"
                            width={400} // Adjust width as needed
                            height={400} // Adjust height as needed
                            className="mx-auto w-[400px] h-[350px]"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h1>

                    {/* Message */}
                    <p className="text-gray-600 mt-6 p-2">
                        Your payment was successful. Now you can book your consultation.
                    </p>
                    {/* Button */}
                    <Link href={'/customer/appointments'} className="mt-auto bg-[#283c63] p-5 text-white px-6 py-2 rounded-md hover:bg-[#4b6bac] transition-colors">
                        Book Now
                    </Link>
                </div>

            </div>
        </Suspense>
    );
};

export default Page;
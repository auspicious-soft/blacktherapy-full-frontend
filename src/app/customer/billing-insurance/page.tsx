'use client'
import { ButtonArrow } from "@/utils/svgicons";
import BillingDetails from "../components/BillingDetails";
import CheckoutForm from "../components/upgrade-plan/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { getStripePk } from "@/actions";
import { useEffect, useState } from "react";
import { get } from "http";
import { getClientSecretService } from "@/services/client/client-service";


const Page = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState()
  const initializeStripe = async () => {
    try {
      const publishableKey = await getStripePk();
      setStripePromise(loadStripe(publishableKey));
    } catch (error) {
      console.error('Error initializing Stripe:', error);
    }
  }
    const sampleClientSecret = "pi_XXXXXXXXXXXXXXXX_secret_XXXXXXXXXXXXXXXX"; 
  const getClientSecret = async () => {
    const res = await getClientSecretService('/client/get-payment-request')
    const data = await res?.data
    setClientSecret(data?.clientSecret)
  }
  useEffect(() => {
    initializeStripe()
    getClientSecret()
  }, []);

  if (!stripePromise) {
    return <p>Loading payment...</p>;
  }

  const options = {
    clientSecret: sampleClientSecret,
  };

    return(
        <div>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">Billing & Insurance</h1>
        <div className="grid md:grid-cols-3 gap-[15px] mt-[30px]  mb-[30px] lg:gap-[24px] lg:mt-[50px] lg:mb-[45px]">
          <div className="bg-[#283C63] carg-bg  rounded-[10px] py-6 px-[15px] lg:px-[30px]">  
            <h6 className="text-[#DEDEDE]">Next Appointment</h6>
            <h2 className="text-[#fff] leading-7 mt-2 text-[26px] ">ABC Name of Company</h2>
            <div className=" mt-4">
              <p className="font-gothamMedium text-[#DEDEDE]">Member Id</p>
              <h5 className="text-[#fff] ">6549815498</h5>
            </div>
        
          </div>
          <div className="bg-[#FFD899]   carg-bg rounded-[10px] py-6 px-[15px] lg:px-[30px]">
            <h6 className="text-[#686868]">Plan Details</h6>
            <div className="flex justify-between items-center gap-10 mt-[10px]">
              <p className="font-gothamMedium">Start Date</p>
              <h5>24 July 2024</h5>
            </div>
            <div className="flex justify-between items-center gap-10 mt-[10px]">
              <p className="font-gothamMedium">Renewal Date</p>
              <h5>24 August 2024</h5>
            </div>
            <button className="renew-btn flex items-center gap-[15px] text-[#263A5F] ">Renew Plan <ButtonArrow/> </button>
          </div>
          <div className="bg-[#FFBBCD]   carg-bg rounded-[10px] py-6 px-[15px] lg:px-[30px]">
          <h6 className="text-[#686868]">Billing & Balance</h6>
          <div className="flex justify-between items-center gap-10 mt-[10px]">
              <p className="font-gothamMedium">Previous Billing</p>
              <h5>$25.36</h5>
            </div>
            <div className="flex justify-between items-center gap-10 mt-[10px]">
              <p className="font-gothamMedium">Balance Amount</p>
              <h5>$5.36</h5>
            </div>
          </div>
        </div>
        <p className="text-[26px] text-[#283C63] leading-7 mb-5 ">Billing details</p>
        <BillingDetails />

      <Elements stripe={stripePromise as any} options={options}>
      <CheckoutForm />
     </Elements>
        </div>
    );
};
export default Page
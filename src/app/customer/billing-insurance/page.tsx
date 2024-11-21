'use client'
import useSWR from "swr";
import { useState } from "react";
import Modal from 'react-modal';
import ViewPlans from "../components/ViewPlans";
import { ButtonArrow } from "@/utils/svgicons";
import BillingDetails from "../components/BillingDetails";
import { getCustomersCurrentSubscription, getCustomerSubscriptionDetails, getProfileService } from "@/services/client/client-service";
import ReactLoading from "react-loading";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const Page = () => {
  const session = useSession()
  const [openPlansModal, setOpenPlansModal] = useState(false);
  const id = session?.data?.user?.id
  const { data: userData, error: userError, isLoading: userLoading } = useSWR(`/client/${id}`, getProfileService);
  const insuranceData = userData?.data?.data?.insuranceCompany
  const stripeCustomerId = userData?.data?.data?.stripeCustomerId
  const  planOrSubscriptionId  = userData?.data?.data?.planOrSubscriptionId
  const { data, error, isLoading } = useSWR(stripeCustomerId ? `${stripeCustomerId}` : null, getCustomerSubscriptionDetails);
  const { data: currentSubscriptionData, error: currentSubscriptionError, isLoading: currentSubscriptionLoading } = useSWR(planOrSubscriptionId ? `${planOrSubscriptionId}` : null, getCustomersCurrentSubscription);
  if (isLoading) return <ReactLoading type={'spin'} color={'#26395e'} height={'50px'} width={'50px'} />
  if (userLoading) return <ReactLoading type={'spin'} color={'#26395e'} height={'50px'} width={'50px'} />
  if (error) return toast.error('Error loading subscription details')
  if (userError) return toast.error('Error loading user details')


  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">Billing & Insurance</h1>
      <div className="grid md:grid-cols-3 gap-[15px] mt-[30px]  mb-[30px] lg:gap-[24px] lg:mt-[50px] lg:mb-[45px]">
        <div className="bg-[#283C63] carg-bg  rounded-[10px] py-6 px-[15px] lg:px-[30px]">
          <h6 className="text-[#DEDEDE]">Insurance Details</h6>
          <h2 className="text-[#fff] leading-7 mt-2 text-[26px] ">{insuranceData?.insuranceCompanyName}</h2>
          <div className=" mt-4">
            <p className="font-gothamMedium text-[#DEDEDE]">Member Id</p>
            <h5 className="text-[#fff] ">{insuranceData?.memberOrSubscriberId}</h5>
          </div>

        </div>
        <div className="bg-[#FFD899]   carg-bg rounded-[10px] py-6 px-[15px] lg:px-[30px]">
          <h6 className="text-[#686868]">Plan Details</h6>
          <div className="flex justify-between items-center gap-10 mt-[10px]">
            <p className="font-gothamMedium">Start Date</p>
            <h5 className="font-bold">{currentSubscriptionData?.current_period_start ? new Date(currentSubscriptionData?.current_period_start * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : <ReactLoading type={'spin'} color={'#26395e'} height={'10px'} width={'10px'} />}</h5>
          </div>
          <div className="flex justify-between items-center gap-10 mt-[10px]">
            <p className="font-gothamMedium">Renewal Date</p>
            <h5 className="font-bold">{currentSubscriptionData?.current_period_end ? new Date(currentSubscriptionData?.current_period_end * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : <ReactLoading type={'spin'} color={'#26395e'} height={'10px'} width={'10px'} />}</h5>
        
          </div>
          <button className="renew-btn flex items-center gap-[15px] text-[#263A5F] ">Renew Plan <ButtonArrow /> </button>
        </div>
        <div className="bg-[#FFBBCD]   carg-bg rounded-[10px] py-6 px-[15px] lg:px-[30px]">
          <h6 className="text-lg font-bold">Our Plans</h6>
          <div className="flex justify-between items-center gap-10 mt-[10px]">
            <h5 className="text-base">Stay Rooted Plan</h5>
            <p className="font-gothamMedium font-bold">Weekly</p>
          </div>
          <div className="flex justify-between items-center gap-10 mt-[10px]">
            <h5 className="text-base">Glow Up Plan</h5>
            <p className="font-gothamMedium font-bold">Weekly, Monthly</p>
          </div>
          <button onClick={() => setOpenPlansModal(true)} className="button !h-10">View Details</button>
        </div>
      </div>

      <p className="text-[26px] text-[#283C63] leading-7 mb-5 ">Billing details</p>

      <BillingDetails hasMore={data?.has_more ?? false} billingData={data?.data as any ?? []} />

      {openPlansModal && (
        <Modal
          isOpen={openPlansModal}
          className="modal bg-[#E7F8F6] max-w-[1200px] p-10 mx-auto rounded-[20px] w-full  max-h-[95vh] overflow-auto overflo-custom "
          overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
          onRequestClose={() => setOpenPlansModal(false)} >
          <ViewPlans />
        </Modal>
      )}


    </div>
  );
};
export default Page
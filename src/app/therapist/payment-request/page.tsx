"use client";
import React, { useState, useTransition } from "react";
import { ButtonArrow } from "@/utils/svgicons";
import Image from 'next/image';
import success from "@/assets/images/succes.png";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getAllClientsInTherapistPanel, postPaymentRequest } from "@/services/therapist/therapist-service.";
import CustomSelect from "@/app/admin/components/CustomSelect";
import useSWR from "swr";


const Page = () => {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR('/therapist/clients', getAllClientsInTherapistPanel)
  const clientsData = data?.data?.data?.map((user: any) => ({
    label: `${user?.firstName} ${user?.lastName}`,
    value: user._id,
  })) || []
  const [notification, setNotification] = useState<string | null>(null);
  const [requestType, setRequestType] = useState<string>("")
  const [servicesProvided, setServicesProvided] = useState<string>("")
  const [serviceDate, setServiceDate] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [serviceTime, setServiceTime] = useState<string>("")
  const [progressNotes, setProgressNotes] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!requestType || !servicesProvided || !serviceDate || !duration || !serviceTime || !progressNotes) {
      toast.warning("All fields are required")
      return
    }
    startTransition(async () => {
      try {
        const response = await postPaymentRequest('/therapist/payment-requests', { requestType, servicesProvided, serviceDate, duration, serviceTime, progressNotes, therapistId: session?.user?.id as string, clientId: selectedClient?.value })
        if (response?.data?.success) {
          setNotification("Payment request submitted successfully")
          setRequestType("")
          setServicesProvided("")
          setServiceDate("")
          setDuration("")
          setServiceTime("")
          setProgressNotes("")
          setSelectedClient(null)
        }
      } catch (error) {
        console.log('error: ', error);
        toast.error("An error occurred please try again")
      }
      finally {
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      }
    })
  }

  const handleSelectChange = (selected: any) => {
    setSelectedClient(selected);
  }
  
  return (
    <>
      <h1 className=" mb-[20px] md:mb-[50px]">
        Payment Requests
      </h1>
      <div className=" bg-white rounded-[10px] w-full md:p-[40px] p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-[30px] ">
            <div className="">
              <label className="block mb-2">Requesters Name</label>
              <input required type="text" name="" id="" placeholder="John" disabled={true} value={session?.user?.name as string} />
            </div>
            <div className="">
              <label className="block mb-2">Email Address</label>
              <input required type="email" disabled={true} name="" id="" placeholder="loremipsum@gmail.com" value={session?.user?.email as string} />
            </div>
            <div className="">
              <label className="block mb-2">Request Type</label>
              <select required name="assignedClinician" value={requestType} onChange={(e) => setRequestType(e.target.value)} className="">
                <option value="">--Select--</option>
                <option value="Payment">Payment</option>
                <option value="Reinbursement">Reinbursement</option>
                <option value="Other Services Provided">Other Services Provided</option>
              </select>
            </div>
            <div className="">
              <label className="block mb-2">Services Provided</label>
              <select required name="assignedClinician" value={servicesProvided} onChange={(e) => setServicesProvided(e.target.value)} className="">
                <option value="">--Select--</option>
                <option value="Psychiatric Diagnostic Evaluation (Assessment)">Psychiatric Diagnostic Evaluation (Assessment)</option>
                <option value="Psychotherapy (Individual)">Psychotherapy (Individual)</option>
                <option value="Peer Support Service">Peer Support Service</option>
                <option value="Psychotherapy (couple)">Psychotherapy (couple)</option>
                <option value="Psychotherapy (Group)">Psychotherapy (Group)</option>
                <option value="Nurse (RN) Assessment">Nurse (RN) Assessment</option>
                <option value="Peer Support">Peer Support</option>
                <option value="Personal Care Service">Personal Care Service</option>
                <option value="DWI Assessment">DWI Assessment</option>
                <option value="Intensive in-home Respite">Intensive in-home Respite</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <CustomSelect
                name="Client"
                value={selectedClient}
                options={clientsData}
                onChange={handleSelectChange}
                placeholder="Select Client"
                required={false}
              />
            </div>
            <div>
              <label className="block mb-2">Date of Services Provided</label>
              <input required type="date" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} name="" id="" placeholder="" />
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] mt-[30px]">
            <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Time of Services Provided</label>
              <input required type="time" value={serviceTime} onChange={(e) => setServiceTime(e.target.value)} name="" id="" placeholder="" />
            </div>
            <div className="md:w-[calc(20%-15px)] w-[calc(50%-15px)]">
              <label className="block mb-2">Duration (Hours)</label>
              <input required type="text" value={duration} onChange={(e) => setDuration(e.target.value)} name="" id="" placeholder="" />
            </div>
            <div className="md:w-[calc(60%-30px)] w-full">
              <label className="block mb-2">Progress Notes and/or Assessments Submitted & Approved?</label>
              <textarea required value={progressNotes} onChange={(e) => setProgressNotes(e.target.value)} name="" id="" placeholder="" />
            </div>
          </div>
          <div className='mt-[30px] flex justify-end '>
            <button disabled={isPending} type="submit" className="button px-[30px]">{!isPending ? 'Submit' : "Submitting..."}<ButtonArrow /> </button>
          </div>
        </form>
        {notification && (
          <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
            <div className="bg-white text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
              <Image src={success} alt="success" height={130} width={115} className="mx-auto" />
              <h2 className="text-center mt-[40px]">{notification}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Page;

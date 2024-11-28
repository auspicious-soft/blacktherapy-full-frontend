"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import previmg2 from "@/assets/images/previmg.png";
import { ButtonArrow, EditImgIcon } from "@/utils/svgicons";
import success from "@/assets/images/succes.png";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import { getProfileService, updateProfileService } from "@/services/client/client-service";
import { toast } from "sonner";
import { USStates } from '@/data/UsStatesData';
import CustomSelect from "@/app/admin/components/CustomSelect";
import { getImageUrlOfS3 } from "@/utils";
import { deleteImageFromS3, generateSignedUrlOfProfilePic } from "@/actions";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: any;
  phoneNumber: string;
  state: string;
  city: string;
  address1: string; // Explicitly define repeatDays as an array of strings
  profilePic: File | null;
};

const Page = () => {
  const session = useSession()
  const { data, error, mutate } = useSWR(`/client/${session?.data?.user?.id}`, getProfileService)
  const profileData = data?.data?.data
  const [isPending, setIsPending] = useState(false);
  const [isPendingNot, startTransition] = React.useTransition();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: session?.data?.user?.email || "",
    dob: "",
    phoneNumber: "",
    state: "",
    city: "",
    address1: "",
    profilePic: null
  })
  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData?.firstName,
        lastName: profileData?.lastName,
        email: profileData?.email,
        dob: profileData?.dob.split('T')[0],
        phoneNumber: profileData?.phoneNumber,
        state: profileData?.state,
        city: profileData?.city,
        address1: profileData?.addressLine1,
        profilePic: profileData.profilePic || "",
      })
    }
    if (profileData?.profilePic) {
      const imageUrl = getImageUrlOfS3(profileData.profilePic);
      setImagePreview(imageUrl);
    }
  }, [profileData])
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData: any) => ({
        ...prevData,
        profilePic: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    const addressLine = (formData as any).address1
    delete (formData as any).address1;
    (formData as any).addressLine1 = addressLine
    delete (formData as any).email

    const formDataToSend = formData
    const imageKey = `clients/${session?.data?.user?.email}/profile/${typeof (formData as any)?.profilePic === 'string' ? (formData as any).profilePic : formData?.profilePic?.name}`

    if (formData.profilePic && typeof formData.profilePic !== 'string') {
      const signedUrl = await generateSignedUrlOfProfilePic(formData.profilePic.name, formData.profilePic.type, session?.data?.user?.email as string)
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: formData.profilePic,
        headers: {
          'Content-Type': formData.profilePic.type,
        },
        cache: 'no-store'
      })
      if (!uploadResponse.ok) {
        toast.error('Something went wrong. Please try again')
        return
      }
      const newImageKey = `clients/${session?.data?.user?.email}/profile/${formData.profilePic.name}`;
      // Delete the old image from the S3 bucket
      if (profileData?.profilePic) {
        await deleteImageFromS3(profileData?.profilePic);
      }
      (formDataToSend as any).profilePic = newImageKey
    }
    if ((formData as any).profilePic == '' || typeof (formData as any).profilePic !== 'string' || (formData as any).profilePic === undefined || imageKey === profileData?.profilePic) {
      delete (formDataToSend as any).profilePic
    }
    startTransition(async () => {
      try {
        const resss = await updateProfileService(`/client/${session?.data?.user?.id}`, formDataToSend)
        if (resss?.data?.success) {
          mutate()
          setNotification("Profile updated successfully");
          setTimeout(() => {
            setNotification(null);
          }, 3000)
        }
      }
      catch (error) {
        if ((error as any).code == "ERR_NETWORK") toast.error("Network Error")
        else {
          const { response: { data: { message } } } = error as any
          toast.error(message ? message : 'An error occurred');
        }
      }
      finally {
        setIsPending(false)
      }
    })
  }

  if (error) return <div className="text-red-500">Error: {error.message}</div>
  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        My Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
          <div className="custom relative w-[177px] h-[177px] mb-[30px] md:mb-[50px]">
            <input
              className="absolute top-0 left-0 h-full w-full opacity-0 p-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="relative h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={177}
                  height={177}
                  className="rounded-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={triggerFileInputClick}
                  className="absolute bottom-[16px] right-1"
                >
                  <EditImgIcon />
                </button>
              </div>
            ) : (
              <div className="grid place-items-center h-full w-full">
                <div>
                  <Image
                    src={previmg2}
                    alt="upload"
                    width={177}
                    height={177}
                    className="rounded-full"
                  />
                  <p className="absolute bottom-[16px] right-1 pointer-events-none">
                    <EditImgIcon />
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="profile-form grid md:flex flex-wrap gap-5 md:gap-[30px]">
            <div className="md:w-[calc(50%-15px)]">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(50%-15px)]">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(50%-20px)]">
              <input
                type="email"
                name="email"
                disabled
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(30%-20px)]">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(60%-20px)]">
              <input
                type="text"
                name="address1"
                placeholder="Home Address"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-20px)]">
              <CustomSelect
                value={(USStates as any).find((option: any) => option.value === formData.state) || null} // Find the selected state or fallback to null
                options={(USStates as any)}
                onChange={(selectedOption: any) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    state: selectedOption.value,
                  }))
                }}
                placeholder="Select State"
              />
            </div>
          </div>
          <div className="mt-[30px] ">
            <button disabled={isPending} type="submit" className="button px-[30px]">
              {!isPending ? 'Update' : 'Updating...'} <ButtonArrow />{" "}
            </button>
          </div>
        </div>
      </form>
      {notification && (
        <div className="fixed inset-0 grid place-items-center w-full h-full bg-gray-500 bg-opacity-75">
          <div className="bg-white text-[#283C63] py-[60px] rounded-[20px] shadow-lg max-w-[584px] w-full">
            <Image
              src={success}
              alt="success"
              height={130}
              width={115}
              className="mx-auto"
            />
            <h2 className="text-center mt-[40px]">{notification}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

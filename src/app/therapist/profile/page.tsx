"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import previmg2 from "@/assets/images/previmg.png";
import { ButtonArrow, EditImgIcon } from "@/utils/svgicons";
import success from "@/assets/images/succes.png";
import {
  getTherapistsProfileData,
  updateTherapistsProfile,
} from "@/services/therapist/therapist-service.";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import CustomSelect from "@/app/admin/components/CustomSelect";
import { USStates } from "@/data/UsStatesData";
import { toast } from "sonner";
import { preloadFont } from "next/dist/server/app-render/entry-base";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  gender: string;
  state: string;
  city: string;
  addressLine1: string;
  about: string;
  preferredCommunicationMethod: string;
  preferredlanguage: string;
  availableStartTime: string;
  availableEndTime: string;
  // image: string;
  currentAvailability: string[];
  startTime: string;
  endTime: string;
};

interface OptionType {
  value: string;
  label: string;
}

const Page = () => {
  const session = useSession();
  const { data, error, mutate } = useSWR(
    `/therapist/${session?.data?.user?.id}`,
    getTherapistsProfileData
  );
  const profileData = data?.data?.data;

  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    state: "",
    city: "",
    addressLine1: "",
    about: "",
    preferredCommunicationMethod: "",
    preferredlanguage: "",
    availableStartTime: "",
    availableEndTime: "",
    // image: "",
    currentAvailability: [],
    //i amm getting date like thsi from backend "09:35"
    startTime: "",
    endTime: "",
  });
    console.log('formData:', formData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      return "";
    }
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return "";
    // Return the time in "HH:mm" format or handle further formatting here if needed
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
};

  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        email: profileData?.email || "",
        dob: formatDate(profileData?.dob), // Format the date
        phoneNumber: profileData?.phoneNumber || "",
        gender: profileData?.gender || "",
        state: profileData?.state || "",
        city: profileData?.city || "",
        addressLine1: profileData?.addressLine1 || "",
        about: profileData?.about || "",
        preferredCommunicationMethod:
          profileData?.preferredCommunicationMethod || "",
        preferredlanguage: profileData?.preferredlanguage || "",
        // image: profileData?.image || "",
        currentAvailability: Array.isArray(profileData?.currentAvailability)  ? profileData?.currentAvailability : [],
        startTime: formatTime(profileData?.startTime),
        endTime: formatTime(profileData?.endTime),
      });
      setImagePreview(profileData?.image || null);
    }
  }, [profileData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const result = e.target?.result as string;
    //         setImagePreview(result);
    //         setFormData(prev => ({ ...prev, image: result }));
    //     };
    //     reader.readAsDataURL(e.target.files[0]);
    // }
  };

    const triggerFileInputClick = () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  const handleSelectChange = (selectedOption: any) => {
    const value = selectedOption ? (selectedOption as OptionType).value : "";
    setFormData((prev: any) => ({ ...prev, state: value }));
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev: any) => {
      const updatedDays = prev.currentAvailability.includes(day)
        ? prev.currentAvailability.filter((d: any) => d !== day)
        : [...prev.currentAvailability, day];
      return { ...prev, currentAvailability: updatedDays };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 try {
      const submissionData = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob).toISOString() : null
      };
      console.log("submissionData:", submissionData);

      const response = await updateTherapistsProfile(`/therapist/${session?.data?.user?.id}`, submissionData)
      if (response?.status === 200) {
        toast.success("Profile updated successfully");
        await mutate();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!formData) return <div>Loading...</div>;
  return (
    <div>
      <h1 className=" mb-[20px] md:mb-[50px]"> My Profile </h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
          <h2 className="mb-[30px]">Personal details</h2>
          <div className="custom relative w-[177px] h-[177px] mb-[50px]">
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
          <div className="profile-form flex flex-wrap gap-[30px]">
            <div className="md:w-[calc(30%-30px)]">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(30%-30px)]">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[40%]">
              <input
                type="email"
                name="email"
                placeholder="Email addressLine1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-30px)]">
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(35%-30px)]">
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[calc(20%-30px)]">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:w-[25%] profile-state">
              <CustomSelect
                name=""
                value={
                  (USStates as any).find(
                    (option: any) => option.value === formData?.state
                  ) || null
                }
                options={USStates as any}
                onChange={handleSelectChange}
                placeholder="Select State"
              />
            </div>
            <div className="md:w-[calc(25%-30px)]">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[75%]">
              <input
                type="text"
                name="addressLine1"
                placeholder="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="md:w-[100%]">
              <textarea
                name="about"
                rows={4}
                placeholder="about"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] p-5 md:p-[30px] mt-[30px]">
          <h2 className="mb-[50px]">Availability</h2>
          <div className="max-w-[870px]">
            <div className="grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
              <label className="text-[#283c63] text-sm">
                Which are your preferred means of online consultation?
              </label>
              <select
                name="preferredCommunicationMethod"
                value={formData.preferredCommunicationMethod}
                onChange={handleChange}
                className="h-[45px]"
              >
                <option value="">Audio, Video, Chat</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
                <option value="Chat">Chat</option>
              </select>
            </div>
            <div className="grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
              <label className="text-[#283c63] text-sm">
                Preferred language
              </label>
              <input
                type="text"
                name="preferredlanguage"
                value={formData.preferredlanguage}
                onChange={handleChange}
                className="h-[45px]"
              />
            </div>
            <div className="grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
              <label className="text-[#283c63] text-sm">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="h-[45px]"
              />
            </div>
            <div className="grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
              <label className="text-[#283c63] text-sm">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="h-[45px]"
              />
            </div>
            <div className="grid gap-[10px] md:gap-7 md:grid-cols-[minmax(0,_5.5fr)_minmax(0,_6.5fr)] items-center md:mb-[35px]">
              <label className="text-[#283c63] text-sm">Repeat on</label>
              <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))]">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div
                    key={day}
                    className="custom-checkbox relative flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={day}
                      name="currentAvailability"
                      checked={formData.currentAvailability.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                    />
                    <label htmlFor={day} className="text-[#283c63] text-sm">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] flex justify-end ">
          <button type="submit" className="button px-[30px]">
            Confirm & Update <ButtonArrow />{" "}
          </button>
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

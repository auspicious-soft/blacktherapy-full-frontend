"use client";
import { FaHandsHelping } from "react-icons/fa";
import { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import { getClientAppointments, getProfileService, postAnAppointment } from "@/services/client/client-service";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import { ButtonArrow } from "@/utils/svgicons";
import { toast } from "sonner";
import { getTherapistAssignments } from "@/services/therapist/therapist-service.";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PreviousAppointments from "@/app/customer/components/PreviousAppointments";
import UpcomingAppointments from "@/app/customer/components/UpcomingAppointments";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const session = useSession();
  const { data: user, mutate: userMutate } = useSWR(session?.data?.user?.id ? `/client/${session?.data?.user?.id}` : null, getProfileService, { revalidateOnFocus: false });
  const isChatAllowedByPaymentStatus = user?.data?.data?.chatAllowed;
  const isVideoCountByPaymentStatus = user?.data?.data?.videoCount;
  const therapistId = user?.data?.data?.therapistId;
  const video = user?.data?.data?.video;
  const message = user?.data?.data?.message;
  const [activeTab, setActiveTab] = useState("Previous Appointments");
  const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);
  const [query, setQuery] = useState("page=1&limit=10");
  const [isPending, startTransition] = useTransition();
  const [disabledTimes, setDisabledTimes] = useState<{ [key: string]: string[]; }>({});
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const videoCountAndChatFinished = user?.data?.data?.videoCount == 0
  const isChatAllowed = user?.data?.data?.chatAllowed == false
  const haveTherapist = user?.data?.data?.therapistId == null
  const currentPlan = user?.data?.data?.planOrSubscriptionId == null
  const isVideoAllowed = user?.data?.data?.video == false
  const disableRequest = currentPlan || videoCountAndChatFinished || isVideoAllowed || isChatAllowed
  useEffect(() => {
    if (activeTab === "Previous Appointments" || activeTab === "Upcoming Appointments") {
      setQuery(`appointmentType=${activeTab === "Previous Appointments" ? "past" : "upcoming"}&page=1&limit=10`);
      setShouldFetchAppointments(true);
    } else {
      setShouldFetchAppointments(false);
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Previous Appointments":
        return (
          <div>
            <PreviousAppointments
              message={message}
              video={video}
              isChatAllowed={isChatAllowedByPaymentStatus}
              isVideoCount={isVideoCountByPaymentStatus}
              data={appointmentsData?.data}
              error={error}
              setQuery={setQuery}
              isLoading={appointmentsIsLoading}
            />
          </div>
        );
      case "Upcoming Appointments":
        return (
          <div>
            <UpcomingAppointments
              message={message}
              video={video}
              isChatAllowed={isChatAllowedByPaymentStatus}
              isVideoCount={isVideoCountByPaymentStatus}
              data={appointmentsData?.data}
              error={error}
              isLoading={appointmentsIsLoading}
              setQuery={setQuery}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const { data: appointmentsData, isLoading: appointmentsIsLoading, mutate: appointmentsMutate, error } = useSWR(shouldFetchAppointments && session?.data?.user?.id ? `/client/appointment/${session?.data?.user?.id}?${query}` : null, getClientAppointments, { revalidateOnFocus: false });
  const { data: therapistData } = useSWR(therapistId ? `/therapist/${therapistId}` : null, getTherapistAssignments);
  const { data: therapistAppointment } = useSWR(therapistId ? `/therapist/${therapistId}/clients` : null, getTherapistAssignments);

  useEffect(() => {
    if (therapistData?.data?.data?.currentAvailability) {
      const availability = therapistData.data.data.currentAvailability;
      const availableTimeSet: Set<string> = new Set();
      const startTime = therapistData.data.data.startTime;
      const endTime = therapistData.data.data.endTime;
  
      // Adjust end time by subtracting one hour
      let adjustedEndTimeDate = new Date(`1970-01-01T${endTime}`);
      adjustedEndTimeDate.setHours(adjustedEndTimeDate.getHours() - 1);
  
      let currentTime = new Date(`1970-01-01T${startTime}`);
      // Use the adjusted end time in the while loop
      while (currentTime < adjustedEndTimeDate) {
        availableTimeSet.add(currentTime.toTimeString().substring(0, 5));
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
      // Add the adjusted end time to the set
      availableTimeSet.add(adjustedEndTimeDate.toTimeString().substring(0, 5));
  
      // If selectedDate is today, filter out time slots that are before current time + 1 hour.
      if (selectedDate && selectedDate.toDateString() === new Date().toDateString()) {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const filteredTimes = Array.from(availableTimeSet).filter(time => {
          const [hour, minute] = time.split(":");
          const timeDate = new Date();
          timeDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
          return timeDate > now;
        });
        setAvailableTimes(filteredTimes);
      } else {
        setAvailableTimes(Array.from(availableTimeSet));
      }
  
      const disabledDatesTimesMap: { [key: string]: string[] } = {};
      therapistAppointment?.data?.data?.forEach((appointment: any) => {
        const appointmentDateTime = `${appointment.appointmentDate} ${appointment.appointmentTime}`;
        const [date, time] = appointmentDateTime.split(" ");
        if (!disabledDatesTimesMap[date]) {
          disabledDatesTimesMap[date] = [];
        }
        disabledDatesTimesMap[date].push(time);
  
        // Add the next time slot with a 30-minute gap
        let nextTime = new Date(`1970-01-01T${time}`);
        nextTime.setMinutes(nextTime.getMinutes() + 30);
        const nextTimeString = nextTime.toTimeString().substring(0, 5);
        if (!disabledDatesTimesMap[date].includes(nextTimeString)) {
          disabledDatesTimesMap[date].push(nextTimeString);
        }
      });
      setDisabledTimes(disabledDatesTimesMap);
  
      setDisabledDates((prev) => {
        const newDisabledDates: Date[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dayOfWeek = date.getDay();
          const dayString = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][dayOfWeek];
  
          if (!availability.includes(dayString)) {
            newDisabledDates.push(date);
          }
        }
        return [...prev, ...newDisabledDates];
      });
    }
  }, [therapistData, therapistAppointment, selectedDate]);

  const handleRequestAppointment = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const selectedDateStr = e.target["appointment-date"].value;
      const selectedTime = e.target["appointment-time"].value;

      const date = new Date(selectedDateStr);
      const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];

      const disabledTimesForDate = disabledTimes[selectedDateStr];
      if (disabledTimesForDate && disabledTimesForDate.includes(selectedTime)) {
        toast.error(`Selected time ${selectedTime} is unavailable for this date.`);
        return;
      }

      const response = await postAnAppointment(`/client/appointment`, {
        clientId: session?.data?.user?.id,
        appointmentDate: formattedDate,
        appointmentTime: selectedTime,
      });

      if (response?.data?.success) {
        toast.success("Appointment Requested Successfully");
        appointmentsMutate();
        userMutate()
        setOpenModal(false);
      } else if (response?.status === 204) {
        toast.error("Phone number is not valid, please update it");
      } else {
        toast.error("Failed to request appointment");
      }
    });
  };

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Appointments
      </h1>
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="tabs flex flex-wrap gap-[5px] lg:gap-[20px] w-full justify-start">
            {["Previous Appointments", "Upcoming Appointments"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab
                  ? "active"
                  : "!bg-transparent border-[1px] !border-[#283c63] !text-[#283c63]"
                  } bg-[#283c63] text-[#fff] rounded-[6px] mt-0 text-[14px] py-[8px] px-[16px] lg:px-[32px] lg:py-[12px] `}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            {!haveTherapist ? <button
              disabled={disableRequest}
              className="button !mt-0 ml-auto"
              onClick={() => {
                userMutate();
                setOpenModal(true);
              }}
            >
              Request Appointment
            </button>
              :
              <button
                disabled={true}
                className="button !mt-0 ml-auto disabled:opacity-100 cursor-not-allowed"
              >
                No Therapist Assigned Yet, Kindly wait for the assignment
              </button>}
          </div>
          <div>
          </div>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
      {openModal && (
        <Modal
          isOpen={openModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              width: "500px",
              borderRadius: "10px",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
          onRequestClose={() => {
            setOpenModal(false);
            setSelectedDate(null);
          }}
        >
          <h1 className="text-center font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
            Request Appointment
          </h1>
          <FaHandsHelping className="text-[#283c63] text-[100px] text-center flex w-full" />
          <div className="bg-white rounded-[20px] p-5 md:p-[30px]">
            <div className=" text-center text-black w-full">
              Sure want to request an appointment?
            </div>
            <form onSubmit={handleRequestAppointment}>
              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <label
                    htmlFor="appointment-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <DatePicker
                    required
                    placeholderText="Select an appointment date"
                    id="appointment-date"
                    name="appointment-date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    minDate={new Date()}
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    filterDate={(date) =>
                      !disabledDates.some(
                        (disabledDate) =>
                          disabledDate.toDateString() === date.toDateString()
                      )
                    }
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="appointment-time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <select
                    disabled={!selectedDate}
                    required
                    id="appointment-time"
                    name="appointment-time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                  >
                    <option value=''>
                      Select the available time
                    </option>
                    {availableTimes.map((time, index) => {
                      console.log('time: ', time);
                      const dateString = selectedDate
                        ? `${selectedDate.getFullYear()}-${(
                          selectedDate.getMonth() + 1
                        ).toString().padStart(2, "0")}-${selectedDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}`
                        : "";

                      const isDisabled = dateString
                        ? Object.keys(disabledTimes).some((key) => {
                          const disabledDate = new Date(key)
                            .toISOString()
                            .split("T")[0];

                          return (
                            disabledDate === dateString &&
                            disabledTimes[key]?.includes(time)
                          );
                        })
                        : false;

                      return (
                        <option
                          key={time}
                          value={time}
                          disabled={isDisabled}
                          className={isDisabled ? "text-red" : "text-black"}
                        >
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-center text-lg text-black gap-5 justify-between mt-5">
                <button
                  className="button"
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedDate(null);  // Clear selected date when modal is canceled
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  {isPending ? "Requesting..." : "Request"}
                  <ButtonArrow />
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Page;

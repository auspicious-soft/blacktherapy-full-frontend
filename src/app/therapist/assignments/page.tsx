"use client"
import SearchBar from '@/app/admin/components/SearchBar';
import { getTherapistAssignments, getTherapistsProfileData } from '@/services/therapist/therapist-service.';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import ReactLoading from 'react-loading';
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { CloseIcon, EditIcon } from '@/utils/svgicons';
import ReactLoader from '@/components/ReactLoader';
import { updateAppointmentData } from '@/services/admin/admin-service';
import { toast } from 'sonner';
import { uploadPaymentInvoiceOnAppointment } from '@/components/Pdf-template/payment-complete-invoice';
import { getImageUrlOfS3, nonMilitaryTime } from '@/utils';
import ExtraFields from '@/components/extra-completed-fields';
import { uploadSoapNoteOnAppointment } from '@/components/Pdf-template/soap-note-pdf';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [sessionNotes, setSessionNotes] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const session = useSession()
  const [query, setQuery] = useState('')
  const { data, isLoading } = useSWR(`/therapist/${session?.data?.user?.id}/clients?${query}`, getTherapistAssignments)
  const clientsData: any = data?.data?.data
  const page = data?.data?.page
  const total = data?.data?.total
  const rowsPerPage = data?.data?.limit
  const [isCompletedFieldsDisable, setIsCompletedFieldsDisable] = useState(false)
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  }
  const { data: therapistData } = useSWR(`/therapist/${session?.data?.user?.id}`, getTherapistsProfileData)
  const therapistSignatures = getImageUrlOfS3(therapistData?.data?.data?.consentSignature)
  const openModal = (note: string) => {
    setSessionNotes(note);
    setShowModal(true);
  };

  const handleChat = (id: string) => {
    router.push(`/therapist/assignments/chats/${id}`);
  };
  const [selectedRow, setSelectedRow] = useState<any>({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      appointmentDate: selectedRow.appointmentDate,
      appointmentTime: selectedRow.appointmentTime,
      status: selectedRow.status,
      progressNotes: selectedRow.progressNotes,
      servicesProvided: selectedRow.servicesProvided,
      requestType: selectedRow.requestType,
      duration: selectedRow.duration
    }
    startTransition(async () => {
      if (payload.status === 'Completed' && payload.duration) {
        try {
          // Generate payment invoice
          const { key } = await uploadPaymentInvoiceOnAppointment({
            ...selectedRow,
            ...payload,
            therapistEmail: session?.data?.user?.email,
            therapistName: session?.data?.user?.name
          });
          (payload as any).invoice = key;

          // Generate SOAP note with proper Key value
          const { uploadedKey } = await uploadSoapNoteOnAppointment({
            ...selectedRow, _id: selectedRow._id, clientId: {
              ...selectedRow.clientId,
              email: selectedRow.clientId.email
            },
            signature: therapistSignatures
          });
          (payload as any).sessionNotes = uploadedKey;
        } catch (error) {
          console.error('Error generating documents:', error);
          toast.error("Error generating documents");
          return;
        }
      }

      if (payload.duration && isNaN(Number(payload.duration))) {
        toast.error("Duration must be a number")
        return
      }

      // try {
      //     const response = await updateAppointmentData(`/admin/appointments/${selectedRow?._id}`, payload);
      //     if (response.status === 200) {
      //         toast.success("Appointment updated successfully")
      //         mutate()
      //         setSelectedRow({})
      //         setIsEditModalOpen(false)
      //     }
      // } catch (error) {
      //     toast.error("An error occurred while updating the assignment");
      // } finally {
      //     setIsEditModalOpen(false);
      // }
    })
  }


  return (
    <div className="">
      <h1 className=' mb-[20px] md:mb-[50px]'>Appointments</h1>
      <div className="flex justify-end my-4">
        <SearchBar setQuery={setQuery} />
      </div>
      <div className='table-common overflo-custom'>

        <table className="">
          <thead>
            <tr className="">
              <th >Client</th>
              <th >Date Assigned</th>
              <th >Time Assigned</th>
              <th >Phone Number</th>
              <th >Email Address</th>
              {/* <th >Session Notes</th> */}
              <th >Chat Client</th>
              <th >Video Chat</th>
              <th >Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='text-center'>
                  <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
                </td>
              </tr>
            ) : (
              // convert this time to am or pm
              clientsData?.length > 0 ? (
                clientsData?.map((item: any) => {
                  const disableOldAppointmentThatCompleted = item?.status == 'Completed' && new Date(item?.appointmentDate) < new Date()
                  return (
                    <tr key={item._id}>
                      <td>{item.clientId.firstName} {item.clientId.lastName}</td>
                      <td>{new Date(item.appointmentDate).toLocaleDateString('en-US')}</td>
                      <td>{nonMilitaryTime(item.appointmentTime)}</td>
                      <td>{item.clientId.phoneNumber}</td>
                      <td>{item.clientId.email}</td>
                      {/* <td> <p className='cursor-pointer font-gothamMedium text-center rounded-xl text-[10px] py-[4px] text-[#fff] bg-[#26395E]' onClick={()=>openModal(item?.notes)}>View</p></td> */}

                      <td>
                        {item?.clientId?.message ? (
                          <button
                            // disabled={disableOldAppointmentThatCompleted}
                            onClick={() => handleChat(item._id)}
                            className={`font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px] text-[#42A803] bg-[#CBFFB2] cursor-pointer`}
                          >
                            Start Chat
                          </button>
                        ) : (
                          <button
                            disabled={disableOldAppointmentThatCompleted}
                            className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] 
                                ${disableOldAppointmentThatCompleted
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                                : 'text-[#FFA234] bg-[#FFFCEC]'}`}
                          >
                            No Chat
                          </button>
                        )}
                      </td>
                      <td>
                        {!item?.clientId?.video ? (
                          <span className={`font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px]
                            ${(item?.status === 'Completed')
                              ? 'bg-gray-200 text-gray-500'
                              : 'text-[#FFA234] bg-[#FFFCEC]'}`}>
                            No video
                          </span>
                        ) : (
                          <button disabled={(item?.status === 'Completed')} onClick={() => !(item?.status === 'Completed') && (window.location.href = `/therapist/assignments/video-chat/${item?._id}`)}>
                            <p className={`font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px]
                              ${(item?.status === 'Completed')
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'text-[#42A803] bg-[#CBFFB2] cursor-pointer'}`}>
                              Start Video
                            </p>
                          </button>
                        )}
                      </td>
                      <td>
                        <p className={`font-gothamMedium inline-block text-center rounded-3xl py-[2px] px-[10px] text-[10px]
                            ${item.status === 'Completed'
                            ? 'text-[#4ec091] bg-[#cbffb2]'
                            : item.status === 'Pending'
                              ? 'text-white bg-yellow-500'
                              : item.status === 'Rejected'
                                ? 'text-red-500 bg-red-200'
                                : item.status === 'Approved'
                                  ? 'text-indigo-500 bg-indigo-200'
                                  : 'text-gray-500 bg-gray-200'}`}>
                          {item.status}
                        </p>
                      </td>
                      <td>
                        <button
                          className={`cursor-pointer ${disableOldAppointmentThatCompleted ? 'opacity-50' : ''} flex justify-center items-center`}
                          disabled={disableOldAppointmentThatCompleted}
                          onClick={() => {
                            setSelectedRow(item)
                            setIsEditModalOpen(true)
                            setIsCompletedFieldsDisable(item?.status === 'Completed')
                          }}>
                          <EditIcon />
                        </button>
                      </td>
                    </tr>
                  )
                }
                )
              ) : (
                <tr>
                  <td colSpan={7} className='text-center'>No data found</td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>
      {Math.ceil(total / rowsPerPage) > 0 && <div className="text-right">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"
          }
          pageClassName={"text-[#26395e] "} //list item
          pageLinkClassName={"py-2 px-4 inline-block"} //anchor tag
          activeClassName={"bg-[#26395e] rounded-[5px] text-white"} //active anchor
          previousLinkClassName={"py-2 px-4 inline-block"}
          nextLinkClassName={"py-2 px-4 inline-block"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>}

      {showModal && <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Notes "
        className=" w-[90%] max-w-[500px] max-h-[90vh]  overflow-auto overflo-custom   "
        overlayClassName="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      >

        <div className='flex items-center justify-between rounded-t-[20px] p-5  bg-[#283C63]  '>
          <h2 className="text-xl text-white font- ">Session Notes</h2>
          <button onClick={() => setShowModal(false)} className="">
            <CloseIcon />
          </button>
        </div>
        <div className='bg-white p-5 rounded-b-[20px] '>
          <p>{sessionNotes || "No notes available"}</p>

        </div>
      </Modal>}


      {
        isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setIsEditModalOpen(false)}
            contentLabel="Edit Event"
            className={`overflow-auto max-w-2xl overflo-custom max-h-[95vh] child-modal bottom-0 !bg-white rounded-lg w-full p-5 shadow-lg z-[2000] h-auto !top-auto ${isEditModalOpen ? 'modal-open' : ''}`}
            overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 z-[2000]"
          >
            <h3 className="font-semibold">Edit Appointment Details</h3>
            <div className="p-3">
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4" >
                <div className="flex flex-col">
                  <label htmlFor="clientName" className="font-medium">
                    Client Name
                  </label>
                  <input
                    disabled
                    type="text"
                    id="clientName"
                    value={selectedRow?.clientName || ""}
                    className="border p-2 rounded"
                    required
                  />
                </div>
                <div className="flex-1 flex w-full gap-3">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="appointmentDate" className="font-medium">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      value={selectedRow?.appointmentDate ? format(new Date(selectedRow.appointmentDate), "yyyy-MM-dd") : ""}
                      onChange={(e) =>
                        setSelectedRow((prev: any) => ({
                          ...prev,
                          appointmentDate: e.target.value,
                        }))
                      }
                      className="border p-2 rounded"
                      required
                    />
                  </div>

                  {/* Appointment Time */}
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="appointmentTime" className="font-medium">
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      id="appointmentTime"
                      value={selectedRow.appointmentTime}
                      onChange={(e) =>
                        setSelectedRow((prev: any) => ({
                          ...prev,
                          appointmentTime: e.target.value,
                        }))
                      }
                      className="border p-2 rounded"
                      required
                    />
                  </div>
                </div>
                {/* Status */}
                <div className="flex flex-col">
                  <label htmlFor="status" className="font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    value={selectedRow.status}
                    onChange={(e) =>
                      setSelectedRow((prev: any) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                    required
                    disabled={isCompletedFieldsDisable}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Attended">Not Attended</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {
                  (selectedRow?.status === 'Completed' && !isCompletedFieldsDisable) && (
                    <ExtraFields selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
                  )
                }
                {/* Submit Button */}
                <div className="flex justify-end gap-2">
                  <button className="text-black p-2 rounded-md font-semibold" onClick={() => setIsEditModalOpen(false)}>
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#283C63] text-white px-4 py-2 rounded"
                  >
                    {!isPending ? 'Save Changes' : <ReactLoader color="#fff" />}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )
      }

    </div>
  );
};

export default Page;

import React, { useState } from 'react';
import useSWR from 'swr';
import { getClientAppointments } from '@/services/client/client-service';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import ReactLoader from '@/components/ReactLoader';
import { getImageUrlOfS3, nonMilitaryTime } from '@/utils';
import { toast } from 'sonner';
import { EyeIcon } from 'lucide-react';
import { IoIosDocument } from 'react-icons/io';

interface ClientProps {
    clientId: string;
}

const ClientsSpecificAppointmentsTab = (props: ClientProps) => {
    const { clientId } = props;
    const [query, setQuery] = useState('page=1&limit=10');

    const { data: appointmentsData, isLoading: appointmentsIsLoading, error } = useSWR(clientId ? `/client/appointment/${clientId}?${query}` : null,
        getClientAppointments,
        { revalidateOnFocus: false }
    );
    const handlePageClick = (data: { selected: number }) => {
        setQuery(`page=${data.selected + 1}&limit=10`);
    }

    if (appointmentsIsLoading) return <ReactLoader />
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="table-common overflo-custom">
            <div className='overflow-custom overflow-auto'>
                <table className='w-full overflow-custom'>
                    <thead>
                        <tr>
                            <th>Appt Date</th>
                            <th>Appt Time</th>
                            <th>Status</th>
                            <th>Therapist Name</th>
                            <th>Therapist Email</th>
                            <th>Peer Support</th>
                            <th>Clinician Notes</th>
                            <th>Payment Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsIsLoading ? (
                            <tr>
                                <td colSpan={5} className="">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className="text-center text-red-500 ">
                                    Error loading data.
                                </td>
                            </tr>
                        ) : appointmentsData?.data?.data?.length > 0 ? (
                            appointmentsData?.data?.data?.map((appointment: any) => {
                                return (
                                    <tr key={appointment.id}>
                                        <td>{new Date(appointment.appointmentDate.split('T')[0]).toLocaleDateString('en-US')}</td>
                                        <td>{nonMilitaryTime(appointment.appointmentTime)}</td>
                                        <td>  {appointment.status} </td>
                                        <td>  {appointment.therapistId.firstName} {appointment.therapistId.lastName}  </td>
                                        <td>  {appointment.therapistId.email} </td>
                                        <td>
                                            {appointment.peerSupportIds.length > 0 ?
                                                <div>
                                                    {
                                                        appointment.peerSupportIds.map((peer: any, index: number) => (
                                                            <div key={peer.id} title={peer.email} className='cursor-pointer'>
                                                                {peer.firstName} {peer.lastName}
                                                                {index < appointment.peerSupportIds.length - 1 ? ',' : ''}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                :
                                                'No'}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    if (appointment.status === 'Completed' && appointment.sessionNotes) {
                                                        window.open(getImageUrlOfS3(appointment.sessionNotes), '_blank');
                                                    } else {
                                                        toast.error("No clinician notes available for this appointment");
                                                    }
                                                }}
                                                className="flex items-center justify-center"
                                                disabled={!(appointment.status === 'Completed' && appointment.sessionNotes)}
                                                title={appointment.status === 'Completed' && appointment.sessionNotes ? "View Notes" : "No notes available"}
                                            >
                                                <EyeIcon color='#26395e' size={20} />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className='flex items-center justify-center'
                                                onClick={() => {
                                                    const paymentInvoice: any = appointment?.paymentRequest?.invoice
                                                    if (paymentInvoice) {
                                                        window.open(getImageUrlOfS3(paymentInvoice), '_blank');
                                                    }
                                                }}
                                                disabled={!(appointment?.paymentRequest?.invoice)}
                                            >
                                                <IoIosDocument color='#26395e' size={20} /><span className='pl-1'>{`${appointment?.paymentRequest?.identifier ? `#${appointment?.paymentRequest?.identifier}` : ''}`}</span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td className="w-full flex justify-center p-3 items-center" colSpan={5}>
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="text-right reactpaginate">
                <ReactPaginate
                    previousLabel={<Image src={PervIcon as any} alt="PervIcon" />}
                    nextLabel={<Image src={NextIcon as any} alt="NextIcon" />}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(appointmentsData?.data.total / 10)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"}
                    pageClassName={"text-[#26395e]"}
                    pageLinkClassName={"py-2 px-4 inline-block"}
                    activeClassName={"bg-[#26395e] rounded-[5px] text-white"}
                    previousLinkClassName={"py-2 px-4 inline-block"}
                    nextLinkClassName={"py-2 px-4 inline-block"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                />
            </div>
        </div>
    );
};

export default ClientsSpecificAppointmentsTab;
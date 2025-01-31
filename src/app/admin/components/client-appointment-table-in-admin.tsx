import React, { useState } from 'react';
import useSWR from 'swr';
import { getClientAppointments } from '@/services/client/client-service';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";
import ReactLoader from '@/components/ReactLoader';

interface ClientProps {
    clientId: string;
}

const ClientsSpecificAppointmentsTab = (props: ClientProps) => {
    const { clientId } = props;
    const [query, setQuery] = useState("page=1&limit=10");

    const { data: appointmentsData, isLoading: appointmentsIsLoading, error } = useSWR(clientId? `/client/appointment/${clientId}?${query}` : null,
        getClientAppointments,
        { revalidateOnFocus: false }
    );
    console.log('appointmentsData: ', appointmentsData);
    const handlePageClick = (data: { selected: number }) => {
        setQuery(`page=${data.selected + 1}&limit=10`);
    }

    if (appointmentsIsLoading) return <ReactLoader/>
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="table-common overflo-custom">
            <table>
                <thead>
                    <tr>
                        <th>Appt Date</th>
                        <th>Appt Time</th>
                        <th>Status</th>
                        <th>Therapist Name</th>
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
                        appointmentsData?.data?.data?.map((appointment: any) => (
                            <tr key={appointment.id}>
                                <td>{new Date(appointment.appointmentDate.split('T')[0]).toLocaleDateString('en-US')}</td>
                                <td>{appointment.appointmentTime}</td>
                                <td>
                                    {appointment.status}
                                </td>
                                <td>
                                    {appointment.therapistId.firstName} {appointment.therapistId.lastName}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="w-full flex justify-center p-3 items-center" colSpan={5}>
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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
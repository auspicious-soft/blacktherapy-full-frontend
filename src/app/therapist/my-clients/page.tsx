"use client"
import SearchBar from '@/app/admin/components/SearchBar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import ReactLoading from 'react-loading';
import { getTherapistClients } from '@/services/therapist/therapist-service.';

const Page = () => {
  const session = useSession();
  const [query, setQuery] = useState('');
  const { data, error, isLoading } = useSWR(`/therapist/my-clients/${session?.data?.user?.id}?${query}`, getTherapistClients);
  const clientsData: any = data?.data?.data;
  const total = data?.data?.total;
  const rowsPerPage = data?.data?.limit;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  };

  return (
    <div className="">
      <h1 className=' mb-[20px] md:mb-[50px]'>My Clients</h1>
      <div className="flex justify-end my-4">
        <SearchBar setQuery={setQuery} />
      </div>
      <div className='table-common overflo-custom'>
        <table className="">
          <thead>
            <tr className="">
              <th>Client</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Service Subscribed</th>
              <th>Insurance Coverage</th>
              <th>Organisation Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className='text-center'>
                  <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
                </td>
              </tr>
            ) : (
              clientsData?.length > 0 ? (
                clientsData?.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.firstName} {item.lastName}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{item.serviceSubscribed}</td>
                    <td>{item.insuranceCoverage}</td>
                    <td>{item.organisationName || 'N/A'}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className='text-center'>No data found</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {Math.ceil(total / rowsPerPage) > 0 && (
        <div className="text-right">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(total / rowsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"}
            pageClassName={"text-[#26395e] "}
            pageLinkClassName={"py-2 px-4 inline-block"}
            activeClassName={"bg-[#26395e] rounded-[5px] text-white"}
            previousLinkClassName={"py-2 px-4 inline-block"}
            nextLinkClassName={"py-2 px-4 inline-block"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      )}
    </div>
  );
};

export default Page;

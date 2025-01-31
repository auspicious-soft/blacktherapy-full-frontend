"use client"
import SearchBar from '@/app/admin/components/SearchBar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import ReactLoading from 'react-loading';
import { getTherapistClients } from '@/services/therapist/therapist-service.';
import Image from 'next/image';
import { getImageUrlOfS3 } from '@/utils';
import profileAlt from '@/assets/images/profile.png';
const Page = () => {
  const session = useSession();
  const [query, setQuery] = useState('');
  const { data, error, isLoading } = useSWR(`/therapist/my-clients/${session?.data?.user?.id}?${query}`, getTherapistClients);
  const clientsData: any = data?.data?.data;
  console.log('clientsData: ', clientsData);
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
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>State</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className='text-center'>
                  <ReactLoading type={'spin'} color={'#26395e'} height={'20px'} width={'20px'} />
                </td>
              </tr>
            ) : (
              clientsData?.length > 0 ? (
                clientsData?.map((item: any) => (
                  <tr key={item._id}>
                    <td><div className='flex items-center jutify-start gap-3'>
                      <Image src={getImageUrlOfS3(item.profilePic).includes('undefined') ? profileAlt : getImageUrlOfS3(item.profilePic)} alt="profile" width={40} height={40} className='rounded-full w-9 h-9' />
                      <p>{item.firstName} {item.lastName}</p>
                    </div></td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center'>No data found</td>
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

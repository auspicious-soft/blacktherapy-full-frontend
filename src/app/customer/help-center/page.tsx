"use client"
import React, { useState, useTransition } from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { ButtonArrow, DeleteIcon, TicketTableIcon } from '@/utils/svgicons';
import useSWR from 'swr';
import { toast } from 'sonner';
import { addClientsTickets, getClientsTickets } from '@/services/client/client-service';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';



const TableComponent: React.FC = () => {
  const session = useSession()
  const router = useRouter();
  const clientId = session?.data?.user?.id;
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('page=1&limit=10&');
  const { data, error, isLoading, mutate } = useSWR(`/client/tickets/${clientId}`, getClientsTickets);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const ticketsData = data?.data?.data?.data;
  const total = data?.data?.total ?? 0;
  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  const getStatusColor = (status: 'Pending' | 'Completed'): string => {
    return status === 'Pending' ? 'text-[#A85C03] bg-[#FFFDD1]' : 'text-[#42A803] bg-[#CBFFB2]';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const roomId = uuidv4();
    const ticketData = {
      roomId,
      title,
      message
    };
    startTransition(async () => {
      try {
        const response = await addClientsTickets(`/client/tickets/${clientId}`, ticketData);

        if (response?.status === 201) {
          toast.success('Ticket created successfully');
          setTitle('');
          setMessage('');
          setIsModalOpen(false);
          mutate();
        } else {
          toast.error('Failed to create ticket. Unexpected response.');
        }
      } catch (error) {
        console.error('Ticket creation failed:', error);
        toast.error('Failed to create ticket. Please try again.');
      }
    });
  };

  const handleChat = (id: string) => {
    router.push(`/customer/help-center/chats/${id}`);
  };


  return (
    <div>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Help Center
      </h1>
      <div className='flex justify-end mb-5'>
        <button onClick={() => setIsModalOpen(true)}
          className='button mt-0'>Raise a Ticket</button>
      </div>
      <div className='table-common overflo-custom'>
        <table className="">
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Title</th>
              <th>Created On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
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
            ) : ticketsData?.length > 0 ? (
              ticketsData?.map((row: any) => (
                <tr key={row?._id}>
                  <td>#{row?.ticketId}</td>
                  <td>{row?.title}</td>
                  <td>{new Date(row?.createdAt).toLocaleDateString('en-US')}</td>
                  <td>
                    <p className={`px-[10px] py-[2px] text-[10px] text-center rounded-3xl ${getStatusColor(row?.status)}`}>{row?.status}</p>
                  </td>

                  <td>
                    <button onClick={() => handleChat(row?.roomId)}><TicketTableIcon /> </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="w-full flex justify-center p-3 items-center"
                  colSpan={5}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirm Deletion"
          className="modal max-w-[668px] mx-auto bg-white rounded-xl w-full  max-h-[90vh]  overflow-auto overflo-custom"
          overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <h2 className='bg-[#283C63] text-[#fff] py-6 px-8 '>New Ticket</h2>
          <div className='py-6 px-8 '>
            <form onSubmit={handleSubmit} className='py-6 px-8'>
              <label className="text-[#707070] block">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full border border-[#CDE3F1] rounded-lg p-4 mt-2'
                  placeholder="Enter ticket title"
                  required
                />
              </label>
              <label className="text-[#707070] block mt-5">
                Message
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className='w-full border border-[#CDE3F1] rounded-lg p-4 mt-2'
                  rows={6}
                  placeholder="Enter your message"
                  required
                />
              </label>
              <div className='mt-[49px] flex justify-end items-center gap-3'>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className='h-[50px] border border-[#283C63] text-[#283C63] text-base px-7 py-3 rounded-[10px]'
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className='button !mt-0'
                  disabled={isPending}
                >
                  {isPending ? 'Creating...' : 'Create'} <ButtonArrow />
                </button>
              </div>
            </form>

          </div>
        </Modal>
      </div>
      <div className="text-right mt-4">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
          pageClassName={'text-[#26395e]'}  // list item
          pageLinkClassName={'py-2 px-4 inline-block'} // anchor tag
          activeClassName={'bg-[#26395e] rounded-[5px] text-white'} // active anchor
          previousLinkClassName={'py-2 px-4 inline-block'}
          nextLinkClassName={'py-2 px-4 inline-block'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
    </div>
  );
};

export default TableComponent;


"use client"
import SearchBar from '@/app/admin/components/SearchBar';
import { getAllTasksData, updateTherapistsTask } from '@/services/therapist/therapist-service.';
import { ProcessIcon, TickIcon } from '@/utils/svgicons';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import { toast } from 'sonner';
import useSWR from 'swr';


const Page: React.FC = () => {
  // const [tasks, setTasks] = useState<any>([
  //   id,
  //   status,
  //   from,
  //   to,
  //   title,
  //   dueDate,
  //   priority,
  //   attachment,
  //   note,
  // ]); 

  const session = useSession()
  const [query, setQuery] = useState('')
  const { data, error, isLoading, mutate } = useSWR(`/therapist/tasks/${session?.data?.user?.id}?${query}`, getAllTasksData);
  const tasksData: any = data?.data?.data
  const page = data?.data?.page
  const total = data?.data?.total
  const rowsPerPage = data?.data?.limit

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (id) {
      try {
        const response = await updateTherapistsTask(`/therapist/tasks/${id}`, { 
          id,
          status: newStatus 
        });
        
        if (response?.status === 200) {
          toast.success('Task status updated successfully');
          mutate();
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error updating task status');
      }
    }
  };

  return (
   <div>
    <h1 className=' mb-[20px] md:mb-[50px]'>My Tasks</h1>
    <div className='flex justify-end mb-[30px] '>
        <SearchBar setQuery={setQuery}/>
    </div>
     <div className='table-common overflo-custom'>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>From</th>
            <th>To</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Attachment</th>
            <th>Note</th>
            <th>Action</th>
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
              tasksData?.length > 0 ? (
          tasksData?.map((task: any) => (
            <tr key={task?._id}>
              <td>{task?._id}</td>
             <td>
             <p 
                className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${
                  task?.status === 'In processing' ? 'text-[#FFA234] bg-[#FFFCEC]' : 'text-[#2B8176] bg-[#C6F0EB] '
                }`}
              >
                {task?.status}
              </p>
             </td>
              <td className='capitalize'>{task?.assignedBy}</td>
              <td>{task?.therapistId?.firstName} {task?.therapistId?.lastName}</td>
              <td>{task?.title}</td>
              <td>{new Date(task?.dueDate).toLocaleDateString('en-US')}</td>
              <td>{task?.priority}</td>
              <td>{task?.attachment}</td>
              <td>{task?.note}</td>
              <td>
                <button 
                  onClick={() => handleStatusChange(task?._id, 'Pending')}
                  className={` mr-2 ${
                    task?.status === 'Pending' || task?.status === 'Done'? 'light-color cursor-not-allowed' : ' text-white'
                  }`}
                  disabled={task?.status === 'Pending'}
                >
                  <ProcessIcon />
                </button>
                <button 
                  onClick={() => handleStatusChange(task?._id,  'Done')}
                  className={`  ${
                    task?.status === 'Done' ? 'light-color cursor-not-allowed' : ' text-white'
                  }`}
                  disabled={task?.status === 'Done'}
                ><TickIcon/>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className='text-center'>No data found</td>
          </tr>
        )
      )}
        </tbody>
      </table>
      </div>
      <div className="text-right">
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(total / rowsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'inline-flex mt-8 rounded border border-[#d5dce9]'}
        pageClassName={'text-[#26395e] '}
        pageLinkClassName={'py-2 px-4 inline-block'}
        activeClassName={'bg-[#26395e] rounded text-white'}
        previousLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
        nextLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
      </div>
  
   </div>
  );
};

export default Page;

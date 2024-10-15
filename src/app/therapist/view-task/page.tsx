"use client"
import SearchBar from '@/app/therapist/components/SearchBar';
import { ProcessIcon, TickIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

type Task = {
  id: string;
  status: string;
  from: string;
  to: string;
  title: string;
  dueDate: string;
  priority: string;
  attachment: string;
  note: string;
};

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '#001', status: 'In processing', from: 'Wehabi ( Admin )', to: 'Sandra Lew', title: 'Repeat this availability', dueDate: '21/10/2023', priority: 'Normal', attachment: 'No Attachment', note: '' },
    { id: '#002', status: 'Done', from: 'Wehabi ( Admin )', to: 'Sandra Lew', title: 'Repeat this availability', dueDate: '21/10/2023', priority: 'Normal', attachment: 'No Attachment', note: '' },
    { id: '#003', status: 'In processing', from: 'Wehabi ( Admin )', to: 'Sandra Lew', title: 'Repeat this availability', dueDate: '21/10/2023', priority: 'Normal', attachment: 'No Attachment', note: '' },
    { id: '#004', status: 'Done', from: 'Wehabi ( Admin )', to: 'Sandra Lew', title: 'Repeat this availability', dueDate: '21/10/2023', priority: 'Normal', attachment: 'No Attachment', note: '' },
    // Add more tasks as needed for testing pagination
  ]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const rowsPerPage = 2;

  const handleStatusChange = (id: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * rowsPerPage;
  const paginatedTasks = tasks.slice(offset, offset + rowsPerPage);

  return (
   <div>
    <h1 className=' mb-[20px] md:mb-[50px]'>My Tasks</h1>
    <div className='flex justify-end mb-[30px] '>
        <SearchBar />
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
          {paginatedTasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
             <td>
             <p 
                className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${
                  task.status === 'In processing' ? 'text-[#FFA234] bg-[#FFFCEC]' : 'text-[#2B8176] bg-[#C6F0EB] '
                }`}
              >
                {task.status}
              </p>
             </td>
              <td>{task.from}</td>
              <td>{task.to}</td>
              <td>{task.title}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.attachment}</td>
              <td>{task.note}</td>
              <td>
                <button 
                  onClick={() => handleStatusChange(task.id, 'In processing')}
                  className={` mr-2 ${
                    task.status === 'In processing' ? 'light-color cursor-not-allowed' : ' text-white'
                  }`}
                  disabled={task.status === 'In processing'}
                >
                  <ProcessIcon />
                </button>
                <button 
                  onClick={() => handleStatusChange(task.id, 'Done')}
                  className={`  ${
                    task.status === 'Done' ? 'light-color cursor-not-allowed' : ' text-white'
                  }`}
                  disabled={task.status === 'Done'}
                ><TickIcon/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="text-right">
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(tasks.length / rowsPerPage)}
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

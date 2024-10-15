"use client"
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Page = () => {
  const [activeTab, setActiveTab] = useState('peerSupport');
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 2; // Adjust the number of rows per page

  const peerSupportData = [
    { id: 1, client: 'Sandra Norton', date: '26 July 2023', phone: '7044431549', email: 'allisoncook58.ac@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },
    { id: 2, client: 'Andrea Gibson', date: '26 July 2023', phone: '7044431549', email: 'allisoncook58.ac@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    // Add more dummy data here
  ];

  const therapistData = [
    { id: 1, client: 'John Doe', date: '24 July 2023', phone: '7011234567', email: 'johndoe@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    { id: 2, client: 'Jane Smith', date: '25 July 2023', phone: '7027654321', email: 'janesmith@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },
    { id: 3, client: 'John Doe', date: '24 July 2023', phone: '7011234567', email: 'johndoe@gmail.com', chat: 'No Permission', videoChat: '', status: 'Confirm' },
    { id: 4, client: 'Jane Smith', date: '25 July 2023', phone: '7027654321', email: 'janesmith@gmail.com', chat: 'Start Chat', videoChat: '', status: 'Confirm' },
    
    // Add more dummy data here
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0); // Reset to the first page when switching tabs
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const data = activeTab === 'peerSupport' ? peerSupportData : therapistData;
  const filteredData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="">
        <h1 className=' mb-[20px] md:mb-[50px]'>Assignmets</h1>
      <div className="grid md:flex mb-[30px] gap-3 md:gap-5">
        <button className={`h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'peerSupport' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
         onClick={() => handleTabClick('peerSupport')}>
          Peer Support Assignments
        </button>
        <button className={`h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${activeTab === 'therapist' ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
         onClick={() => handleTabClick('therapist')}>
          Therapist Assignments
        </button>
      </div>
<div className='table-common overflo-custom'>
    
<table className="">
        <thead>
          <tr className="">
            <th>Client</th>
            <th>Date Assigned</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Chat Client</th>
            <th>Video Chat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody> 
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.client}</td>
              <td>{item.date}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td> 
              <p className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item.chat === 'Start Chat' ? ' text-[#42A803] bg-[#CBFFB2] ' : ' text-[#FFA234] bg-[#FFFCEC] '}`}>
                {item.chat} </p>
              </td>
              <td>{item.videoChat}</td>
              <td>
                <p className='font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>{item.status}</p> 
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
        pageCount={Math.ceil(data.length / rowsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
        pageClassName={'text-[#26395e] '}
        pageLinkClassName={'py-2 px-4 inline-block'}
        activeLinkClassName ={'text-white'}
        activeClassName={'bg-[#26395e] rounded-[5px] text-white'}
        previousLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
        nextLinkClassName={'py-2 px-4 inline-block text-[#26395e] '}
      />
      </div>
    </div>
  );
};

export default Page;

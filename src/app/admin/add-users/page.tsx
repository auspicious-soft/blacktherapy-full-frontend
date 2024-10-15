"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ButtonArrow, DeleteIcon } from "@/utils/svgicons";
import { v4 as uuidv4 } from "uuid";
import deleteCross from "@/assets/images/deleteCross.png";
import Modal from "react-modal";
import Image from "next/image";
import SearchBar from "@/app/admin/components/SearchBar";
import ReactPaginate from 'react-paginate';

interface FormData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  task: string | null;
}

const Page = () => {
  const [formData, setFormData] = useState<Omit<FormData, "id" | "task">>({
    fullName: "",
    email: "",
    password: "",
    role: "Support Team Agent",
  });

  const [data, setData] = useState<FormData[]>([]);
  const [selectedTab, setSelectedTab] = useState<"Client" | "Clinician">("Client");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [assignTaskId, setAssignTaskId] = useState<string | null>(null);
  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [task, setTask] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 4;

  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([...data, { ...formData, id: uuidv4(), task: null }]);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "Support Team Agent",
    });
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const handleDeleteCancel = () => {
    handleModalClose();
  };

  const handleDeleteConfirm = () => {
    if (deleteItemId) {
      setData(data.filter((item) => item.id !== deleteItemId));
    }
    handleModalClose();
  };

  const handleAssignTask = (id: string) => {
    setAssignTaskId(id);
    setAssignTaskModalOpen(true);
  };

  const handleAssignTaskModalClose = () => {
    setAssignTaskModalOpen(false);
    setAssignTaskId(null);
  };

  const handleAssignTaskSubmit = () => {
    if (assignTaskId) {
      setData(data.map(item => item.id === assignTaskId ? { ...item, task } : item));
    }
    setTask("");
    handleAssignTaskModalClose();
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const renderTableRows = () => {
    return currentRows.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1 + currentPage * rowsPerPage}</td>
        <td>{item.fullName}</td>
        <td>{item.role}</td>
        <td>{item.email}</td>
        <td>
          <button onClick={() => handleAssignTask(item.id)} className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px]">Assign Task</button>
        </td>
        <td>
          <button onClick={() => handleDelete(item.id)}>
            <DeleteIcon />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">Add Users</h1>
      
      <div className="bg-white rounded-[10px] w-full p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid md:flex flex-wrap gap-[30px]">
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Support Team Agent">Support Team Agent</option>
                <option value="Office Admin">Office Admin</option>
                <option value="Clinical Director">Clinical Director</option>
              </select>
            </div>
          </div>
          <div className="mt-[30px] flex justify-end ">
            <button type="submit" className="button px-[30px]">
              Submit<ButtonArrow />
            </button>
          </div>
        </form>
      </div>
      <div className="md:mt-[50px] mt-[30px]">
        <div className="mb-5">
            <h2 className="mb-[30px]">All Users</h2>
            <div className="flex justify-end">
                <SearchBar />
            </div>
        </div>
        <div className="table-common overflo-custom">
          <table className="">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Assign Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
        <div className="text-right mt-4">
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
            pageClassName={'text-[#26395e] '}  //list item
            pageLinkClassName ={'py-2 px-4 inline-block'} //anchor tag
            activeClassName={'bg-[#26395e] rounded-[5px] text-white'} //active anchor
            previousLinkClassName={'py-2 px-4 inline-block'}
            nextLinkClassName={'py-2 px-4 inline-block'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Delete User"
          className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
          overlayClassName="overlay"
        >
          <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
        <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
  <div className="flex items-center justify-center gap-6 mt-8">
  <button 
         type="button"
         onClick={handleDeleteConfirm}
         className="py-[10px] px-8 bg-[#CC0000] text-white rounded"
       >
         Yes, Delete
       </button>
       <button 
       type="button"
       onClick={handleDeleteCancel}
       className='py-[10px] px-8 bg-[#283C63] text-white rounded'>No </button>
   </div>
  </Modal>

       <Modal         //Assign Task Popup
         isOpen={assignTaskModalOpen}
         onRequestClose={handleAssignTaskModalClose}
         contentLabel="Assign Task"
         className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5"
         overlayClassName="overlay"
       >
        <button
             type="button"
             onClick={handleAssignTaskModalClose}
             className="float-right py-[5px] px-3 bg-[#CC0000] text-white rounded"
           >X </button>    
         <h2>Assign Task</h2>
         <label htmlFor="">Title</label>
         <input type="text" name="task"
           value={task}
           onChange={(e) => setTask(e.target.value)} id="" />
           <label htmlFor="">Due Date</label>
         <input type="date" name="task"
           value={task}
           onChange={(e) => setTask(e.target.value)} id="" />
         <label htmlFor="">Priority</label>
         <input type="text" name="task"
           value={task}
           onChange={(e) => setTask(e.target.value)} id="" />
         <label htmlFor="">Add File</label>
         <input type="file" name="task"
           value={task}
           onChange={(e) => setTask(e.target.value)} id="" />
         <label htmlFor="">Note</label>
         <textarea name="" id=""rows={3}></textarea>
      
         <div className="flex justify-end mt-4">
          
           <button
             type="button"
             onClick={handleAssignTaskSubmit}
             className="button"
           >Submit <ButtonArrow /></button>
         </div>
       </Modal>
     </div>
   </>
 );
};

export default Page;

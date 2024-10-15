"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ButtonArrow, DeleteIcon } from "@/utils/svgicons";
import { v4 as uuidv4 } from "uuid";
import deleteCross from "@/assets/images/deleteCross.png";
import Modal from 'react-modal';
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import SearchBar from "@/app/admin/components/SearchBar";

interface FormData {
  id: string;
  title: string;
  assignTo: string;
  uploadLink: string;
  attachment: File | null;
  description: string;
}

const Page = () => {
  const [formData, setFormData] = useState<Omit<FormData, "id">>({
    title: "",
    assignTo: "Client",
    uploadLink: "",
    attachment: null,
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<FormData[]>([]);
  const [selectedTab, setSelectedTab] = useState<"Client" | "Clinician">("Client");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const rowsPerPage = 4;

  // Filter data based on selected tab
  const filteredData = data.filter((item) => item.assignTo === selectedTab);

  // Calculate pagination based on filtered data
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList };
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([...data, { ...formData, id: uuidv4() }]);
    setFormData({
      title: "",
      assignTo: "Client",
      uploadLink: "",
      attachment: null,
      description: "",
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

  const handleAttachmentClick = (attachment: File | null) => {
    if (attachment) {
      const fileURL = URL.createObjectURL(attachment);
      window.open(fileURL, "_blank");
    }
  };

  const renderTableRows = () => {
    return currentRows.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.uploadLink}</td>
        <td>{item.assignTo}</td>
        <td>
          {item.attachment ? (
            <button
              className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px]"
              onClick={() => handleAttachmentClick(item.attachment)}
            >
              View Attachment
            </button>
          ) : (
            "No Attachment"
          )}
        </td>
        <td>{item.description}</td>
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
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Wellness
      </h1>
      <h2 className="mb-[30px]">Overview</h2>
      <div className=" bg-white rounded-[10px] w-full p-5">
        <form onSubmit={handleSubmit}>
          <div className=" grid md:flex flex-wrap gap-[30px] ">
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="John"
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Assign To</label>
              <select
                name="assignTo"
                value={formData.assignTo}
                onChange={handleInputChange}
              >
                <option value="Client">Client</option>
                <option value="Clinician">Clinician</option>
              </select>
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Upload Link</label>
              <input
                type="text"
                name="uploadLink"
                value={formData.uploadLink}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">Choose Attachment</label>
              <input
                type="file"
                name="attachment"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="mt-[30px] flex justify-end ">
            <button type="submit" className="button px-[30px]">
              Submit<ButtonArrow />
            </button>
          </div>
        </form>
      </div>
      <div className="mt-[50px]">
        <div className="flex justify-center md:justify-between flex-col md:flex-row">
          <div className="flex gap-5 mb-4">
            <button
              className={`md:h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${selectedTab === "Client" ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
              onClick={() => {
                setSelectedTab("Client");
                setCurrentPage(0); // Reset to first page when changing tab
              }}
            >
              Client Training Portal
            </button>
            <button
              className={`md:h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${selectedTab === "Clinician" ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
              onClick={() => {
                setSelectedTab("Clinician");
                setCurrentPage(0); // Reset to first page when changing tab
              }}
            >
              Clinician Training Portal
            </button>
          </div>
         <div className="mb-4 flex justify-center"> <SearchBar /></div>
        </div>
        <div className="table-common overflo-custom">
          <table className="">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Link</th>
                <th>Assign To</th>
                <th>Attachment</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
        <div className="text-right">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(filteredData.length / rowsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
            pageClassName={'text-[#26395e] '}  //list item
            pageLinkClassName={'py-2 px-4 inline-block'} //anchor tag
            activeClassName={'bg-[#26395e] rounded-[5px] text-white'} //active anchor
            previousLinkClassName={'py-2 px-4 inline-block'}
            nextLinkClassName={'py-2 px-4 inline-block'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Delete Clinician"
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
              className='py-[10px] px-8 bg-[#283C63] text-white rounded'
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Page;

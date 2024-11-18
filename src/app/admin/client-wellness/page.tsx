"use client";
import React, { useState, ChangeEvent, FormEvent, useTransition } from "react";
import { ButtonArrow, DeleteIcon } from "@/utils/svgicons";
import Modal from 'react-modal';
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import SearchBar from "@/app/admin/components/SearchBar";
import useSWR from "swr";
import { AddNewWellness, DeleteWellness, GetClientWellness } from "@/services/admin/admin-service";
import deleteCross from "@/assets/images/deleteCross.png";
import { toast } from "sonner";
import Notification from "../components/Notification";
import useClients from "@/utils/useClients";
import CustomSelect from "../components/CustomSelect";
import useTherapists from "@/utils/useTherapists";
interface FormData {
  title: string;
  assignTo: string;
  link: string;
  attachment: string;
  description: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    assignTo: "",
    link: "",
    attachment: "",
    description: "",
  });

  const [isPending, startTransition] = useTransition();
  const [selectedTab, setSelectedTab] = useState("clients");
  const [query, setQuery] = useState('');
  const { data, error, isLoading, mutate } = useSWR(`/admin/wellness?assignTo=${selectedTab === 'clients' ? 'clients' : 'therapists'}&${query}`, GetClientWellness);
  const clientsTrainingData = data?.data?.data;
  const [notification, setNotification] = useState<string | null>(null);
  const total = data?.data?.total ?? 0;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [selectedClientOrClinician, setSelectedClientOrClinician] = useState<any>(null);
  const { clientsData } = useClients();
  const { therapistData } = useTherapists();
  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name == 'assignTo') setSelectedClientOrClinician(null)
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList };
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    startTransition(async () => {
      try {
        if (selectedClientOrClinician) (formData as any).assignedToId = selectedClientOrClinician?.value
        formData.attachment = 'http://example.com/attachments/yoga-session.pdf'
        const response = await AddNewWellness(formData);
        if (response?.status === 201) {
          setNotification("Therapist Registeration Successful");
          setFormData({
            title: "",
            assignTo: "",
            link: "",
            attachment: "",
            description: "",
          })
          mutate()
        } else {
          toast.error("Failed to add wellness entry");
        }
      } catch (error) {
        console.error("Error adding wellness entry:", error);
        toast.error("An error occurred while adding the wellness entry");
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    const route = `/admin/delete-wellness/${id}`;
    try {
      const response = await DeleteWellness(route);
      if (response.status === 200) {
        toast.success("Wellness entry deleted successfully");
      } else {
        toast.error("Failed to delete wellness entry");
      }
    } catch (error) {
      console.error("Error deleting wellness entry:", error);
      toast.error("An error occurred while deleting the wellness entry");
    }
    setIsDeleteModalOpen(false);
    mutate()
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  const handleSelectChange = (selected: any) => {
    setSelectedClientOrClinician(selected);
  };
  // const handleClient = (selected: any) => {
  //     setSelectedClients(selected);
  // };
  // const handleClinician = (selected: any) => {
  //   setSelectedClinician(selected);
  // };


  return (
    <>
      <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
        Wellness
      </h1>
      <h2 className="mb-[30px]">Overview</h2>
      <div className="bg-white rounded-[10px] w-full p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid md:flex flex-wrap gap-[30px]">
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="John"
                required
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Assign To</label>
              <select
                name="assignTo"
                required
                value={formData.assignTo}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="clients">Client</option>
                <option value="therapists">Clinician</option>
              </select>
            </div>
            {formData.assignTo === "clients" && (
              <div className="md:w-[calc(33.33%-30px)]">
                <CustomSelect
                  name="Clients"
                  value={selectedClientOrClinician}
                  options={clientsData}
                  onChange={handleSelectChange}
                  placeholder="Select Client"
                  required = {false}
                />
              </div>
            )}
            {formData.assignTo === "therapists" && (
              <div className="md:w-[calc(33.33%-30px)]">
                <CustomSelect
                  name="Clinician"
                  value={selectedClientOrClinician}
                  options={therapistData}
                  onChange={handleSelectChange}
                  placeholder="Select Clinician"
                  required = {false}
                />
              </div>
            )}
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Upload Link</label>
              <input
                type="text"
                required
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">Choose Attachment</label>
              <input
                type="file"
                required
                name="attachment"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                required
                onChange={handleInputChange}
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="mt-[30px] flex justify-end ">
            <button type="submit" className="button px-[30px]" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}<ButtonArrow />
            </button>
          </div>
        </form>
      </div>
      <div className="mt-[50px]">
        <div className="flex justify-center md:justify-between flex-col md:flex-row">
          <div className="flex gap-5 mb-4">
            <button
              className={`md:h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${selectedTab === "clients" ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
              onClick={() => {
                setSelectedTab("clients");
              }}
            >
              Client Training Portal
            </button>
            <button
              className={`md:h-[46px] py-3 px-4 text-sm rounded-[5px] border border-[#283c63] ${selectedTab === "therapists" ? 'active bg-[#283c63] !text-white' : ''} text-[#26395e]`}
              onClick={() => {
                setSelectedTab("therapists");
              }}
            >
              Clinician Training Portal
            </button>
          </div>
          <div className="mb-4 flex justify-center">
            <SearchBar setQuery={setQuery} />
          </div>
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
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center text-red-500">
                    Error loading data.
                  </td>
                </tr>
              ) : clientsTrainingData?.length > 0 ? (
                clientsTrainingData?.map((row: any) => (
                  <tr key={row?._id}>
                    <td>{row?._id}</td>
                    <td>{row?.title}</td>
                    <td>
                      <a href={row?.link} className="text-[#26395E] ">
                        {row?.link}</a>
                    </td>
                    <td className="capitalize">{row?.assignedToId ? row?.assignedToId?.firstName + ' ' + row?.assignedToId?.lastName : row?.assignTo}</td>
                    <td>
                      <a href={row?.attachment}
                        className="font-gothamMedium rounded-3xl py-[4px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px]">
                        View Attachment</a>
                    </td>
                    <td>{row?.description}</td>
                    <td>
                      <button onClick={() => handleDelete(row?._id)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='w-full flex justify-center p-3 items-center' colSpan={5} >No data found</td>
                </tr>
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
            containerClassName={'inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]'}
            pageClassName={'text-[#26395e] '}
            pageLinkClassName={'py-2 px-4 inline-block'}
            activeClassName={'bg-[#26395e] rounded-[5px] text-white'}
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
          <div className="flex flex-col justify-center items-center">
            <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
            <p className="text-[#283C63] font-bold text-[20px] text-center leading-normal mt-[-20px] ">Are you sure you want to delete?</p>

            <div className="flex gap-4 mt-5">
              <button
                type="button"
                onClick={() => handleDeleteConfirm(deleteItemId as string)}
                className="py-[10px] px-8 bg-[#CC0000] text-white rounded"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className='py-[10px] px-8 bg-[#283C63] text-white rounded'
              >
                No
              </button>
            </div>
          </div>
        </Modal>
        <Notification message={notification} onClose={() => setNotification(null)} />
      </div>
    </>
  );
};

export default Page;

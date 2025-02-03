"use client";
import React, { useState, ChangeEvent, FormEvent, useTransition } from "react";
import { ButtonArrow, DeleteIcon } from "@/utils/svgicons";
import { v4 as uuidv4 } from "uuid";
import deleteCross from "@/assets/images/deleteCross.png";
import Modal from "react-modal";
import Image from "next/image";
import SearchBar from "@/app/admin/components/SearchBar";
import ReactPaginate from 'react-paginate';
import { AddNewUser, AssignTaskToUser, DeleteUser, GetUserDetails } from "@/services/admin/admin-service";
import useSWR from "swr";
import Notification from "../components/Notification";
import { toast } from "sonner";
import { notEqual } from "assert";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
interface TaskData {
  title: string,
  dueDate: string,
  priority: string,
  note: string,
  attachment: string,
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [taskData, setTaskData] = useState<TaskData>(
    {
      title: "",
      dueDate: "",
      priority: "",
      note: "",
      attachment: "",
    }
  )
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const { data, error, isLoading, mutate } = useSWR(`/admin/users?${query}`, GetUserDetails);

  const getUserData = data?.data?.data;

  const [notification, setNotification] = useState<string | null>(null);
  const total = data?.data?.total ?? 0;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [assignTaskId, setAssignTaskId] = useState<string | null>(null);

  const rowsPerPage = 10;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await AddNewUser(formData);
        if (response?.status === 201) {
          setNotification("User Added Successfully");
          // toast.success("Wellness entry added successfully");
          setFormData({
            fullName: "",
            email: "",
            password: "",
            role: "",
          });
        } else {
          toast.error("Failed to add User Data");
        }
      } catch (error) {
        console.error("Error adding User Data:", error);
        toast.error("An error occurred while adding the User Data");
      }
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

  const handleDeleteConfirm = async (id: string) => {
    const route = `/admin/users/${id}`;
    try {
      const response = await DeleteUser(route);
      if (response.status === 200) {
        setIsDeleteModalOpen(false);
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error("An error occurred while deleting the User");
    }

    mutate()
  };

  const handleAssignTask = (id: string) => {
    setAssignTaskId(id);
    setAssignTaskModalOpen(true);
  };

  const handleAssignTaskModalClose = () => {
    setAssignTaskModalOpen(false);
    setAssignTaskId(null);
  };

  const handleAssignTaskInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAssignTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const formattedDueDate = new Date(taskData.dueDate).toISOString();

        const taskPayload = {
          ...taskData,
          dueDate: formattedDueDate,
          attachment: "http://example.com/attachments/static-task-file.pdf",
          priority: "High",
        };
        const response = await AssignTaskToUser(`/admin/users/${assignTaskId}`, taskPayload);
        if (response?.status === 201) {
          toast.success("Task assigned successfully");
          setAssignTaskModalOpen(false);
          setTaskData({
            title: "",
            dueDate: "",
            priority: "",
            note: "",
            attachment: "",
          });
        } else {
          console.error("Failed to assign task.");
        }
      } catch (error) {
        console.error("An error occurred while assigning the task:", error);
      }
    });
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
                required
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
                required
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
                required
              />
            </div>
            <div className="md:w-[calc(33.33%-30px)]">
              <label className="block mb-2">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>--Select</option>
                <option value="Support Team Agent">Support Team Agent</option>
                <option value="Support Team Supervisor"> Support Team Supervisor</option>
                <option value="Office Admin">Office Admin</option>
                <option value="Clinical Director">Clinical Director</option>
                <option value="QP / Supervisor">QP / Supervisor</option>
                <option value="Director of Operation/ Billing">Director of Operation/ Billing</option>
                <option value="Director">Director</option>
                <option value="Peer Support Specialist">Peer Support Specialist</option>
                <option value="Para Professional">Para Professional</option>
                <option value="AP">AP</option>
              </select>
            </div>
          </div>
          <div className="mt-[30px] flex justify-end ">
            <button type="submit" className="button px-[30px]" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit'}<ButtonArrow />
            </button>
          </div>
        </form>
      </div>
      <div className="md:mt-[50px] mt-[30px]">
        <div className="mb-5">
          <h2 className="mb-[30px]">All Users</h2>
          <div className="flex justify-end">
            <SearchBar setQuery={setQuery} />
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
              ) : getUserData?.length > 0 ? (
                getUserData?.map((row: any) => (
                  <tr key={row?._id}>
                    <td>{row?._id}</td>
                    <td>{row?.fullName}</td>
                    <td>{row?.role}</td>
                    <td>{row?.email}</td>
                    <td>
                      <button onClick={() => handleAssignTask(row?._id)} className="font-gothamMedium rounded-3xl py-[2px] px-[10px] text-[#26395E] bg-[#CCDDFF] text-[10px]">Assign Task</button>
                    </td>
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
          contentLabel="Delete User"
          className="modal max-w-[584px] mx-auto bg-white rounded-xl w-full p-5 bg-flower"
          overlayClassName="overlay"
        >
          <Image src={deleteCross} alt='delete' height={174} width={174} className="mx-auto" />
          <h2 className="text-[20px] text-center leading-normal mt-[-20px]">Are you sure you want to Delete?</h2>
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={() => handleDeleteConfirm(deleteItemId as string)}
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

        <Modal
          isOpen={assignTaskModalOpen}
          onRequestClose={handleAssignTaskModalClose}
          contentLabel="Assign Task"
          className="rounded-lg w-full max-w-4xl mx-auto bg-white shadow-lg max-h-[90vh] overflow-auto"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <div className="p-3">
            <button type="button" onClick={handleAssignTaskModalClose}
              className="float-right py-[5px] px-3 bg-[#CC0000] text-white rounded">X </button>
            <h2>Assign Task </h2>

            <form onSubmit={handleAssignTaskSubmit}>
              <label htmlFor="">Title</label>
              <input type="text" name="title"
                value={taskData.title}
                onChange={handleAssignTaskInput} id="" />

              <label htmlFor="">Due Date</label>
              <input type="date" name="dueDate"
                value={taskData.dueDate}
                onChange={handleAssignTaskInput} id="" />

              <label htmlFor="">Priority</label>
              <input type="text" name="priority"
                value={taskData.priority}
                onChange={handleAssignTaskInput} id="" />

              <label htmlFor="">Add File</label>
              <input type="file" name="attachment"
                value={taskData.attachment}
                onChange={handleAssignTaskInput} id="" />

              <label htmlFor="">Note</label>
              <textarea name="note" value={taskData.note} onChange={handleAssignTaskInput} rows={3}>

              </textarea>

              <div className="flex justify-end mt-4">

                <button
                  type="submit"
                  className="button"
                >Submit <ButtonArrow /></button>

              </div>
            </form>
          </div>
        </Modal>
        <Notification message={notification} onClose={() => setNotification(null)} />
      </div>
    </>
  );
};

export default Page;

import { addClientAttachments, addClinicianAttachments, GetClientAttachments, getClinicianAttachments } from "@/services/admin/admin-service";
import { AddMoreIcon, CloseIcon } from "@/utils/svgicons";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import useSWR from "swr";

interface ClinicianAttachmentsProps {
  rowId: string;
}

const initialData = [
  {
    title: "Yes",
    viewAttachments: [{ name: "attachment1.pdf", url: "#" }],
    userRole: "Admin",
  },
];

const ClinicianAttachments: React.FC<ClinicianAttachmentsProps> = ({ rowId }) => {
  const { data, error, isLoading , mutate} = useSWR(`/admin/therapists/attachments/${rowId}`, getClinicianAttachments);
  const attachmentsInfo = data?.data?.data;

  const { data: session } = useSession();
  const userRole = (session as any)?.user?.role;
  
  const [dataa, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    viewAttachments: [{ name: "", url: "" }],
    userRole: 'Admin',
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newAttachments = [...formData.viewAttachments];
      newAttachments[index] = {
        name: files[0].name,
        url: URL.createObjectURL(files[0]),  
      };
      setFormData({ ...formData, viewAttachments: newAttachments });
    }
  };

  const addMoreAttachments = () => {
    setFormData({
      ...formData,
      viewAttachments: [...formData.viewAttachments, { name: "", url: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const attachmentData = {
      title: formData.title,
      attachments: formData.viewAttachments.map((attachment) => attachment.name), 
      assignedBy: userRole, 
    };
    try {
      const response = await addClinicianAttachments(`/admin/therapists/attachments/${rowId}`, attachmentData);
  
      if (response.status === 201) {
        toast.success("Attachment added successfully");
        setData([...dataa, formData]); 
        closeModal();
        setFormData({
          title: '',
          viewAttachments: [{ name: "", url: "" }],
          userRole: userRole,
        });
        mutate(); 
        setModalIsOpen(false);
      } else {
        toast.error("Failed to add attachment");
      }
    } catch (error) {
      console.error("Error adding attachment", error);
      toast.error("An error occurred while adding the attachment");
    }
  };


  return (
    <div>
      <div className="flex justify-end mb-[22px]">
        <button
          onClick={openModal}
          className="!text-sm !h-[40px] !px-[30px] button"
        >
          Add New
        </button>
      </div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>View Attachments</th> 
              <th>User Role</th>
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
            ) : attachmentsInfo?.length > 0 ? (
  attachmentsInfo?.map((row: any) => (
    <tr key={row._id}>
      <td>{row.title}</td>
      <td>
        {row.attachments?.map((attachment: string, index: number) => (
          <div key={index}>
            <a href={attachment} target="_blank" rel="noopener noreferrer" className="text-[#26395E]">
              View Attachment
            </a>
          </div>
        ))}
      </td>
      <td className="capitalize">{userRole}</td>
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
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-auto overflo-custom "
        overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]  ">
          <h2 className="font-gothamMedium !text-white">Add New</h2>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-5 md:px-[35px] md:py-10">
          <div className="grid md:grid-cols-2 gap-4 md:gap-[30px] ">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2">User Role</label>
              <input
                type="text"
                value="Admin"
                disabled
              />
            </div>
            {formData.viewAttachments.map((attachment, index) => (
              <div key={index}>
                <label className="block mb-2">View Attachment {index + 1}</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e)}
                />
                {attachment.url && (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {attachment.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-[28px] ">
            <button
              type="button"
              onClick={addMoreAttachments}
              className="flex gap-[9px] items-center text-[#707070] font-gothamBold text-xs "
            >
              <AddMoreIcon />
              Add More
            </button>
          </div>
          <div className="mt-5 md:mt-10 flex justify-end">
            <button type="submit" className="button">
              Add New
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClinicianAttachments;

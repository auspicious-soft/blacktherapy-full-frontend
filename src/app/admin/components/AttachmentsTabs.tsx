import { GetClientAttachments } from "@/services/admin/admin-service";
import { AddMoreIcon, CloseIcon } from "@/utils/svgicons";
import React, { useState } from "react";
import Modal from "react-modal";
import useSWR from "swr";

interface AttachmentsTabsProps {
  rowId: string;
}

const initialData = [
  {
    title: "Yes",
    viewAttachments: [{ name: "attachment1.pdf", url: "#" }],
    userRole: "Current Balance",
  },
];

const AttachmentsTabs: React.FC<AttachmentsTabsProps> = ({ rowId }) => {
  const { data, error, isLoading } = useSWR(`/admin/client/attachments/${rowId}`, GetClientAttachments);
  const attachmentsInfo = data?.data?.data;

  const [dataa, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    viewAttachments: [{ name: "", url: "" }],
    userRole: '',
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
        url: URL.createObjectURL(files[0]),  // Create a preview URL for the file
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData([...dataa, formData]); // Add new data to the table
    setFormData({
      title: '',
      viewAttachments: [{ name: "", url: "" }],
      userRole: '',
    });
    closeModal();
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
            {attachmentsInfo?.map((row: any) =>
              row?.attachmemts?.map((attachment: string, attachmentIndex: number) => (
                <tr key={`${row?._id}-${attachmentIndex}`}>
                  <td>{row?.title}</td>
                  <td>
                    <a href={attachment} className="text-[#26395E]">
                      View File
                    </a>
                  </td>
                  <td>Admin</td> {/* Show role only once {attachmentIndex === 0 ? "Admin" : ""} */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Entry"
        className="modal max-w-[810px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom "
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
                name="userRole"
                value={formData.userRole}
                onChange={handleInputChange}
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AttachmentsTabs;

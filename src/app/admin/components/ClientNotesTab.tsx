import { AddClientNotesData, GetClientNotes } from "@/services/admin/admin-service";
import { CloseIcon } from "@/utils/svgicons";
import React, { ChangeEvent, useState, useTransition } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import useSWR from "swr";
 
interface NotesProps {
  rowId: string;
}
const ClientNotesTab: React.FC<NotesProps> = ({rowId}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [newNote, setNewNote] = useState("");
  const { data, error, isLoading, mutate } = useSWR(`/admin/client/notes/${rowId}`, GetClientNotes);
  const [isPending, startTransition] = useTransition();
  
  const notesInfo = data?.data?.data;


  const openModal = () => setModalIsOpen(true);
  
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  const handleAddNote = async () => {
     startTransition(async () => {
      try {
        const response = await AddClientNotesData(`/admin/client/notes/${rowId}`, { note: newNote });
        console.log('response:', response);
        if (response?.status === 201) {
          mutate(); 
          toast.success("Note added successfully");
          closeModal();
        } else {
          toast.error("Error adding the note.");
        }
      } catch (error) {
        toast.error("Error submitting the note.");
      }
     });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes.</p>;


  return (
    <div>
      <div className="flex justify-end mb-[22px]">
        <button onClick={openModal} className="!text-sm !h-[40px] !px-[30px] button">
          Add New
        </button>
      </div>
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>Note</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {notesInfo?.map((row: any) => (
              <tr key={row?._id}>
                <td>{row?.note}</td>
                <td>{row?.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new note */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Note"
        className="modal max-w-[600px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-auto overflo-custom"
        overlayClassName="w-full h-full px-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]">
          <h2 className="font-gothamMedium !text-white">Add New Note</h2>
          <button onClick={closeModal}><CloseIcon /> </button>
        </div>

        <div className="bg-white p-5 md:px-[35px] md:py-10">
          <div>
            <label className="block mb-2">Note</label>
            <textarea
              name="note"
              value={newNote}
              onChange={handleInputChange}
              className="w-full h-[100px] border border-gray-300 rounded-md p-2"
              placeholder="Enter your note"
              required
            />
          </div>
          <div className="mt-5 md:mt-10 flex justify-end">
            <button
              onClick={handleAddNote}
              className="button"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Note"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientNotesTab;

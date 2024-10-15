import { CloseIcon } from "@/utils/svgicons";
import React, { useState } from "react";
import Modal from "react-modal";

// Helper function to get current time
const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
  };

// Note interface to define the structure of a note
interface Note {
  note: string;
  dateTime: string;
}

const ClientNotesTab: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]); // State to manage the notes array
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [newNote, setNewNote] = useState(""); // State to manage new note input

  // Function to open the modal
  const openModal = () => setModalIsOpen(true);
  
  // Function to close the modal
  const closeModal = () => setModalIsOpen(false);

  // Handle input change for the note field
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: Note = {
      note: newNote,
      dateTime: getCurrentDateTime(), 
     // Automatically gets the current time
    };

    // Add new note to the notes array
    setNotes([...notes, newEntry]);

    // Clear the input field after submission
    setNewNote("");
    closeModal();
  };

  return (
    <div>
      {/* Button to open the modal for adding a new note */}
      <div className="flex justify-end mb-[22px]">
        <button onClick={openModal} className="!text-sm !h-[40px] !px-[30px] button">
          Add New
        </button>
      </div>

      {/* Table to display notes and corresponding times */}
      <div className="table-common overflo-custom">
        <table>
          <thead>
            <tr>
              <th>Note</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((entry, index) => (
              <tr key={index}>
                <td>{entry.note}</td>
                <td>{entry.dateTime}</td>
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
        className="modal max-w-[600px] mx-auto rounded-[20px] w-full  max-h-[90vh] overflow-scroll overflo-custom"
        overlayClassName="w-full h-full px-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        ariaHideApp={false}
      >
        <div className="flex items-center justify-between rounded-t-[20px]  p-5 md:py-[25px] md:px-[35px] bg-[#283C63]">
          <h2 className="font-gothamMedium !text-white">Add New Note</h2>
          <button onClick={closeModal}><CloseIcon /> </button>
        </div>

        {/* Form inside modal to add a note */}
        <form onSubmit={handleSubmit} className="bg-white p-5 md:px-[35px] md:py-10">
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
            <button type="submit" className="button">
              Add Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientNotesTab;

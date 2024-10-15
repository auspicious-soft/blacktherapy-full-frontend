import React from "react";

const ClientsAssignmentsTab = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
<div className="grid md:grid-cols-2  gap-4 md:gap-5">
<div className="">
          <label className="block mb-2">
            To begin, tell us why you&apos;re looking for help today?
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="Clinician 1">Clinician 1</option>
            <option value="Clinician 2">Clinician 2</option>
            <option value="Clinician 3">Clinician 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">
            To begin, tell us why you&apos;re looking for help today?
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="value 1">value 1</option>
            <option value="value 2">value 2</option>
            <option value="value 3">value 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">
            How would you rate your current physical health?
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="value 1">value 1</option>
            <option value="value 2">value 2</option>
            <option value="value 3">value 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">
            How would you rate your current physical health?
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="value 1">value 1</option>
            <option value="value 2">value 2</option>
            <option value="value 3">value 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">
            What gender do you identify with?
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="value 1">value 1</option>
            <option value="value 2">value 2</option>
            <option value="value 3">value 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">
            Briefly describe the main issues or concerns that bring you to
            therapy?
          </label>
          <input type="text" name="" id="" placeholder="" />
        </div>
</div>
        <div className="mt-5 md:mt-10  flex justify-end">
          <button type="submit" className="button !px-[30px]">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientsAssignmentsTab;

import React from 'react';

const ClientsInsurenceTab = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
      };
    return (
        <div>
             <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 md:gap-5">
        <div className="">
          <label className="block mb-2">Insurance Company
          </label>
          <select name="assignedClinician" value="" className="">
            <option value="">--Select--</option>
            <option value="Clinician 1">Clinician 1</option>
            <option value="Clinician 2">Clinician 2</option>
            <option value="Clinician 3">Clinician 3</option>
          </select>
        </div>
        <div className="">
          <label className="block mb-2">Member ID
          </label>
          <input type="text" name="" id="" placeholder="" />
        </div>
        <div className="mt-[10px] md:col-span-2  flex justify-end">
          <button type="submit" className="button !px-[30px]">
            Update
          </button>
        </div>
        </form>
        </div>
    );
}

export default ClientsInsurenceTab;

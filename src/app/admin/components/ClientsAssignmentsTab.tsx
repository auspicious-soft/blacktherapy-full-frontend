import React from "react";

interface ClientsAssignmentsProps {
  row: any; 
}

const ClientsAssignmentsTab: React.FC<ClientsAssignmentsProps> = ({ row }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block mb-2">To begin, tell us why you&apos;re looking for help today?</label>
            <select name="reasonForLookingHelp" value={row?.reasonForLookingHelp || ""} className="">
              <option value="">--Select--</option>
              <option value="I need assistance with anxiety management.">I need assistance with anxiety management.</option>
              <option value="Help with anxiety">Help with anxiety</option>
              <option value="Help with depression">Help with depression</option>
              <option value="General counseling">General counseling</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">How did you know about us?</label>
            <select name="howYouKnewUs" value={row?.howYouKnewUs || ""} className="">
              <option value="">--Select--</option>
              <option value="Through social media">Through social media</option>
              <option value="Referral">Referral</option>
              <option value="Online search">Online search</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">How would you rate your current physical health?</label>
            <select name="rateCurrentPhysicalHealth" value={row?.rateCurrentPhysicalHealth || ""} className="">
              <option value="">--Select--</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">How would you rate your sleeping habits?</label>
            <select name="rateSleepingHabits" value={row?.rateSleepingHabits || ""} className="">
              <option value="">--Select--</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">What gender do you identify with?</label>
            <select name="gender" value={row?.gender || ""} className="">
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Briefly describe the main issues or concerns that bring you to therapy?</label>
            <input
              type="text"
              name="mainIssueBrief"
              value={row?.mainIssueBrief || ""}
              placeholder="Describe your concerns"
              className=""
            />
          </div>
        </div>
        <div className="mt-5 md:mt-10 flex justify-end">
          <button type="submit" className="button !px-[30px]">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientsAssignmentsTab;

import ReactLoader from "@/components/ReactLoader";
import { updateClientsDetails } from "@/services/admin/admin-service";
import React, { useState } from "react";
import { toast } from "sonner";

interface ClientsAssignmentsProps {
  row: any;
  mutate: any;
}

const ClientsAssignmentsTab: React.FC<ClientsAssignmentsProps> = ({ row, mutate }) => {
  const [formData, setFormData] = useState({
    reasonForLookingHelp: row?.reasonForLookingHelp?.join(", ") || "",
    manageStress: row?.manageStress?.join(", ") || "",
    majorLifeChanges: row?.majorLifeChanges?.join(", ") || "",
    availableTimes: row?.availableTimes?.join(", ") || "",
    rateSleepingHabits: row?.rateSleepingHabits || "",
    rateCurrentPhysicalHealth: row?.rateCurrentPhysicalHealth || "",
    howYouKnewUs: row?.howYouKnewUs || "",
    gender: row?.gender || "",
    mainIssueBrief: row?.mainIssueBrief || "",
    communicationPreference: row?.communicationPreference || "",
    diagnosedWithMentalHealthCondition: row?.diagnosedWithMentalHealthCondition || "",
    historyOfSuicidalThoughts: row?.historyOfSuicidalThoughts || "",
    liveWithOthers: row?.liveWithOthers || "",
    relationshipStatus: row?.relationshipStatus || "",
    seenTherapistBefore: row?.seenTherapistBefore || "",
    therapyStyle: row?.therapyStyle || "",
    unlimitedMessaging: row?.unlimitedMessaging || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await updateClientsDetails(`/admin/clients/${row._id}`, formData);
        toast.success("Client details updated successfully");
        mutate();

      } catch (error) {
        console.error("Error updating client details:", error);
        toast.error("Error updating client details");
      }
    })
  };
  const [isPending, startTransition] = React.useTransition();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <div>
            <label className="block mb-2">Why are you looking for help today?</label>
            <textarea
              name="reasonForLookingHelp"
              value={formData.reasonForLookingHelp}
              onChange={handleChange}
              placeholder="Enter reasons separated by commas"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">How did you hear about us?</label>
            <select name="howYouKnewUs" value={formData.howYouKnewUs} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="" disabled>--Select--</option>
              <option value="Social Media (Facebook, Instagram, Twitter)">Social Media</option>
              <option value="Referral">Referral</option>
              <option value="Online search">Online search</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">How do you manage stress?</label>
            <textarea
              name="manageStress"
              value={formData.manageStress}
              onChange={handleChange}
              placeholder="Enter methods separated by commas"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Major life changes</label>
            <textarea
              name="majorLifeChanges"
              value={formData.majorLifeChanges}
              onChange={handleChange}
              placeholder="Enter events separated by commas"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Available times</label>
            <textarea
              name="availableTimes"
              value={formData.availableTimes}
              onChange={handleChange}
              placeholder="Enter times separated by commas"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">How would you rate your physical health?</label>
            <select name="rateCurrentPhysicalHealth" value={formData.rateCurrentPhysicalHealth} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">--Select--</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">How would you rate your sleeping habits?</label>
            <select name="rateSleepingHabits" value={formData.rateSleepingHabits} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">--Select--</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">What gender do you identify with?</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Briefly describe your main issues or concerns</label>
            <input
              type="text"
              name="mainIssueBrief"
              value={formData.mainIssueBrief}
              onChange={handleChange}
              placeholder="Describe your concerns"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Communication preference</label>
            <input
              type="text"
              name="communicationPreference"
              value={formData.communicationPreference}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Have you been diagnosed with a mental health condition?</label>
            <select name="diagnosedWithMentalHealthCondition" value={formData.diagnosedWithMentalHealthCondition} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Have you ever had suicidal thoughts?</label>
            <select name="historyOfSuicidalThoughts" value={formData.historyOfSuicidalThoughts} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="mt-5 md:mt-10 flex justify-end">
          <button type="submit" className="button !px-[30px]">
            Update
          </button>
          {
            isPending && <div className="fixed top-0 left-0 z-50 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
              <ReactLoader />
            </div>
          }
        </div>
      </form>
    </div>
  );
};

export default ClientsAssignmentsTab;

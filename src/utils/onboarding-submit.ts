import { addOnboardingFormData } from "@/services/therapist/therapist-service.";
import { toast } from "sonner";

export const submitForm = async (
  formData:  any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
    console.log('formData:', formData);
  try {
    const response = await addOnboardingFormData('/therapist/onboarding', formData);
    console.log('response:', response);

    if (response?.status === 201) {
      toast.success("Therapist data added successfully");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
      });
    } else {
      toast.error("Failed to add Therapist Data");
    }
  } catch (error) {
    console.error("Error adding Therapist Data:", error);
    toast.error("An error occurred while adding the Therapist Data");
  }
};


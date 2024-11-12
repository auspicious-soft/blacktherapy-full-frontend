import { addOnboardingFormData } from "@/services/therapist/therapist-service.";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Helper to convert string to boolean
const stringToBoolean = (value: string): boolean => {
    const normalizedValue = value.toLowerCase().trim();
    const trueValues = ["yes", "true", "i agree"];
    
    return trueValues.includes(normalizedValue);
};

// List of fields that should be boolean
const booleanFields = [
  "livedInNorthCarolina",
  "validDriverLicense",
  "reliableTransportation",
  "legalRightToWorkInUS",
  "reasonableAccommodation",
  "consentAgreement",
  "againConsentAgreement"
];

export const submitForm = async (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  console.log('formData:', formData);
  try {
    // Create a new object for formatted data
    const formattedData = { ...formData };

    // Convert boolean fields from string to actual boolean
    booleanFields.forEach(field => {
      if (field in formattedData) {
        formattedData[field] = stringToBoolean(formattedData[field]);
      }
    });

    formattedData.againConsentSignature = "sample-content.pdf";
    formattedData.consentSignature = "sample-content.pdf";
    formattedData.currentResume = "sample-resume-content.pdf";
    formattedData.superVisionAgreement = "sample-supervision-agreement.pdf";
    delete formattedData.signature
    const response = await addOnboardingFormData('/therapist/onboarding', formattedData);
    console.log('response:', response);

    if (response?.status === 201) {
      toast.success("Therapist data added successfully");
    }  else {
      toast.error("Failed to add Therapist Data");
    }
  } catch (error) {
    console.error("Error adding Therapist Data:", error);
    toast.error("An error occurred while adding the Therapist Data");
  }
};
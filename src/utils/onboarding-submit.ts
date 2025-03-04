"use client";
import { generateSignedUrlToUploadOn } from "@/actions";
import { addOnboardingFormData } from "@/services/therapist/therapist-service.";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { validUSPhoneNumber } from ".";
import { uploadTherapistOnboardingDetails } from "@/components/Pdf-template/therapist-onboarding-details";

// const session = await auth()
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
  "againConsentAgreement",
];

export const submitForm = async (formData: any, userEmail: string, router: any) => {
  if (!userEmail) {
    toast.error("User email is required.");
    return;
  }

  try {
    const formattedData = { ...formData };

    booleanFields.forEach((field) => {
      if (field in formattedData) {
        formattedData[field] = stringToBoolean(formattedData[field]);
      }
    });

    const filesToUpload = [
      "againConsentSignature",
      "consentSignature",
      "currentResume",
      "superVisionAgreement",
    ];

    for (const fileKey of filesToUpload) {
      if (formattedData[fileKey]) {
        try {
          const { signedUrl, key } = await generateSignedUrlToUploadOn(
            formattedData[fileKey].name,
            formattedData[fileKey].type,
            userEmail as string
          );

          const uploadResponse = await fetch(signedUrl, {
            method: "PUT",
            body: formattedData[fileKey],
            headers: {
              "Content-Type": formattedData[fileKey].type,
            },
            cache: "no-store",
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload ${fileKey}`);
          }

          // Replace the file object with the S3 key
          formattedData[fileKey] = key;
        } catch (uploadError) {
          toast.error(`Failed to upload ${fileKey}. Please try again.`);
          console.error(`Error uploading ${fileKey}:`, uploadError);
          return;
        }
      }
    }

    const { key } = await uploadTherapistOnboardingDetails(formattedData, userEmail);
    formattedData.onboardingPdfKey = key
    delete formattedData.signature  // AS THIS IS UNNECESSARY
    // Call the API to add pdf to aws
    const response = await addOnboardingFormData("/therapist/onboarding", formattedData);

    if (response?.status === 201) {
      toast.success("Therapist data added successfully");
      await signOut({ redirect: false })
      router.push('/login');
    }
    else {
      toast.error("Failed to add Therapist Data");
    }
  }
  catch (error:any) {
    if(error?.status == 403) {
      toast.error("An application with this email already exists")
      return
    }
    toast.error("An error occurred while adding the Therapist Data");
  }
};

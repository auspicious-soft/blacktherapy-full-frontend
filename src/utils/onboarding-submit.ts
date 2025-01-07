
import { generateSignedUrlToUploadOn } from "@/actions";
import { auth } from "@/auth";
import { addOnboardingFormData } from "@/services/therapist/therapist-service.";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

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
  "againConsentAgreement"
];

export const submitForm = async (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  userEmail: string
) => {
 
  try {
    // Create a new object for formatted data
    const formattedData = { ...formData };

    // Convert boolean fields from string to actual boolean
    booleanFields.forEach(field => {
      if (field in formattedData) {
        formattedData[field] = stringToBoolean(formattedData[field]);
      }
    });

    // formattedData.againConsentSignature = "sample-content.png";
    // formattedData.consentSignature = "sample-content.png";  
    // formattedData.currentResume = "sample-resume-content.pdf";
    // formattedData.superVisionAgreement = "sample-supervision-agreement.pdf";
    
    const filesToUpload = [
      'againConsentSignature',
      'consentSignature',
      'currentResume',
      'superVisionAgreement'
    ];

    // a photo as well

    // const {signedUrl, key} = await generateSignedUrlToUploadOn(formattedData.againConsentSignature.name, formattedData.againConsentSignature.type, userEmail as string )
    // const uploadResponse = await fetch(signedUrl, {
    //            method: 'PUT',
    //            body: formattedData.againConsentSignature,
    //            headers: {
    //              'Content-Type': formattedData.againConsentSignature.type,
    //            },
    //            cache: 'no-store'
    //          })
    //          formattedData.againConsentSignature = key
    //          if (!uploadResponse.ok) {
    //            toast.error('Something went wrong. Please try again')
    //            return
    //          }
           
   for (const fileKey of filesToUpload) {
      if (formattedData[fileKey]) {
        try {
          const { signedUrl, key } = await generateSignedUrlToUploadOn( formattedData[fileKey].name, formattedData[fileKey].type,  userEmail as string,);

          const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: formattedData[fileKey],
            headers: {
              'Content-Type': formattedData[fileKey].type,
            },
            cache: 'no-store'
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
    console.log('formattedData:', formattedData);

    delete formattedData.signature
    const response = await addOnboardingFormData('/therapist/onboarding', formattedData);

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
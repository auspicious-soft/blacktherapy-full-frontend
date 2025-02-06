import { addClientSignupData } from "@/services/client/client-service";
import { toast } from "sonner";



export const submitClientForm = async (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const formattedData = { ...formData };
    if (formattedData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    delete formattedData.confirmPassword;

    switch (formattedData.insuranceCoverage) {
      case "yes":
        delete formattedData.organisationEmail;
        delete formattedData.organisationName;
        break;

      case "no":
        delete formattedData.insuranceCompany;
        delete formattedData.organisationEmail;
        delete formattedData.organisationName;
        break;

      case "through EAP":
        delete formattedData.insuranceCompany;
        break;
    }
    // Object.keys(formattedData).forEach(key => {
    //   if (formattedData[key] === null || formattedData[key] === undefined || formattedData[key] === '') {
    //     delete formattedData[key];
    //   }
    // }
    // );

    const response = await addClientSignupData('/client/signup', formattedData);
    if (response?.status === 201) {
      toast.success("Client data added successfully");
      setFormData({});
      setTimeout(() => {
        window.location.href = "/client-signup-success";
      }, 2000);
      return true;
    } 
    
    else {
      toast.error("Failed to add client data");
      return false;
    }
  } catch (error:any) {
    if(error.status == 400) {
      toast.error("Email already exists");
      return false;
    }
    toast.error("An error occurred while adding the client data");
    return false;
  }
};




export const submitClientForm = async (
    formData: any,
    setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      console.log("form data:", formData);
  
      setFormData({}); 
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
import {toast} from "sonner";
import {ContactForm} from "../../lib/interfaces";
import axios from "axios";

export const ContactFormSubmit = async (contactFormValues: ContactForm, language:string): Promise<boolean> => {

  try {
    const contactFormResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/contact`, contactFormValues, {
      headers: {
        'Accept-Language':language,
      }
    });

    toast.success(contactFormResponse.data.message);
    return true;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorData = error.response?.data;
      const errorMessage = errorData?.error;

      if (Array.isArray(errorMessage)) {
        // Handle validation errors (array of errors)
        errorMessage.forEach((err) => {
          toast.error(err.msg || 'Validation error occurred');
        });
      } else {
        // Handle other types of errors
        if (statusCode) {
          toast.error(`${errorData?.error || "Error during Sending Form."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
    return false;
};

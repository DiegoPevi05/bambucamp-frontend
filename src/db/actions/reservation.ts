import { Tent, Product, Experience, ReserveFormData, DiscountCode, ReserveExperienceDto } from "../../lib/interfaces";
import axios from "axios";
import { toast } from "sonner";
import {serializeExperience, serializeProduct, serializeTent} from "../serializer";

export const SearchAvailableTents = async (dates:{dateFrom:Date,dateTo:Date}, language:string): Promise<Tent[]|null> => {
  let data: Tent[]|null = null  

  try {
    // Create a URLSearchParams object to construct the query string
    const params = new URLSearchParams();
    params.append('dateFrom', dates.dateFrom.toString());
    params.append('dateTo', dates.dateTo.toString());

    // Construct the URL with query parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/reserves/tents?${params.toString()}`;


    const SearchAvailableTentsResponse = await axios.get(url, {
      headers: {
        'Accept-Language':language,
      }
    });


    data =  SearchAvailableTentsResponse.data.map((tent: any) => serializeTent(tent));

    return data;

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
          toast.error(`${errorData?.error || "Error during Fetching the tents."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
  return null;
};


export const getPublicProducts = async (language:string): Promise<Product[]|null> => {
  let data: Product[]|null = null  

  try {

    // Construct the URL with query parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/products/public`;


    const PublicProductsResponse = await axios.get(url, {
      headers: {
        'Accept-Language':language,
      }
    });


    data =  PublicProductsResponse.data.map((tent: any) => serializeProduct(tent));

    return data;

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
          toast.error(`${errorData?.error || "Error during Fetching the products."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
  return null;
};

export const getPublicExperiences = async (language:string): Promise<Experience[]|null> => {
  let data: Experience[]|null = null  

  try {

    // Construct the URL with query parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/experiences/public`;


    const PublicExperiencesResponse = await axios.get(url, {
      headers: {
        'Accept-Language':language,
      }
    });


    data =  PublicExperiencesResponse.data.map((experience: any) => serializeExperience(experience));

    return data;

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
          toast.error(`${errorData?.error || "Error during Fetching the experiences."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
  return null;
};

export const validateDiscountCode = async (code:string, language:string): Promise<DiscountCode|null> => {
  let data: DiscountCode|null = null  

  try {
    const params = new URLSearchParams();
    params.append('code', code);
    // Construct the URL with query parameters
    const url = `${import.meta.env.VITE_BACKEND_URL}/discounts/validate-code?${params.toString()}`;


    const ValidateDiscountCodeResponse = await axios.get(url, {
      headers: {
        'Accept-Language':language,
      }
    });

    data =  { 
      id:ValidateDiscountCodeResponse.data.id,
      code:ValidateDiscountCodeResponse.data.code, 
      discount: ValidateDiscountCodeResponse.data.discount
    };

    toast.success(ValidateDiscountCodeResponse.data.message)

    return data;

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
          toast.error(`${errorData?.error || "Error during Validating the discount."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
  }
  return null;
};

export const createReserve = async (reserve: ReserveFormData, token: string, language:string): Promise<boolean> => {
  try {


    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reserves/reserve`, reserve, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language':language
      }
    });
    toast.success(response.data.message);
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
          toast.error(`${errorData?.error || "Error creating the reserve."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
    return false;
  }
};

export const addExperienceToReserve = async (experiences: ReserveExperienceDto[], token: string, language:string): Promise<boolean> => {
  try {


    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reserves/reserve/experience`, {experiences:experiences }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Language':language
      }
    });
    toast.success(response.data.message);
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
          toast.error(`${errorData?.error || "Error adding the experience to the reserve."} (Code: ${statusCode})`);
        } else {
          toast.error(errorData?.error || "An error occurred.");
        }
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    console.error(error);
    return false;
  }
};

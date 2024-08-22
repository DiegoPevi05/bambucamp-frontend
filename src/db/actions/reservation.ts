import { Tent } from "../../lib/interfaces";
import axios from "axios";
import { toast } from "sonner";
import {serializeTent} from "../serializer";

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


    console.log(SearchAvailableTentsResponse)
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

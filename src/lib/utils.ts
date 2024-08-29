import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import {Reserve, ReserveExperienceDto, ReserveProductDto, ReserveTentDto, CustomPrice} from './interfaces'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTentsNames = (reserve:Reserve) => {
  if(reserve.tents.length === 0) return "N/A";
  return reserve.tents.map((tent:ReserveTentDto) => tent.name).join(", ");
}

export const getProductsNames = (reserve:Reserve) => {
  if(reserve.products.length === 0) return "N/A";
  return reserve.products.map((product:ReserveProductDto) => product.name).join(", ");
}

export const getExperiencesNames = (reserve:Reserve) => {
  if(reserve.experiences.length === 0) return "N/A";
  return reserve.experiences.map((experience:ReserveExperienceDto) => experience.name).join(", ");
}

export const formatPrice = (price:number) => {
  return price.toLocaleString("en-US", {style: "currency", currency: "USD"});
};

export const formatDate = (date:Date) => {
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  //format with time 
  return new Intl.DateTimeFormat("en-US", {dateStyle: "medium", timeStyle: "short"}).format(date);
}

export const formatDateCorrectly = (date:Date) => {
}

export const getDiscount = (basePrice:number, discountedPrice:number) => {
  const priceDiscounted =  100 - 100* (discountedPrice/basePrice);
  return priceDiscounted.toFixed(2);
}

export const calculatePrice = (basePrice: number , customPrices: CustomPrice[], noCustomPrice?:boolean): number => {

  if(customPrices === null) return basePrice;

  if(noCustomPrice) return basePrice;

  const currentCustomPrice = getCurrentCustomPrice(customPrices);

  return currentCustomPrice > 0 ? currentCustomPrice : basePrice;
};

export const getCurrentCustomPrice = (customPrices: CustomPrice[]): number => {


  const currentDate = new Date();
  
  const matchingPrices = customPrices.filter(customPrice => currentDate >= customPrice.dateFrom && currentDate <= customPrice.dateTo);

  if (matchingPrices.length === 0) {
    return 0;
  }
  matchingPrices.sort((a, b) => b.dateTo.getTime() - a.dateTo.getTime());
  
  return matchingPrices[0].price;
}

export const formatTime = (utcDateString: string): string =>  {
  const currentDate = new Date(utcDateString);
  
  // Format to HH:MM
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export const convertStrToCurrentTimezoneDate = (utcDateString: string): Date => {
  const date = new Date(utcDateString);
  const localOffset = date.getTimezoneOffset(); // getTimezoneOffset() returns the difference in minutes
  return new Date(date.getTime() + localOffset);
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  // Create a new Date object with the current time zone
  const localDate = new Date(date);

  // Get the year, month, and day from the localDate object
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(localDate.getDate()).padStart(2, '0');

  // Return the date in the desired format YYYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export const parseSuggestions = (suggestions: string[]): string => {
  if (suggestions.length === 0) {
    return "No Suggestions";
  }
  return suggestions.join('; ');
};

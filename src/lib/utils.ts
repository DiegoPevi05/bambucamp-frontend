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
  //format with time 
  return new Intl.DateTimeFormat("en-US", {dateStyle: "medium", timeStyle: "short"}).format(date);
}

export const getDiscount = (basePrice:number, discountedPrice:number) => {
  return 100 - 100* (discountedPrice/basePrice);
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

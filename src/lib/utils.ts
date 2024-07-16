import {ClassValue,clsx} from 'clsx'
import { twMerge } from 'tailwind-merge'
import {ReserveIT} from './interfaces'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTentsNames = (reserve:ReserveIT) => {
  if(reserve.tents.length === 0) return "N/A";
  return reserve.tents.map((tent) => tent.title).join(", ");
}

export const getProductsNames = (reserve:ReserveIT) => {
  if(reserve.products.length === 0) return "N/A";
  return reserve.products.map((product) => product.title).join(", ");
}

export const getExperiencesNames = (reserve:ReserveIT) => {
  if(reserve.experiences.length === 0) return "N/A";
  return reserve.experiences.map((experience) => experience.title).join(", ");
}

import { User, Tent, Product, Experience  } from "../lib/interfaces"
import { convertStrToCurrentTimezoneDate } from "../lib/utils";

export const serializeUser = (data:any):User|null => {
  let user:User | null = null;

  user = {
    id: data.user.id,
    email: data.user.email,
    firstName: data.user.firstName,
    lastName:data.user.lastName,
    role: data.user.role,
    phoneNumber: data.user.phoneNumber,
    token:data.token
  };

  return user;

}

const formatImagePaths = (images: string[]): string[] => {
  return images.map(image => 
    image.replace(/\\/g, '/')
  );
};

export const serializeTent = (data:any):Tent|null => {
  let tent:Tent|null = null;

  const transformedCustomPrice = data.custom_price ? JSON.parse(data.custom_price).map((item:any) => ({  ...item, dateFrom: convertStrToCurrentTimezoneDate(item.dateFrom), dateTo: convertStrToCurrentTimezoneDate(item.dateTo) 
})) : [];

  tent = {
    id: data.id,
    header: data.header,
    title:data.title,
    description: data.description,
    images: formatImagePaths(data.images || []),
    qtypeople: data.qtypeople || 0,
    qtykids: data.qtykids || 0,
    price: data.price || 0,
    services: data.services ? JSON.parse(data.services) : {},
    custom_price: transformedCustomPrice,
    status : data.status,
    createdAt:data.createdAt ? convertStrToCurrentTimezoneDate(data.createdAt) : data.createdAt,
    updatedAt:data.updatedAt ? convertStrToCurrentTimezoneDate(data.updatedAt) : data.updatedAt
  };

  return tent;
}

export const serializeProduct = (data:any):Product|null => {
  let product:Product|null = null;

  product = {
    categoryId:data.categoryId,
    category:data.category,
    id: data.id,
    name:data.name,
    description: data.description,
    images: data.images ? data.images.map((image:string) => image.replace(/\\/g, '/')) : [],
    price: data.price || 0,
    custom_price: data.custom_price
  };
  return product;
}

export const serializeExperience = (data:any):Experience|null => {
  let experience:Experience|null = null;

  experience = {
    id: data.id,
    categoryId:data.categoryId,
    category:data.category,
    header:data.header,
    name:data.name,
    description: data.description,
    images: data.images ? data.images.map((image:string) => image.replace(/\\/g, '/')) : [],
    price: data.price || 0,
    duration:data.duration || 0,
    qtypeople:data.qtypeople || 0,
    limit_age:data.limit_age || 0,
    suggestions: data.suggestions ? JSON.parse(data.suggestions) : [],
    custom_price: data.custom_price
  };
  return experience;
}

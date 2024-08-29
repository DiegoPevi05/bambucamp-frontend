import { User, Tent, Product, Experience, NotificationDto, Reserve  } from "../lib/interfaces"
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
    aditional_people_price: data.aditional_people_price || 0,
    max_aditional_people:data.max_aditional_people || 0,
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

export const serializeReserve = (data:any):Reserve|null => {
  let reserve:Reserve|null = null;

  reserve = {
    id: data.id,
    userId:data.userId,
    dateSale: data.dateSale ? convertStrToCurrentTimezoneDate(data.dateSale) : data.dateSale,
    price_is_calculated : data.price_is_calculated,
    net_import: data.net_import || 0,
    discount: data.discount || 0,
    gross_import: data.gross_import || 0,
    tents: data.tents,
    products: data.products,
    experiences: data.experiences,
    promotions:data.promotions,
    discount_code_id:data.discount_code_id || 0,
    discount_code_name:data.discount_code_name,
    canceled_reason:data.canceled_reason,
    canceled_status:data.canceled_status,
    payment_status:data.payment_status,
    reserve_status:data.reserve_status,
    createdAt:data.createdAt ? convertStrToCurrentTimezoneDate(data.createdAt) : data.createdAt,
    updatedAt:data.updatedAt ? convertStrToCurrentTimezoneDate(data.updatedAt) : data.updatedAt
  };
  return reserve;
}

export const serializeMyReserves = (data:any):Reserve|null => {
  let reserve = serializeReserve(data);

  reserve?.tents?.forEach((tent) => {
    if (tent?.tentDB) {
      const serialized = serializeTent(tent.tentDB);
      if (serialized != null) {
        tent.tentDB = serialized;
      }
    }
  });

  reserve?.experiences?.forEach((experience) => {
    if (experience?.experienceDB) {
      const serialized = serializeExperience(experience.experienceDB);
      if (serialized != null) {
        experience.experienceDB = serialized;
      }
    }
  });

  reserve?.products?.forEach((product) => {
    if (product?.productDB) {
      const serialized = serializeProduct(product.productDB);
      if (serialized != null) {
        product.productDB = serialized;
      }
    }
  });

  return reserve;
}

export const serializeMyReservesCalendar = (data:any):{ id:number, dateFrom:Date, dateTo:Date } |null => {

  let reserve:{ id:number, dateFrom:Date, dateTo:Date }|null = null;

  reserve = {
    id: data.id,
    dateFrom: data.dateFrom ? convertStrToCurrentTimezoneDate(data.dateFrom) : data.dateFrom,
    dateTo: data.dateTo ? convertStrToCurrentTimezoneDate(data.dateTo) : data.dateTo,
  };

  return reserve 
}

export const serializeNotification = (data:any): NotificationDto | null => {

  let notification:NotificationDto|null = null;

  notification = {
    id:data.id,
    title: data.title,
    preview: data.preview,
    description: data.description,
    type: data.type,
    date: data.date ? convertStrToCurrentTimezoneDate(data.date) : data.date,
    isRead: data.isRead
  }

  return notification;
}



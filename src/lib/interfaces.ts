
export interface SignIn {
  email:string;
  password:string;
}

export interface SignUp {
  email:string;
  password:string;
  confirmPassword?:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
}

export interface VerifyAcccount {
  email:string;
  code:string;
}

export interface ForgotPassword {
  email:string;
  code?:string;
  password?:string;
}

export interface User {
  token: string;
  id:number;
  firstName?: string;
  lastName?: string;
  password?:string;
  email?: string;
  role?: string; // Add role or other attributes as needed
  phoneNumber?: string;
}

export interface CustomPrice {
  dateFrom: Date;
  dateTo: Date;
  price: number;
}

export interface Tent {
  id: number;
  header: string;
  title: string;
  description: string;
  images: string[];
  qtypeople:number;
  qtykids:number;
  price: number;
  services: {
    wifi: boolean;
    parking: boolean;
    pool: boolean;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    spa: boolean;
    bar: boolean;
    hotwater: boolean;
    airconditioning: boolean;
    grill: boolean;
  }
  custom_price:CustomPrice[];
  status:string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface ProductCategory {
  id:number;
  name: string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface Product {
  id: number;
  categoryId:number;
  category:ProductCategory;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  custom_price:CustomPrice[];
  status:string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface ExperienceCategory {
  id:number;
  name: string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface Experience {
  id: number;
  categoryId:number;
  category:ExperienceCategory;
  header:string;
  name: string;
  description: string;
  price: number;
  duration: number;
  images: string[];
  status:string;
  limit_age:number;
  qtypeople:number;
  suggestions:string[];
  custom_price:CustomPrice[];
  createdAt:Date|null;
  updatedAt:Date|null;
}


export interface itemPromotion {
  id:number;
  label:string;
  qty:number;
  price:number;
}

export interface optionsPromotion {
  tents:Tent[];
  products:Product[];
  experiences:Experience[];
}

export interface Promotion {
  id: number;
  title:string;
  description:string;
  images:string[];
  expiredDate:Date;
  status:string;
  qtypeople:number;
  qtykids:number;
  netImport:number;
  discount:number;
  grossImport:number;
  stock:number;
  idtents:itemPromotion[];
  idproducts:itemPromotion[];
  idexperiences:itemPromotion[];
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface ReserveTentDto {
  idTent:number;
  name:string;
  price:number;
  nights:number;
}

export interface ReserveProductDto {
  idProduct:number;
  name:string;
  price:number;
  quantity:number;
}

export interface ReserveExperienceDto {
  idExperience:number;
  name:string;
  price:number;
  quantity:number;
}


export interface ReviewIT {
  id: number;
  name: string;
  title: string;
  review: string;
  stars: number;
  date: string;
  images: string[];
  profile_image: string;
}

export interface NotificationIT {
  id: number;
  type : string;
  title:string;
  preview:string;
  description:string;
  date:string;
}

export interface Reserve {
  id: number;
  qtypeople:number;
  qtykids:number;
  userId:number;
  tents:ReserveTentDto[];
  products:ReserveProductDto[];
  experiences:ReserveExperienceDto[];
  dateFrom:Date;
  dateTo:Date;
  dateSale: Date;
  promotionId: number;
  price_is_calculated: boolean;
  discountCodeId: number;
  netImport: number;
  discount: number;
  grossImport: number;
  canceled_reason: string;
  canceled_status: boolean;
  paymentStatus: string;
  aditionalPeople: number;
  createdAt:Date|null;
  updatedAt:Date|null;
}

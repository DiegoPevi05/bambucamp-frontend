export interface ContactForm {
  name:string;
  email:string;
  message:string;
  saveinfo:boolean;
}

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
  custom_price:number;
  aditional_people_price:number; 
  max_aditional_people:number;
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
  custom_price:number;
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
  limit_age:number;
  qtypeople:number;
  suggestions:string[];
  custom_price:number;
}


export interface optTentPromotionDto {
  idTent:number;
  name:string;
  price:number;
  nights:number;
}

export interface optTentPromotionPublicDto extends optTentPromotionDto {
  id:number;
}

export interface optProductPromotionDto {
  idProduct:number;
  name:string;
  price:number;
  quantity:number;
}

export interface optProductPromotionPublicDto extends optProductPromotionDto {
  id:number;
}


export interface optExperiencePromotionDto {
  idExperience:number;
  name:string;
  price:number;
  quantity:number;
}

export interface optExperiencePromotionPublicDto extends optExperiencePromotionDto {
  id:number;
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
  tents:optTentPromotionPublicDto[];
  products:optProductPromotionPublicDto[];
  experiences:optExperiencePromotionPublicDto[];
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface ReserveTentDto {
  id?:number;
  idTent:number;
  name:string;
  price:number;
  nights:number;
  dateFrom:Date;
  dateTo:Date;
  confirmed:boolean;
  aditionalPeople:number;
  additionalPeoplePrice?:number;
  promotionId?:number;
  tentDB?:Tent;
}

export interface ReserveProductDto {
  id?:number;
  idProduct:number;
  name:string;
  price:number;
  quantity:number;
  confirmed:boolean;
  promotionId?:number;
  productDB?:Product;
}

export interface createReserveProductDto extends ReserveProductDto {
  reserveId:number;
}

export interface ReserveExperienceDto {
  id?:number;
  idExperience:number;
  name:string;
  price:number;
  quantity:number;
  day:Date;
  confirmed:boolean;
  promotionId?:number;
  experienceDB?:Experience;
}

export interface createReserveExperienceDto extends ReserveExperienceDto {
  reserveId:number;
}

export interface ReservePromotionDto {
  id?:number;
  idPromotion:number;
  name:string;
  price:number;
  nights:number;
  dateFrom:Date;
  dateTo:Date;
  confirmed:boolean;
  promotionDB?:Promotion;
}

export interface createReservePromotionDto extends ReservePromotionDto {
  reserveId:number;
}


export interface Review {
  id: number;
  name:string;
  title:string;
  review:string;
  stars:number;
  day:Date;
  href:string;
  profile_image_url:string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface Faq {
  id: number;
  question:string;
  answer:string;
  createdAt:Date|null;
  updatedAt:Date|null;
}



export interface NotificationDto {
  id:number;
  title: string;
  preview: string;
  description: string;
  type: string;
  date: Date;
  isRead: boolean;
}

export interface notifcationFilters {
  date?:string;
  target?:string[]; 
  type?:string[];
}

export interface Reserve {
  id: number;
  external_id:number;
  userId:number;
  tents:ReserveTentDto[];
  products:ReserveProductDto[];
  experiences:ReserveExperienceDto[];
  promotions:ReservePromotionDto[];
  dateSale: Date;
  price_is_calculated: boolean;
  discount_code_id: number;
  discount_code_name:string;
  net_import: number;
  discount: number;
  gross_import: number;
  canceled_reason: string;
  canceled_status: boolean;
  payment_status: string;
  reserve_status:string;
  createdAt:Date|null;
  updatedAt:Date|null;
}

export interface ReserveFormData {
  tents:ReserveTentDto[];
  products:ReserveProductDto[];
  experiences:ReserveExperienceDto[];
  promotions:ReservePromotionDto[];
  discount_code_id: number;
}

export interface DiscountCode {
  id:number,
  code: string , 
  discount:number, 
}


export interface webContent {
  tents:Tent[];
  promotions:Promotion[];
  reviews:Review[];
  faqs:Faq[];
}

export interface User {
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string[]; // Add role or other attributes as needed
  phoneNumber?: string;
}

export interface ReserveIT{
  id: number;
  checkin: Date;
  checkout: Date;
  status: string;
  total: number;
  tents: TentIT[];
  experiences: ExperienceIT[];
  products: ProductIT[];
}

export interface PromotionIT {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  discount: number;
  remaining: number;
}

export interface TentIT {
  id: number;
  header: string;
  title: string;
  description: string;
  images: string[];
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
}

export interface ExperienceIT {
  id: number;
  title: string;
  description: string;
  duration: number;
  date: Date;
  price: number;
  quantity: number;
  images: string[];
}

export interface ProductIT {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
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
  description:string;
  date:string;
}

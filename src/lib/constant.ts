import { 
	GOLD_KULLAQ_1,
	GOLD_KULLAQ_2,
	GOLD_KULLAQ_3,
	GOLD_KULLAQ_4,
	GOLD_KULLAQ_5,
	GOLD_KULLAQ_6,
	GOLD_SUMAQ_1,
	GOLD_SUMAQ_2,
	GOLD_SUMAQ_3,
	GOLD_SUMAQ_4,
	GOLD_SUMAQ_5,
	GOLD_SUMAQ_6,
	GOLD_LLURAK_1,
	GOLD_LLURAK_2,
	GOLD_LLURAK_3,
	GOLD_LLURAK_4,
	GOLD_LLURAK_5,
	GOLD_LLURAK_6,
} from "../assets/images"

import { TentIT, ReviewIT, PromotionIT, ReserveIT, ExperienceIT,ProductIT, NotificationIT } from "./interfaces"

export const experiencesData:ExperienceIT[] = [
  {
    id:1,
    title:"Experience 1",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    duration: 90,
    date: new Date(2024,5,28,12,0,0,0),
    price: 100,
    quantity: 10,
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3],
  },
  {
    id:2,
    title:"Experience 2",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    duration: 90,
    date: new Date(2024,5,28,12,0,0,0),
    price: 100,
    quantity: 10,
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3],
  }
]

export const productsData:ProductIT[] = [
  {
    id:1,
    title:"Product 1",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    price: 100,
    quantity: 10,
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3],
  },
  {
    id:2,
    title:"Product 2",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    price: 100,
    quantity: 10,
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3],
  }
]


export const notificationsData: NotificationIT[] = [
  {
    id:1,
    type:"I",
    title:"Reservation Confirmed",
    description:"Your Reserve have been confirmed.",
    date:"2024-07-12",
  },

  {
    id:2,
    type:"S",
    title:"Reservation Confirmed",
    description:"Your Reserve have been confirmed.",
    date:"2024-07-12",
  },

  {
    id:3,
    type:"E",
    title:"Reservation Confirmed",
    description:"Your Reserve have been confirmed.",
    date:"2024-07-12",
  },

]


export const tentsData:TentIT[] = [
  {
    id: 1,
    header: "Tent 1",
    title: "Gold Kullaq",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_KULLAQ_2,
      GOLD_KULLAQ_3,
      GOLD_KULLAQ_4,
      GOLD_KULLAQ_5,
      GOLD_KULLAQ_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      spa: true,
      bar: true,
      hotwater: true,
      airconditioning: true,
      grill:true,
    }
  },
  {
    id: 2,
    header: "Tent 1",
    title: "Gold Sumaq",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_SUMAQ_2,
      GOLD_SUMAQ_3,
      GOLD_SUMAQ_4,
      GOLD_SUMAQ_5,
      GOLD_SUMAQ_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: false,
      dinner: true,
      spa: true,
      bar: false,
      hotwater: false,
      airconditioning: true,
      grill:false,
    }
  },
  {
    id: 3,
    header: "Tent 1",
    title: "Suite Llurak",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_LLURAK_2,
      GOLD_LLURAK_3,
      GOLD_LLURAK_4,
      GOLD_LLURAK_5,
      GOLD_LLURAK_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      spa: true,
      bar: true,
      hotwater: true,
      airconditioning: true,
      grill:false,
    }
  },
  {
    id: 4,
    header: "Tent 1",
    title: "Suite Sallary",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_SUMAQ_2,
      GOLD_SUMAQ_3,
      GOLD_SUMAQ_4,
      GOLD_SUMAQ_5,
      GOLD_SUMAQ_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      spa: true,
      bar: true,
      hotwater: true,
      airconditioning: true,
      grill:false,
    }
  },
  {
    id: 5,
    header: "Tent 1",
    title: "Suite Wayra",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_KULLAQ_2,
      GOLD_KULLAQ_3,
      GOLD_KULLAQ_4,
      GOLD_KULLAQ_5,
      GOLD_KULLAQ_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      spa: true,
      bar: true,
      hotwater: true,
      airconditioning: true,
      grill:false,
    }
  },
  {
    id: 6,
    header: "Tent 1",
    title: "Suite Yana",
    price:100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    images:[
      GOLD_KULLAQ_2,
      GOLD_KULLAQ_3,
      GOLD_KULLAQ_4,
      GOLD_KULLAQ_5,
      GOLD_KULLAQ_6,
    ],
    services: {
      wifi: true,
      parking: true,
      pool: true,
      breakfast: true,
      lunch: true,
      dinner: true,
      spa: true,
      bar: false,
      hotwater: false,
      airconditioning: false,
      grill:false,
    }
  },
]


export const ReservesData:ReserveIT[] = [
  {
    id: 1,
    checkin: new Date(2024,5,28,12,0,0,0),
    checkout: new Date(2024,5,30,12,0,0,0),
    status: "PENDING",
    total: 1000,
    tents: [
      tentsData[0],
      tentsData[1]
    ],
    experiences: [
      experiencesData[0],
      experiencesData[1]
    ],
    products: [
      productsData[0],
      productsData[1]
    ]
  },
  {
    id: 2,
    checkin: new Date(2024,6,17,12,0,0,0),
    checkout: new Date(2024,6,19,12,0,0,0),
    status: "PENDING",
    total: 1000,
    tents: [
      tentsData[0],
      tentsData[1]
    ],
    experiences: [
      experiencesData[0],
    ],
    products: [
      productsData[0],
    ]
  },
  {
    id: 2,
    checkin: new Date(2024,6,21,12,0,0,0),
    checkout: new Date(2024,6,24,12,0,0,0),
    status: "PENDING",
    total: 1000,
    tents: [
      tentsData[0],
      tentsData[1]
    ],
    experiences: [],
    products: []
  }
]


export const reviewsData:ReviewIT[] = [
  {
    id:1,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:2,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:3,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:4,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:5,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:5,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:6,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
  {
    id:7,
    name: "Marco Antonio Venturo Cosme",
    title: "Excelente experiencia",
    review: "Un lugar muy bonito, tranquilo y relajante, excelente atención, tiene todas las comodidades, es un campamento de lujo, tiene piscina, puedes comprar bebidas, comida y snack, una experiencia muy bonita. Recomendado.",
    stars: 4,
    date: "01-03-2024",
    profile_image: "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
    images: [GOLD_KULLAQ_1,GOLD_KULLAQ_2,GOLD_KULLAQ_3]
  },
]

export const promotionsData:PromotionIT[] = [
  {
    id: 1,
    discount: 20,
    title: "Promotion 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    image: GOLD_KULLAQ_2,
    link: "/promotion/1",
    remaining: 5,
  },
  {
    id: 2,
    discount: 30,
    title: "Promotion 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    image: GOLD_KULLAQ_2,
    link: "/promotion/1",
    remaining: 5,
  },
  {
    id: 3,
    discount: 40,
    title: "Promotion 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    image: GOLD_KULLAQ_2,
    link: "/promotion/1",
    remaining: 10,
  },
  {
    id: 4,
    discount: 50,
    title: "Promotion 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non.",
    image: GOLD_KULLAQ_2,
    link: "/promotion/1",
    remaining: 100,
  },
]

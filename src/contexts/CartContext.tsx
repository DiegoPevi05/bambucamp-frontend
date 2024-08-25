import  { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ReserveTentDto, ReserveProductDto, ReserveExperienceDto } from '../lib/interfaces';
import {getCookie, setCookie} from '../lib/cookies';

interface CartItem {
  tents: ReserveTentDto[];
  products: ReserveProductDto[];
  experiences: ReserveExperienceDto[];
}

interface CartContextType {
  dates:{ dateFrom:Date, dateTo:Date };
  cart: CartItem;
  totalItems: number;
  getTotalCost: () => number;
  addTent: (tent: ReserveTentDto) => void;
  removeTent: (idTent: number) => void;
  updateTentNights: (idTent: number, nights: number) => void;
  addProduct: (product: ReserveProductDto) => void;
  removeProduct: (idProduct: number) => void;
  updateProductQuantity: (idProduct: number, quantity: number) => void;
  addExperience: (experience: ReserveExperienceDto) => void;
  removeExperience: (idExperience: number) => void;
  updateExperienceQuantity: (idExperience: number, quantity: number) => void;
  isTentInCart: (idTent: number) => boolean;
  getTotalNights: () => number;
  updateDateFrom: (newDateFrom: Date) => void;
  updateDateTo: (newDateTo: Date) => void;
  getRangeDates: () => {date:Date, label:string}[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}
const CART_COOKIE_NAME = 'cart';
const CART_COOKIE_MAX_AGE_MS = 60 * 60 * 1000;

export function CartProvider({ children }: CartProviderProps) {

  const getInitialCart = (): CartItem => {
    const savedCart = getCookie(CART_COOKIE_NAME);
    return savedCart ? JSON.parse(savedCart) : { tents: [], products: [], experiences: [] };
  };

  const [cart, setCart] = useState<CartItem>(getInitialCart);

  const [dates, setDates] = useState<{ dateFrom: Date, dateTo: Date }>({
    dateFrom: new Date(), // Initialize with current date
    dateTo: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

   useEffect(() => {
    setCookie(CART_COOKIE_NAME, JSON.stringify(cart), CART_COOKIE_MAX_AGE_MS);
  }, [cart]);

  const updateDateFrom = (newDateFrom: Date) => {
    setDates(prevDates => ({
      ...prevDates,
      dateFrom: newDateFrom,
    }));
  };

  const updateDateTo = (newDateTo: Date) => {
    setDates(prevDates => ({
      ...prevDates,
      dateTo: newDateTo,
    }));
  };

  const updateCart = (updateFn: (prevCart: CartItem) => CartItem) => {
    setCart(prevCart => updateFn(prevCart));
  };

  const addTent = (tent: ReserveTentDto) => {
    updateCart(prevCart => ({
      ...prevCart,
      tents: [...prevCart.tents, tent],
    }));
  };

  const removeTent = (idTent: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      tents: prevCart.tents.filter(tent => tent.idTent !== idTent),
    }));
  };

  const updateTentNights = (idTent: number, night: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      tents: prevCart.tents.map(tent =>
        tent.idTent === idTent ? { ...tent, night } : tent
      ),
    }));
  };

  const addProduct = (product: ReserveProductDto) => {
    updateCart(prevCart => ({
      ...prevCart,
      products: [...prevCart.products, product],
    }));
  };

  const removeProduct = (index: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.filter((_, i) => i !== index),
    }));
  };

  const updateProductQuantity = (index: number, quantity: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.map((product, i) =>
        i === index ? { ...product, quantity } : product
      ),
    }));
  };

  const addExperience = (experience: ReserveExperienceDto) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: [...prevCart.experiences, experience],
    }));
  };

  const removeExperience = (index: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: prevCart.experiences.filter((_, i) => i !== index),
    }));
  };

  const updateExperienceQuantity = (index: number, quantity: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: prevCart.experiences.map((experience,i) =>
        i === index ? { ...experience, quantity } : experience
      ),
    }));
  };

  const isTentInCart = (idTent: number): boolean => {
    return cart.tents.some(tent => tent.idTent === idTent);
  };

  const getTotalNights = useCallback((): number => {
    const start = new Date(dates.dateFrom);
    const end = new Date(dates.dateTo);

    // Set both dates to 12:00 PM
    start.setHours(12, 0, 0, 0);
    end.setHours(12, 0, 0, 0);

    // Calculate difference in time
    const timeDifference = end.getTime() - start.getTime();

    // Convert the difference to days (1 day = 86400000 ms)
    const totalNights = timeDifference / (1000 * 3600 * 24);

    return totalNights > 0 ? totalNights : 0; // Ensure no negative nights
  },[dates]);

  const getTotalCost = (): number => {
    const tentTotal = cart.tents.reduce((sum, tent) => sum + (tent.price  * getTotalNights()), 0);
    const productTotal = cart.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const experienceTotal = cart.experiences.reduce((sum, experience) => sum + (experience.price * experience.quantity), 0);
    return tentTotal + productTotal + experienceTotal;
  };

  const getRangeDates = useCallback(() => {
    // Initialize an array to store the date range
    const dateRange = [];
    // Loop through the dates from dateFrom to dateTo
    let currentDate = new Date(dates.dateFrom);
    while (currentDate <= dates.dateTo) {
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        dateRange.push({
            date: new Date(currentDate),
            label: formattedDate
        });
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
  },[dates])

  const totalItems = cart.tents.length + cart.products.length + cart.experiences.length;

  // Recalculate tent nights when dates change
  useEffect(() => {
    const totalNights = getTotalNights();

    // Update the nights for all tents in the cart
    setCart(prevCart => ({
      ...prevCart,
      tents: prevCart.tents.map(tent => ({
        ...tent,
        nights: totalNights, // Update nights
      })),
    }));
  }, [dates, getTotalNights]);

  return (
    <CartContext.Provider value={{ cart, updateDateTo, updateDateFrom, dates,  totalItems, addTent, removeTent, updateTentNights, addProduct, removeProduct, updateProductQuantity, addExperience, removeExperience, updateExperienceQuantity, isTentInCart, getTotalCost, getTotalNights ,getRangeDates }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

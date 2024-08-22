import  { createContext, useContext, useState, ReactNode } from 'react';
import { ReserveTentDto, ReserveProductDto, ReserveExperienceDto } from '../lib/interfaces';

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
  updateDates: (newDateFrom: Date, newDateTo: Date) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem>({
    tents: [],
    products: [],
    experiences: [],
  });

  const [dates, setDates] = useState<{ dateFrom: Date, dateTo: Date }>({
    dateFrom: new Date(), // Initialize with current date
    dateTo: new Date(),
  });

  const updateDates = (newDateFrom: Date, newDateTo: Date) => {
    setDates({
      dateFrom: newDateFrom,
      dateTo: newDateTo,
    });
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

  const removeProduct = (idProduct: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.filter(product => product.idProduct !== idProduct),
    }));
  };

  const updateProductQuantity = (idProduct: number, quantity: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      products: prevCart.products.map(product =>
        product.idProduct === idProduct ? { ...product, quantity } : product
      ),
    }));
  };

  const addExperience = (experience: ReserveExperienceDto) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: [...prevCart.experiences, experience],
    }));
  };

  const removeExperience = (idExperience: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: prevCart.experiences.filter(experience => experience.idExperience !== idExperience),
    }));
  };

  const updateExperienceQuantity = (idExperience: number, quantity: number) => {
    updateCart(prevCart => ({
      ...prevCart,
      experiences: prevCart.experiences.map(experience =>
        experience.idExperience === idExperience ? { ...experience, quantity } : experience
      ),
    }));
  };

  const isTentInCart = (idTent: number): boolean => {
    return cart.tents.some(tent => tent.idTent === idTent);
  };

  const getTotalNights = (): number => {
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
  };

  const getTotalCost = (): number => {
    const tentTotal = cart.tents.reduce((sum, tent) => sum + (tent.price  * getTotalNights()), 0);
    const productTotal = cart.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const experienceTotal = cart.experiences.reduce((sum, experience) => sum + (experience.price * experience.quantity), 0);
    return tentTotal + productTotal + experienceTotal;
  };

  const totalItems = cart.tents.length + cart.products.length + cart.experiences.length;

  return (
    <CartContext.Provider value={{ cart, updateDates, dates,  totalItems, addTent, removeTent, updateTentNights, addProduct, removeProduct, updateProductQuantity, addExperience, removeExperience, updateExperienceQuantity, isTentInCart, getTotalCost, getTotalNights }}>
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

import { Tooltip } from 'react-tooltip'
import { ChevronLeftIcon, ChevronRightIcon, Coins, FlameKindlingIcon, List, Pizza, Receipt, Tent, User} from "lucide-react";
import { styles } from "../lib/styles";
import {Experience, Product} from "../lib/interfaces";
import { experiencesData, productsData } from "../lib/constant";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import SectionHeader from "../components/SectionHeader";
import {useAuth} from '../contexts/AuthContext';

const Reservation:React.FC = () => {
  const { user } = useAuth();
  const { cart, dates, getTotalNights, getTotalCost,  } = useCart();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return(
    <>
      <div className="w-full min-h-screen relative flex flex-row overflow-x-hidden">
        <SectionHeader identifier="payment"/>
        <div className={`relative w-full h-full flex flex-col  ${styles.padding}`}>
          <div className="flex flex-row w-full h-auto gap-x-4">
            <button onClick={()=>goToRoute("/extras")} className="rounded-full h-12 w-12 bg-white border-2 border-secondary text-secondary duration-300 transition-all hover:bg-secondary group active:scale-95 ">
              <ChevronLeftIcon className="h-full w-full group-hover:text-white"/>
            </button>
            <h1 className="font-primary text-secondary  text-6xl">Reserva</h1>
          </div>
          <div className="grid grid-cols-2 w-full h-auto">
            <div className="flex flex-col justify-start items-start col-span-1 pt-16 px-8 gap-y-4 text-tertiary">
              <span className="flex flex-row items-end gap-x-2">
                <List className="h-6 w-6"/>
                <h2 className="text-xl">Resumen</h2>
              </span>
              <span className="flex flex-row items-end gap-x-2">
                <Tent className="h-5 w-5"/>
                <h2 className="text-lg">Glapmings</h2>
              </span>
              <span className="flex flex-row items-end gap-x-2">
                <FlameKindlingIcon className="h-5 w-5"/>
                <h2 className="text-lg">Experiences</h2>
              </span>
              <span className="flex flex-row items-end gap-x-2">
                <Pizza className="h-5 w-5"/>
                <h2 className="text-lg">Productos</h2>
              </span>
            </div>

            <div className="flex flex-col justify-start items-start col-span-1 pt-16 px-8 gap-y-4 text-secondary">
              <div className="w-[50%] h-auto flex flex-col justify-start items-start gap-y-2 rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                <span className="flex flex-row items-end gap-x-2 mb-2">
                  <Coins className="h-6 w-6"/>
                </span>
                <div className="w-full h-auto flex flex-row justify-between">
                  <h3 className="text-tertiary">Importe Total</h3>
                  <span>S/100.00</span>
                </div>
                <div className="w-full h-auto flex flex-col justify-between gap-y-2">
                  <label className="text-xs">Aplicar codigo de descuento</label>
                  <div className="w-full h-auto flex flex-row justify-between gap-x-4">
                    <input className="w-auto border-2 border-secondary rounded-lg px-2 text-sm" value={"S/0.00"}/>
                    <button className="w-[30%] rounded-full h-8 bg-tertiary text-white hover:text-secondary hover:bg-white hover:border-2 hover:border-primary duration-300 transition-all active:scale-95 text-sm">Aplicar</button>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-row justify-between">
                  <h3>Descuento</h3>
                  <span>S/0.00</span>
                </div>
                <div className="w-full h-auto flex flex-row justify-between mt-2">
                  <h3>Total a pagar</h3>
                  <span className="text-lg text-primary">S/100.00</span>
                </div>
              </div>

              <div className="w-[50%] flex flex-col gap-y-2">
                <Button 
                      onClick={()=>console.log("trigger reserve")}
                      variant="dark" effect="default" size="lg"  
                      className="group text-xs sm:text-lg h-8 sm:h-10"
                      rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}
                      disabled={user == null}
                >
                      Reservar
                </Button>
                <label className="text-xs">Para finalizar la reserva <span onClick={()=>goToRoute("/siginin")} className="text-secondary cursor-pointer hover:underline">inicia sesion</span>.</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="my-tooltip" style={{ backgroundColor:"#00AAA9", borderRadius:"10px" , padding:"6px" , fontSize:"10px" }} />
    </>
  );
}

export default Reservation;

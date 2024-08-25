import { Tooltip } from 'react-tooltip'
import { ChevronLeftIcon, ChevronRightIcon, Coins, FlameKindlingIcon, List, Pizza, Tent} from "lucide-react";
import { styles } from "../lib/styles";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeader from "../components/SectionHeader";
import {useAuth} from '../contexts/AuthContext';
import {formatPrice, formatDateToYYYYMMDD} from '../lib/utils';

const Reservation:React.FC = () => {
  const { user } = useAuth();
  const { cart, dates, getTotalNights, getTotalCost  } = useCart();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return(
    <>
      <div className="w-full min-h-screen relative flex flex-row overflow-x-hidden">
        <SectionHeader identifier="payment"/>
        <ShopNavbar variant="dark"/>
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
                <List className="h-8 w-8"/>
                <h2 className="text-2xl">Resumen</h2>
              </span>
              <span className="flex flex-row items-end gap-x-2">
                <Tent className="h-5 w-5"/>
                <h2 className="text-lg">Glapmings</h2>
              </span>
              <div className="w-full h-auto flex flex-col">
              </div>
              <span className="flex flex-row items-end gap-x-2">
                <FlameKindlingIcon className="h-5 w-5"/>
                <h2 className="text-lg">Experiences</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                {cart.experiences.map((experienceCart,index)=>{
                  return(
                    <div key={`reserve_experience_cart_${index}`} className="flex flex-row w-full h-auto border-2 border-slate-200 rounded-lg shadow-sm p-4">
                      <div className="flex flex-col h-full w-auto">
                        <div className="flex flex-row gap-x-2"><span className="text-sm text-secondary">Producto :</span><span className="text-sm mt-auto">{experienceCart.name}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">Cantidad :</span><span className="text-xs mt-auto">{experienceCart.quantity}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">Precio Unitario :</span><span className="text-xs mt-auto">{formatPrice(experienceCart.price)}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">Dia :</span><span className="text-xs mt-auto">{formatDateToYYYYMMDD(experienceCart.day)}</span></div>
                      </div>
                      <div className="flex flex-col items-end h-full w-[20%] ml-auto">
                        <span>{formatPrice(experienceCart.quantity*experienceCart.price)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <span className="flex flex-row items-end gap-x-2">
                <Pizza className="h-5 w-5"/>
                <h2 className="text-lg">Productos</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                {cart.products.map((productCart,index)=>{
                  return(
                    <div key={`reserve_product_cart_${index}`} className="flex flex-row w-full h-auto border-2 border-slate-200 rounded-lg shadow-sm p-4">
                      <div className="flex flex-col h-full w-auto">
                        <div className="flex flex-row gap-x-2"><span className="text-sm text-secondary">Producto :</span><span className="text-sm mt-auto">{productCart.name}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">Cantidad :</span><span className="text-xs mt-auto">{productCart.quantity}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">Precio Unitario :</span><span className="text-xs mt-auto">{formatPrice(productCart.price)}</span></div>
                      </div>
                      <div className="flex flex-col items-end h-full w-[20%] ml-auto">
                        <span>{formatPrice(productCart.quantity*productCart.price)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col justify-start items-start col-span-1 pt-16 px-8 gap-y-4 text-secondary">
              <div className="w-[50%] h-auto flex flex-col justify-start items-start gap-y-2 rounded-xl border-2 border-slate-200 p-4 shadow-sm">
                <span className="flex flex-row items-end gap-x-2 mb-2">
                  <Coins className="h-6 w-6"/>
                </span>
                <div className="w-full h-auto flex flex-row justify-between">
                  <h3 className="text-tertiary">Importe Total</h3>
                  <span>{formatPrice(getTotalCost())}</span>
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
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="w-full h-auto flex flex-row justify-between mt-2">
                  <h3>Total a pagar</h3>
                  <span className="text-lg text-primary">{formatPrice(getTotalCost())}</span>
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

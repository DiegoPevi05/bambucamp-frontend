import  { useState } from "react";

import {User, X, CalendarCheck, ShoppingCart  } from 'lucide-react';
import { styles } from "../lib/styles";
import Button from "./ui/Button";
import {LOGO_PRIMARY} from "../assets/images";
import { slideIn} from "../lib/motions";
import {motion, AnimatePresence} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDownList from "./ui/LanguageSelector";
import {useAuth} from "../contexts/AuthContext";
import {useCart} from "../contexts/CartContext";


const ShopNavbar = () => {
  const { user  } = useAuth();
  const  { cart, totalItems, getTotalCost } = useCart();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  }

  const toogleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  console.log(totalItems)


  return (
    <nav className={`${styles.paddingX} absolute w-full flex flex-row justify-start items-start absolute top-0 left-0 z-[100] h-[80px]`}>
      <div className="w-auto flex justify-start lg:justify-center items-center">
        <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-8 w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center">
          <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[90px] h-[40px] sm:h-[90px]"/>
        </a>
      </div>
      <div className="w-auto h-[40px] flex flex-row justify-center items-start text-white mt-12">
        <LanguageDropDownList/>
        <button onClick={toogleSidebar} className="duration-300 group active:scale-95 hover:scale-105 flex justify-center items-center relative"> 
          <ShoppingCart className="h-6 sm:h-8 w-8 sm:w-8 group-hover:text-secondary duration-300"/> 
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-4 h-6 w-6 flex items-center justify-center text-xs bg-secondary text-white rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {openSideBar && ( 
          <motion.div 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            exit="hidden"
            variants={slideIn("left","",0,0.3)}
            className={`w-[300px] h-[100vh] absolute top-0 left-0 right-0 bottom-0 z-[120] bg-white`}>
            <div className="h-10 w-10 absolute top-12 right-6">
              <X onClick={toogleSidebar} className="h-full w-auto text-secondary cursor-pointer hover:text-primary"/>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-start px-6 py-12 gap-y-6">
              <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-0 min-w-[80px] sm:min-w-[90px] min-h-[80px] sm:min-h-[90px] flex items-center justify-center border border-2 border-secondary">
                <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px]"/>
              </a>

              <div className="w-full h-full overflow-y-scroll no-scroll-bar">
                <label className="text-tertiary  border-b-2 border-tertiary w-full pb-2">Glampigns</label>
                <div className="w-full h-auto flex flex-col pt-4">
                  {cart.tents.map((tentItem,index)=>{
                    return(
                      <div key={`cart_tentItem_${index}`} className="w-full h-auto flex flex-row p-2 border-b-2 border-slate-200">
                        <div className="w-[60%] h-full flex flex-col justify-start items-start">
                          <label className="text-tertiary text-sm font-primary">{tentItem.name}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">Nights x {tentItem.nights}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">Price Unt: {tentItem.price}</label>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-start items-end">
                          <label>{tentItem.nights * tentItem.price}</label>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </div>



              <div key={`cart_total`} className="w-full h-auto flex flex-row p-2 border-t-2 border-tertiary">
                <div className="w-[60%] h-full flex flex-col justify-start items-start">
                  <label className="text-tertiary w-full">{"Total"}</label>
                </div>
                <div className="w-[40%] h-full flex flex-col justify-start items-end">
                  <label>{getTotalCost()}</label>
                </div>
              </div>

              <label className="text-tertiary  border-b-2 w-full pb-2 mt-auto">Mi Cuenta</label>
              <div className="w-full h-auto flex justify-start items-center">
                {user ?
                  <Button onClick={()=>goToRoute("/dashboard")} variant="ghostLight" effect="default" className="py-2 text-md sm:text-lg gap-x-4">{t("My Reserves")} <CalendarCheck/> </Button>
                  :
                  <Button onClick={()=>goToRoute("/signin")} variant="ghostLight" effect="default" className="py-2 text-md sm:text-lg gap-x-4">{t("Sign In")} <User/> </Button>
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ShopNavbar;

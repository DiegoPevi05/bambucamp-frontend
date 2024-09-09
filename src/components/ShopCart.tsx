import Button from "./ui/Button"
import { slideIn,  } from "../lib/motions"
import {useAuth} from "../contexts/AuthContext";
import {useCart} from "../contexts/CartContext";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {LOGO_PRIMARY} from "../assets/images";
import { motion } from "framer-motion";
import { formatPrice, formatDateToYYYYMMDD } from "../lib/utils";
import { X, CalendarCheck, User } from "lucide-react";

interface CartProps {
  variant?:string;
  onClose:()=>void;
}

const ShopCart = (props:CartProps) => {

  const { variant, onClose } = props;
  const { user  } = useAuth();
  const  { cart, getTotalCost, removeTent, removeProduct, removeExperience } = useCart();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  }


  return(
      <motion.div 
        initial="hidden"
        whileInView='show'
        viewport={{ once: true }}
        exit="hidden"
        variants={slideIn("left","",0,0.3)}
        className={`w-[300px] h-[100vh] absolute top-0 left-0 right-0 bottom-0 z-[120] bg-white ${variant == "dark" ? "border-r-2 border-secondary":""}`}>
        <div className="h-10 w-10 absolute top-12 right-6">
          <X onClick={onClose} className="h-full w-auto text-secondary cursor-pointer hover:text-primary"/>
        </div>
        <div className="w-full h-full flex flex-col justify-start items-start px-6 py-12 gap-y-6">
          <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-0 min-w-[80px] sm:min-w-[90px] min-h-[80px] sm:min-h-[90px] flex items-center justify-center border border-2 border-secondary">
            <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px]"/>
          </a>

          <div className="w-full h-full overflow-y-scroll no-scroll-bar">
            {cart.tents.length != 0 && (
              <>
                <label className="text-tertiary  border-b-2 border-tertiary w-full pb-2">Glampigns</label>
                <div className="w-full h-auto flex flex-col pt-4">
                  {cart.tents.map((tentItem,index)=>{
                    return(
                      <div key={`cart_tentItem_${index}`} className={`w-full h-auto flex flex-row p-2 ${index != 0 ? "border-t-2 border-slate-200" : "" } `}>
                        <div className="w-[60%] h-full flex flex-col justify-start items-start">

                          <label className="text-tertiary text-sm font-primary">{tentItem.name}</label>

                          <label className="text-secondary text-xs font-primary">{"Check In"}: {formatDateToYYYYMMDD(tentItem.dateFrom)}</label>
                          <label className="text-secondary text-xs font-primary">{"Check Out"}: {formatDateToYYYYMMDD(tentItem.dateTo)}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t('Nights')} x {tentItem.nights}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t('Unit Price.')} : {formatPrice(tentItem.price)}</label>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-start items-end">
                          <button onClick={()=>removeTent(index)} className="w-6 h-6 text-secondary flex justify-end mb-4 hover:text-primary duration-300"><X/></button>
                          <label className="mt-auto">{formatPrice((tentItem.price * tentItem.nights) + (tentItem.aditionalPeople * (tentItem.additionalPeoplePrice || 0)))}</label>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </>
            )}
            {cart.experiences.length != 0 && (
              <>
                <label className="text-tertiary  border-b-2 border-tertiary w-full pb-2">{t("Experiences")}</label>
                <div className="w-full h-auto flex flex-col pt-4">
                  {cart.experiences.map((experienceItem,index)=>{
                    return(
                      <div key={`cart_productItem_${index}`} className={`w-full h-auto flex flex-row p-2      ${index != 0 ? "border-t-2 border-slate-200" : "" }`}>
                        <div className="w-[60%] h-full flex flex-col justify-start items-start">
                          <label className="text-tertiary text-sm font-primary">{experienceItem.name}</label>
                          <label className="text-tertiary text-xs font-primary">{t('Day')}: {formatDateToYYYYMMDD(experienceItem.day)}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t('Quantity')} x {experienceItem.quantity}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t('Unit Price')}: {experienceItem.price}</label>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-start items-end">
                          <button onClick={()=>removeExperience(index)} className="w-6 h-6 text-secondary flex justify-end mb-4 hover:text-primary duration-300"><X/></button>
                          <label className="mt-auto">{formatPrice(experienceItem.quantity * experienceItem.price)}</label>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </>
            )}
            {cart.products.length != 0 && (
              <>
                <label className="text-tertiary  border-b-2 border-tertiary w-full pb-2">{t("Products")}</label>
                <div className="w-full h-auto flex flex-col pt-4">
                  {cart.products.map((productItem,index)=>{
                    return(
                      <div key={`cart_productItem_${index}`} className={`w-full h-auto flex flex-row p-2 ${index != 0 ? "border-t-2 border-slate-200" : "" } `}>
                        <div className="w-[60%] h-full flex flex-col justify-start items-start">
                          <label className="text-tertiary text-sm font-primary">{productItem.name}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t("Quantity")} x {productItem.quantity}</label>
                          <label className="text-secondary text-xs font-secondary flex flex-row">{t("Unit Price.")}: {formatPrice(productItem.price)}</label>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-start items-end">
                          <button onClick={()=>removeProduct(index)} className="w-6 h-6 text-secondary flex justify-end mb-4 hover:text-primary duration-300"><X/></button>
                          <label className="mt-auto">{formatPrice(productItem.quantity * productItem.price)}</label>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </>
            )}
          </div>



          <div key={`cart_total`} className="w-full h-auto flex flex-row p-2 border-t-2 border-tertiary">
            <div className="w-[60%] h-full flex flex-col justify-start items-start">
              <label className="text-tertiary w-full">{t("Total Amount")}</label>
            </div>
            <div className="w-[40%] h-full flex flex-col justify-start items-end">
              <label>{formatPrice(getTotalCost())}</label>
            </div>
          </div>

          <label className="text-tertiary  border-b-2 w-full pb-2 mt-auto">{t("My Account")}</label>
          <div className="w-full h-auto flex justify-start items-center">
            {user ?
              <Button onClick={()=>goToRoute("/dashboard")} variant="ghostLight" effect="default" className="py-2 text-md sm:text-lg gap-x-4">{t("My Reserves")} <CalendarCheck/> </Button>
              :
              <Button onClick={()=>goToRoute("/signin")} variant="ghostLight" effect="default" className="py-2 text-md sm:text-lg gap-x-4">{t("Sign In")} <User/> </Button>
            }
          </div>
        </div>
      </motion.div>
  )
}

export default ShopCart;

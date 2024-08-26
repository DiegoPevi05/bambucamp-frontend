import { ChangeEvent, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { ChevronLeftIcon, ChevronRightIcon, Coins, FlameKindlingIcon, List, Pizza, Tent} from "lucide-react";
import { styles } from "../lib/styles";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeader from "../components/SectionHeader";
import {useAuth} from '../contexts/AuthContext';
import {formatPrice, formatDateToYYYYMMDD, formatDate} from '../lib/utils';
import {useTranslation} from 'react-i18next';
import { toast } from 'sonner';
import {createReserve, validateDiscountCode} from '../db/actions/reservation';
import { DiscountCode, ReserveFormData } from '../lib/interfaces';

const Reservation:React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { cart, dates, getTotalNights, getTotalCost, addDiscountCode  } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState<DiscountCode>({id:0,code:"",discount:0});
  const [loadingDiscountCode, setLoadingDiscountcode] = useState<boolean>(false);
  const [loadingReserve, setLoadingReserve] = useState<boolean>(false);

  useEffect(()=>{
    if(cart.discount && cart.discount.id != 0){
      setDiscountCode(cart.discount);
    }
  },[])


  const handleDiscountCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiscountCode((prevDiscountCode) => ({
      ...prevDiscountCode,
      code: value.trim(),
    }));
  };

  const ValidateDiscountCodeHandler = async() => {
    setLoadingDiscountcode(true)
    if(discountCode.code.length <= 0){
      toast.error(t("You must provide a valid code"));
    }

    const discountValidated = await validateDiscountCode(discountCode.code,i18n.language);
    if(discountValidated !== null){
      addDiscountCode(discountValidated);
      setDiscountCode(discountValidated);
    }
    setLoadingDiscountcode(false);
  }

  const goToRoute = (route:string) => {
    navigate(route);
  };

  const onSubmitCreateReserve = async() => {
    setLoadingReserve(false);

    const data:ReserveFormData = {
      tents:cart.tents,
      products:cart.products,
      experiences:cart.experiences,
      dateFrom:dates.dateFrom,
      dateTo:dates.dateTo,
      promotionId:0,
      discountCodeId:discountCode.id,
      additionalPeople:0
    }

    if(user == null){
      toast.error("User must be log in to create a reservation");
      setLoadingReserve(false);
      return;
    }

    const responseReserve = await createReserve(data,user.token,i18n.language);
    if(responseReserve != null){
      setLoadingReserve(false);
      goToRoute("/success-reservation");
    }
    setLoadingReserve(false);
  }

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
            <h1 className="font-primary text-secondary  text-6xl">{t("Reserve")}</h1>
          </div>
          <div className="grid grid-cols-2 w-full h-auto">
            <div className="flex flex-col justify-start items-start col-span-1 pt-16 px-8 gap-y-4 text-tertiary">
              <span className="flex flex-row items-end gap-x-2">
                <List className="h-8 w-8"/>
                <h2 className="text-2xl">{t("Summary")}</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                <div className='w-auto h-auto gap-x-2 flex flex-row items-end'>
                  <span className="text-lg font-primary text-secondary">Un total de Noches:</span>
                  <span className="text-md font-secondary">{getTotalNights()}</span>
                </div>
                <div className='w-auto h-auto gap-x-2 flex flex-row items-end'>
                  <span className="text-lg font-primary text-secondary">Desde:</span>
                  <span className="text-md font-secondary">{formatDate(dates.dateFrom)}</span>
                </div>
                <div className='w-auto h-auto gap-x-2 flex flex-row items-end'>
                  <span className="text-lg font-primary text-secondary">Hasta:</span>
                  <span className="text-md font-secondary">{formatDate(dates.dateTo)}</span>
                </div>
              </div>
              <span className="flex flex-row items-end gap-x-2">
                <Tent className="h-5 w-5"/>
                <h2 className="text-lg">Glampings</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                {cart.tents.map((tentCart,index)=>{
                  return(
                    <div key={`reserve_tent_cart_${index}`} className="flex flex-row w-full h-auto border-2 border-slate-200 rounded-lg shadow-sm p-4">
                      <div className="flex flex-col h-full w-auto">
                        <span className="text-sm text-secondary"></span><span className="text-sm mt-auto">{tentCart.name}</span>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Nights")} :</span><span className="text-xs mt-auto">{tentCart.nights}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Unit Price.")}:</span><span className="text-xs mt-auto">{formatPrice(tentCart.price)}</span></div>
                      </div>
                      <div className="flex flex-col items-end h-full w-[20%] ml-auto">
                        <span>{formatPrice(tentCart.nights*tentCart.price)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <span className="flex flex-row items-end gap-x-2">
                <FlameKindlingIcon className="h-5 w-5"/>
                <h2 className="text-lg">{t("Experiences")}</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                {cart.experiences.map((experienceCart,index)=>{
                  return(
                    <div key={`reserve_experience_cart_${index}`} className="flex flex-row w-full h-auto border-2 border-slate-200 rounded-lg shadow-sm p-4">
                      <div className="flex flex-col h-full w-auto">
                        <span className="text-sm text-secondary"></span><span className="text-sm mt-auto">{experienceCart.name}</span>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Quantity")} :</span><span className="text-xs mt-auto">{experienceCart.quantity}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Unit Price.")}:</span><span className="text-xs mt-auto">{formatPrice(experienceCart.price)}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{"Day"} :</span><span className="text-xs mt-auto">{formatDateToYYYYMMDD(experienceCart.day)}</span></div>
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
                <h2 className="text-lg">{t("Products")}</h2>
              </span>
              <div className="w-full h-auto flex flex-col gap-y-3">
                {cart.products.map((productCart,index)=>{
                  return(
                    <div key={`reserve_product_cart_${index}`} className="flex flex-row w-full h-auto border-2 border-slate-200 rounded-lg shadow-sm p-4">
                      <div className="flex flex-col h-full w-auto">
                        <span className="text-sm text-secondary"></span><span className="text-sm mt-auto">{productCart.name}</span>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Quantity")} :</span><span className="text-xs mt-auto">{productCart.quantity}</span></div>
                        <div className="flex flex-row gap-x-2"><span className="text-xs text-secondary">{t("Unit Price.")}:</span><span className="text-xs mt-auto">{formatPrice(productCart.price)}</span></div>
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
                  <h3 className="text-tertiary">{t("Total Amount")}</h3>
                  <span>{formatPrice(getTotalCost())}</span>
                </div>
                <div className="w-full h-auto flex flex-col justify-between gap-y-2">
                  <label className="text-xs">{t("Apply any discount code")}</label>
                  <div className="w-full h-auto flex flex-row justify-between gap-x-4">
                    <input name="reserve_discount_code" value={discountCode.code} onChange={(e)=>handleDiscountCode(e)} className="w-auto border-2 border-secondary rounded-lg px-2 text-sm"/>
                    <button onClick={()=>ValidateDiscountCodeHandler()} className="w-[30%] rounded-full h-8 bg-tertiary text-white hover:text-secondary hover:bg-white hover:border-2 hover:border-primary duration-300 transition-all active:scale-95 text-sm" disabled={loadingDiscountCode}>{t("Apply")}</button>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-row justify-between">
                  <h3>{t("Discount")}</h3>
                  <span>{`${discountCode.discount}%`}</span>
                </div>
                <div className="w-full h-auto flex flex-row justify-between mt-2">
                  <h3>{t("Total to Pay")}</h3>
                  <span className="text-lg text-primary">{formatPrice(getTotalCost()*(1-(discountCode.discount/100)))}</span>
                </div>
              </div>

              <div className="w-[50%] flex flex-col gap-y-2">
                <Button 
                      onClick={()=>onSubmitCreateReserve()}
                      variant="dark" effect="default" size="lg"  
                      className="group text-xs sm:text-lg h-8 sm:h-10"
                      rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}
                      isLoading={loadingReserve}
                      disabled={user == null}
                >
                  {t("Reserve now")}
                </Button>
                {user == null && (
                  <label className="text-xs">{t("To end your reservation please")}{" "}<span onClick={()=>goToRoute("/signin")} className="text-secondary cursor-pointer hover:underline">{t("Sign In")}</span>.</label>
                )}
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

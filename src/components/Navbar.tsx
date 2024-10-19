import  { useState } from "react";

import User from "../assets/images/svg/user.svg?react";
import AlignJustify from "../assets/images/svg/align-justify.svg?react";
import Facebook from "../assets/images/svg/facebook.svg?react";
import Instagram from "../assets/images/svg/instagram.svg?react";
import Twitter from "../assets/images/svg/twitter.svg?react";
import X from "../assets/images/svg/x.svg?react";
import CalendarCheck from "../assets/images/svg/calendar-check.svg?react";
import ShoppingCart from "../assets/images/svg/shopping-cart.svg?react";

import Button from "./ui/Button";
import {LOGO_PRIMARY} from "../assets/images";
import {fadeIn, slideIn} from "../lib/motions";
import {AnimatePresence, motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDownList from "./ui/LanguageSelector";
import {useAuth} from "../contexts/AuthContext";
import DropDownListAccount from "./DropDownListAccount";
import {useCart} from "../contexts/CartContext";
import ShopCart from "./ShopCart";

const NavBarItem = ({children, index, route, scrollTarget, goToRoute}:{children:string; index:number; route?: string; scrollTarget?: string; goToRoute: (route: string) => void; }) => {

  const handleClick = () => {
    if (scrollTarget) {
      const targetElement = document.getElementById(scrollTarget);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else if (route) {
      goToRoute(route);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate='show'
      viewport={{ once: true }}
      variants={fadeIn("down","",1+0.1*index,1)}
      onClick={handleClick}
      className="w-auto h-[80px] flex flex-column justify-center items-center">
      <li className="text-secondary text-lg 2xl:text-xl hover:scale-[1.05]  hover:text-white ease-in-out duration-300 transition-all cursor-pointer">{children}</li>
    </motion.div>
  )
};

const NavBarItemMobile = ({children, index, route, scrollTarget, goToRoute,closeNavBar}:{children:string; index:number ; route?: string; scrollTarget?: string; goToRoute: (route: string) => void; closeNavBar: ()=>void }) => {

  const handleClick = () => {
    if (scrollTarget) {
      const targetElement = document.getElementById(scrollTarget);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else if (route) {
      goToRoute(route);
    }
    closeNavBar();
  };
  return (

    <motion.div 
      initial="hidden"
      animate='show'
      viewport={{ once: true }}
      variants={slideIn("right","",0.1*index,0.3)}
      className="w-full h-auto sm:h-[50px]"
      onClick={handleClick}
    >
      <li className="text-white text-lg lg:text-3lg hover:scale-[1.05]  hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{children}</li>
    </motion.div>
  )
};


const Navbar = () => {
  const { user  } = useAuth();
  const  {totalItems } = useCart();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  }

  const toogleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  const [openCart, setOpenCart] = useState<boolean>(false);

  const toogleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <nav className={` sm:px-16 px-2 sm:py-16 py-10 absolute w-full flex flex-row justify-center items-center bg-black-to-transparent absolute top-0 z-[100] max-h-[80px]`}>
      <div className="w-[50%] sm:w-[20%] flex justify-start lg:justify-center items-center h-[80px] sm:h-[125px]">
      </div>
      <ul className="hidden w-[60%] lg:flex flex-row items-center justify-center gap-x-8">
        <NavBarItem index={1} scrollTarget="us-section" goToRoute={goToRoute}>{t("common.us")}</NavBarItem>
        <NavBarItem index={2} route="/booking" goToRoute={goToRoute}>{t("reserve.reservations")}</NavBarItem>
        <NavBarItem index={3} scrollTarget="promotions-section" goToRoute={goToRoute}>{t("promotions.singular")}</NavBarItem>
        <NavBarItem index={4} scrollTarget="services-section" goToRoute={goToRoute}>{t("common.services")}</NavBarItem>
        <NavBarItem index={5} scrollTarget="contact-section" goToRoute={goToRoute}>{t("home_page.contact_us")}</NavBarItem>
      </ul>
      <div className="w-[50%] lg:w-[20%] h-full flex justify-end items-center">
        <LanguageDropDownList/>
        <button onClick={toogleCart} className="duration-300 group active:scale-95 hover:scale-105 flex justify-center items-center relative text-white mr-1 lg:ml-2 lg:mr-8"> 
          <ShoppingCart className="hover:text-tertiary h-6 sm:h-8 w-8 sm:w-8  duration-300"/> 
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-4 h-6 w-6 flex items-center justify-center text-xs bg-secondary text-white rounded-full">
              {totalItems}
            </span>
          )}
        </button>
        {user ? 
          <DropDownListAccount user={user} isDashboard={false}/>
          :
          <Button effect="default" className="hidden lg:flex" onClick={()=>goToRoute("/signin")}>{t("auth.log_in")}<User/> </Button>
        }
        <Button onClick={toogleSidebar} variant={"ghostLight"} effect={"default"} className="flex justify-center items-center lg:hidden h-10 lg:h-14 w-10 lg:w-14 p-0 !bg-transparent !color-white !border-transparent"> <AlignJustify className=""/> </Button>
      </div>
      <div className={`lg:hidden ${!openSideBar ? "pointer-events-none" :"" } w-screen h-screen absolute top-0 left-0`}>
          <div className={`lg:hidden w-screen h-[100vh] fixed top-0 ${!openSideBar ? "left-[100%]" : "left-0"}  bottom-0 z-[120] bg-secondary duration-300 transition-all`}>
            <div className="h-10 sm:h-16 w-10 sm:w-16 absolute top-12 right-12">
              <X onClick={toogleSidebar} className="h-full w-auto text-white cursor-pointer hover:text-primary"/>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-start p-12">
              <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-0 w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center">
                <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[90px] h-[40px] sm:h-[90px]"/>
              </a>
              <ul className="flex flex-col justify-start items-start gap-y-6 mt-16">
                <NavBarItemMobile closeNavBar={()=>setOpenSideBar(false)} scrollTarget="us-section" goToRoute={goToRoute} index={1}>{t("common.us")}</NavBarItemMobile>
                <NavBarItemMobile closeNavBar={()=>setOpenSideBar(false)} route="/booking" goToRoute={goToRoute}  index={2}>{t("reserve.reservations")}</NavBarItemMobile>
                <NavBarItemMobile closeNavBar={()=>setOpenSideBar(false)} scrollTarget="promotions-section" goToRoute={goToRoute} index={3}>{t("promotions.singular")}</NavBarItemMobile>
                <NavBarItemMobile closeNavBar={()=>setOpenSideBar(false)} scrollTarget="services-section" goToRoute={goToRoute} index={4}>{t("common.services")}</NavBarItemMobile>
                <NavBarItemMobile closeNavBar={()=>setOpenSideBar(false)} scrollTarget="contact-section" goToRoute={goToRoute} index={5}>{t("home_page.contact_us")}</NavBarItemMobile>
              </ul>
              <div className="w-full h-20 flex justify-start items-center">
                {user ?
                  <Button onClick={()=>goToRoute("/dashboard/reserves")} effect="default" className="py-2 sm:py-6 text-md sm:text-lg gap-x-4">{t("reserve.my_reserves")} <CalendarCheck/> </Button>
                  :
                  <Button onClick={()=>goToRoute("/signin")} effect="default" className="py-2 sm:py-6 text-md sm:text-lg gap-x-4">{t("auth.log_in")} <User/> </Button>
                }
              </div>
              <div className="w-full mt-auto flex flex-row justify-start items-center gap-x-4 sm:gap-x-6">
                <a href="/" target="_blank" className="font-primary text-white hover:scale-[1.05] hover:text-primary duration-300">
                  <Facebook className="h-6 sm:h-10 w-6 sm:w-10"/>
                </a>
                <a href="/" target="_blank" className="font-primary text-white text-sm hover:scale-[1.05] hover:text-primary duration-300">
                  <Instagram className="h-6 sm:h-10 w-6 sm:w-10"/>
                </a>
                <a href="/" target="_blank" className="font-primary text-white text-sm hover:scale-[1.05] hover:text-primary duration-300">
                  <Twitter className="h-6 sm:h-10 w-6 w-10"/>
                </a>
              </div>
            </div>
          </div>
      </div>

      <AnimatePresence>
        {openCart && (
          <ShopCart onClose={toogleCart}/>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

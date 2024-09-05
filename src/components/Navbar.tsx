import  { useState } from "react";

import {User, AlignJustify, Facebook, Instagram, Twitter, X, CalendarCheck  } from 'lucide-react';
import { styles } from "../lib/styles";
import Button from "./ui/Button";
import {LOGO_PRIMARY} from "../assets/images";
import {fadeIn, slideIn} from "../lib/motions";
import {motion, AnimatePresence} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageDropDownList from "./ui/LanguageSelector";
import {useAuth} from "../contexts/AuthContext";
import DropDownListAccount from "./DropDownListAccount";

const NavBarItem = ({children, index}:{children:string, index:number}) => {
  return (
    <motion.div 
      initial="hidden"
      animate='show'
      viewport={{ once: true }}
      variants={fadeIn("down","",1+0.1*index,1)}
      className="w-full h-[80px] flex flex-column justify-center items-center">
      <li className="text-secondary text-xl hover:scale-[1.05]  hover:text-white ease-in-out duration-300 transition-all cursor-pointer">{children}</li>
    </motion.div>
  )
};

const NavBarItemMobile = ({children, index}:{children:string, index:number}) => {
  return (

    <motion.div 
      initial="hidden"
      animate='show'
      viewport={{ once: true }}
      variants={slideIn("right","",0.1*index,0.3)}
      className="w-full h-auto sm:h-[50px]"
    >
      <li className="text-white text-lg sm:text-3xl hover:scale-[1.05]  hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{children}</li>
    </motion.div>
  )
};


const Navbar = () => {
  const { user  } = useAuth();
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  }

  const toogleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <nav className={`${styles.paddingX} absolute w-full flex flex-row justify-center items-center bg-black-to-transparent absolute top-0 z-[100] max-h-[80px]`}>
      <div className="w-[50%] lg:w-[20%] flex justify-start lg:justify-center items-center">
        <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-8 w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center">
          <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[90px] h-[40px] sm:h-[90px]"/>
        </a>
      </div>
      <ul className="hidden w-[60%] lg:flex flex-row items-center justify-center gap-x-6">
        <NavBarItem index={1}>{t("Us")}</NavBarItem>
        <NavBarItem index={3}>{t("Promotions")}</NavBarItem>
        <NavBarItem index={2}>{t("Reservations")}</NavBarItem>
        <NavBarItem index={4}>{t("Services")}</NavBarItem>
        <NavBarItem index={5}>{t("Contact Us")}</NavBarItem>
      </ul>
      <div className="w-[50%] lg:w-[20%] h-full flex justify-end lg:justify-center items-center">
        <LanguageDropDownList/>
        {user ? 
          <DropDownListAccount user={user} isDashboard={false}/>
          :
          <Button effect="default" className="hidden lg:flex" onClick={()=>goToRoute("/signin")}>{t("Log In")}<User/> </Button>
        }
        <Button onClick={toogleSidebar} variant={"ghostLight"} effect={"default"} className="flex justify-center items-center lg:hidden h-10 sm:h-14 w-10 sm:w-14 p-0 !bg-transparent !color-white !border-transparent"> <AlignJustify className=""/> </Button>
      </div>
      <div className={`sm:hidden ${!openSideBar ? "pointer-events-none" :"" } w-screen h-screen absolute top-0 left-0`}>
          <div className={`sm:hidden w-screen h-[100vh] fixed top-0 ${!openSideBar ? "left-[100%]" : "left-0"}  bottom-0 z-[120] bg-secondary duration-300 transition-all`}>
            <div className="h-10 sm:h-16 w-10 sm:w-16 absolute top-12 right-12">
              <X onClick={toogleSidebar} className="h-full w-auto text-white cursor-pointer hover:text-primary"/>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-start p-12">
              <a href="/" className="relative hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white top-0 w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center">
                <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[90px] h-[40px] sm:h-[90px]"/>
              </a>
              <ul className="flex flex-col justify-start items-start gap-y-6 mt-16">
                <NavBarItemMobile index={1}>{t("Us")}</NavBarItemMobile>
                <NavBarItemMobile index={2}>{t("Reservations")}</NavBarItemMobile>
                <NavBarItemMobile index={3}>{t("Promotions")}</NavBarItemMobile>
                <NavBarItemMobile index={4}>{t("Services")}</NavBarItemMobile>
                <NavBarItemMobile index={5}>{t("Contact Us")}</NavBarItemMobile>
              </ul>
              <div className="w-full h-20 flex justify-start items-center">
                {user ?
                  <Button onClick={()=>goToRoute("/dashboard")} effect="default" className="py-2 sm:py-6 text-md sm:text-2xl gap-x-4">{t("My Reserves")} <CalendarCheck/> </Button>
                  :
                  <Button onClick={()=>goToRoute("/signin")} effect="default" className="py-2 sm:py-6 text-md sm:text-2xl gap-x-4">{t("Sign In")} <User/> </Button>
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

    </nav>
  );
};

export default Navbar;

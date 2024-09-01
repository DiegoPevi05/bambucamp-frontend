import React, { useState } from "react";
import Button from "./Button";
import { LOGO_PRIMARY } from "../../assets/images";
import {  AnimatePresence } from "framer-motion";
import { CalendarCheck, User, UserCog, DoorClosed  } from "lucide-react"
import {useTranslation} from "react-i18next";
import {useAuth} from "../../contexts/AuthContext";
import DropDownListAccount from "../DropDownListAccount";
import {useNavigate} from "react-router-dom";
import { AlignJustify } from "lucide-react";



const DashboardButtons: DashboardButtonDataProps[] = [
  {
    "title": "Reserves",
    "icon": <CalendarCheck/>,
    "section": "reserves"
  },
  {
    "title": "Account",
    "icon": <User />,
    "section": "account"
  },
  {
    "title": "Settings",
    "icon": <UserCog />,
    "section": "settings"
  }
];

interface DashboardButtonDataProps{
  title:string;
  icon:React.ReactNode;
  section:string;
}

interface DashboardButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}


const DashboardButton = ({ title, icon, onClick }: DashboardButtonProps) => {
  const {t} = useTranslation();

  return (
    <Button
      className="w-full"
      variant="ghostLight"
      effect={"default"}
      isRound={true}
      onClick={onClick}
    >
      {icon}
      <span>{t(title)}</span>
    </Button>
  );
};


const Dashboard = ({children}:{children:React.ReactNode}) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openNavbar,setOpenNavbar] = useState<boolean>(false);

  const goToSubRoute = (route:string) => {
    navigate(`/dashboard/${route}`);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="grid grid-cols-1 2xl:grid-cols-6 2xl:grid-rows-1 gap-4 px-2 pb-4 sm:px-4 2xl:p-4 h-screen w-full">
        <div className={`${openNavbar ? "max-2xl:left-[0px]" : "max-sm:-left-[100%] max-2xl:left-[-400px]"} bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 max-2xl:absolute  max-2xl:h-screen max-sm:w-screen max-2xl:w-[400px] 2xl:col-span-1 flex flex-col items-start gap-y-4 duration-300 z-[100]`}>
          <button className="2xl:hidden h-12 w-12 flex items-center justify-center text-secondary rounded-xl active:scale-95 active:bg-white active:text-secondary active:border active:border-secondary" onClick={()=>setOpenNavbar((prev)=> !prev)} ><AlignJustify className=""/></button>
          <a href="/" className="hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center border border-secondary border-2 mx-auto">
            <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[80px] h-[40px] sm:h-[80px]"/>
          </a>

          {DashboardButtons.map((button, index) => (
            <DashboardButton
              key={index}
              title={t(button.title)}
              icon={button.icon}
              onClick={()=>goToSubRoute(button.section)}
            />
          ))}
          <Button
            className="w-full mt-auto"
            variant="ghostLight"
            effect={"default"}
            isRound={true}
            onClick={logout}
          >
            {<DoorClosed/>}
            <span>{t("Sign Out")}</span>
          </Button>
        </div>
        <div className="bg-white sm:px-4 col-span-1 lg:col-span-5 grid grid-rows-8 gap-4 h-full overflow-y-scroll max-2xl:py-4">
          <div className="bg-white sm:p-4 rounded-lg shadow-lg border-2 border-gray-200 row-span-1 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-center gap-x-4">
              <button className="2xl:hidden h-full w-12 flex items-center justify-center text-secondary rounded-xl active:scale-95 active:bg-white active:text-secondary active:border active:border-secondary" onClick={()=>setOpenNavbar((prev)=> !prev)} ><AlignJustify className=""/></button>
              <div className="flex gap-x-4 items-center flex-col">
                <h1 className="text-sm sm:text-lg text-secondary">{t("Welcome")} {user?.firstName}{" "}{user?.lastName}</h1>
                <p className="font-secondary max-sm:hidden text-md text-tertiary">{t("Here you can view your reserves")}{" "}</p>
              </div>
            </div>
            <DropDownListAccount user={user} variant="dark"/>
          </div>
          <AnimatePresence>
            {children}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


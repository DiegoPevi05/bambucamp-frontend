import React from "react";
import Button from "./Button";
import { LOGO_PRIMARY } from "../../assets/images";
import {  AnimatePresence } from "framer-motion";
import { CalendarCheck, User, UserCog, DoorClosed  } from "lucide-react"
import {useTranslation} from "react-i18next";
import {useAuth} from "../../contexts/AuthContext";
import DropDownListAccount from "../DropDownListAccount";
import {useNavigate} from "react-router-dom";



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

  const goToSubRoute = (route:string) => {
    navigate(`/dashboard/${route}`);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-1 gap-4 p-4 h-screen w-full">
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 lg:col-span-1 flex flex-col items-center gap-y-4">

          <a href="/" className="hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center border border-secondary border-2">
            <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[80px] h-[40px] sm:h-[80px]"/>
          </a>
          {DashboardButtons.map((button, index) => (
            <DashboardButton
              key={index}
              title={button.title}
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
            <span>{t("Log out")}</span>
          </Button>
        </div>
        <div className="bg-white px-4 col-span-1 lg:col-span-5 grid grid-rows-8 gap-4 h-full overflow-hidden">
          <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 row-span-1 flex flex-row justify-between">
            <div className="flex flex-row gap-x-4 items-start flex-col ">
              <h1 className="text-lg text-secondary">{t("Welcome")} {user?.firstName}{" "}{user?.lastName}</h1>
              <p className="font-secondary text-md text-tertiary">{t("Here you can manage your reserves and acquire products")}</p>
            </div>
            <DropDownListAccount user={user} variant="dark" isDashboard={true}/>
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


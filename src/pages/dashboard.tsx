import React from "react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { LOGO_PRIMARY } from "../assets/images";

import { CalendarCheck, User, UserCog, DoorClosed } from "lucide-react"
import {useTranslation} from "react-i18next";
import {useAuth} from "../contexts/AuthContext";
import DropDownListAccount from "../components/DropDownListAccount";
import { ReserveIT } from "../lib/interfaces";
import { ReservesData } from "../lib/constant";

const DashboardButtons: DashboardButtonProps[] = [
  {
    "title": "Reserves",
    "icon": <CalendarCheck/>,
    "onClick": () => console.log("Home clicked")
  },
  {
    "title": "Account",
    "icon": <User />,
    "onClick": () => console.log("Profile clicked")
  },
  {
    "title": "Settings",
    "icon": <UserCog />,
    "onClick": () => console.log("Settings clicked")
  }
];

interface DashboardButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface ReserveCardProps {
  reserve: ReserveIT;
};

const ReserveCard = (props:ReserveCardProps) => {
  const { reserve } = props;
  const {t} = useTranslation();

  return (
    <div className="bg-white py-2 px-4 rounded-xl shadow-lg border-2 border-gray-200 w-full h-36 flex flex-row gap-x-4">
        
        <div className="w-full h-full flex flex-col">
          <h2 className="text-lg font-bold mb-1">{t("Reserve")}{" "}{reserve.id}</h2>
          <div className="w-auto h-full flex flex-row gap-x-12">
            <div className="w-auto h-full flex flex-col gap-2">
              <span className="text-sm text-primary">{t("Reservation Status")}{": "}<p className="text-slate-400 font-secondary">{reserve.status}</p></span>
              <span className="text-sm text-primary">{t("Total Import")}{": "}<p className="text-slate-400 font-secondary">{"$/."}{reserve.total}{".00"}</p></span>
            </div>
            <div className="w-auto h-full flex flex-col gap-2">
              <span className="text-sm text-primary">{t("Checkin")}{": "}<p className="text-slate-400 font-secondary">{reserve.checkin} {"12:00 PM"}</p></span>
              <span className="text-sm text-primary">{t("Checkout")}{": "}<p className="text-slate-400 font-secondary">{reserve.checkout} {"12:00 PM"}</p></span>
            </div>
          </div>
        </div>

        <img src={reserve.tents[0].images[0]} alt="tent" className="w-[5%] h-auto bg-cover bg-center rounded-md ml-auto"/>
    </div>
  );
};

const DashboardButton = ({ title, icon, onClick }: DashboardButtonProps) => {
  const {t} = useTranslation();

  return (
    <Button
      className="w-full"
      variant="dark"
      effect={"default"}
      isRound={true}
      onClick={onClick}
    >
      {icon}
      <span>{t(title)}</span>
    </Button>
  );
};


const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [section,setSection] = useState<string>("reserves");

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-1 gap-4 p-4 min-h-screen w-full">
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 lg:col-span-1 flex flex-col items-center gap-y-4">

          <a href="/" className="hover:cursor-pointer hover:scale-[1.05] transition-all duration-300 rounded-full bg-white w-[80px] sm:w-[125px] h-[80px] sm:h-[125px] flex items-center justify-center border border-primary border-2">
            <img src={LOGO_PRIMARY} alt="logo" className="w-[40px] sm:w-[80px] h-[40px] sm:h-[80px]"/>
          </a>
          {DashboardButtons.map((button, index) => (
            <DashboardButton
              key={index}
              title={button.title}
              icon={button.icon}
              onClick={button.onClick}
            />
          ))}
          <Button
            className="w-full mt-auto"
            variant="dark"
            effect={"default"}
            isRound={true}
            onClick={logout}
          >
            {<DoorClosed/>}
            <span>{t("Log out")}</span>
          </Button>
        </div>
        <div className="bg-white px-4 col-span-1 lg:col-span-5 grid grid-rows-8 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 row-span-1 flex flex-row justify-between">
            <div className="flex flex-row gap-x-4 items-start flex-col ">
              <h1 className="text-lg">{t("Welcome")} {user?.firstName}{" "}{user?.lastName}</h1>
              <p className="font-secondary text-md">{t("Here you can manage your reserves and acquire products")}</p>
            </div>
            <DropDownListAccount user={user} variant="dark"/>
          </div>
          <div className="bg-white row-span-7 grid grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 row-span-1"></div>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 row-span-1"></div>


            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-2 row-span-1">
              <h1 className="text-lg">{t("Reserves")}</h1>
              <p className="font-secondary text-md">{t("View all your reserves directly")}</p>
              <div className="w-full h-[80%] flex flex-col overflow-y-scroll">
                {ReservesData.map((reserve, index) => (
                  <ReserveCard key={index} reserve={reserve}/>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

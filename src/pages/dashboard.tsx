import React from "react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { LOGO_PRIMARY } from "../assets/images";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeOnly } from "../lib/motions";
import { CalendarCheck, User, UserCog, DoorClosed, Tent, Pizza,  DoorOpen,Coins,CircleSlash, CreditCard, FlameKindling, Eye } from "lucide-react"
import {useTranslation} from "react-i18next";
import {useAuth} from "../contexts/AuthContext";
import DropDownListAccount from "../components/DropDownListAccount";
import { ReserveIT } from "../lib/interfaces";
import { ReservesData } from "../lib/constant";
import Modal from "../components/Modal";

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

const generateCalendar = (currentDate:Date, resevesDates:{ checkin:Date, checkout:Date }[] ) => {
  const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDayOfWeek = startOfCurrentMonth.getDay();
  const totalDaysInMonth = endOfCurrentMonth.getDate();

  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
  const totalDaysInPrevMonth = prevMonth.getDate();

  //create today with 12:00 PM
  const today = new Date();
  today.setHours(12,0,0,0);

  let calendarDays = [];

  // Add days from the previous month
  for (let i = startDayOfWeek; i > 0; i--) {
    calendarDays.push(
      <span key={`prev-${i}`} className="bg-gray-100 flex items-center justify-center h-10 text-gray-400 rounded-xl">
        {totalDaysInPrevMonth - i + 1}
      </span>
    );
  }

  // Add days from the current month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const currentIterationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i, 12, 0, 0, 0);
    if(currentIterationDate < today){
      calendarDays.push(
        <span key={`past-${i}`} className="bg-gray-100 flex items-center justify-center h-10 text-gray-400 rounded-xl">
          {i}
        </span>
      );
    }else if(resevesDates.some((reserve) => reserve.checkin <= currentIterationDate && reserve.checkout >= currentIterationDate)){
      calendarDays.push(
        <span key={`reserved-${i}`} 
          className={`cursor-pointer bg-tertiary text-white flex items-center justify-center h-10 hover:bg-secondary hover:text-white duration-300 rounded-xl 
          ${currentDate.getDate() === i  && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() ? "border-2 border-slate-400": "" }`}>
          {i}
        </span>
      );
    }else{
      calendarDays.push(
        <span key={`current-${i}`} 
          className={`cursor-pointer bg-white text-secondary flex items-center justify-center h-10 hover:bg-secondary hover:text-white duration-300 rounded-xl 
          ${currentDate.getDate() === i  && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear() ? "border-2 border-slate-400": "" }`}>
          {i}
        </span>
      );
    } 
  }

  // Add days from the next month
  const remainingDays = 42 - calendarDays.length; // 42 = 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(
      <span key={`next-${i}`} className="bg-gray-100 flex items-center justify-center h-10 text-gray-400 rounded-xl">
        {i}
      </span>
    );
  }

  return calendarDays;
};

const ReserveCard = (props:ReserveCardProps) => {
  const { reserve } = props;
  const {t} = useTranslation();
  const [openModal,setOpenModal] = useState<boolean>(false); 

  return (
    <>
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{once: true}}
      variants={fadeIn("up","",0,0.5)}
      className="bg-white p-2 rounded-xl shadow-lg border-2 border-gray-200 w-full h-[500px]  gap-x-4 mt-4 grid grid-cols-6 grid-rows-7 divide-x divide-slate-200">
        <div className="col-span-3 row-span-6 p-4 flex flex-row flex-wrap gap-y-4">
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><CircleSlash className="h-5 w-5"/>{t("Identificator")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.id}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><CreditCard className="h-5 w-5"/>{t("Reservation")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.status}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><DoorClosed className="h-5 w-5"/>{t("Checkin")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.checkin.toISOString().split("T")[0]+" "+reserve.checkin.toISOString().split("T")[1].split(".")[0]}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><DoorOpen className="h-5 w-5"/>{t("Checkout")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.checkout.toISOString().split("T")[0]+" "+reserve.checkout.toISOString().split("T")[1].split(".")[0]}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Coins className="h-5 w-5"/>{t("Total Import")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{"S/."}{reserve.total}{".00"}</p>
          </div>
        </div>
        <div className="col-span-3 row-span-6 p-4 flex flex flex-row flex-wrap">
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Tent className="h-5 w-5"/>{t("Tents")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.id}</p>
          </div>
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Pizza className="h-5 w-5"/>{t("Products")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.id}</p>
          </div>
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><FlameKindling className="h-5 w-5"/>{t("Experiences")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.id}</p>
          </div>
        </div>
        <div className="col-span-6 row-span-1 flex flex-row justify-end gap-x-4">
          <Button
            className="w-auto"
            size="sm"
            variant="danger"
            isRound={true}
            onClick={() => setOpenModal(true)}
          >Cancel</Button>
          <Button
            className="w-auto"
            size="sm"
            variant="ghostLight"
            isRound={true}
            onClick={() => console.log("View reserve clicked")}
          >View Details <Eye /></Button>
        </div>
      </motion.div>
      <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
        <div className="w-full h-auto flex flex-col items-center justify-center text-secondary p-12">
          <FlameKindling className="h-[120px] w-[120px] text-red-400"/>
          <h2 className="text-primary">{t("Are you sure you want to cancel your Reservation?")}</h2>
          <p className="text-sm mt-6 text-primary">{t("Send us and email")}</p>
          <a href="mailto:diego10azul@hotmail.com" className="text-xs cursor-pointer hover:underline">services@bambucamp.com.pe</a>
          <p className="text-sm mt-6 text-primary">{t("Or put in contact with us through our channels")}</p>
          <p className="text-xs">{"+51 399 857 857 or +51 230 456 234"}</p>
        </div>
      </Modal>
    </>
  );
};

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


const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [section,setSection] = useState<string>("reserves");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  }
  const calendarDays = generateCalendar(currentDate, ReservesData.map((reserve) => ({ checkin: reserve.checkin, checkout: reserve.checkout })));

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
              onClick={button.onClick}
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
        <div className="bg-white px-4 col-span-1 lg:col-span-5 grid grid-rows-8 gap-4 h-full">
          <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 row-span-1 flex flex-row justify-between">
            <div className="flex flex-row gap-x-4 items-start flex-col ">
              <h1 className="text-lg text-secondary">{t("Welcome")} {user?.firstName}{" "}{user?.lastName}</h1>
              <p className="font-secondary text-md text-tertiary">{t("Here you can manage your reserves and acquire products")}</p>
            </div>
            <DropDownListAccount user={user} variant="dark"/>
          </div>
          <div className="bg-white row-span-7 grid grid-cols-2 grid-rows-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 row-span-2">
              <h1 className="text-lg flex flex-row gap-x-2 text-secondary"><CalendarCheck/>{t("Calendar")}</h1>
              <p className="font-secondary text-md text-tertiary">{t("View your reserves through months")}</p>
              <div className="w-full h-auto flex flex-row gap-x-2 my-2">
                <span className="h-6 w-6 bg-tertiary rounded-md"></span>
                <p className="font-primary text-tertiary text-sm">{t("Reserves")}</p>
                <span className="h-6 w-6 bg-white rounded-md border-2 border-slate-400"></span>
                <p className="font-primary text-slate-400 text-sm">{t("Today")}</p>
              </div>
              <AnimatePresence>
                  <motion.div 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeOnly("",0,0.5)}
                  className="h-auto w-full w-full bg-white duration-800 transition-all transition-opacity rounded-b-xl">
                    <div className="flex flex-row justify-between items-center mb-4 px-4">
                      <button className="text-secondary hover:text-primary duration-300" onClick={handlePreviousMonth}>{t("Previous")}</button>
                      <h1 className="text-secondary">{currentDate.getMonth()+1 +"/"+ currentDate.getFullYear()}</h1>
                      <button className="text-secondary hover:text-primary duration-300" onClick={handleNextMonth}>{t("Next")}</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-2">
                      {calendarDays}
                    </div>
                  </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 row-span-3">
              <h1 className="text-lg flex flex-row gap-x-2 text-secondary"><Tent/>{t("Reserves")}</h1>
              <p className="font-secondary text-tertiary text-md">{t("View all your reserves directly")}</p>
              <div className="w-full h-[80%] flex flex-col overflow-y-scroll">
                {ReservesData.map((reserve, index) => (
                  <ReserveCard key={index} reserve={reserve}/>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-1 row-span-1">
              <h1 className="text-lg flex flex-row gap-x-2 text-secondary"><CalendarCheck/>{t("News")}</h1>
              <p className="font-secondary text-md text-tertiary">{t("Here are the latest notifications of your reserve")}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarComponent from "./Calendar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {getCalendarDates} from "../db/actions/dashboard";

const CalendarModal = ({ show, type, section, handleSelectedDate, containerDimensions }:{show:boolean, type:string, section?:string, handleSelectedDate: (date: Date) => void, containerDimensions: { height: number, width: number, left: number, top:number } }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [topValue,setTopValue] = useState<string>("0");
  const [isSmallScreen,setIsSmallScreen] = useState(false);
  const [notAvailableDates,setNotAvailableDates] = useState<{ date: Date, label: string, available: boolean }[]>([]);

  useEffect(()=>{
    if(show){
      console.log("this is executed")
      handleGetNotAvailableDates(currentDate);
    }
  },[currentDate,show])

  const handleGetNotAvailableDates = async (currentDate:Date) => {

    const today = new Date();
    
    // Calculate year and month difference
    const yearDiff = currentDate.getFullYear() - today.getFullYear();
    const monthDiff = currentDate.getMonth() - today.getMonth();

    // Calculate the page value (months away from the current month)
    const page = yearDiff * 12 + monthDiff;

    const notAvailableDates = await getCalendarDates(page,"es") 
    console.log(notAvailableDates)
    if(notAvailableDates != null){
      setNotAvailableDates(notAvailableDates);
    }
  }

  useEffect(() => {

    if(window.innerWidth <= 640){
      setIsSmallScreen(true);
    }

    setTopValue(section === "booking"  ? `-400px`  : `${section != "promotion_form" ? containerDimensions.height : (containerDimensions.height + 20)}px`);
  }, [show, currentDate,type]);

  const {t} = useTranslation()

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  }

  const calendarDays = CalendarComponent(currentDate,[],notAvailableDates, handleSelectedDate);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
        key={"calendar_date_selection_"+type}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn( !isSmallScreen ?  "left" : "up","",0,0.5) }
          className={`absolute h-[380px]  w-screen sm:w-[400px] bg-white duration-800 transition-all transition-opacity rounded-xl ${section == "promotion_form" ? "border-2 border-slate-100 shadow-xl":""} 
          z-[2000] ${ type == "startDate" ? "left-0" : "right-0" } `} 
          style={{ top: topValue }}
        >
          <div className="flex flex-row justify-between items-center mb-4 p-4">
            <button className="text-secondary hover:text-primary duration-300" onClick={handlePreviousMonth}>{t("common.previous")}</button>
            <h1 className="text-slate-700">{currentDate.getMonth()+1 +"/"+ currentDate.getFullYear()}</h1>
            <button className="text-secondary hover:text-primary duration-300" onClick={handleNextMonth}>{t("common.next")}</button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-2">
            {calendarDays}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CalendarModal;

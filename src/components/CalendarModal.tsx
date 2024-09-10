import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarComponent from "./Calendar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";

const CalendarModal = ({ show, type, section, handleSelectedDate, containerDimensions }:{show:boolean, type:string, section?:string, handleSelectedDate: (date: Date) => void, containerDimensions: { height: number, width: number, left: number, top:number } }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [topValue,setTopValue] = useState<string>("0");
  const [isSmallScreen,setIsSmallScreen] = useState(false);

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

  const calendarDays = CalendarComponent(currentDate,[], handleSelectedDate);

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
            <button className="text-secondary hover:text-primary duration-300" onClick={handlePreviousMonth}>{t("Previous")}</button>
            <h1 className="text-slate-700">{currentDate.getMonth()+1 +"/"+ currentDate.getFullYear()}</h1>
            <button className="text-secondary hover:text-primary duration-300" onClick={handleNextMonth}>{t("Next")}</button>
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
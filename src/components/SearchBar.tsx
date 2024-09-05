import  { useState, useRef, useEffect } from "react";
import { MapPin, CalendarDays, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {useTranslation} from "react-i18next";
import CalendarComponent from "./Calendar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";


const Calendar = ({ show, type, section, handleSelectedDate, containerDimensions }:{show:boolean, type:string, section?:string, handleSelectedDate: (date: Date) => void, containerDimensions: { height: number, width: number, left: number, top:number } }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [topValue,setTopValue] = useState<string>(0);
  const [isSmallScreen,setIsSmallScreen] = useState(false);

  useEffect(() => {

    if(window.innerWidth <= 640){
      setIsSmallScreen(true);
    }

    setTopValue(section === "booking"  ? `-400px`  : `${containerDimensions.height}px`);
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
          className={`absolute h-[380px]  w-screen sm:w-[400px] bg-white duration-800 transition-all transition-opacity rounded-xl 
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

const DatePicker = ({ date, setDate, openBar, type, section, toggleBar }:{date:Date, setDate:(newDateFrom: Date) => void,openBar:boolean, type:"startDate" | "endDate" | "guests",section?:string, toggleBar: (type: "startDate" | "endDate" | "guests")=>void}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ height:0, width:0, left: 0, top:0 })

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({
        height: rect.height,
        width: rect.width,
        left: rect.left,
        top: rect.top
      });
    }
  }, []);

  const handleDateChange = (pickedDate:Date) => {
    setSelectedDate(pickedDate);
    setDate(pickedDate);
    toggleBar(type)
  };

  const toggleDatePicker = () => {
    toggleBar(type)
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className={`${openBar ? "after:absolute after:top-0 after:left-0 after:content-[''] after:w-full after:h-2 after:bg-secondary":""} text-secondary h-full w-full gap-x-4 flex flex-row justify-center items-center cursor-pointer`} onClick={toggleDatePicker}> 
        <CalendarDays />
        {selectedDate.toISOString().split("T")[0]}
      </div>
      <Calendar key={"calendar_date_selected_"+type} type={type} section={section} show={openBar} handleSelectedDate={handleDateChange} containerDimensions={containerDimensions}/>
    </div>
  );
};

interface propssSearchBar {
  section?:string;
}

const SearchDatesBar = ({section}:propssSearchBar) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { dates, updateDateFrom, updateDateTo } = useCart();
  const [openBar, setOpenBar] = useState<{startDate:boolean, endDate: boolean, guests: boolean }>({ startDate: false, endDate: false, guests: false });

  const toggleBar = (type: "startDate" | "endDate" | "guests" | null) => {
    if(type === null){
      setOpenBar({ startDate: false, endDate: false, guests: false });
    }else{
      setOpenBar((prevOpenBar) => ({ startDate: false, endDate: false, guests: false, [type]: !prevOpenBar[type] }));
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);


  const handleSearchReservation = () => {
    toggleBar(null);
    goToRoute("/booking")
  };


  const goToRoute = (route:string) => {
    navigate(route);
  };



  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={fadeIn("up","",0.5,1)}
      ref={containerRef} 
      className={`relative  mt-24 w-[100%] sm:w-[80%]  ${section =="booking" ? "h-[100px] sm:h-[120px]" :"h-[120px] sm:h-[180px]" } lg:h-[60px] bg-white z-[50] grid grid-cols-2 ${section == "booking" ?  "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      <div className={`${section == "booking" ? "hidden" : ""} max-lg:hidden relative flex flex-col w-full justify-center items-center after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-2 after:bg-secondary`}>
        <span className="text-slate-700 flex flex-row gap-x-4"><MapPin /> Bambucamp</span>
      </div>
      <DatePicker openBar={ openBar['startDate']} type="startDate" section={section}  toggleBar={toggleBar} date={dates.dateFrom} setDate={updateDateFrom} />
      <DatePicker openBar={ openBar['endDate']} type="endDate" section={section} toggleBar={toggleBar} date={dates.dateTo} setDate={updateDateTo} />
      <button className="bg-tertiary text-white w-full col-span-2 lg:col-span-1 hover:bg-primary hover:text-white flex flex-row justify-center items-center gap-x-2 duration-300" onClick={handleSearchReservation}><Search/>{t("Book now")}</button>
    </motion.div>

  );
};

export default SearchDatesBar;

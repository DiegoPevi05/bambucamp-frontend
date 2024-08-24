import  { useState, useRef, useEffect } from "react";
import { MapPin, CalendarDays, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {useTranslation} from "react-i18next";
import CalendarComponent from "./Calendar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";


const Calendar = ({ show, type, handleSelectedDate, containerDimensions }:{show:boolean, type:string, handleSelectedDate: (date: Date) => void, containerDimensions: { height: number, width: number, left: number, top:number } }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDimensions, setCalendarDimensions] = useState({ height:0, width:0, left: 0, top:0 })
  const [isCalendarOverflowingY, setIsCalendarOverflowingY] = useState<boolean>(true);
  const [isCalendarOVerflowingX, setIsCalendarOverflowingX] = useState<boolean>(true);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      setCalendarDimensions({
        height: rect.height,
        width: rect.width,
        left: rect.left,
        top: rect.top,
      });
    }
  }, [show, currentDate,type]); // Run whenever the calendar is shown or the current month changes

  useEffect(() => {
    // Now that calendarDimensions is set, calculate if it overflows
    if (calendarDimensions.height > 0) {
      setIsCalendarOverflowingY(
        containerDimensions.top + calendarDimensions.height > window.innerHeight
      );
    }

    if(calendarDimensions.width > 0){
      setIsCalendarOverflowingX(
        calendarDimensions.left + calendarDimensions.width > window.innerWidth
      );
    }
  }, [calendarDimensions, containerDimensions]);

  const {t} = useTranslation()

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  }

  const calendarDays = CalendarComponent(currentDate,[], handleSelectedDate);

  console.log(calendarDimensions.left)
  console.log(isCalendarOVerflowingX);


  return (
    <AnimatePresence>
      {show && (
        <motion.div 
        key={"calendar_date_selection_"+type}
        ref={calendarRef}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn("left","",0,0.5)}
        className="absolute h-auto  w-[400px] bg-white duration-800 transition-all transition-opacity rounded-xl z-[2000]" 
          style={{
          top: isCalendarOverflowingY ? `-${calendarDimensions.height + 10 }px` : `${containerDimensions.height}px`,
          left: isCalendarOVerflowingX ? `auto` : '0',
          right: isCalendarOVerflowingX ? '0' : 'auto',
        }}
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

const DatePicker = ({ date, setDate, openBar, type, toggleBar }:{date:Date, setDate:(newDateFrom: Date) => void,openBar:boolean, type:"startDate" | "endDate" | "guests", toggleBar: (type: "startDate" | "endDate" | "guests")=>void}) => {
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
      <Calendar key={"calendar_date_selected_"+type} type={type} show={openBar} handleSelectedDate={handleDateChange} containerDimensions={containerDimensions}/>
    </div>
  );
};


const InputGuestBar = ({guests, type,handleCount }: {guests:{adults:number, kids:number, babys:number}, type: "adults" | "kids" | "babys", handleCount: (type: "adults" | "kids" | "babys", count: number) => void } ) => {

  const [currentCount,setCurrentCount] = useState<number>(guests[type]);
  const {t} = useTranslation();

  useEffect(()=>{
    handleCount(type,currentCount);
  },[currentCount])

  const IncrementConter = () => {
    setCurrentCount((prevCount) => prevCount + 1);
  }
  const DecreaseCounter = () =>{
    setCurrentCount((prevCount) => prevCount > 0 ? prevCount - 1 : prevCount);
  }

  return(
    <div className="span-1 w-full h-full bg-white flex flex-row w-full h-full border-l-[1px] border-slate-200">
      <div className="w-[80%] h-full flex flex-row justify-center items-center gap-x-4 text-secondary">
        <User/>
        <span>{currentCount}</span>
        <span>{t(type)}</span>
      </div>
      <div className="w-[20%] h-full flex flex-col border-l-[1px] border-slate-200 divide-y">
        <button className="w-full h-[50%] bg-white text-secondary hover:bg-secondary hover:text-white duration-300" onClick={IncrementConter}>+</button>
        <button className="w-full h-[50%] bg-white text-secondary hover:bg-secondary hover:text-white duration-300" onClick={DecreaseCounter}>-</button>
      </div>
    </div>

  )
}

const GuestPicker = ({openBar, containerRef, toggleBar, guests, setGuests}:
                     {openBar:boolean, containerRef: React.RefObject<HTMLDivElement>, toggleBar: (type: "startDate" | "endDate" | "guests")=>void, guests:{adults:number, kids:number, babys:number}, setGuests: React.Dispatch<React.SetStateAction<{adults:number, kids:number, babys:number}>> }
  ) => {

  const [containerDimensions, setContainerDimensions] = useState<{height:number, width:number}>({ height:0, width:0 })
  const [leftPosition,setLeftPosition] = useState<number>(0);

  const getTotalGuest = () =>{
    return guests.adults + guests.kids + guests.babys
  }

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({
        height: rect.height,
        width: rect.width,
      });
      setLeftPosition( rect.width/5  * -3 );
    }
  }, [containerRef]);

  const updateGuest = (type: "adults" | "kids" | "babys", count: number) => {
    setGuests((prevGuests) => ({ ...prevGuests, [type]: count }));
  };

  const toggleOpenGuestPicker = () => {
    toggleBar("guests");
  }

  return (
    <div className="relative w-full h-full">
      <div className={`${openBar ? "after:absolute after:top-0 after:left-0 after:content-[''] after:w-full after:h-2 after:bg-secondary":""} h-full w-full gap-x-4 flex flex-row justify-center items-center cursor-pointer`} onClick={toggleOpenGuestPicker}> 
        <User/>
        {getTotalGuest()}
      </div>
      <AnimatePresence>
      {openBar && (
          <motion.div 
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fadeIn("left","",0,0.5)}
            className={`absolute z-[1000] bg-slate-50 grid grid-cols-3 `}
              style={{
                top: `${containerDimensions.height}px`,
                left: `${leftPosition}px`,
                height:`${containerDimensions.height}px`,
                width: `${containerDimensions.width}px`,
              }}
          >
            <InputGuestBar guests={guests} type="adults" handleCount={updateGuest}/>
            <InputGuestBar guests={guests} type="kids" handleCount={updateGuest}/>
            <InputGuestBar guests={guests} type="babys" handleCount={updateGuest}/>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

const SearchDatesBar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { dates, updateDateFrom, updateDateTo } = useCart();
  const [guests, setGuests] = useState<{adults:number, kids:number, babys:number}>({ adults:1, kids:0, babys:0 });
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
      className="relative  mt-24 w-[100%] sm:w-[80%] h-[120px] sm:h-[180px] lg:h-[60px] bg-white z-[50] grid grid-cols-2 lg:grid-cols-4">
      <div className="max-lg:hidden relative flex flex-col w-full justify-center items-center after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-2 after:bg-secondary">
        <span className="text-slate-700 flex flex-row gap-x-4"><MapPin /> Bambucamp</span>
      </div>
      <DatePicker openBar={ openBar['startDate']} type="startDate" toggleBar={toggleBar} date={dates.dateFrom} setDate={updateDateFrom} />
      <DatePicker openBar={ openBar['endDate']} type="endDate" toggleBar={toggleBar} date={dates.dateTo} setDate={updateDateTo} />
      {/*<GuestPicker openBar={ openBar['guests']} toggleBar={toggleBar} guests={guests} setGuests={setGuests} containerRef={containerRef}/>*/}
      <button className="bg-tertiary text-white w-full col-span-2 lg:col-span-1 hover:bg-primary hover:text-white flex flex-row justify-center items-center gap-x-2 duration-300" onClick={handleSearchReservation}><Search/>{t("Book now")}</button>
    </motion.div>

  );
};

export default SearchDatesBar;

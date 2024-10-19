import { useState, useRef, useEffect } from "react";
import CalendarDays from "../assets/images/svg/calendar-days.svg?react";
import CalendarModal from "./CalendarModal";

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
      <div className={`${section != "promotion_form" ? (openBar ? "after:absolute after:top-0 after:left-0 after:content-[''] after:w-full after:h-2 after:bg-secondary":"") : ""} text-secondary h-full w-full gap-x-4 flex flex-row justify-center items-center cursor-pointer`} onClick={toggleDatePicker}> 
        <CalendarDays className="w-6 h-6" />
        {selectedDate.toISOString().split("T")[0]}
      </div>
      <CalendarModal key={"calendar_date_selected_"+type} type={type} section={section} show={openBar} handleSelectedDate={handleDateChange} containerDimensions={containerDimensions}/>
    </div>
  );
};

export default DatePicker;

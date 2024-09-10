import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import { AnimatePresence } from "framer-motion";
import {Promotion} from "../lib/interfaces";
import { ChevronRightIcon, X } from "lucide-react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import DatePicker from "./DatePicker";
import Button from "./ui/Button";

interface PromotionProps {
  isOpen: boolean;
  onClose: () => void;
  promotion:Promotion;
}

const PromotionAddForm = ({ isOpen, onClose, promotion }:PromotionProps ) => {
  const {t} = useTranslation();

  const [dates, setDates] = useState<{ dateFrom: Date, dateTo: Date }>({
    dateFrom: new Date(), // Initialize with current date
    dateTo: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const [openBar, setOpenBar] = useState<{startDate:boolean, endDate: boolean, guests: boolean }>({ startDate: false, endDate: false, guests: false });

  const toggleBar = (type: "startDate" | "endDate" | "guests" | null) => {
    if(type === null){
      setOpenBar({ startDate: false, endDate: false, guests: false });
    }else{
      setOpenBar((prevOpenBar) => ({ startDate: false, endDate: false, guests: false, [type]: !prevOpenBar[type] }));
    }
  };

  const updateDateFrom = (newDateFrom: Date) => {
    setDates(prevDates => ({
      ...prevDates,
      dateFrom: newDateFrom,
    }));
  };

  const updateDateTo = (newDateTo: Date) => {
    setDates(prevDates => ({
      ...prevDates,
      dateTo: newDateTo,
    }));
  };

  return(
    <>
      {isOpen && (
        <div className="bg-transparent fixed top-0 left-0 h-full w-full flex items-center justify-center z-[120]">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[110]" style={{background: "rgba(0,0,0,0.1)"}} onClick={onClose}></div>
          <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={fadeIn("up","",0,0.5)}
                className="relative top-0 bottom-0 left-0 right-0 bg-white lg:p-4 rounded-lg shadow-lg w-full lg:w-[50%] h-full sm:h-[60%] overflow-x-hidden lg:overflow-y-auto z-[120]"
              > 
                <button className="absolute top-4 right-4 hover:text-tertiary duration-300" onClick={onClose}><X/></button>
                <div className="w-full h-full flex flex-col justify-start items-start max-sm:pt-24 px-6 pb-8 sm:p-4">
                  <h1 className="text-tertiary text-2xl">{promotion.title}</h1>
                  <div className="w-full h-auto flex flex-col sm:flex-row mt-6 sm:mt-2 gap-y-6 sm:gap-x-6 justify-between">
                    <div className="w-full sm:w-[50%] flex flex-col h-auto justify-start items-start">
                      <label className="text-secondary">{t("From")}:</label>
                      <div className="w-full  sm:p-2 border-b-2  border-b-secondary">
                        <DatePicker openBar={ openBar['startDate']} type="startDate" section="promotion_form" toggleBar={toggleBar} date={dates.dateFrom} setDate={updateDateFrom} />
                      </div>
                    </div>
                    <div className="w-full sm:w-[50%] flex flex-col h-auto justify-start items-start">
                      <label className="text-secondary">{t("To")}:</label>
                      <div className="w-full  p-2 border-b-2  border-b-secondary">
                        <DatePicker openBar={ openBar['endDate']} type="endDate" toggleBar={toggleBar} section="promotion_form" date={dates.dateTo} setDate={updateDateTo} />
                      </div>
                    </div>
                  </div>
                  {promotion.experiences && promotion.experiences.length > 0 &&(
                    <div className="w-full h-auto flex flex-col justify-start items-start gap-y-4">
                      <h2>{t("Experiences")}</h2>
                      <ul className="w-full h-auto flex flex-col">
                          {promotion.experiences.map((experience)=>{
                            return(
                            <li className="w-full h-auto flex flex-row">
                              {experience.name}
                            </li>
                            )
                          })}
                      </ul>
                    </div>
                  )}
                  <div className="w-full h-auto flex flex-row justify-end mt-auto">
                    <Button
                      effect="default"
                      variant="dark" 
                      size="lg" 
                      className="group text-xs sm:text-lg h-10"
                      rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}
                    >{t("Add to reserve")}</Button>
                  </div>
                </div>
              </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default PromotionAddForm;

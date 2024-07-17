import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeOnly } from "../lib/motions";
import { useTranslation } from "react-i18next";
import  Button from "../components/ui/Button";
import { CalendarCheck, DoorClosed, Tent, Pizza,  DoorOpen,Coins,CircleSlash, CreditCard, FlameKindling, Eye, Plus  } from "lucide-react"
import { ExperienceIT, NotificationIT, ProductIT, ReserveIT, TentIT } from "../lib/interfaces";
import Modal from "../components/Modal";
import { ReservesData, notificationsData } from "../lib/constant";
import Dashboard from "../components/ui/Dashboard";
import { InputRadio } from "../components/ui/Input";
import { getTentsNames, getProductsNames, getExperiencesNames } from "../lib/utils";


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

interface NotificationCardProps {
  notification: NotificationIT;
}

const NotificationCard = (props:NotificationCardProps) => {

  const { notification } = props;
  const {t} = useTranslation();

  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{once: true}}
      variants={fadeOnly("",0.5,0.5)}
      className="bg-white p-2 rounded-xl shadow-lg border-2 border-gray-200 w-full h-auto relative flex flex-col hover:bg-secondary duration-300 cursor-pointer group active:scale-95">
      <h2 className="group-hover:text-tertiary">{notification.title}</h2>
      <p className="text-sm text-secondary group-hover:text-white font-secondary">{notification.description}</p>
      </motion.div>
  )
}



interface ReserveCardProps {
  reserve: ReserveIT;
};


const ReserveCard = (props:ReserveCardProps) => {
  const { reserve } = props;
  const {t} = useTranslation();
  const [openModal,setOpenModal] = useState<boolean>(false); 
  const [openReserve,setOpenReserve] = useState<boolean>(false);
  const [openDetails,setOpenDetails] = useState<string>("tents");
  const [selectedOption,setSelectedOption] = useState<number>(0);
  const [selectedTent,setSelectedTent] = useState<TentIT|undefined>(undefined);
  const [selectedProduct,setSelectedProduct] = useState<ProductIT|undefined>(undefined);
  const [selectedExperience,setSelectedExperience] = useState<ExperienceIT|undefined>(undefined);


  useEffect(() => {
    if(openDetails == "tents"){
      const tent = reserve.tents.find((_,index) => index === selectedOption);
      setSelectedTent(tent);
    }else{
      setSelectedTent(undefined);
    }

    if(openDetails == "products"){
      const product = reserve.products.find((_,index) => index === selectedOption);
      setSelectedProduct(product);
    }else{
      setSelectedProduct(undefined);
    }
    if(openDetails == "experiences"){
      const experience = reserve.experiences.find((_,index) => index === selectedOption);
      setSelectedExperience(experience);
    }else{
      setSelectedExperience(undefined);
    }

  },[openDetails,selectedOption])


  return (
    <>
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{once: true}}
      variants={fadeIn("up","",0,0.5)}
      className="bg-white p-2 rounded-xl shadow-lg border-2 border-gray-200 w-full h-[500px]  gap-x-4 mt-4 grid grid-cols-6 grid-rows-7 divide-x divide-slate-200">
      <div className="col-span-4 2xl:col-span-3 row-span-6 p-4 flex flex-row flex-wrap gap-y-4">
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><CircleSlash className="h-5 w-5"/>{t("Identificator")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.id}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><CreditCard className="h-5 w-5"/>{t("Reservation")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.status}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><DoorClosed className="h-5 w-5"/>{t("Check In")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.checkin.toISOString().split("T")[0]+" "+reserve.checkin.toISOString().split("T")[1].split(".")[0]}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><DoorOpen className="h-5 w-5"/>{t("Check Out")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{reserve.checkout.toISOString().split("T")[0]+" "+reserve.checkout.toISOString().split("T")[1].split(".")[0]}</p>
          </div>
          <div className="w-[50%] h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Coins className="h-5 w-5"/>{t("Total Import")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{"S/."}{reserve.total}{".00"}</p>
          </div>
        </div>
      <div className="col-span-2 2xl:col-span-3 row-span-6 p-4 flex flex flex-row flex-wrap">
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Tent className="h-5 w-5"/>{t("Tents")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{getTentsNames(reserve)}</p>
          </div>
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><Pizza className="h-5 w-5"/>{t("Products")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{getProductsNames(reserve)}</p>
          </div>
          <div className="w-full h-auto flex flex-col">
            <h2 className="text-sm font-secondary text-primary flex flex-row gap-x-2 items-start"><FlameKindling className="h-5 w-5"/>{t("Experiences")}{":"}</h2>
            <p className="text-xs font-primary text-slate-400 mt-2">{getExperiencesNames(reserve)}</p>
          </div>
        </div>
        <div className="col-span-6 row-span-1 flex flex-row justify-end gap-x-4">
          <Button
            effect="default"
            className="w-auto"
            size="sm"
            variant="light"
            onClick={() => setOpenModal(true)}
            isRound={true}
          >{t("Cancel")}</Button>
          <Button
            effect="default"
            className="w-auto"
            size="sm"
            variant="ghostLight"
            onClick={() => setOpenReserve(true)}
            isRound={true}
          >{t("View Details")} <Eye /></Button>
        </div>
      </motion.div>
      <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
        <div className="w-full h-auto flex flex-col items-center justify-center text-secondary p-12">
          <FlameKindling className="h-[120px] w-[120px] text-tertiary"/>
          <h2 className="text-primary">{t("Are you sure you want to cancel your Reservation?")}</h2>
          <p className="text-sm mt-6 text-primary">{t("Send us and email")}</p>
          <a href="mailto:diego10azul@hotmail.com" className="text-xs cursor-pointer hover:underline">services@bambucamp.com.pe</a>
          <p className="text-sm mt-6 text-primary">{t("Or put in contact with us through our channels")}</p>
          <p className="text-xs">{"+51 399 857 857 - +51 230 456 234"}</p>
        </div>
      </Modal>

      <Modal isOpen={openReserve} onClose={()=>setOpenReserve(false)}>
        <div className="w-[800px] h-[600px] flex flex-col items-start justify-start text-secondary p-6 overflow-hidden">
            <div className="w-full h-auto flex flex-row gap-x-6 pb-4 border-b-2 border-secondary">
              <InputRadio  
                className="w-auto" 
                onClick={()=>{setOpenDetails("tents") ; setSelectedOption(0)}} 
                name="category" 
                placeholder={t("Tents")} 
                rightIcon={<Tent/>} 
                checked={openDetails === "tents"}
              />
              <InputRadio  
                className="w-auto" 
                onClick={()=>{setOpenDetails("products"); setSelectedOption(0)}} 
                name="category" 
                placeholder={t("Products")} 
                rightIcon={<Pizza/>}
                checked={openDetails === "products"}
              />
              <InputRadio  
                className="w-auto" 
                onClick={()=>{setOpenDetails("experiences"); setSelectedOption(0)}} 
                name="category" 
                placeholder={t("Experiences")} 
                rightIcon={<FlameKindling/>}
                checked={openDetails === "experiences"}
              />
            </div>
            <div className="w-full h-auto">
              {openDetails === "tents" && (
                  <motion.div 
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={fadeIn("left","",0.5,0.5)}
                    className="w-full flex flex-row gap-x-6 py-4">
                    {reserve.tents.length > 0 ? (
                      reserve.tents.map((tent, index) => (
                        <InputRadio 
                          key={"tent_option"+index} 
                          variant="light" 
                          value={tent.id} 
                          name="tent" 
                          placeholder={tent.title} 
                          rightIcon={<Tent/>} 
                          onClick={()=>setSelectedOption(index)}
                          checked={selectedOption === index}
                        />
                      )
                    ))
                    : 
                    <div className="w-full h-[200px] flex justify-center items-center flex-col">
                      <Tent className="h-12 w-12"/>
                      <p className="text-secondary text-sm">{t("No tents available")}</p>
                      <Button 
                        className="w-auto mt-4"
                        effect="default"
                        size="sm" 
                        variant="ghostLight" 
                        rightIcon={<Plus/>}
                      >{t("Add Tent")}</Button>
                    </div>
                    }
                  </motion.div>
              )}

              {openDetails === "products" && (
                <motion.div 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("left","",0.5,0.5)}
                  className="w-full flex flex-row gap-x-6 py-4">
                  {reserve.products.length > 0 ? (
                    reserve.products.map((product, index) => (
                        <InputRadio 
                          key={"tent_option"+index} 
                          variant="light" 
                          value={product.id} 
                          name="product" 
                          placeholder={product.title} 
                          rightIcon={<Pizza/>} 
                          onClick={()=>(setSelectedOption(index))}
                          checked={selectedOption === index}
                        />
                    )
                  ))
                  : 
                    <div className="w-full h-[200px] flex justify-center items-center flex-col">
                      <Pizza className="h-12 w-12"/>
                      <p className="text-secondary text-sm">{t("No products available")}</p>
                      <Button 
                        className="w-auto mt-4"
                        effect="default"
                        size="sm" 
                        variant="ghostLight" 
                        rightIcon={<Plus/>}
                      >{t("Add Product")}</Button>
                    </div>
                  }
                </motion.div>
              )}

              {openDetails === "experiences" && (
                <motion.div 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("left","",0.5,0.5)}
                  className="w-full flex flex-row gap-x-6 py-4">
                  {reserve.experiences.length > 0 ? (
                    reserve.experiences.map((experience, index) => (
                        <InputRadio 
                          key={"tent_option"+index} 
                          variant="light" 
                          value={experience.id} 
                          name="experience" 
                          placeholder={experience.title} 
                          rightIcon={<FlameKindling/>} 
                          onClick={()=>setSelectedOption(index)}
                          checked={selectedOption === index}
                        />
                    )))
                  :
                    <div className="w-full h-[200px] flex justify-center items-center flex-col">
                      <FlameKindling className="h-12 w-12"/>
                      <p className="text-secondary text-sm">{t("No experiences available")}</p>
                      <Button 
                        className="w-auto mt-4"
                        effect="default"
                        size="sm" 
                        variant="ghostLight" 
                        rightIcon={<Plus/>}
                      >{t("Add Experience")}</Button>
                    </div>
                  }
                </motion.div>
              )}
            </div>
            {selectedTent !== undefined && (
              <motion.div 
                key={"tent_"+selectedTent.id}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={fadeIn("","up",0.5,1)}
                className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full mt-4">
                <div className="col-span-3 row-span-3 bg-red-100">
                  {selectedTent.title}
                </div>
                <div className="col-span-1 row-span-3 bg-green-100">
                  hola
                </div>
                <div className="col-span-4 row-span-1 bg-yellow-400">
                  hola
                </div>
              </motion.div>
            )}
          {selectedProduct !== undefined && (
            <motion.div 
              key={"product_"+selectedProduct.id}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeIn("","up",0.5,1)}
              className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full mt-4">
              <div className="col-span-3 row-span-3 bg-red-100">
                {selectedProduct.title}
              </div>
              <div className="col-span-1 row-span-3 bg-green-100">
                hola
              </div>
              <div className="col-span-4 row-span-1 bg-yellow-400">
                hola
              </div>
            </motion.div>
          )}
          {selectedExperience !== undefined && (
            <motion.div 
              key={"experience_"+selectedExperience.id}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeIn("","up",0.5,1)}
              className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full mt-4">
              <div className="col-span-3 row-span-3 bg-red-100">
                {selectedExperience.title}
              </div>
              <div className="col-span-1 row-span-3 bg-green-100">
                hola
              </div>
              <div className="col-span-4 row-span-1 bg-yellow-400">
                hola
              </div>
            </motion.div>
          )}
        </div>
      </Modal>
    </>
  );
};


const DashboardReserves = () => {

    const {t} = useTranslation();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
      }

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
      }
    const calendarDays = generateCalendar(currentDate, ReservesData.map((reserve) => ({ checkin: reserve.checkin, checkout: reserve.checkout })));

    return (
    <Dashboard>
      <motion.div 
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn("up","",0,0.5)}
        className="bg-white row-span-7 grid grid-cols-2 grid-rows-3 gap-4">
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
            <div className="w-full h-[60%] flex flex-col overflow-y-scroll gap-y-4 mt-4">
              {notificationsData.map((notification, index) => (
                <NotificationCard key={index} notification={notification}/>
              ))}
            </div>

          </div>
      </motion.div>
    </Dashboard>
    )
}

export default DashboardReserves;

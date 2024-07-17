import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeOnly } from "../lib/motions";
import { useTranslation } from "react-i18next";
import  Button from "../components/ui/Button";
import { CalendarCheck, DoorClosed, Tent, Pizza,  DoorOpen,Coins,CircleSlash, CreditCard, FlameKindling, Eye, Plus, Info, CircleX, CircleCheck, User  } from "lucide-react"
import { ExperienceIT, NotificationIT, ProductIT, ReserveIT, TentIT } from "../lib/interfaces";
import Modal from "../components/Modal";
import { ReservesData, notificationsData } from "../lib/constant";
import Dashboard from "../components/ui/Dashboard";
import { InputRadio } from "../components/ui/Input";
import { getTentsNames, getProductsNames, getExperiencesNames, formatPrice, formatDate } from "../lib/utils";
import ServiceItem from "../components/ServiceItem";
import Calendar from "../components/Calendar";


interface NotificationCardProps {
  notification: NotificationIT;
}

const NotificationCard = (props:NotificationCardProps) => {

  const { notification } = props;
  const [openModal,setOpenModal] = useState<boolean>(false); 
  const {t} = useTranslation();

  return (
    <>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{once: true}}
        variants={fadeOnly("",0.5,0.5)}
        onClick={()=>setOpenModal(true)}
        className="bg-white p-2 rounded-xl shadow-lg border-2 border-gray-200 w-full h-auto relative flex flex-col hover:bg-secondary duration-300 cursor-pointer group active:scale-95">
        <div className="w-full h-auto flex flex-row gap-x-2">
          { notification.type === "E" && <CircleX className="h-5 w-5 text-tertiary"/>}
          { notification.type === "S" && <CircleCheck className="h-5 w-5 text-tertiary"/>}
          { notification.type === "I" && <Info className="h-5 w-5 text-tertiary"/>}
          <h2 className="group-hover:text-tertiary">{notification.title}</h2>
        </div>
        <p className="text-sm text-secondary group-hover:text-white font-secondary">{notification.preview}</p>
      </motion.div>
      <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
        <div className="w-full h-auto flex flex-col items-center justify-center text-secondary p-12">
          { notification.type === "E" && <CircleX className="h-[60px] w-[60px] text-tertiary"/>}
          { notification.type === "S" && <CircleCheck className="h-[60px] w-[60px] text-tertiary"/>}
          { notification.type === "I" && <Info className="h-[60px] w-[60px] text-tertiary"/>}
          <p className="text-primary">{notification.title}</p>
          <p className="text-sm mt-6 text-secondary">{notification.description}</p>
        </div>
      </Modal>
    </>
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
  const [selectedExperience,setSelectedExperience] = useState<ExperienceIT|undefined>(undefined);


  useEffect(() => {
    if(openDetails == "tents"){
      const tent = reserve.tents.find((_,index) => index === selectedOption);
      setSelectedTent(tent);
    }else{
      setSelectedTent(undefined);
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
                  className="w-full flex flex-col gap-y-6 py-4">
                  {reserve.products.length > 0 ? (
                    <>
                      <div className="w-full h-auto flex flex-row justify-end items-center">
                        <Button 
                          className="w-auto mt-4"
                          effect="default"
                          size="sm" 
                          variant="ghostLight" 
                          rightIcon={<Plus/>}
                        >{t("Add Product")}</Button>
                      </div>
                      {reserve.products.map((product, index) => (
                        <div key={"product"+index} className="flex flex-row w-full border border-2 border-gray-200 p-2 rounded-lg">
                          <div className="w-48 h-24 bg-gray-200 rounded-lg">
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover"/>
                          </div>
                          <div className="w-full h-auto flex flex-col gap-y-2 px-4">
                            <p className="text-primary text-sm">{product.title}</p>
                            <p className="text-secondary text-xs">{product.description}</p>
                            <p className="text-primary text-sm mt-auto">{formatPrice(product.price)}</p>
                          </div>
                          <div className="w-24 h-auto flex flex-col justify-center items-center">
                            <p className="text-primary text-sm">{t("Quantity")}</p>
                            <p className="text-primary text-sm">{product.quantity}</p>
                            <p className="text-primary text-sm mt-auto">{formatPrice(product.quantity ? product.price*product.quantity : 0 )}</p>
                          </div>
                        </div>
                      ))}
                      <div className="w-full h-auto flex flex-row justify-between  border-t-2 border-secondary mt-auto p-4">
                        <p className="text-primary text-sm">{t("Total Import")}</p>
                        <p className="text-primary text-sm">{formatPrice(reserve.products.reduce((acc,product) => acc + product.price*product?.quantity,0))}</p>
                      </div>
                    </>
                  )
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
                  className="w-full flex flex-row gap-x-6 py-4 items-center justify-start">
                  {
                  reserve.experiences.length > 0 ? (
                    <>
                      {
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
                        ))
                      }
                      <Button 
                        className="w-auto ml-auto"
                        effect="default"
                        size="sm" 
                        variant="ghostLight" 
                        rightIcon={<Plus/>}
                      >{t("Add Experience")}</Button>
                    </>
                  )
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
                className="flex flex-col w-full h-[400px] mt-4">
                <div className="h-[70%] w-full flex flex-row">
                  <div className="h-full w-[75%] flex flex-col p-4">
                    <h2 className="text-secondary">{selectedTent.header}</h2>
                    <h1 className="text-tertiary">{selectedTent.title}</h1>
                    <p className="text-primary text-sm">{selectedTent.description}</p>
                    <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                      <p className="text-primary text-sm">{t("Check In")} </p>
                      <p className="text-gray-400 text-sm">{formatDate(reserve.checkin)}</p>
                    </div>
                    <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                      <p className="text-primary text-sm">{t("Check Out")} </p>
                      <p className="text-gray-400 text-sm">{formatDate(reserve.checkout)}</p>
                    </div>
                    <div className="w-full h-auto flex flex-row gap-x-6 mt-auto">
                      <p className="text-primary text-sm">{t("Total Import")} </p>
                      <p className="text-gray-400 text-sm">{formatPrice(selectedTent.price)}</p>
                    </div>
                  </div>
                  <div className="h-full w-[25%] flex justify-center items-center overflow-hidden p-2">
                    <img src={selectedTent.images[0]} alt={selectedTent.title} className="w-full h-auto object-cover"/>
                  </div>
                </div>
                <div className="h-[30%] w-full px-4 py-2 flex flex-col bg-secondary">
                  <h3 className="text-white mb-4">{t("Services")}</h3>
                  <div className="w-full h-auto flex flex-row flex-wrap gap-4">
                  {Object.entries(selectedTent.services).map(([service, value]) => {
                      if (value) {

                        return <ServiceItem size="sm" key={service} icon={service} />;
                      }
                      return null;
                    })}
                  </div>
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
              className="flex flex-col w-full h-[400px] mt-4">
              <div className="h-[80%] w-full flex flex-row">
                <div className="h-full w-[75%] flex flex-col p-4">
                  <h1 className="text-tertiary">{selectedExperience.title}</h1>
                  <p className="text-primary text-sm">{selectedExperience.description}</p>
                  <div className="w-full h-auto flex flex-row">
                    <div className="w-[50%] h-full flex flex-col">
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                        <p className="text-primary text-sm">{t("Time")} </p>
                        <p className="text-gray-400 text-sm">{ selectedExperience.date ? formatDate(selectedExperience.date) : formatDate(new Date())}</p>
                      </div>
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                        <p className="text-primary text-sm">{t("Max People")} </p>

                        <div className="w-auto h-auto flex flex-row items-start gap-x-2">
                          <User className="text-primary h-4 w-4"/>
                          <p className="text-gray-400 text-sm">{selectedExperience.qtyPeople}</p>
                        </div>
                      </div>
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                        <p className="text-primary text-sm">{t("Limit Age")} </p>
                        <p className="text-gray-400 text-sm">{selectedExperience.limitAge} {t("Years")}</p>
                      </div>
                    </div>
                    <div className="w-[50%] h-full flex flex-col border border-2 border-gray-200 rounded-lg px-4 my-2">
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                        <p className="text-primary text-sm">{t("Price")} </p>
                        <p className="text-gray-400 text-sm">{formatPrice(selectedExperience.price)}</p>
                      </div>
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-4">
                        <p className="text-primary text-sm">{t("Quantity")} </p>
                        <p className="text-gray-400 text-sm">{selectedExperience.quantity}</p>
                      </div>
                      <div className="w-full h-auto flex flex-row gap-x-6 mt-auto border-t-2 border-secondary p-2">
                        <p className="text-primary text-sm">{t("Total Import")} </p>
                        <p className="text-gray-400 text-sm">{formatPrice( selectedExperience.quantity ? selectedExperience.price * selectedExperience.quantity : 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-[25%] flex justify-center items-center overflow-hidden p-2">
                  <img src={selectedExperience.images[0]} alt={selectedExperience.title} className="w-auto h-full object-cover"/>
                </div>
              </div>
              <div className="h-[20%] w-full px-4 py-2 flex flex-col bg-secondary">
                <h3 className="text-white mb-1 text-md">{t("Recomendations")}</h3>
                <div className="w-full h-full flex flex-row flex-wrap gap-y-2 gap-x-4">
                  {selectedExperience.sugestions.map((suggestion, index) => (
                    <p key={index} className="text-white text-xs"> * {suggestion}</p>
                  ))}
                </div>
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
      const calendarDays = Calendar(currentDate, ReservesData.map((reserve) => ({ reserveID:reserve.id , checkin: reserve.checkin, checkout: reserve.checkout })));

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

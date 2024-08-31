import {  useState } from "react";
import { Blocks, CircleAlert, Clock, User} from "lucide-react";
import {Experience} from "../lib/interfaces";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {formatPrice, parseSuggestions} from "../lib/utils";
import {useTranslation} from "react-i18next";

interface propsItemExperience {
  index:number;
  experience:Experience;
  handleAddExperience:(idExperience:number,quantity:number, day:Date) => void;
  rangeDates: {date:Date, label:string}[];
}

const ExperienceCard:React.FC<propsItemExperience> = (props:propsItemExperience) => {
  const {t} = useTranslation();
  const { index, experience, handleAddExperience, rangeDates } = props;
  const [quantity,setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1 )
  }

  const handleReduceQuantity = () => {
    setQuantity(prevQuantity => prevQuantity <= 1 ? prevQuantity : prevQuantity - 1 );
  }

  const handleSelectExperience = (idExperience:number) => {
    const indexDay =  Number((document.querySelector(`#experience_day_selector_${idExperience}`) as HTMLInputElement).value)
    const dayObjectSelected  = rangeDates.find((_,i) => i == indexDay); 
    if(dayObjectSelected){
      handleAddExperience(experience.id,quantity, dayObjectSelected.date);
    }

  }

  return(
    <motion.div
      key={`experience-catalog-${experience.id}`}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={fadeIn("left","",0.5*index, 0.5)}
      className="bg-white w-[250px] h-auto flex flex-col items-start justify-start border border-slate-200 rounded-lg shadow-md ">
      <div className="w-full h-[150px] bg-center bg-cover rounded-t-lg" style={{ backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/${experience.images[0]})`}}></div>
      <div className="w-full h-auto flex flex-col justify-start items-start py-2 px-4">
        <h1 className="text-lg text-tertiary">{experience.name}</h1>
        <p className="text-xs text-secondary">{experience.description.slice(0,50)+"..."}</p>
        <p className="text-md">{formatPrice((experience.price == experience.custom_price ? experience.price : experience.custom_price ))}</p>
        <div className="w-full h-auto flex flex-col">
          <div className="w-full h-[50%] flex flex-row">
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center text-tertiary">
              <User/>
              {experience.limit_age}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Limit of age for this experience")}/>
            </div>
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center p-2 text-tertiary">
              <Blocks />
              {experience.qtypeople}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Quantity of people allowed by experience")}/>
            </div>
          </div>
          <div className="w-full h-[50%] flex flex-row">
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center text-tertiary">
              <Clock/>
              {experience.duration}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Duration in Minutes")}/>
            </div>
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center p-2 text-tertiary">
              <p className="text-xs text-secondary">{"Sugerencias"}</p>
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t(parseSuggestions(experience.suggestions))}/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-auto flex flex-col relative rounded-b-lg px-4 gap-y-2 my-2">
        <label className="text-xs text-secondary">{t("Experience Day")}</label>
        <select id={`experience_day_selector_${experience.id}`} className="w-[80%] mx-auto h-auto text-secondary border-2  rounded-md border-secondary text-sm">
          {rangeDates.map((itemDate,index)=>{
            return(
              <option key={"option_day_selector"+index} value={index}>{itemDate.label}</option>
            )
          })}
        </select>
      </div>
      <div className="w-full h-[50px] mt-auto flex flex-row relative rounded-b-lg">
        <span className="w-[30%] h-auto flex items-center justify-center">{quantity}</span>
        <div className="w-[70%] h-auto flex flex-row px-4 py-2 flex items-center gap-x-2">
          <button onClick={()=>handleReduceQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">-</button>
          <button onClick={()=>handleIncrementQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">+</button>
        </div>
      </div>
      <div className="w-full h-[50px] flex flex-row justify-end px-4 py-2">
        <button onClick={()=>handleSelectExperience(experience.id)} className="px-2 bg-secondary text-white rounded-full group hover:bg-white hover:border-2 hover:border-secondary hover:text-secondary h-full w-auto flex items-center justify-center active:scale-95 duration-300 text-xs">{t("Add to reserve")}</button>
      </div>
    </motion.div>
  )
}

export default ExperienceCard;

import { fadeIn } from "../lib/motions";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { Promotion } from "../lib/interfaces";
import { useTranslation } from "react-i18next";

interface PromptionCardProps {
  promotion: Promotion,
  index: number,
}

const PromotionCard = (props:PromptionCardProps) => {
  const {promotion,index} = props;
  const {t} = useTranslation();

  return (
    <motion.div 
      initial="hidden"
      whileInView='show'
      viewport={{ once: true }}
      exit="hidden"
      variants={fadeIn("right","",1+(0.2*index),0.3)}
      className="bg-white max-sm:min-w-[90%] h-[400px] max-sm:ml-6 mt-12 max-sm:mb-12 sm:mt-auto shadow-xl rounded-3xl grid grid-rows-2 hover:cursor-pointer duration-300 relative">
      <div className="absolute -top-[32.5px] right-0 sm:-right-[32.5px] w-[65px] h-[65px] bg-secondary rounded-full flex justify-center items-center">
        <h1 className="text-sm text-center text-white">{t("Save")} {promotion.discount}%</h1>
      </div>
      <img src={`${import.meta.env.VITE_BACKEND_URL}/${promotion.images[0]}`} alt="promotion" className="w-full h-full object-cover rounded-t-2xl"/>
      <div className="p-5 flex flex-col justify-end">
        <h1 className="text-xs text-tertiary">{`${promotion.stock < 10 ? 
        t("Remain")+" "+promotion.stock+" "+t("promotions")+"!":
        t("Last promotions")}
        `}
        </h1>
        <h2 className="text-sm">{promotion.title}</h2>
        <p className="text-xs text-secondary">{promotion.description}</p>
        <Button effect="default" variant="dark" size="sm" className="mt-4 w-[80%] ml-auto">{t("Book now")}</Button>
      </div>
    </motion.div>
  );
}
export default PromotionCard;

import { fadeIn } from "../lib/motions";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { Promotion } from "../lib/interfaces";
import { useTranslation } from "react-i18next";
import {useState} from "react";
import PromotionAddForm from "./ModalPromotion";
import {formatPrice, getDiscount} from "../lib/utils";

interface PromptionCardProps {
  promotion: Promotion,
  index: number,
}

const PromotionCard = (props:PromptionCardProps) => {
  const {promotion,index} = props;
  const {t} = useTranslation();

  const [openForm,setOpenForm] = useState<boolean>(false);

  const toogleOpenForm = () => {
    setOpenForm(!openForm)
  }


  return (
    <>
      <motion.div 
        initial="hidden"
        whileInView='show'
        viewport={{ once: true }}
        exit="hidden"
        variants={fadeIn("right","",1+(0.2*index),0.3)}
        className="bg-white max-sm:min-w-[90%] h-[400px] max-sm:ml-6 mt-12 max-sm:mb-12 sm:mt-auto shadow-xl rounded-3xl grid grid-rows-2 hover:cursor-pointer duration-300 relative">
        <div className="absolute -top-[32.5px] right-0 sm:-right-[32.5px] w-[65px] h-[65px] bg-secondary rounded-full flex justify-center items-center">
          <h1 className="text-sm text-center text-white">{t("promotions.save")} {promotion.discount}%</h1>
        </div>
        <img src={`${promotion.images[0]}`} alt="promotion" className="w-full h-full object-cover rounded-t-2xl"/>
        <div className="p-5 flex flex-col justify-end">
          <h1 className="text-xs text-tertiary">{`${promotion.stock < 10 ? 
          t("promotions.remain")+" "+promotion.stock+" "+t("promotions.plural")+"!":
          t("promotions.last_promotions")}
          `}
          </h1>
          <h2 className="text-sm">{promotion.title}</h2>
          <p className="text-xs text-secondary">{promotion.description}</p>
          {promotion.netImport != promotion.grossImport ?
            <>
              <h2 className="font-primary text-primary text-sm uppercase line-through">{formatPrice(promotion.netImport)}</h2>
              <h1 className="font-primary text-tertiary text-lg uppercase">{formatPrice(promotion.grossImport)}</h1>
              <span className="text-primary text-[11px]">{getDiscount(promotion.netImport,promotion.grossImport)}%{" "}{t("booking.today_discount")}</span>
            </>
          :
            <h1 className="font-primary text-secondary text-2xl uppercase">{formatPrice(promotion.grossImport)}</h1>
          }
          <Button onClick={toogleOpenForm} effect="default" variant="dark" size="sm" className="mt-4 w-[80%] ml-auto">{t("reserve.add_to_reserve")}</Button>
        </div>
      </motion.div>
      <PromotionAddForm isOpen={openForm} onClose={toogleOpenForm} promotion={promotion}/>
    </>
  );
}
export default PromotionCard;

import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import { AnimatePresence } from "framer-motion";
import {Promotion} from "../lib/interfaces";
import { X } from "lucide-react";

interface PromotionProps {
  isOpen: boolean;
  onClose: () => void;
  promotion:Promotion;
}

const PromotionAddForm = ({ isOpen, onClose, promotion }:PromotionProps ) => {
  return(
    <>
      {isOpen && (
        <div className="bg-transparent fixed top-0 left-0 h-full w-full flex items-center justify-center z-10">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20" style={{background: "rgba(0,0,0,0.1)"}} onClick={onClose}></div>
          <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={fadeIn("up","",0,0.5)}
                className="relative top-0 bottom-0 left-0 right-0 bg-white lg:p-4 rounded-lg shadow-lg w-[50%] h-[50%] lg:overflow-y-auto z-30"
              > 
                <button className="absolute top-4 right-4 hover:text-tertiary duration-300" onClick={onClose}><X/></button>
              </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default PromotionAddForm;

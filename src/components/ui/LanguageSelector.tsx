import { ChevronDown, Earth } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { fadeOnly } from '../../lib/motions';

const LanguageDropDownList = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const changeLanguage = (language: string) => {
    setOpen(false);
    i18n.changeLanguage(language);
  };

  const toogleDropDown = () => {
    setOpen(!open);
  };

  return (
    <div className="relative w-auto h-full mx-6">
      <div onClick={toogleDropDown} className="text-xl text-white px-2 flex flex-row gap-x-1 z-50 items-center justify-center cursor-pointer hover:text-tertiary duration-300"><Earth className="h-5 w-5"/>{i18n.language}<ChevronDown/></div>
      <AnimatePresence>
        {open && 
          <motion.div 
            initial="hidden"
            animate='show'
            exit="hidden"
            viewport={{ once: true }}
            variants={fadeOnly("",0,0.3)}
            className="absolute top-[110%] w-full h-auto flex flex-col justify-start items-start bg-primary">
            <span onClick={() => changeLanguage("es")} className="w-full h-auto flex flex-row justify-center items-center gap-x-2 hover:bg-white cursor-pointer group">
              <p className="text-white text-lg group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{"es"}</p>
            </span>
            <span onClick={() => changeLanguage("en")} className="w-full h-auto flex flex-row justify-center items-center gap-x-2 hover:bg-white cursor-pointer group">
              <p className="text-white text-lg group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{"en"}</p>
            </span>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
};

export default LanguageDropDownList;

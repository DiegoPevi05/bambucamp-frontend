import {  Home } from "lucide-react";
import { styles } from "../lib/styles";
import ShopNavbar from "../components/ShopNavbar";
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {ISOLOGO} from "../assets/images";

const InProcessReservation:React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return(
    <>
      <div className="w-full min-h-screen relative flex flex-row overflow-x-hidden">
        <ShopNavbar variant="dark"/>
        <div className={`relative w-full h-full flex flex-col  ${styles.padding}`}>
          <div className="flex flex-row w-full h-auto gap-x-4">
            <button onClick={()=>goToRoute("/")} className="rounded-full h-12 w-12 bg-white border-2 border-secondary text-secondary duration-300 transition-all hover:bg-secondary group active:scale-95 p-2">
              <Home className="h-full w-full group-hover:text-white"/>
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <motion.div 
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={fadeIn("up","",0.5, 0.5)}
                className="w-[70%] h-[400px] flex flex-col justify-center items-center border-4 border-secondary shadow-lg rounded-lg mt-32 gap-y-6 px-24">
                <img alt="isologo" src={ISOLOGO} className="h-16 w-16 "/>
                <h1 className="font-primary text-primary  text-4xl">{t("reserve.header_in_process")}</h1>
                <p className="text-secondary text-center">{t("reserve.info_in_process")}{" "}
                  <a href="https://wa.link/ioswo5" target="_blank" className="cursor-pointer text-primary hover:text-secondary hover:underline">Link</a>
                </p>
                <div className="w-[50%] flex flex-row justify-center items-center gap-x-12">
                  <Button onClick={()=>goToRoute("/")} variant="dark" isRound={true}>{t("common.home")}</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InProcessReservation;

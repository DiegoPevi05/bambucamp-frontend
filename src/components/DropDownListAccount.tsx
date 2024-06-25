import { User as UserIT } from "../lib/interfaces";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  fadeOnly } from "../lib/motions";
import { CalendarCheck, User, DoorClosed, ChevronDown } from "lucide-react";
interface DropDownProps {
  user: UserIT | null;
  variant?: string;
}

const DropDownListAccount = (props:DropDownProps) => {
  const { user, variant } = props;
  const { logout } = useAuth();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const goToRoute = (route:string) => {
    navigate(route);
  }

  const toogleDropDown = () => {
    setOpen(!open);
  };

  return(
    <div className="relative w-auto h-full mx-6">
      <div onClick={toogleDropDown} className={`${variant =="dark" ? "text-primary" : "text-white"} text-xl  px-2 flex flex-row gap-x-1 z-50 items-center justify-center cursor-pointer hover:text-tertiary duration-300`}><User className="h-5 w-5"/>{user?.firstName ? user.firstName : "user" }<ChevronDown/></div>
      <AnimatePresence>
        {open && 
          <motion.div 
            initial="hidden"
            animate='show'
            exit="hidden"
            viewport={{ once: true }}
            variants={fadeOnly("",0,0.3)}
            className="absolute top-[110%] w-[140px] h-auto flex flex-col justify-start items-start bg-primary divide-y divide-white rounded-md border-4 border-primary">

            <span  onClick={() => goToRoute("/dashboard")} className="rounded-t-md w-full h-auto flex flex-row justify-center items-center gap-x-2 hover:bg-white cursor-pointer group py-2">
              <CalendarCheck className="text-white group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer "/>
              <p className="text-white text-sm group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{t("Reserves")}</p>
            </span>


            <span  onClick={() => goToRoute("/dashboard")} className="w-full h-auto flex flex-row justify-center items-center gap-x-2 hover:bg-white cursor-pointer group py-2">
              <User className="text-white group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer"/>
              <p className="text-white text-sm group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{t("Account")}</p>
            </span>

            <span  onClick={() => logout()} className="rounded-b-md w-full h-auto flex flex-row justify-center items-center gap-x-2 hover:bg-white cursor-pointer group py-2">
              <DoorClosed className="text-white group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer"/>
              <p className="text-white text-sm group-hover:scale-[1.05]  group-hover:text-tertiary ease-in-out duration-300 transition-all cursor-pointer">{t("Log out")}</p>
            </span>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
export default DropDownListAccount;

import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { z } from 'zod';
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const end_timer_str = localStorage.getItem("timer_reset_password");
  let end_timer: Date | null = null;

  if (end_timer_str) {
    end_timer = new Date(end_timer_str);
  }

  const getRemainingTime = () => {
    if (end_timer) {
      const now = new Date();
      const diffInSeconds = Math.floor((end_timer.getTime() - now.getTime()) / 1000);
      if (diffInSeconds > 0) {
        return diffInSeconds;
      }
    }
    return 300;
  }

  const [timer, setTimer] = useState(getRemainingTime()); // 300 seconds = 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval); // Stop the interval when timer reaches 0
          return 0;
        }
      });
    }, 1000); // Update timer every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // Format timer to display as mm:ss
  const formattedTimer = new Date(timer * 1000).toISOString().substr(14, 5);



  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type FormValues = z.infer<typeof resetPasswordSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: FormValues) => {

    let email = localStorage.getItem("email_reset_password") || "";
    let code  = localStorage.getItem("code_reset_password") || "";

    localStorage.removeItem("timer_reset_password");
    localStorage.removeItem("email_reset_password");
    localStorage.removeItem("code_reset_password");

    setLoadingForm(true);
    console.log(data);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <form className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={handleSubmit(onSubmit)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-xs my-4">{t("Write your new password in order to restore your password")}</p>
          <div className="flex flex-row justify-end w-full h-auto">
            <span>{formattedTimer}</span>
          </div>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden gap-y-4 sm:gap-y-1">
            <label htmlFor="password" className="font-primary text-secondary text-sm sm:text-lg h-3 sm:h-6">{t("Password")}</label>
            <div className="h-auto w-full relative">
              <input {...register("password")} type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-10">
              {errors?.password && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-10 text-xs text-primary font-tertiary">{t(errors.password.message ? errors.password.message : "Password is required.")}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden gap-y-4 sm:gap-y-1">
            <label htmlFor="confirmPassword" className="font-primary text-secondary text-sm sm:text-lg h-3 sm:h-6">{t("Confirmation Password")}</label>
            <div className="h-auto w-full relative">
              <input {...register("confirmPassword")} type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Confirmation Password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-10">
              {errors?.confirmPassword && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-10 text-xs text-primary font-tertiary">{t(errors.confirmPassword.message ? errors.confirmPassword.message : "Confirmation Password is required.")}
                </motion.p>
              }
            </div>
          </div>

          <Button className="mb-4" isRound={true} isLoading={loadingForm}>{t("Restore Password")}</Button>
          <p onClick={()=>goToRoute("/signin")} className="text-secondary text-xs mb-2 flex flex-row items-center gap-x-2 hover:text-tertiary cursor-pointer group">{t("You have an account?")}<span  className="text-primary group-hover:text-tertiary">{t("Sign In")}</span></p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

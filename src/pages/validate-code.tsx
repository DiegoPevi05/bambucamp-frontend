import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { validateCodeSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { z } from 'zod';
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validateCode = () => {

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
  type FormValues = z.infer<typeof validateCodeSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(validateCodeSchema),
  });

  const onSubmit = (data: FormValues) => {
    let email = localStorage.getItem("email_reset_password") || "";
    setLoadingForm(true);
    console.log(data);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
    localStorage.setItem("code_reset_password", data.code);
    goToRoute("/change-password");
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <form className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={handleSubmit(onSubmit)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-xs my-2">{t("Input the code that your receive at your email account, once the time expired you can request another code")}</p>
          <div className="flex flex-row justify-end w-full h-auto">
            <span>{formattedTimer}</span>
          </div>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden gap-y-4 sm:gap-y-1">
            <label htmlFor="code" className="font-primary text-secondary text-sm sm:text-lg h-3 sm:h-6">{t("Code")}</label>
            <input {...register("code")} className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Code")}/>
            <div className="w-full h-6">
              {errors?.code && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-xs text-primary font-tertiary">{t(errors.code.message ? errors.code.message : "Email is required.")}
                </motion.p>
              }
            </div>
          </div>

          <Button className="mb-4" isRound={true} isLoading={loadingForm}>{t("Validate code")}</Button>
          <p onClick={()=>goToRoute("/signin")} className="text-secondary text-xs mb-2 flex flex-row items-center gap-x-2 hover:text-tertiary cursor-pointer group">{t("You have an account?")}<span  className="text-primary group-hover:text-tertiary">{t("Sign In")}</span></p>
        </form>
      </div>
    </div>
  );
};

export default validateCode;

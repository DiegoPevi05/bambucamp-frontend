import { useState } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { z } from 'zod';
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  type FormValues = z.infer<typeof forgotPasswordSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const setEndTimer = (email:string) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 5 * 60000); // Add 5 minutes (5 * 60000 milliseconds)
    localStorage.setItem("timer_reset_password", futureDate.toString());
    localStorage.setItem("email_reset_password", email);
  }

  const onSubmit = (data: FormValues) => {
    setLoadingForm(true);
    console.log(data);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
    setEndTimer(data.email);
    goToRoute("/validate-code");
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <form className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={handleSubmit(onSubmit)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-xs sm:text-sm my-2">{t("An email with a restore code will be send to your email")}</p>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden gap-y-4 sm:gap-y-1">
            <label htmlFor="email" className="font-primary text-secondary text-sm sm:text-lg h-3 sm:h-6">{t("Email")}</label>
            <input {...register("email")} className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Email")}/>
            <div className="w-full h-6">
              {errors?.email && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-xs text-primary font-tertiary">{t(errors.email.message ? errors.email.message : "Email is required.")}
                </motion.p>
              }
            </div>
          </div>

          <Button className="mb-4" isRound={true} isLoading={loadingForm}>{t("Send Email")}</Button>
          <p onClick={()=>goToRoute("/validate-code")} className="text-secondary text-xs mb-2 hover:text-tertiary group cursor-pointer">{t("I already have a code")} <span  className="text-primary cursor-pointer group-hover:text-tertiary">{t("Validate my code")}</span></p>
          <p onClick={()=>goToRoute("/signin")} className="text-secondary text-xs mb-2 flex flex-row items-center gap-x-2 hover:text-tertiary cursor-pointer group">{t("You have an account?")}<span  className="text-primary group-hover:text-tertiary">{t("Sign In")}</span></p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

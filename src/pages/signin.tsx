import { useState } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { z } from 'zod';
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

const SignIn = () => {

  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type FormValues = z.infer<typeof signInSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: FormValues) => {
    setLoadingForm(true);
    console.log(data);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
    login("token");
    goToRoute("/");
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <form className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={handleSubmit(onSubmit)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-sm my-2">{t("Sign in to your account")}</p>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="email" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6">{t("Email")}</label>
            <input {...register("email")} className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Email")}/>
            <div className="w-full h-6">
              {errors?.email && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.email.message ? errors.email.message : "Email is required.")}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="password" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6">{t("Password")}</label>
            <div className="h-auto w-full relative">
              <input {...register("password")} type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-6">
              {errors?.password && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.password.message ? errors.password.message : "Password is required.")}
                </motion.p>
              }
            </div>
          </div>
          <Button className="mb-4" isRound={true} isLoading={loadingForm}>{t("Sign In")}</Button>
          <p onClick={()=>goToRoute("/signup")} className="text-secondary text-xs mb-2 hover:text-tertiary group cursor-pointer">{t("Don't have an account?")} <span  className="text-primary cursor-pointer group-hover:text-tertiary">{t("Sign Up")}</span></p>
          <p onClick={()=>goToRoute("/forgot-password")} className="text-secondary text-xs mb-2 flex flex-row items-center gap-x-2 hover:text-tertiary cursor-pointer group">{t("Forgot your password?")}<span  className="text-primary group-hover:text-tertiary"><Lock/></span></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

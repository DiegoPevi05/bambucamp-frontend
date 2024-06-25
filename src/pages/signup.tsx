import { useState } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { z } from 'zod';
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const SignUp = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type FormValues = z.infer<typeof signUpSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: FormValues) => {
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
        <form className="w-[350px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={handleSubmit(onSubmit)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-sm my-2">{t("Sign up for a new account")}</p>

          <div className="flex flex-row justify-start items-center w-full h-auto gap-x-2">
            <div className="flex flex-col justify-start items-start w-1/2 h-auto overflow-hidden my-1 gap-y-2  sm:gap-y-1">
              <label htmlFor="FirstName" className="font-primary text-secondary text-xs sm:text-lg h-auto sm:h-6">{t("Firstname")}</label>
              <input {...register("firstName")} className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Firstname")}/>
              <div className="w-full h-6">
                {errors?.firstName && 
                  <motion.p 
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={fadeIn("up","", 0, 1)}
                    className="h-6 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.firstName.message ? errors.firstName.message : "Firstname is required.")}
                  </motion.p>
                }
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
              <label htmlFor="FirstName" className="font-primary text-secondary text-xs sm:text-lg h-auto sm:h-6">{t("Lastname")}</label>
              <input {...register("lastName")} className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Lastname")}/>
              <div className="w-full h-6">
                {errors?.lastName && 
                  <motion.p 
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={fadeIn("up","", 0, 1)}
                    className="h-6 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.lastName.message ? errors.lastName.message : "Lastname is required.")}
                  </motion.p>
                }
              </div>
            </div>
          </div>




          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="email" className="font-primary text-secondary text-xs sm:text-lg h-auto sm:h-6">{t("Email")}</label>
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
            <label htmlFor="password" className="font-primary text-secondary text-xs sm:text-lg h-auto sm:h-6">{t("Password")}</label>
            <div className="h-auto w-full relative">
              <input {...register("password")} type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-8 sm:h-10">
              {errors?.password && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-8 sm:h-10 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.password.message ? errors.password.message : "Password is required.")}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="confirmPassword" className="font-primary text-secondary text-xs  sm:text-lg h-auto sm:h-6">{t("Confirmation Password")}</label>
            <div className="h-auto w-full relative">
              <input {...register("confirmPassword")} type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Confirmation Password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-8 sm:h-10">
              {errors?.confirmPassword && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-8 sm:h-10 text-[10px] sm:text-xs text-primary font-tertiary">{t(errors.confirmPassword.message ? errors.confirmPassword.message : "Confirmation Password is required.")}
                </motion.p>
              }
            </div>
          </div>


          <Button className="mb-4" isRound={true} isLoading={loadingForm}>{t("Sign Up")}</Button>
          <p onClick={()=>goToRoute("/signin")} className="text-secondary text-xs mb-2 hover:text-tertiary group cursor-pointer">{t("You have an account?")} <span  className="text-primary cursor-pointer group-hover:text-tertiary">{t("Sign In")}</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

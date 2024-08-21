import { useState, FormEvent } from "react";
import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { forgotPasswordSchema } from "../db/schemas.ts"
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {ForgotPassword as ForgotPasswordIT} from "../lib/interfaces.ts";
import { ZodError } from "zod";
import { ForgotPasswordAccount } from "../db/actions/auth.ts";

const ForgotPassword = () => {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const setEndTimer = (email:string) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 5 * 60000); // Add 5 minutes (5 * 60000 milliseconds)
    localStorage.setItem("timer_reset_password", futureDate.toString());
    localStorage.setItem("email_reset_password", email);
  }

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const validateFields = (): ForgotPasswordIT |null => {
      const form  = document.getElementById("form_user_forget_password") as HTMLFormElement;
      const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;

      setErrorMessages({});

      try {

        forgotPasswordSchema.parse({  email });

        return {
            email,
        };

      } catch (error) {
        if (error instanceof ZodError) {
          const newErrorMessages: Record<string, string> = {};
          error.errors.forEach(err => {
            const fieldName = err.path[0] as string;
            newErrorMessages[fieldName] = err.message;
          });
          setErrorMessages(newErrorMessages);
        }
        return null;
      }
  };

  const onSubmitForgotPassword = async (e:FormEvent ) => {
      e.preventDefault();
      setLoadingForm(true);
      const fieldsValidated = validateFields();
      if(fieldsValidated != null){
        const isSuccess = await ForgotPasswordAccount(fieldsValidated,i18n.language);
        if(!isSuccess){
            setLoadingForm(false);
            return;
        }
        setEndTimer(fieldsValidated.email);
      }
      setLoadingForm(false);
      goToRoute("/validate-code");
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <form id="form_user_forget_password" className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={(e)=>onSubmitForgotPassword(e)}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-xs sm:text-sm my-2">{t("An email with a restore code will be send to your email")}</p>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden gap-y-4 sm:gap-y-1">
            <label htmlFor="email" className="font-primary text-secondary text-sm sm:text-lg h-3 sm:h-6">{t("Email")}</label>
            <input name="email"  className="w-full h-8 sm:h-10 text-xs sm:text-md font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Email")}/>
            <div className="w-full h-6">
              {errorMessages.email && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-xs text-primary font-tertiary">{t(errorMessages.email)}
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

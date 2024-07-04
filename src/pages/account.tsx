import { useState, useEffect } from "react";
import { User, UserCog, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import Dashboard from "../components/ui/Dashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../db/schemas";
import { z } from "zod";


const DashboardAccount = () => {

  const { user } = useAuth();
  const { t } = useTranslation();
  const [isUserEdit,setUserEdit] = useState<boolean>(false);

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  type FormValues = z.infer<typeof userSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset, isUserEdit]);

  const onSubmit = (data: FormValues) => {
    setLoadingForm(true);
    console.log(data);
    setTimeout(() => {
      setLoadingForm(false);
    }, 2000);
  };

  return(
    <Dashboard>

              <motion.div 
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={fadeIn("up","",0.5,0.5)}
                className="bg-white row-span-7 grid grid-cols-2 grid-rows-3 gap-4">

                  <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200 col-span-2 row-span-7">
                    <div className="w-full h-auto flex flex-row">
                      <div className="w-[50%] h-auto flex flex-col justify-start items-start">
                        <h1 className="text-lg flex flex-row gap-x-2 text-secondary"><User/>{t("Account")}</h1>
                        <p className="font-secondary text-md text-tertiary">{t("View your personal information and complete missing fields")}</p>
                      </div>
                      <div className="w-[50%] h-auto flex flex-row justify-end">
                        {isUserEdit ?
                          <Button variant="ghostLight" className="gap-x-4" onClick={()=>setUserEdit(false)}><UserX className="h-5 w-5"/>{t("Edit")}</Button>
                        :
                          <Button variant="ghostLight" className="gap-x-4" onClick={()=>setUserEdit(true)}><UserCog className="h-5 w-5"/>{t("Edit")}</Button>
                        }
                      </div>
                    </div>
                    <form className="w-full h-full grid grid-cols-2 grid-rows-4" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-span-1 row-span-1 p-6">
                        <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
                          <label htmlFor="email" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6 flex flex-row gap-x-2 my-2"><User/>{t("Email")}</label>
                          {isUserEdit ?
                            <>
                              <input {...register("email")} className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Email")}/>
                              <div className="w-full h-6">
                                {errors?.email && 
                                  <motion.p 
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    variants={fadeIn("up","", 0, 1)}
                                    className="h-6 text-xs text-tertiary font-tertiary">{t(errors.email.message ? errors.email.message : "Message is required.")}
                                  </motion.p>
                                }
                              </div>
                            </>
                          :
                              <input className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary disabled:bg-white" value={user?.email ? user?.email : "none"} disabled/>
                          }

                        </div>
                      </div>

                      <div className="col-span-1 row-span-1 p-6">
                        <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
                          <label htmlFor="FirstName" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6 flex flex-row gap-x-2 my-2"><User/>{t("Firstname")}</label>
                          {isUserEdit ?
                            <>
                              <input {...register("firstName")} className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Firstname")}/>
                              <div className="w-full h-6">
                                {errors?.firstName && 
                                  <motion.p 
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    variants={fadeIn("up","", 0, 1)}
                                    className="h-6 text-xs text-tertiary font-tertiary">{t(errors.firstName.message ? errors.firstName.message : "FirstName is required.")}
                                  </motion.p>
                                }
                              </div>
                            </>
                          :
                              <input className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary disabled:bg-white" value={user?.firstName ? user?.firstName : "none"} disabled/>
                          }

                        </div>
                      </div>

                      <div className="col-span-1 row-span-1 p-6">
                        <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
                          <label htmlFor="FirstName" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6 flex flex-row gap-x-2 my-2"><User/>{t("Lastname")}</label>
                          {isUserEdit ?
                            <>
                              <input {...register("lastName")} className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("Lastname")}/>
                              <div className="w-full h-6">
                                {errors?.lastName && 
                                  <motion.p 
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    variants={fadeIn("up","", 0, 1)}
                                    className="h-6 text-xs text-tertiary font-tertiary">{t(errors.lastName.message ? errors.lastName.message : "LastName is required.")}
                                  </motion.p>
                                }
                              </div>
                            </>
                          :
                              <input className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary disabled:bg-white" value={user?.lastName ? user?.lastName : "none"} disabled/>
                          }

                        </div>
                      </div>

                      <div className="col-span-1 row-span-1 p-6">
                        <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
                          <label htmlFor="FirstName" className="font-primary text-secondary text-xs sm:text-lg h-3 sm:h-6 flex flex-row gap-x-2 my-2"><User/>{t("PhoneNumber")}</label>
                          {isUserEdit ?
                            <>
                              <input {...register("phoneNumber")} className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("PhoneNumber")}/>
                              <div className="w-full h-6">
                                {errors?.phoneNumber && 
                                  <motion.p 
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    variants={fadeIn("up","", 0, 1)}
                                    className="h-6 text-xs text-tertiary font-tertiary">{t(errors.phoneNumber.message ? errors.phoneNumber.message : "PhoneNumber is required.")}
                                  </motion.p>
                                }
                              </div>
                            </>
                          :
                              <input className="w-full h-8 sm:h-10 text-sm sm:text-lg font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary disabled:bg-white" value={user?.phoneNumber ? user?.phoneNumber : "none"} disabled/>
                          }

                        </div>
                      </div>
                      <div className="col-span-2 row-span-1 p-6 flex flex-row justify-end">
                        <Button 
                          isLoading={loadingForm}
                          type="submit" variant="ghostLight" disabled={!isUserEdit}>{t("Update Info")}</Button>
                      </div>
                    </form>
                  </div>
              </motion.div>
    </Dashboard>

  )
}

export default DashboardAccount;

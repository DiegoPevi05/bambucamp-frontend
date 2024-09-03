import  {FormEvent, useState} from "react"
import Navbar from "../components/Navbar"
import Banner from "../assets/video/Banner.mp4";
import FooterBanner from "../assets/video/Footer.mp4";
import {LOGO_THIRD, TENT_SVG, LUNAHUANA, SERVICE_1,SERVICE_2,SERVICE_3,SERVICE_4,SERVICE_5,SERVICE_6,SERVICE_7,SERVICE_8 } from "../assets/images"
import {motion} from "framer-motion"
import {styles} from "../lib/styles"
import { fadeIn } from "../lib/motions"
import SearchDatesBar from "../components/SearchBar"
import VerticalCarousel from "../components/VerticalCarousel"
import Reviews from "../components/Reviews"
import Footer from "../components/Footer"
import { ZodError, z } from 'zod';
import Button from "../components/ui/Button"
import { formHomeSchema } from "../db/schemas.ts"
import PromotionCard from "../components/CardPromotion"
import {promotionsData} from "../lib/constant"
import Collapsible from "../components/Collapsible"
import { Tent  } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import * as LucideIcons from 'lucide-react';
import ChatComponent from "../components/Chat.tsx"
import {ContactForm} from "../lib/interfaces.ts";
import {ContactFormSubmit} from "../db/actions/common.ts";

const ServiceCard = ({name,image,href,iconName}:{name:string;image:string;href:string,iconName:any}) => {
  const navigate = useNavigate();

  // @ts-ignore: Ignore TypeScript checking for IconComponent
  const IconComponent = LucideIcons[iconName];
  
  const goToRoute = (route:string) => {
    navigate(route);
  }

  return(
    <div className="relative row-span-1 col-span-1 hover:scale-105 hover:z-20 transition-all flex flex-col items-center justify-center cursor-pointer bg-primary max-lg:py-6">
      <div className="absolute w-full h-full left-0 top-0 bg-no-repeat bg-cover bg-center opacity-[20%]" style={{backgroundImage: `url(${image})`}}></div>
      <h2 className="text-white text-md sm:text-4xl z-[50]">{name}</h2>

      <IconComponent className="h-6 sm:h-12 w-6 sm:w-12 z-[50] text-white mt-4"/>
    </div>
  )

}

const Home = () => {
  const { t, i18n } = useTranslation();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const validateFields = (): ContactForm |null => {
      const form = document.getElementById("form_contact_home") as HTMLFormElement;
      const name = (form.querySelector('input[name="name"]') as HTMLInputElement).value;
      const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
      const message = (form.querySelector('textarea[name="message"]') as HTMLInputElement).value;
      const saveinfo = (form.querySelector('input[name="saveinfo"]') as HTMLInputElement).checked;

      setErrorMessages({});

      try {

        formHomeSchema.parse({  email, name, message, saveinfo });

        return {
            name,
            email,
            message,
            saveinfo
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

  const onSubmitCreation = async (e:FormEvent ) => {
      e.preventDefault();
      setLoadingForm(true);
      const fieldsValidated = validateFields();
      if(fieldsValidated != null){
        await ContactFormSubmit(fieldsValidated,i18n.language);
      }
      setLoadingForm(false);
  };

  return (
    <div className="overflow-hidden">
      <ChatComponent/>
      <Navbar/>
      <div id="hero" className="relative w-full h-[100vh] flex flex-col justify-center items-center z-[20]">
        <video src={Banner} autoPlay loop  muted className="absolute top-0 left-0 w-full h-full object-cover"/>
        <motion.div 
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("down","",0,2)}
          className="h-auto  sm:h-[20%] lg:h-[30%] w-[90%] sm:w-auto bg-transparent z-[10]">
          <img src={LOGO_THIRD} alt="logo_lg" className="w-full h-full object-cover"/>
        </motion.div>
        <SearchDatesBar/>
      </div>


      <div id="reviews" className="relative w-[100vw] h-auto overflow-hidden">
        <Reviews/>
      </div>

      <div id="us" className="relative w-full h-auto bg-black flex flex-col justify-center items-center">
        <div className="background-image absolute inset-0 w-full h-full opacity-[70%] bg-cover bg-no-repeat bg-bottom z-20" style={{backgroundImage: `url(${LUNAHUANA})`}}></div>
        <div className="flex flex-col justify-center items-center gap-y-6 w-full max-w-7xl py-12 px-6 sm:px-12 lg:px-48 z-50">
          <motion.h2 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("down","",0.3,1)}
            className="font-primary text-white text-center text-4xl sm:text-5xl p-4">{t("Welcome to Bambucamp Glamping")}</motion.h2>
          <motion.div 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("down","",0.5,1)}
            className="font-primary text-white text-center">
            <p className="text-white font-secondary text-md">
              {t("Welcome to Bambucamp Glamping, a place where you can relax and enjoy the nature.")}
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("down","",0.8,1)}
            className="flex flex-row max-sm:flex-wrap justify-center items-center max-sm:gap-4 sm:gap-x-4">
            <Button variant="dark">{t("Book now")}</Button>
            <Button variant="default">{t("See our Tents")}</Button>
            <Button variant="light">{t("See our Services")}</Button>
            <Button variant="ghost">{t("Learn More")}</Button>
          </motion.div>
        </div>
      </div>

      <div id="promotions" className="relative w-full h-auto lg:h-auto py-24 px-6 sm:px-12 lg:px-24 2xl:px-36 flex flex-col justify-start items-start gap-y-6">
        <motion.h2 
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("down","",0,1)}
          className="font-primary text-secondary  text-4xl sm:text-7xl">{t("Promotions")}</motion.h2>
        <div className="flex flex-row flex-wrap gap-x-2">
          <motion.h3 
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("left","",0.5,1.5)}
          className="font-tertiary text-secondary text-lg sm:text-4xl">{t("Check out our latest promotions and all our offerst")} 
          </motion.h3>
          <motion.p 
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("left","",0.5,1.5)}
          className="font-tertiary text-white bg-secondary text-lg sm:text-4xl">{t("are off 50%")}</motion.p>
        </div>

        <div className="w-full h-auto lg:h-[500px] mx-auto flex flex-row sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-12 2xl:gap-24 max-lg:mt-12 max-sm:overflow-auto">
          {promotionsData.length > 1 && (
            promotionsData.map((promotion,index) => (
              <PromotionCard promotion={promotion} index={index}/>
            ))
          )}
        </div>
      </div>

      <div id="reservations" className="relative w-full h-[100vh] flex flex-col justify-center items-start">
        <VerticalCarousel/>
      </div>
      <div id="services" className="h-auto sm:h-[100vh] w-full grid grid-rows-8 sm:grid-rows-2 grid-cols-1 sm:grid-cols-4 relative overflow-hidden">
        <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-[40px] sm:text-[80px] text-white font-primary z-[100]">{t("Services")}</h1>
        <ServiceCard name="BambuAdventure" image={SERVICE_1} href="services" iconName="Waves" />
        <ServiceCard name="BambuFood" image={SERVICE_2} href="services" iconName="Pizza"/>
        <ServiceCard name="BambuRelax" image={SERVICE_3} href="services" iconName="Tent"/>
        <ServiceCard name="BambuDrinks" image={SERVICE_4} href="services" iconName="Martini"/>
        <ServiceCard name="BambuLove" image={SERVICE_5} href="services" iconName="HandHeart"/>
        <ServiceCard name="BambuGames" image={SERVICE_6} href="services" iconName="Dices"/>
        <ServiceCard name="BambuExtras" image={SERVICE_7} href="services" iconName="Beef"/>
        <ServiceCard name="BambuTaxis" image={SERVICE_8} href="services" iconName="CarTaxiFront" />
      </div>
      <div id="FAQ" className="relative w-full h-auto lg:h-[100vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden px-12 sm:px-24 2xl:px-36 py-24 bg-secondary text-white max-lg:gap-y-4">
        <div className="lg:flex w-full h-full col-span-1 flex-col justify-center items-start gap-y-6">
          <motion.h2 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("up","",0,1.5)}
            className={`${styles.sectionHeadText} flex items-center gap-x-2 pb-2`}><Tent className="h-8 w-8"/>FAQ</motion.h2>
          <motion.h3 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("up","",0.5,1.5)}
            className={`${styles.sectionSubText} text-white`}>{t("Here are some of the most frequently asked questions that we get from our customers")}</motion.h3>
          <motion.img 
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            variants={fadeIn("up","",0.5,1.5)}
            src={TENT_SVG} alt="tent" className="w-full lg:w-[80%] h-auto object-cover"/>
        </div>
        <motion.div 
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("left","tween",0.8,1.5)}
          className="block w-full h-full col-span-1 flex flex-col justify-start items-center lg:px-24">
          <Collapsible title="What is the best time to visit the camp?" content="The best time to visit the camp is during the summer months, when the weather is warm and the days are long. The camp is open from May to September, and the best time to visit is during the peak season, which is from June to August. During this time, the camp is at its busiest, with lots of activities and events taking place. If you prefer a quieter experience, you may want to visit in May or September, when the camp is less crowded."/>

          <Collapsible title="What is the best time to visit the camp?" content="The best time to visit the camp is during the summer months, when the weather is warm and the days are long. The camp is open from May to September, and the best time to visit is during the peak season, which is from June to August. During this time, the camp is at its busiest, with lots of activities and events taking place. If you prefer a quieter experience, you may want to visit in May or September, when the camp is less crowded."/>

          <Collapsible title="What is the best time to visit the camp?" content="The best time to visit the camp is during the summer months, when the weather is warm and the days are long. The camp is open from May to September, and the best time to visit is during the peak season, which is from June to August. During this time, the camp is at its busiest, with lots of activities and events taking place. If you prefer a quieter experience, you may want to visit in May or September, when the camp is less crowded."/>

          <Collapsible title="What is the best time to visit the camp?" content="The best time to visit the camp is during the summer months, when the weather is warm and the days are long. The camp is open from May to September, and the best time to visit is during the peak season, which is from June to August. During this time, the camp is at its busiest, with lots of activities and events taking place. If you prefer a quieter experience, you may want to visit in May or September, when the camp is less crowded."/>
        </motion.div>
      </div>

      <div id="contact" className="relative w-full h-[100vh] flex flex-col justify-center items-center z-[20]">
        <video src={FooterBanner} autoPlay loop  muted className="absolute top-0 left-0 w-full h-full object-cover"/>
        <motion.form
          initial="hidden"
          whileInView='show'
          viewport={{ once: true }}
          variants={fadeIn("up","tween",0.8,1.5)}
          id="form_contact_home" className="w-[90%] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-4 sm:p-6 z-[50]" style={{background: "rgba(255,255,255,0.20)"}} onSubmit={(e)=>onSubmitCreation(e)}>
          <Tent className="h-12 w-12 text-tertiary"/>
          <h2 className="text-tertiary text-2xl my-2">{t("Contact Us")}</h2>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="email" className="font-primary text-tertiary text-sm h-auto">{t("Email")}</label>
            <input name="email" className="w-full h-8 sm:h-10 text-xs sm:text-md bg-transparent text-white focus:text-white placeholder:text-white px-2 border-b-2 border-secondary focus:outline-none" placeholder={t("Email")}/>
            <div className="w-full h-6">
              {errorMessages.email && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-white font-tertiary">{t(errorMessages.email)}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="name" className="font-primary text-tertiary text-sm h-auto">{t("Name")}</label>
            <input name="name" className="w-full h-8 sm:h-10 text-xs sm:text-md bg-transparent text-white focus:text-white placeholder:text-white px-2 border-b-2 border-secondary focus:outline-none" placeholder={t("Name")}/>
            <div className="w-full h-6">
              {errorMessages.name && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-white font-tertiary">{t(errorMessages.name)}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="message" className="font-primary text-tertiary text-sm h-auto">{t("Message")}</label>
            <textarea name="message" className="w-full h-12 text-xs sm:text-md bg-transparent text-white focus:text-white placeholder:text-white px-2 border-b-2 border-secondary focus:outline-none" placeholder={t("Message")}>
            </textarea>
            <div className="w-full h-6">
              {errorMessages.message && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-white font-tertiary">{t(errorMessages.message)}
                </motion.p>
              }
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <div className="w-full h-auto flex flex-row p-none m-none justify-start items-end gap-x-3">
              <input type="checkbox" name="saveinfo" className="w-4 h-4 text-xs sm:text-md bg-transparent text-white focus:text-white px-2 border-b-2 border-secondary focus:outline-none"/>
            <label htmlFor="message" className="font-primary text-tertiary text-xs h-auto">{t("Save info for future promotions")}</label>
            </div>
            <div className="w-full h-6">
              {errorMessages.saveinfo && 
                <motion.p 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("up","", 0, 1)}
                  className="h-6 text-[10px] sm:text-xs text-tertiary font-tertiary">{t(errorMessages.saveinfo)}
                </motion.p>
              }
            </div>
          </div>
          <Button variant="dark" type="submit" isLoading={loadingForm}>{t("Send")}</Button>
        </motion.form>
      </div>
      <Footer/>
    </div>
  )
}

export default Home

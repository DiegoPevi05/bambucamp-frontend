import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import { Blocks, ChevronLeftIcon, ChevronRightIcon, CircleAlert, Clock, FlameKindlingIcon, Pizza, User} from "lucide-react";
import { styles } from "../lib/styles";
import {Experience, Product} from "../lib/interfaces";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import SectionHeader from "../components/SectionHeader";
import {formatPrice, parseSuggestions} from "../lib/utils";
import {useTranslation} from "react-i18next";
import {getPublicExperiences, getPublicProducts} from "../db/actions/reservation";

interface propsItemExtra {
  index:number;
  product:Product;
  handleAddProduct:(idProduct:number,quantity:number) => void;
}

const ItemProductExtra:React.FC<propsItemExtra> = (props:propsItemExtra) => {
  const { t } = useTranslation();
  const { index,product, handleAddProduct } = props;
  const [quantity,setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1 )
  }

  const handleReduceQuantity = () => {
    setQuantity(prevQuantity => prevQuantity <= 1 ? prevQuantity : prevQuantity - 1 );
  }

  return(
    <motion.div 
      key={`product-catalog-${product.id}`}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={fadeIn("left","",0.5*index, 0.5)}
      className="bg-white w-[250px] h-[300px] flex flex-col items-start justify-start border border-slate-200 rounded-lg shadow-md ">
      <div className="w-full h-[30%] bg-center bg-cover rounded-t-lg" style={{ backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/${product.images[0]})`}}></div>
      <div className="w-full h-[25%] flex flex-col justify-start items-start py-2 px-4">
        <h1 className="text-lg text-tertiary">{product.name}</h1>
        <p className="text-xs text-secondary">{product.description.slice(0,50)+"..."}</p>
        <p className="text-md">{formatPrice((product.price == product.custom_price ? product.price : product.custom_price ))}</p>
      </div>
      <div className="w-full h-[20%] mt-auto flex flex-row relative rounded-b-lg">
        <span className="w-[30%] h-auto flex items-center justify-center">{quantity}</span>
        <div className="w-[70%] h-auto flex flex-row px-4 py-2 flex items-center gap-x-2">
          <button onClick={()=>handleReduceQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">-</button>
          <button onClick={()=>handleIncrementQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">+</button>
        </div>
      </div>
      <div className="w-full h-[15%] flex flex-row justify-end px-4 py-2">
        <button onClick={()=>handleAddProduct(product.id,quantity)} className="px-2 bg-secondary text-white rounded-full group hover:bg-white hover:border-2 hover:border-secondary hover:text-secondary h-full w-auto flex items-center justify-center active:scale-95 duration-300 text-xs">{t("Add to reserve")}</button>
      </div>
    </motion.div>
  )
}

interface propsItemExperience {
  index:number;
  experience:Experience;
  handleAddExperience:(idExperience:number,quantity:number, day:Date) => void;
  rangeDates: {date:Date, label:string}[];
}

const ItemExperienceExtra:React.FC<propsItemExperience> = (props:propsItemExperience) => {
  const {t} = useTranslation();
  const { index, experience, handleAddExperience, rangeDates } = props;
  const [quantity,setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1 )
  }

  const handleReduceQuantity = () => {
    setQuantity(prevQuantity => prevQuantity <= 1 ? prevQuantity : prevQuantity - 1 );
  }

  const handleSelectExperience = (idExperience:number) => {
    const indexDay =  Number((document.querySelector(`#experience_day_selector_${idExperience}`) as HTMLInputElement).value)
    const dayObjectSelected  = rangeDates.find((_,i) => i == indexDay); 
    if(dayObjectSelected){
      handleAddExperience(experience.id,quantity, dayObjectSelected.date);
    }

  }

  return(
    <motion.div
      key={`experience-catalog-${experience.id}`}
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={fadeIn("left","",0.5*index, 0.5)}
      className="bg-white w-[250px] h-auto flex flex-col items-start justify-start border border-slate-200 rounded-lg shadow-md ">
      <div className="w-full h-[150px] bg-center bg-cover rounded-t-lg" style={{ backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/${experience.images[0]})`}}></div>
      <div className="w-full h-auto flex flex-col justify-start items-start py-2 px-4">
        <h1 className="text-lg text-tertiary">{experience.name}</h1>
        <p className="text-xs text-secondary">{experience.description.slice(0,50)+"..."}</p>
        <p className="text-md">{formatPrice((experience.price == experience.custom_price ? experience.price : experience.custom_price ))}</p>
        <div className="w-full h-auto flex flex-col">
          <div className="w-full h-[50%] flex flex-row">
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center text-tertiary">
              <User/>
              {experience.limit_age}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Limit of age for this experience")}/>
            </div>
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center p-2 text-tertiary">
              <Blocks />
              {experience.qtypeople}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Quantity of people allowed by experience")}/>
            </div>
          </div>
          <div className="w-full h-[50%] flex flex-row">
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center text-tertiary">
              <Clock/>
              {experience.duration}
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t("Duration in Minutes")}/>
            </div>
            <div className="w-[50%] h-[40px] flex flex-row gap-x-2 justify-center items-center p-2 text-tertiary">
              <p className="text-xs text-secondary">{"Sugerencias"}</p>
              <CircleAlert className=" cursor-pointer h-4 w-4 flex items-center justify-center bg-slate-300 rounded-full hover:bg-secondary text-white hover:text-primary text-xs" data-tooltip-id="my-tooltip" data-tooltip-content={t(parseSuggestions(experience.suggestions))}/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-auto flex flex-col relative rounded-b-lg px-4 gap-y-2 my-2">
        <label className="text-xs text-secondary">{t("Experience Day")}</label>
        <select id={`experience_day_selector_${experience.id}`} className="w-[80%] mx-auto h-auto text-secondary border-2  rounded-md border-secondary text-sm">
          {rangeDates.map((itemDate,index)=>{
            return(
              <option value={index}>{itemDate.label}</option>
            )
          })}
        </select>
      </div>
      <div className="w-full h-[50px] mt-auto flex flex-row relative rounded-b-lg">
        <span className="w-[30%] h-auto flex items-center justify-center">{quantity}</span>
        <div className="w-[70%] h-auto flex flex-row px-4 py-2 flex items-center gap-x-2">
          <button onClick={()=>handleReduceQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">-</button>
          <button onClick={()=>handleIncrementQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">+</button>
        </div>
      </div>
      <div className="w-full h-[50px] flex flex-row justify-end px-4 py-2">
        <button onClick={()=>handleSelectExperience(experience.id)} className="px-2 bg-secondary text-white rounded-full group hover:bg-white hover:border-2 hover:border-secondary hover:text-secondary h-full w-auto flex items-center justify-center active:scale-95 duration-300 text-xs">{t("Add to reserve")}</button>
      </div>
    </motion.div>
  )
}

const Extras:React.FC = () => {
  const {t, i18n} = useTranslation();
  const { addProduct, addExperience, getRangeDates } = useCart();
  const navigate = useNavigate();
  const [products,setProducts] = useState<Product[]>([]);
  const [experiences,setExperiences] = useState<Experience[]>([]);

  const handleAddProductToCart = (idProduct:number, quantity:number) => {
    const product = products.find(product => product.id === Number(idProduct))
    if(product){
      addProduct({idProduct,  name: product.name , price: product.price , quantity: quantity  })
    }
  }

  const handleAddExperienceToCart = (idExperience:number, quantity:number, day:Date) => {
    const experience = experiences.find(experience => experience.id === Number(idExperience))
    if(experience){
      addExperience({idExperience,  name: experience.name , price: experience.price , quantity: quantity, day: day  })
    }
  }
  
  useEffect(()=> {
    getProductsHandler();
    getExperiencesHandler();
  },[])

  const getProductsHandler = async() => {
      const productsDB = await getPublicProducts(i18n.language);
      if(productsDB != null){
        setProducts(productsDB);
      }
  };

  const getExperiencesHandler = async() => {
      const experiencesDB = await getPublicExperiences(i18n.language);
      if(experiencesDB != null){
        setExperiences(experiencesDB);
      }
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return(
    <>
      <div className="w-full min-h-screen relative flex flex-row overflow-x-hidden">
        <SectionHeader identifier="extras"/>
        <ShopNavbar variant="dark"/>
        <div className={`relative w-full h-full flex flex-col  ${styles.padding}`}>
          <div className="flex flex-row w-auto h-auto gap-x-4">
            <button onClick={()=>goToRoute("/booking")} className="rounded-full h-12 w-12 bg-white border-2 border-secondary text-secondary duration-300 transition-all hover:bg-secondary group active:scale-95 ">
              <ChevronLeftIcon className="h-full w-full group-hover:text-white"/>
            </button>
            <h1 className="font-primary text-secondary  text-6xl">Extras</h1>
          </div>
          <div className={`w-full flex flex-col gap-y-4 mt-2`}>
            <span className="flex flex-row items-end gap-x-2">
              <FlameKindlingIcon className="h-10 w-10"/>
              <h2 className="text-lg">{t("Experiences")}</h2>
            </span>
            <p>{t("Reserve one of our more requested experience")}</p>
            <div className="w-full h-auto py-4">
              <div className="w-full h-full flex flex-row overflow-x-scroll gap-x-6 no-scroll-bar">
                {experiences.map((experienceItem,index)=>{
                  return(
                    <ItemExperienceExtra  key={`experience__extra_${index}`} index={index} experience={experienceItem} handleAddExperience={handleAddExperienceToCart}  rangeDates={getRangeDates()} />
                  )
                })}
              </div>
            </div>
          </div>
          <div className={`w-full flex flex-col gap-y-4 mt-2`}>
            <span className="flex flex-row items-end gap-x-2">
              <Pizza className="h-10 w-10"/>
              <h2 className="text-lg">{t("Products")}</h2>
            </span>
            <p>{t("Here you can add the products you most whish")}</p>
            <div className="w-full h-[350px] py-4">
              <div className="w-full h-full flex flex-row overflow-x-scroll gap-x-6 no-scroll-bar">
                {products.map((productItem,index)=>{
                  return(
                    <ItemProductExtra  key={`product__extra_${index}`} index={index} product={productItem} handleAddProduct={handleAddProductToCart}  />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='absolute right-12 bottom-12'>
          <Button 
                onClick={()=>goToRoute("/reserve")}
            variant="dark" effect="default" size="lg"  
                className="group text-xs sm:text-lg h-8 sm:h-10"
                rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}>
            {t("Go to Reserve")}
          </Button>
        </div>
      </div>
      <Tooltip id="my-tooltip" style={{ backgroundColor:"#00AAA9", borderRadius:"10px" , padding:"6px" , fontSize:"10px" }} />
    </>
  );
}

export default Extras;

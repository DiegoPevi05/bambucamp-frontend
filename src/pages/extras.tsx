import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import {  ChevronLeftIcon, ChevronRightIcon, FlameKindlingIcon, Pizza} from "lucide-react";
import { styles } from "../lib/styles";
import {Experience, Product} from "../lib/interfaces";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeader from "../components/SectionHeader";
import {useTranslation} from "react-i18next";
import {getPublicExperiences, getPublicProducts} from "../db/actions/reservation";
import ExperienceCard from "../components/ExperienceCard";
import ProductCard from "../components/ProductCard";


const Extras:React.FC = () => {
  const {t, i18n} = useTranslation();
  const { addProduct, addExperience, getRangeDates } = useCart();
  const navigate = useNavigate();
  const [products,setProducts] = useState<Product[]>([]);
  const [experiences,setExperiences] = useState<Experience[]>([]);

  const handleAddProductToCart = (idProduct:number, quantity:number) => {
    const product = products.find(product => product.id === Number(idProduct))
    if(product){
      addProduct({idProduct,  name: product.name , price: (product.price == product.custom_price ? product.price : product.custom_price ) , quantity: quantity  })
    }
  }

  const handleAddExperienceToCart = (idExperience:number, quantity:number, day:Date) => {
    const experience = experiences.find(experience => experience.id === Number(idExperience))
    if(experience){
      addExperience({idExperience,  name: experience.name , price: (experience.price == experience.custom_price ? experience.price : experience.custom_price ) , quantity: quantity, day: day  })
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
                    <ExperienceCard  key={`experience__extra_${index}`} index={index} experience={experienceItem} handleAddExperience={handleAddExperienceToCart}  rangeDates={getRangeDates()} />
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
                    <ProductCard  key={`product__extra_${index}`} index={index} product={productItem} handleAddProduct={handleAddProductToCart}  />
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

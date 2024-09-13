import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import {  ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, FlameKindlingIcon, Pizza} from "lucide-react";
import { styles } from "../lib/styles";
import {Experience, ExperienceCategory, Product, ProductCategory} from "../lib/interfaces";
import ShopNavbar from "../components/ShopNavbar";
import {useCart} from "../contexts/CartContext";
import {useNavigate} from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeader from "../components/SectionHeader";
import {useTranslation} from "react-i18next";
import {getPublicCategoryExperiences, getPublicCategoryProducts, getPublicExperiences, getPublicProducts} from "../db/actions/reservation";
import ExperienceCard from "../components/ExperienceCard";
import ProductCard from "../components/ProductCard";
import {fadeIn} from "../lib/motions";
import { AnimatePresence, motion } from "framer-motion";


const Extras:React.FC = () => {
  const {t, i18n} = useTranslation();
  const { addProduct, addExperience, getRangeDates } = useCart();
  const navigate = useNavigate();

  const [experiencesCategories,setExperiencesCategories] = useState<ExperienceCategory[]>([]);
  const [productsCategories,setProductsCategories] = useState<ProductCategory[]>([]);

  const [products,setProducts] = useState<Product[]>([]);
  const [experiences,setExperiences] = useState<Experience[]>([]);

  const handleAddProductToCart = (idProduct:number, quantity:number) => {
    const product = products.find(product => product.id === Number(idProduct))
    if(product){
      addProduct({idProduct,  name: product.name , price: (product.price == product.custom_price ? product.price : product.custom_price ) , quantity: quantity, confirmed: false  })
    }
  }

  const handleAddExperienceToCart = (idExperience:number, quantity:number, day:Date) => {
    const experience = experiences.find(experience => experience.id === Number(idExperience))
    if(experience){
      addExperience({idExperience,  name: experience.name , price: (experience.price == experience.custom_price ? experience.price : experience.custom_price ) , quantity: quantity, day: day, confirmed:false  })
    }
  }
  
  useEffect(()=> {
    getCategoryProductsHandler();
    getCategoryExperiencesHandler();
    getProductsHandler();
    getExperiencesHandler();
  },[])

  const getCategoryProductsHandler = async() => {
      const categoriesDB = await getPublicCategoryProducts(i18n.language);
      if(categoriesDB != null){
        setProductsCategories(categoriesDB);
      }
  };

  const getCategoryExperiencesHandler = async() => {
      const experiencesDB = await getPublicCategoryExperiences(i18n.language);
      if(experiencesDB != null){
        setExperiencesCategories(experiencesDB);
      }
  };

  const getProductsHandler = async(categories?:string[]) => {
      const productsDB = await getPublicProducts(i18n.language,categories);
      if(productsDB != null){
        setProducts(productsDB);
      }
  };

  const getExperiencesHandler = async(categories?:string[]) => {
      const experiencesDB = await getPublicExperiences(i18n.language,categories);
      if(experiencesDB != null){
        setExperiences(experiencesDB);
      }
  };


  const [selectedCategories, setSelectedCategories] = useState<{ products: string[], experiences: string[] }>({
    products: [],
    experiences: []
  });

  const onChangeSelectedCategorie = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    const prefix = name.split("_")[0];

    setSelectedCategories(prevSelectedCategories => {
      if (prefix === "experience") {
        return {
          ...prevSelectedCategories,
          experiences: checked
            ? [...prevSelectedCategories.experiences, value] // Add category if checked
            : prevSelectedCategories.experiences.filter((cat) => cat !== value) // Remove category if unchecked
        };
      } else if (prefix === "product") {
        return {
          ...prevSelectedCategories,
          products: checked
            ? [...prevSelectedCategories.products, value] // Add category if checked
            : prevSelectedCategories.products.filter((cat) => cat !== value) // Remove category if unchecked
        };
      } else {
        return prevSelectedCategories; // No change for unhandled prefixes
      }
    });
  };

  useEffect(()=>{
    getProductsHandler(selectedCategories.products);
  },[selectedCategories.products])

  useEffect(()=>{
    getExperiencesHandler(selectedCategories.experiences);
  },[selectedCategories.experiences])

  const [openCategory,setOpenCategory] = useState<string|undefined>(undefined);

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return(
    <>
      <div className="w-full min-h-screen relative flex flex-row overflow-x-hidden">
        <SectionHeader identifier="extras"/>
        <ShopNavbar variant="dark"/>
        <div className={`relative w-full h-full flex flex-col  ${styles.padding} mb-12 mt-36 sm:mt-20 lg:mt-0`}>
          <div className="flex flex-row w-auto h-auto gap-x-4">
            <button onClick={()=>goToRoute("/booking")} className="rounded-full h-8 sm:h-12 w-8 sm:w-12 bg-white border-2 border-secondary text-secondary duration-300 transition-all hover:bg-secondary group active:scale-95 ">
              <ChevronLeftIcon className="h-full w-full group-hover:text-white"/>
            </button>
            <h1 className="font-primary text-secondary  text-2xl sm:text-6xl">Extras</h1>
          </div>
          <div className={`w-full flex flex-col gap-y-4 mt-2`}>
            <span className="flex flex-row items-end gap-x-2">
              <FlameKindlingIcon className="h-8 sm:h-10 w-8 sm:w-10"/>
              <h2 className="text-md sm:text-lg">{t("reserve.experiences")}</h2>
            </span>
            <p className="text-sm sm:text-md">{t("experience.header")}</p>
            <h2 className="text-secondary hidden sm:block">{t("common.categories")}</h2>

            <div className="w-full h-auto pb-4">
              <div className="relative w-full h-auto mb-2 sm:hidden" onMouseOver={()=>setOpenCategory("experiences" )} onMouseLeave={()=>setOpenCategory(undefined)} >
                <div className="p-none m-none flex flex-row w-auto h-6">
                  <h2 className="text-secondary  w-auto" >{t("common.categories")}</h2>
                  { openCategory == "experiences" ? <ChevronUpIcon/> : <ChevronDownIcon/> }
                </div>
                <AnimatePresence>
                {openCategory == "experiences" && (
                    <motion.div 
                      key={`experience-catalog-categories`}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={fadeIn("left","",0.2, 0.3)}
                      className="absolute left-0 top-[100%] flex w-[200px] h-auto flex-col py-2 m-none gap-x-2 bg-white border-2 border-secondary rounded-lg px-1 py-2">
                      {experiencesCategories.map((item,index)=>{
                        return(
                          <div key={"checkbox_experience_"+index} className="checkbox-wrapper-13">
                            <input name={"experience_"+item.id} value={item.name} type="checkbox" aria-hidden="true" onChange={(e)=>onChangeSelectedCategorie(e)} checked={selectedCategories.experiences.includes(item.name)}/>
                            <label htmlFor={item.name} className="text-xs sm:text-sm">{item.name}</label>
                          </div>
                        )
                      })}
                    </motion.div>
                )}
                </AnimatePresence>
              </div>

              <div className="hidden w-full h-auto sm:flex flex-row pb-2 m-none gap-x-2">
                {experiencesCategories.map((item,index)=>{
                  return(
                    <div key={"checkbox_experience_"+index} className="checkbox-wrapper-13">
                      <input name={"experience_"+item.id} value={item.name} type="checkbox" aria-hidden="true" onChange={(e)=>{onChangeSelectedCategorie(e),setOpenCategory(undefined)}}/>
                      <label htmlFor={item.name} className="text-xs sm:text-sm">{item.name}</label>
                    </div>
                  )
                })}
              </div>
              <div className="w-full h-full flex flex-row overflow-x-scroll gap-x-6 pb-4">
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
              <Pizza className="h-8 sm:h-10 w-8 sm:w-10"/>
              <h2 className="text-md sm:text-lg">{t("reserve.products")}</h2>
            </span>
            <p className="text-sm sm:text-md">{t("product.header")}</p>
            <h2 className="text-secondary hidden sm:block">{t("Categories")}</h2>

            <div className="relative w-full h-auto mb-2 sm:hidden" onMouseOver={()=>setOpenCategory("products" )} onMouseLeave={()=>setOpenCategory(undefined)} >
              <div className="p-none m-none flex flex-row w-auto h-6">
                <h2 className="text-secondary  w-auto" >{t("common.categories")}</h2>
                { openCategory == "products" ? <ChevronUpIcon/> : <ChevronDownIcon/> }
              </div>
              <AnimatePresence>
              {openCategory == "products" && (
                  <motion.div 
                    key={`experience-catalog-categories`}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={fadeIn("left","",0.2, 0.3)}
                    className="absolute left-0 top-[100%] flex w-[200px] h-auto flex-col py-2 m-none gap-x-2 bg-white border-2 border-secondary rounded-lg px-1 py-2">
                    {productsCategories.map((item,index)=>{
                      return(
                        <div key={"checkbox_product_"+index} className="checkbox-wrapper-13">
                          <input name={"product_"+item.id} value={item.name} type="checkbox" aria-hidden="true" onChange={(e)=>onChangeSelectedCategorie(e)} checked={selectedCategories.products.includes(item.name)}/>
                          <label htmlFor={item.name} className="text-xs sm:text-sm">{item.name}</label>
                        </div>
                      )
                    })}
                  </motion.div>
              )}
              </AnimatePresence>
            </div>

            <div className="w-full h-auto hidden sm:flex flex-row py-2 m-none gap-x-2">
              {productsCategories.map((item,index)=>{
                return(
                  <div key={"checkbox_product_"+index} className="checkbox-wrapper-13">
                    <input name={"product_"+item.id} value={item.name} type="checkbox" aria-hidden="true" onChange={(e)=>onChangeSelectedCategorie(e)}/>
                    <label htmlFor={item.name} className="text-xs sm:text-sm">{item.name}</label>
                  </div>
                )
              })}
            </div>
            <div className="w-full h-[350px] pb-4">
              <div className="w-full h-full flex flex-row overflow-x-scroll gap-x-6">
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
            {t("common.go_to_reserve")}
          </Button>
        </div>
      </div>
      <Tooltip id="my-tooltip" style={{ backgroundColor:"#00AAA9", borderRadius:"10px" , padding:"6px" , fontSize:"10px" }} />
    </>
  );
}

export default Extras;

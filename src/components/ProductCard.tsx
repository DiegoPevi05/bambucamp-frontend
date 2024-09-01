import {  useState } from "react";
import { Product} from "../lib/interfaces";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/motions";
import {formatPrice} from "../lib/utils";
import {useTranslation} from "react-i18next";



interface propsItemExtra {
  index:number;
  product:Product;
  handleAddProduct:(idProduct:number,quantity:number) => void;
}

const ProductCard:React.FC<propsItemExtra> = (props:propsItemExtra) => {
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

export default ProductCard;
import { useState } from "react";
import {Pizza} from "lucide-react";
import { styles } from "../lib/styles";
import {Experience, Product} from "../lib/interfaces";
import { productsData } from "../lib/constant";
import ShopNavbar from "../components/ShopNavbar";
import {BG_BOOKING} from "../assets/images";

interface propsItemExtra {
  product:Product;
}

const ItemProductExtra:React.FC<propsItemExtra> = (props:propsItemExtra) => {
  const { product } = props;
  const [quantity,setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1 )
  }

  const handleReduceQuantity = () => {
    setQuantity(prevQuantity => prevQuantity <= 1 ? prevQuantity : prevQuantity - 1 );
  }

  return(
    <div className="bg-white min-w-[200px] h-[300px] flex flex-col items-start justify-start border border-slate-200 rounded-lg shadow-md ">
      <div className="w-full h-[30%] bg-center bg-cover rounded-t-lg" style={{ backgroundImage: `url(${product.images[0]})`}}></div>
      <div className="w-full h-[25%] flex flex-col justify-start items-start py-2 px-4">
        <h1 className="text-lg">{product.name}</h1>
        <p className="text-xs">{product.description.slice(0,50)+"..."}</p>
        <p className="text-md">S/{product.price}.00</p>
      </div>
      <div className="w-full h-[20%] mt-auto flex flex-row relative rounded-b-lg">
        <span className="w-[30%] h-auto flex items-center justify-center">{quantity}</span>
        <div className="w-[70%] h-auto flex flex-row px-4 py-2 flex items-center gap-x-2">
          <button onClick={()=>handleReduceQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">-</button>
          <button onClick={()=>handleIncrementQuantity()} className="w-full h-8 bg-secondary text-white border-2 border-secondary rounded-md active:scale-95 hover:bg-white hover:text-secondary hover:border-secondary duration-300">+</button>
        </div>
      </div>
      <div className="w-full h-[15%] flex flex-row justify-end px-4 py-2">
        <button className="px-2 bg-secondary text-white rounded-full group hover:bg-white hover:border-2 hover:border-secondary hover:text-secondary h-full w-auto flex items-center justify-center active:scale-95 duration-300 text-xs">Agregar al carrito</button>
      </div>
    </div>
  )
}

const Extras:React.FC = () => {
  return(
    <div className="w-full h-screen relative overflow-hidden">
      <ShopNavbar screen="extras"/>
      <div className={`relative w-full h-full flex flex-col  ${styles.padding}`}>
        <h1 className="font-primary  text-2xl">Extras</h1>
        <div className={`w-full flex flex-col gap-y-4 mt-2`}>
          <span className="flex flex-row items-end gap-x-2">
            <Pizza className="h-10 w-10"/>
            <h2 className="text-lg">Productos</h2>
          </span>
          <p>Aqui puedes agregar los productos que mas desees</p>
          <div className="w-full h-[350px] py-4">
            <div className="w-full h-full flex flex-row overflow-x-scroll gap-x-6 no-scroll-bar">
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
              <ItemProductExtra  product={productsData[0]}  />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">

        </div>
      </div>
    </div>
  );
}

export default Extras;

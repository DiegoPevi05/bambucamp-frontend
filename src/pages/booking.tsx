import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {  useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import { BG_BOOKING, NOTICE_BOARD } from '../assets/images';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motions';
import {ChevronLeftIcon, ChevronRightIcon, ToyBrick, UserIcon} from 'lucide-react';
import { tentsData } from '../lib/constant';
import ServiceItem from '../components/ServiceItem';
import {InputRadio} from '../components/ui/Input';
import {calculatePrice, getDiscount} from '../lib/utils';
import ShopNavbar from '../components/ShopNavbar';
import {useCart} from '../contexts/CartContext';
import Button from '../components/ui/Button';
import SearchDatesBar from '../components/SearchBar';

interface ModelTentProps {
  position: [number, number, number];
}

const ModelTent: React.FC<ModelTentProps> = ({ position }) => {
  // Use useGLTF hook to load the .glb model
  const { scene } = useGLTF('/models/tent.glb');

  return (
    <a.group position={position}>
      <primitive object={scene} scale={[0.02, 0.02, 0.02]} rotation={[0.1,0.3,-0.05]} position={[-1.5,-1.8,-1]} />
    </a.group>
  );
};

interface CarouselTentProps {
  idTent:number;
}


const CarouselTent: React.FC<CarouselTentProps> = ({idTent}) => {

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div 
        key={`current-tent-${idTent}`}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn("right","",0.5,1)}
        className="w-full h-full">
        <Canvas>
          <ambientLight intensity={8} /> {/* Overall light */}
          <spotLight position={[10, 10, 10]} /> {/* Spot light for highlights */}
          <ModelTent key={1} position={[0, 0, 0]} />
        </Canvas>
      </motion.div>
    </div>
  );
};

const Booking: React.FC = () => {
  const [tents,setTents] = useState(tentsData);
  const [selectedTent,setSelectedTent] = useState(0);

  const { addTent, removeTent, isTentInCart, totalItems, getTotalNights } = useCart();

  const handleNext = () => {
    setSelectedTent((prevIndex) => (prevIndex + 1) % tents.length);
  };

  const handlePrevious = () => {
    setSelectedTent((prevIndex) => (prevIndex - 1 + tents.length) % tents.length);
  };

  const handleToggleTent = (e:any) => {
    const idTent = Number(e.target.value);
    if(isTentInCart(idTent)){
      removeTent(idTent);
    }else{
      const tent = tents.find(tent => tent.id === Number(idTent))
      if(tent){
        addTent({idTent,  name: tent.title , price: tent.price , nights: getTotalNights() })
      }
    }
  }

  return (
    <div className="w-full h-screen relative">
      <ShopNavbar/>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG_BOOKING})`, filter: 'blur(10px)' }}></div>
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.1 }}></div>
      </div>
      {tents.map((tent,index)=>{
        if(index == selectedTent){
        return(
          <div key={`tent-content-${tent.id}`} className='w-full h-full'>
            <motion.div 
              key={`tent-catalog-${tent.id}`}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeIn("down","",0.5,0.5)}
              className='flex flex-col items-start justify-start w-[600px] h-screen absolute right-0 top-0'>
              <div 
                className="relative right-0 -top-[60px] w-[600px] h-[600px] bg-cover bg-no-repeat bg-center flex flex-col justify-start items-center pt-[140px]" style={{ backgroundImage: `url(${NOTICE_BOARD})` }}>
                <div className="flex flex-col items-center justify-center w-[450px] h-[100px] p-4">
                  <h2 className="font-primary text-white text-sm uppercase">{tent.header}</h2>
                  <h1 className="font-primary text-tertiary text-3xl uppercase">{tent.title}</h1>
                  <div className="flex flex-row gap-x-4 mt-1">
                    <div className="w-auto h-auto flex flex-row gap-x-2">
                      <UserIcon className="h-4 w-4 text-white"/>
                      <span className="text-white text-sm">{tent.qtypeople} Adultos</span>
                    </div>
                    <div className="w-auto h-auto flex flex-row gap-x-2">
                      <ToyBrick className="h-4 w-4 text-white"/>
                      <span className="text-white text-sm">{tent.qtykids} Niños</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-start flex-col  w-[450px] h-[100px] py-4 px-12 mt-4">
                  <p className="font-primary text-white text-xs">{tent.description}</p>
                </div>
                <div className="flex items-start justify-start flex-col w-[450px] h-[100px] py-4 px-10 mt-4 ">
                  <label className="text-white">{"Services"}</label>
                  <div className="flex flex-row flex-wrap items-start justify-start w-full h-full gap-x-4">
                    {Object.entries(tent.services).map(([service, value]) => {
                        if (value) {

                          return <ServiceItem size="sm" key={service} icon={service} />;
                        }
                        return null;
                      })}
                  </div>
                </div>
                <div className="flex items-center justify-center flex-col w-[450px] h-[100px] py-4 px-12 mt-4 ">
                  {calculatePrice(tent.price,tent.custom_price) != tent.price ?
                    <>
                      <h2 className="font-primary text-white text-sm uppercase line-through">S/{calculatePrice(tent.price,tent.custom_price)}</h2>
                      <h1 className="font-primary text-tertiary text-3xl uppercase">S/{tent.price}.00</h1>
                      <span className="text-white">{getDiscount(tent.price,calculatePrice(tent.price,tent.custom_price))}% de descuento solo por hoy</span>
                    </>
                  :
                    <h1 className="font-primary text-tertiary text-3xl uppercase">S/{tent.price}.00</h1>
                  }
                </div>

              </div>
              <div className='w-full h-auto items-start justify-start z-[12]'>
                <div className='flex flex-row justify-around mx-auto mb-12'>
                  <InputRadio onClick={(e)=>handleToggleTent(e)} variant="default" value={tent.id} placeholder={ isTentInCart(tent.id) ? 'Reservado' : 'Agregar a la Reserva'} checked={isTentInCart(tent.id)} readOnly/>
                </div>

                <div className="flex flex-row justify-around w-[400px] mx-auto">
                  <button onClick={()=>handlePrevious()} className='rounded-full bg-white h-16 w-16 duration-300 border-[5px] border-secondary flex justify-center items-center active:scale-95 hover:scale-105 hover:bg-secondary group'>
                    <ChevronLeftIcon className="h-10 w-10 group-hover:text-white"/>
                  </button>
                  <button onClick={()=>handleNext()} className='rounded-full bg-white h-16 w-16 duration-300 border-[5px] border-secondary flex justify-center items-center active:scale-95 hover:scale-105 hover:bg-secondary group'>
                    <ChevronRightIcon className="h-10 w-10 group-hover:text-white"/>
                  </button>
                </div>
              </div>
            </motion.div>
            <CarouselTent   
              key={`tent-catalog-model-${tent.id}`}
              idTent={selectedTent}
            />
          </div>
        )

        }
        })
      }

      <div className='absolute bottom-24 left-12 w-[1200px] flex flex-row'>
        <SearchDatesBar/>
      </div>

      <div className='absolute right-12 bottom-12'>
        <Button variant="default" effect="default" size="lg"  
              className="group text-xs sm:text-lg h-8 sm:h-10"
              rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}
              disabled={totalItems == 0}>
              Continuar
        </Button>
      </div>
    </div>
  );
};

export default Booking;

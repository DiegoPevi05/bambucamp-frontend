import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {  useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import { BG_BOOKING, NOTICE_BOARD } from '../assets/images';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn, fadeOnly, slideIn } from '../lib/motions';
import {ChevronLeftIcon, ChevronRightIcon, LoaderCircle, Tent as TentIcon, ToyBrick, User, UserIcon, X} from 'lucide-react';
import ServiceItem from '../components/ServiceItem';
import {InputRadio} from '../components/ui/Input';
import { formatPrice, getDiscount} from '../lib/utils';
import ShopNavbar from '../components/ShopNavbar';
import {useCart} from '../contexts/CartContext';
import Button from '../components/ui/Button';
import SearchDatesBar from '../components/SearchBar';
import {Tent} from '../lib/interfaces';
import {useTranslation} from 'react-i18next';
import {SearchAvailableTents} from '../db/actions/reservation';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';

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
    <div className="relative h-full w-full overflow-hidden z-[20]">
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tents,setTents] = useState<Tent[]>([]);
  const [selectedTent,setSelectedTent] = useState(0);
  const [loadingTent,setLoadingTents] = useState(true);
  const [aditionalPeople,setAditionalPeople] = useState(0);

  const {dates, addTent, removeTent, isTentInCart, totalItems, getTotalNights } = useCart();

  const handleNext = () => {
    setSelectedTent((prevIndex) => (prevIndex + 1) % tents.length);
  };

  const handlePrevious = () => {
    setSelectedTent((prevIndex) => (prevIndex - 1 + tents.length) % tents.length);
  };

  const handleToggleTent = (idTent:number, index:number) => {
    if(isTentInCart(idTent)){
      removeTent(index);
    }else{
      const tent = tents.find(tent => tent.id === Number(idTent))
      if(tent){

        if(tent.max_aditional_people < aditionalPeople){
          toast.success(t("Maximum number of aditional people for this glamping:")+(" ")+tent.max_aditional_people);
          return;
        }

        const tentPrice = ( tent.price != tent.custom_price ? tent.custom_price : tent.price );

        addTent({idTent,  name: tent.title , price: tentPrice , nights: getTotalNights(), dateFrom: dates.dateFrom, dateTo: dates.dateTo , aditionalPeople:aditionalPeople, additionalPeoplePrice:tent.aditional_people_price, confirmed:false })
        setAditionalPeople(1);
      }
    }
  }



  useEffect(()=>{
    setAditionalPeople(0);
  },[selectedTent])

  useEffect(()=>{

    const searchAvailableTentsHandler = async() => {
      if(dates.dateFrom > dates.dateTo){
        toast.error(t("Start date must be before end date."))
        return;
      }
      setLoadingTents(true);
      const tentsDB = await SearchAvailableTents(dates, i18n.language);
      if(tentsDB != null){
        setTents(tentsDB);
        setLoadingTents(false);
      }
    }

    searchAvailableTentsHandler();

  },[dates, i18n.language])

  const goToRoute = (route:string) => {
    navigate(route);
  };

  const [viewDetailsMobile,setViewDetailsMobile] = useState<boolean>(false); 


  return (
    <div className="w-full h-screen relative overflow-hidden">
      <SectionHeader identifier="glampings"/>
      <ShopNavbar/>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG_BOOKING})`, filter: 'blur(10px)' }}></div>
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.1 }}></div>
      </div>
      {loadingTent ?
        <div className='absolute right-1/2 top-1/2 left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2'>
          <LoaderCircle  className='h-16 w-16 text-secondary animate-spin'/>
          </div>
      :
      <>
        {
          tents.length ==  0 ?
            <motion.div 
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={fadeOnly("down",0.5,0.5)}
              className='w-[300px] h-[200px] absolute right-1/2 top-1/2 left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-xl border-4 border-white flex items-center justify-center flex-col gap-y-2 text-white p-2' >
              <p className='font-secondary text-center mx-auto'>{t("There are no glampings available for the range of dates selected")}</p>
              <TentIcon className='h-12 w-12'/>
            </motion.div>

          :
          tents.map((tent,index)=>{
            if(index == selectedTent){
            return(
              <div key={`tent-content-${tent.id}`} className='w-full h-full overflow-hidden'>
                <motion.div 
                  key={`tent-catalog-${tent.id}`}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("down","",0.5,0.5)}
                  className='flex flex-col items-start justify-start w-[60%] lg:w-[600px] h-screen absolute right-0 top-0 z-[30]'>
                  <div 
                    className="max-sm:hidden relative right-0 -top-[2%] lg:-top-[60px] w-full lg:w-[600px] h-[50%] lg:h-[600px] bg-cover bg-no-repeat bg-center flex flex-col justify-start items-center pt-[28%] lg:pt-[140px]" style={{ backgroundImage: `url(${NOTICE_BOARD})` }}>
                    <div className="flex flex-col items-center justify-center w-[80%] lg:w-[450px] h-[20%] lg:h-[100px] p-4">
                      <h2 className="font-primary text-white text-sm uppercase">{tent.header}</h2>
                      <h1 className="font-primary text-tertiary text-3xl uppercase">{tent.title}</h1>
                      <div className="flex flex-row gap-x-4 mt-1">
                        <div className="w-auto h-auto flex flex-row gap-x-2">
                          <UserIcon className="h-4 w-4 text-white"/>
                          <span className="text-white text-sm">{tent.qtypeople} {t('adults')}</span>
                        </div>
                        <div className="w-auto h-auto flex flex-row gap-x-2">
                          <ToyBrick className="h-4 w-4 text-white"/>
                          <span className="text-white text-sm">{tent.qtykids} {t('kids')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start justify-start flex-col  w-[80%] lg:w-[450px] h-[20%] lg:h-[100px] py-2 lg:py-4 px-12 mt-[5%] lg:mt-4">
                      <p className="font-primary text-white text-xs">{tent.description ? (tent.description.length > 250 ? tent.description.slice(0,250)+"..." : tent.description) : ""}</p>
                    </div>
                    <div className="flex items-start justify-start flex-col w-[80%] lg:w-[450px] h-[20%] lg:h-[100px] py-2 lg:py-4 px-10  mt-[4%] lg:mt-4">
                      <label className="text-white">{t("Services")}</label>
                      <div className="flex flex-row flex-wrap items-start justify-start w-full h-full gap-x-4">
                        {Object.entries(tent.services).map(([service, value]) => {
                            if (value) {

                              return <ServiceItem size="sm" key={service} icon={service} />;
                            }
                            return null;
                          })}
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center flex-col w-[80%] lg:w-[450px] h-[20%] lg:h-[100px] py-2 lg:py-4 px-12 mt-[4%] lg:mt-4">
                      {tent.custom_price != tent.price ?
                        <>
                          <h2 className="font-primary text-white text-sm uppercase line-through">{formatPrice(tent.price)}</h2>
                          <h1 className="font-primary text-tertiary text-3xl uppercase">{formatPrice(tent.custom_price)}</h1>
                          <span className="text-white text-xs">{getDiscount(tent.price,tent.custom_price)}%{" "}{"off of discount only for today"}</span>
                        </>
                      :
                        <h1 className="font-primary text-tertiary text-3xl uppercase">{formatPrice(tent.price)}</h1>
                      }
                      <label className='absolute bottom-0 left-[10%] text-white text-[10px]'>{t("Aditional cost per person")}:{" "}{formatPrice(tent.aditional_people_price || 0)}</label>
                    </div>

                  </div>
                  <div className='max-sm:hidden relative lg:mt-5 lg:-top-[5%] w-full h-auto flex flex-col bg-transparent  items-start justify-center gap-y-2 z-[12]'>
                    <div className='w-auto h-auto flex flex-col justify-start mx-auto'>
                      <label className='flex flex-row gap-x-2 mx-auto mb-2 text-white'><User/>{t("Aditional People")}</label>
                      <div className='w-auto mx-auto flex flex-row items-center gap-x-4'>
                        <input value={aditionalPeople}  className="h-12 w-12 border-2 border-secondary rounded-lg text-center disabled:bg-white" disabled/>
                        <button onClick={()=>setAditionalPeople(prevAditionalPeople => (prevAditionalPeople - 1  >= 0 ? prevAditionalPeople - 1 : 0 ))}  className="active:scale-95 hover:bg-white hover:text-secondary duration-300 transition-all h-10 w-10 bg-secondary border-white border-2 rounded-lg text-white">-</button>
                        <button onClick={()=>setAditionalPeople(prevAditionalPeople => prevAditionalPeople + 1)} className="active:scale-95 hover:bg-white hover:text-secondary duration-300 transition-all h-10 w-10 bg-secondary border-white border-2 rounded-lg text-white">+</button>
                      </div>
                    </div>
                    <div className='flex flex-row justify-around mx-auto'>
                      <InputRadio onClick={()=>handleToggleTent(tent.id,index)} variant="default" value={tent.id} placeholder={ isTentInCart(tent.id) ? t('Reserved') : t('Add to reserve')} checked={isTentInCart(tent.id)} readOnly/>
                    </div>

                    <div className="flex flex-row justify-around w-[400px] mx-auto">
                      <button onClick={()=>handlePrevious()} className='rounded-full bg-white h-12 2xl:h-16 w-12 2xl:w-16 duration-300 border-[5px] border-secondary flex justify-center items-center active:scale-95 hover:scale-105 hover:bg-secondary group p-1'>
                        <ChevronLeftIcon className="h-full w-full group-hover:text-white"/>
                      </button>
                      <button onClick={()=>handleNext()} className='rounded-full bg-white h-12 2xl:h-16 w-12 2xl:w-16 duration-300 border-[5px] border-secondary flex justify-center items-center active:scale-95 hover:scale-105 hover:bg-secondary group p-1'>
                        <ChevronRightIcon className="h-full w-full group-hover:text-white"/>
                      </button>
                    </div>
                    <div className="flex flex-row justify-center items-center w-full h-auto gap-x-2">
                      {tents.map((_,index)=>{
                          return(
                            <span 
                            onClick={()=>setSelectedTent(index)}
                              key={`bullet_tent_options_${index}`} className={`${ selectedTent == index ? "bg-white" : "bg-secondary" } hover:bg-white cursor-pointer  h-5 w-5 border-2 border-secondary rounded-full transition-all duration-300 `}></span>
                          )
                      })}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  key={`tent-catalog-${tent.id}`}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={fadeIn("down","",0.5,0.5)}
                  className='sm:hidden flex flex-col items-start justify-start w-[50%] h-auto absolute right-[5%] top-1/4 z-[30] ' >
                  <div className="w-full h-[200px] rounded-xl shadow-xl px-4 py-6 flex flex-col items-start justify-start relative" style={{background: "rgba(255,255,255,0.80)"}}>
                      <span className='absolute -top-[10%] -left-[5%] w-10 h-10 bg-secondary rounded-full p-2 hover:bg-white group shadow-lg'><TentIcon className="w-full h-full text-white group-hover:text-primary"/></span>
                      <h2 className="font-primary text-primary text-xs uppercase">{tent.header}</h2>
                      <h1 className="font-primary text-tertiary text-lg uppercase">{tent.title}</h1>
                      {tent.custom_price != tent.price ?
                        <>
                          <h2 className="font-primary text-primary text-sm uppercase line-through">{formatPrice(tent.price)}</h2>
                          <h1 className="font-primary text-tertiary text-lg uppercase">{formatPrice(tent.custom_price)}</h1>
                          <span className="text-primary text-[11px]">{getDiscount(tent.price,tent.custom_price)}%{" "}{"off of discount only for today"}</span>
                        </>
                      :
                        <h1 className="font-primary text-secondary text-2xl uppercase">{formatPrice(tent.price)}</h1>
                      }

                      <div className="w-full h-auto mt-auto px-6">
                        <InputRadio labelVisible={true} className="text-[12px] w-auto" onClick={()=>handleToggleTent(tent.id,index)} variant="default" value={tent.id} placeholder={ isTentInCart(tent.id) ? t('Reserved') : t('Add')} checked={isTentInCart(tent.id)} readOnly/>
                      </div>
                  </div>

                  <button 
                    onClick={()=>setViewDetailsMobile(true)}
                    className='mx-auto mt-[5%] h-auto w-auto px-4 py-2 bg-secondary rounded-full text-white hover:text-primary text-[11px] hover:bg-white group shadow-lg'>Ver mas</button>

                  <div className="mt-[5%] flex flex-row justify-center items-center w-full h-auto gap-x-2">
                    {tents.map((_,index)=>{
                        return(
                          <span 
                          onClick={()=>setSelectedTent(index)}
                            key={`bullet_tent_options_${index}`} className={`${ selectedTent == index ? "bg-white" : "bg-secondary" } hover:bg-white cursor-pointer  h-5 w-5 border-2 border-secondary rounded-full transition-all duration-300 `}></span>
                        )
                    })}
                  </div>

                </motion.div>
                <CarouselTent   
                  key={`tent-catalog-model-${tent.id}`}
                  idTent={selectedTent}
                />

                <div 
                  key={`tent-catalog-mobile-${tent.id}`}
                  className={`w-screen h-screen absolute top-0 ${viewDetailsMobile ? "left-0": "left-[100%]"} z-[100] bg-white duration-300 transition-all overflow-hidden`}>
                  <div className='w-full h-full p-10 px-8 flex flex-col items-start justify-start overflow-y-scroll'>
                    <button onClick={()=>setViewDetailsMobile(false)} className='ml-auto duration-300 h-8 w-8 hover:text-secondary'><X className='w-full h-full'/></button>
                      <h2 className="font-primary text-primary text-sm uppercase">{tent.header}</h2>
                      <h1 className="font-primary text-tertiary text-xl uppercase flex flex-row"><TentIcon/>{tent.title}</h1>
                      <div className="flex flex-row gap-x-4 mt-1">
                        <div className="w-auto h-auto flex flex-row gap-x-2">
                          <UserIcon className="h-4 w-4 text-primary"/>
                          <span className="text-primary text-sm">{tent.qtypeople} {t('adults')}</span>
                        </div>
                        <div className="w-auto h-auto flex flex-row gap-x-2">
                          <ToyBrick className="h-4 w-4 text-primary"/>
                          <span className="text-primary text-sm">{tent.qtykids} {t('kids')}</span>
                        </div>
                      </div>
                      <label className="text-primary text-sm mt-4">{t("Description")}</label>
                      <p className="font-primary text-secondary text-xs my-2">{tent.description}</p>
                      <label className="text-primary text-sm">{t("Services")}</label>
                      <div className="flex flex-row flex-wrap items-start justify-start w-full h-auto gap-x-4  mt-2">
                        {Object.entries(tent.services).map(([service, value]) => {
                            if (value) {

                              return <ServiceItem size="sm" key={service} icon={service} color="text-primary" />;
                            }
                            return null;
                          })}
                      </div>
                      <label className="text-primary text-sm mt-4">{t("Gallery")}</label>
                      <div className='w-full h-auto mt-2'>
                        <div className="grid grid-cols-2 gap-2">
                          {tent.images.map((image, index) => (
                            <div key={index} className="w-full h-auto">
                              <img src={`${import.meta.env.VITE_BACKEND_URL}/${image}`} alt={`tent-image-${index}`} className="w-full h-[300px] object-cover rounded-xl shadow-sm" />
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>
                </div>
              </div>

            )

            }
            })
          } 
      </>

      }


      <div className='absolute bottom-24 sm:left-12 w-full sm:w-[70%] flex flex-row'>
        <SearchDatesBar section="booking"/>
      </div>

      <div className='absolute right-6 sm:right-12 bottom-6 lg:bottom-4 2xl:bottom-12 z-[60]'>
        <Button 
          onClick={()=>goToRoute("/extras")}
              variant="default" effect="default" size="lg"  
              className="group text-xs sm:text-lg h-8 sm:h-10"
              rightIcon={<ChevronRightIcon className="w-4 sm:w-6 h-4 sm:h-6 ml-2 duration-300"/>}
              disabled={totalItems == 0}>
              {t('Continue')}
        </Button>
      </div>
    </div>
  );
};

export default Booking;

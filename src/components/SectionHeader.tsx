import { CreditCard, FlameKindling, Tent} from "lucide-react";
import {useTranslation} from "react-i18next";

interface propSectionHeader {
  identifier:string;
}

const SectionHeader = (props:propSectionHeader) => {
  const { identifier } = props;
  const {t} = useTranslation();

  return(
    <div
      className="absolute inset-x-0 top-10 mx-auto w-[400px] h-auto z-100 flex flex-row justify-around items-center">
      <div className="absolute w-full h-1 top-[25px] -translate-y-1/2 bg-slate-200 rounded-full z-10 duration-300 transition-all">
        <div className={`${identifier == "glampings" ? "w-1/3": ( identifier == "extras" ? "w-2/3" : "w-full" ) } h-full bg-secondary duration-300 transition-all`}></div>
      </div>

      <div className="w-1/3 h-auto flex flex-col items-center justify-start z-20">
        <div className={`w-[50px] h-[50px] bg-white border-4 border-secondary rounded-full flex items-center justify-center text-2xl text-primary
          `}><Tent/></div>
        <label className={`text-xs ${identifier == "glampings" ? "text-white": "text-primary" }`}>Glampings</label>
      </div>
      <div className="w-1/3 h-auto flex flex-col items-center justify-start z-20">
        <div className={`${identifier == "extras" || identifier == "payment" ? "border-secondary bg-white text-primary" : "border-slate-300 text-slate-300 bg-white" } w-[50px] h-[50px]  border-4 rounded-full flex items-center justify-center text-2xl`}
        ><FlameKindling/></div>
        <label className={`text-xs ${identifier == "glampings" ? "text-white": "text-primary" }`}>Extras</label>
      </div>
      <div className="w-1/3 h-auto flex flex-col items-center justify-start z-20">
        <div className={`${identifier == "payment" ? "border-secondary bg-white text-primary" : "border-slate-300 text-slate-300 bg-white" } w-[50px] h-[50px]  border-4 rounded-full flex items-center justify-center text-2xl`}
        ><CreditCard/></div>
        <label className={`text-xs ${identifier == "glampings" ? "text-white": "text-primary" }`}>{t("Reserve")}</label>
      </div>
    </div>
  )

}

export default SectionHeader;

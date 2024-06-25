import Button from "../components/ui/Button";
import { LUNAHUANA, LOGO_PRIMARY } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ValidateAccount = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{backgroundImage: `url(${LUNAHUANA})`}}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[300px] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}}>
          <img onClick={()=>goToRoute("/")} src={LOGO_PRIMARY} alt="logo" className="w-auto h-20 cursor-pointer hover:scale-105"/>
          <p className="text-secondary text-md my-6 text-center">{t("Your email has been validated")}</p>

          <Button className="mb-4" isRound={true} onClick={()=>goToRoute("/signin")}>{t("Sign In")}</Button>
        </div>
      </div>
    </div>
  );
};

export default ValidateAccount;

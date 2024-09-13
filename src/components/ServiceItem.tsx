import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';

const serviceIconMap: Record<string, keyof typeof LucideIcons> = {
  wifi: 'Wifi',
  parking: 'Car',
  pool: 'Waves',
  breakfast: 'Croissant',
  lunch: 'Sandwich',
  dinner: 'Utensils',
  spa: 'Sparkles',
  bar: 'Martini',
  hotwater: 'Bath',
  airconditioning: 'AirVent',
  grill: 'Beef',
};

const serviceLabelMap: Record<string, string> = {
  wifi: 'glampings.wi_fi',
  parking: 'glampings.parking',
  pool: 'glampings.pool',
  breakfast: 'glampings.breakfast',
  lunch: 'glampings.lunch',
  dinner: 'glampings.dinner',
  spa: 'glampings.spa',
  bar: 'glampings.bar',
  hotwater: 'glampings.hotwater',
  airconditioning: 'glampings.air_conditioner',
  grill: 'glampings.grill',
};

interface ServiceItemProps {
  icon: string;
  size?:string;
  color?:string;
}

const ServiceItem = ({icon,size,color}:ServiceItemProps) => {
  const { t } = useTranslation();

  const iconName = serviceIconMap[icon];
  const label = t(serviceLabelMap[icon]);
  // @ts-ignore: Ignore TypeScript checking for IconComponent
  const IconComponent = LucideIcons[iconName];

  return(
    <li className= {`${size == "sm" ? 'text-[12px] gap-x-1' : 'text-[10px] sm:text-[14px] 2xl:text-lg gap-x-2' } ${color ?? "text-white"} font-secondary flex flex-row ` }>
      {/* @ts-ignore: Ignore TypeScript checking for IconComponent */}
      <IconComponent className={`${size == "sm" ? 'h-5 h-5' : 'w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6' } ${color ?? "text-white"}` } />
      {label}
    </li>
  )
}

export default ServiceItem;

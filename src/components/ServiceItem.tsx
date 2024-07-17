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

interface ServiceItemProps {
  icon: string;
}

const ServiceItem = ({icon}:ServiceItemProps) => {
  const { t } = useTranslation();

  const iconName = serviceIconMap[icon];
  const label = t(icon.charAt(0).toUpperCase() + icon.slice(1));
  // @ts-ignore: Ignore TypeScript checking for IconComponent
  const IconComponent = LucideIcons[iconName];

  return(
    <li className="text-white text-[10px] sm:text-[14px] 2xl:text-lg font-secondary flex flex-row gap-x-2">
      {/* @ts-ignore: Ignore TypeScript checking for IconComponent */}
      <IconComponent className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
      {label}
    </li>
  )
}

export default ServiceItem;

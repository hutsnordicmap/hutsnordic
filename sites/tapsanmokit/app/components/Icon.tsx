import {
  Bath,
  BedDouble,
  Bird,
  Car,
  Check,
  Fish,
  Flame,
  Footprints,
  House,
  Landmark,
  Monitor,
  Plane,
  Presentation,
  Sailboat,
  Shirt,
  Snowflake,
  Sun,
  Users,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  bath: Bath,
  bed: BedDouble,
  bird: Bird,
  car: Car,
  check: Check,
  fish: Fish,
  flame: Flame,
  footprints: Footprints,
  home: House,
  landmark: Landmark,
  monitor: Monitor,
  plane: Plane,
  presentation: Presentation,
  sailboat: Sailboat,
  shirt: Shirt,
  snowflake: Snowflake,
  sun: Sun,
  users: Users,
  utensils: UtensilsCrossed,
  waves: Waves,
};

export function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const C = icons[name] ?? Check;
  return <C className={className} strokeWidth={1.6} aria-hidden />;
}

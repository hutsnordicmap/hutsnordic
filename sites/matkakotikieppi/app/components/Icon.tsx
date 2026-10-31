import {
  BedDouble,
  BookOpen,
  Briefcase,
  Calendar,
  Car,
  Check,
  Coffee,
  CookingPot,
  Flame,
  Footprints,
  Landmark,
  Library,
  Lock,
  Music,
  PawPrint,
  ShowerHead,
  Snowflake,
  Users,
  UtensilsCrossed,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  bed: BedDouble,
  book: BookOpen,
  briefcase: Briefcase,
  calendar: Calendar,
  car: Car,
  check: Check,
  coffee: Coffee,
  kitchen: CookingPot,
  flame: Flame,
  footprints: Footprints,
  landmark: Landmark,
  library: Library,
  lock: Lock,
  music: Music,
  paw: PawPrint,
  shower: ShowerHead,
  snow: Snowflake,
  users: Users,
  utensils: UtensilsCrossed,
  waves: Waves,
  wifi: Wifi,
};

export function Glyph({ name, className = "size-5" }: { name: string; className?: string }) {
  const G = icons[name] ?? Check;
  return <G className={`shrink-0 ${className}`} strokeWidth={1.6} aria-hidden />;
}

/** Content strings are written as "icon|text"; this splits them and draws the icon. */
export function IconText({ value, className = "" }: { value: string; className?: string }) {
  const [name, text] = value.includes("|") ? value.split("|") : ["check", value];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Glyph name={name} />
      <span>{text}</span>
    </span>
  );
}

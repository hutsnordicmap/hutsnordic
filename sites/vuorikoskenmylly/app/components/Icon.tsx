import {
  Calendar,
  ChefHat,
  Cookie,
  CupSoda,
  Dog,
  Euro,
  Flame,
  Frame,
  HandHeart,
  Lamp,
  Percent,
  Shirt,
  Sun,
  UtensilsCrossed,
  Users,
  Wheat,
  ZapOff,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  wheat: Wheat,
  dog: Dog,
  cup: CupSoda,
  chef: ChefHat,
  lamp: Lamp,
  shirt: Shirt,
  jar: Cookie,
  hand: HandHeart,
  frame: Frame,
  calendar: Calendar,
  euro: Euro,
  percent: Percent,
  table: UtensilsCrossed,
  sun: Sun,
  users: Users,
  bolt: ZapOff,
  flame: Flame,
};

/** Content strings are written as "icon|text"; this splits them and draws the icon. */
export function IconText({ value, className = "" }: { value: string; className?: string }) {
  const [name, text] = value.includes("|") ? value.split("|") : ["", value];
  const Glyph = icons[name];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {Glyph ? <Glyph className="size-5 shrink-0" strokeWidth={1.5} aria-hidden /> : null}
      <span>{text}</span>
    </span>
  );
}

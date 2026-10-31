import {
  Anchor,
  Bath,
  BedDouble,
  Bike,
  CalendarDays,
  Check,
  Fish,
  Flame,
  Footprints,
  House,
  Phone,
  Sailboat,
  Sparkles,
  Sun,
  Tag,
  TreePine,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  anchor: Anchor,
  bath: Bath,
  bed: BedDouble,
  bike: Bike,
  calendar: CalendarDays,
  check: Check,
  fish: Fish,
  flame: Flame,
  footprints: Footprints,
  home: House,
  phone: Phone,
  sailboat: Sailboat,
  sparkles: Sparkles,
  sun: Sun,
  tag: Tag,
  tree: TreePine,
  users: Users,
  waves: Waves,
};

export function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const C = icons[name] ?? Check;
  return <C className={className} strokeWidth={1.6} aria-hidden />;
}

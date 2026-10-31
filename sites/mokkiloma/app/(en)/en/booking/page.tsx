import { BookingView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "en",
  path: paths.booking.en,
  otherPath: paths.booking.fi,
  title: ui.en.bookingPageTitle,
  description: ui.en.bookingDescription,
  image: shared.hero.lg,
});

export default function Page() {
  return <BookingView locale="en" />;
}

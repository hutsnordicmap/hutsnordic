import { BookingView } from "@/app/components/Views";
import { paths, shared, ui } from "@/app/content";
import { pageMetadata } from "@/app/metadata";

export const metadata = pageMetadata({
  locale: "fi",
  path: paths.booking.fi,
  otherPath: paths.booking.en,
  title: ui.fi.bookingPageTitle,
  description: ui.fi.bookingDescription,
  image: shared.hero.lg,
});

export default function Page() {
  return <BookingView locale="fi" />;
}

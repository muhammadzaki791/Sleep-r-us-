import { Metadata } from "next";
import HomepageContentWrapper from "@/components/homepage-content-wrapper";

export const metadata: Metadata = {
  title: "Sleep R Us - Premium Beds and Mattresses",
  description:
    "Discover premium beds and mattresses for the perfect night's rest",
};

export default function Home() {
  return <HomepageContentWrapper />;
}

import { About } from "@/components/sections/About";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { Categories } from "@/components/sections/Categories";
import { Differentials } from "@/components/sections/Differentials";
import { Featured } from "@/components/sections/Featured";
import { Hero } from "@/components/sections/Hero";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { Location } from "@/components/sections/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Categories />
      <Featured />
      <Differentials />
      <About />
      <InstagramSection />
      <Location />
    </>
  );
}

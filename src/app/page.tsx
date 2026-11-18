import { ArrowRight } from "lucide-react";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Campuses } from "@/components/sections/Campuses";
import { Concierge } from "@/components/sections/Concierge";
import { CourseAreas } from "@/components/sections/CourseAreas";
import { GetStarted } from "@/components/sections/GetStarted";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Methodology } from "@/components/sections/Methodology";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Values } from "@/components/sections/Values";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <CourseAreas />
      <Methodology />
      <Values />
      <Campuses />
      <Concierge />
      <Testimonials />
      <Partners />
      <GetStarted />
      <MobileActionBar>
        <Button href={site.enquireHref} icon={<ArrowRight />}>
          Enquire Now
        </Button>
      </MobileActionBar>
    </>
  );
}

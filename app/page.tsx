import Image from "next/image";

import { CardBody, CardContainer, CardItem } from "./components/ui/3d-card";
import { Spotlight } from "./components/ui/Spotlight";

import { InfiniteMovingCardsDemo } from "./components/InfiniteMovingCardsDemo";

import Navbar from "./components/Navbar";
import { HeroParallaxDemo } from "./components/HeroParallaxDemo";
import { WavyBackgroundDemo } from "./components/WavyBackgroundDemo";
import FiverrSellerWidget from "./components/FiverrSellerWidget";
import { AnimatedTooltipPreview } from "./components/AnimatedToolTipExample";
import { CustomAnimatedTooltip } from "./components/CustomTooltip";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="flex gap-20 items-center justify-center">
        <CustomAnimatedTooltip
          name="Julian Espiloy"
          position="FullStack Web Developer"
          image="/Red Gradient Profile Photo Instagram Post.png"
        />
        <CustomAnimatedTooltip
          name="Marc Garcera"
          position="FrontEnd Web Developer"
          image="/462555367_846979830706439_5789797204698672644_n.png"
        />
      </div>

      <footer className="">
        <InfiniteMovingCardsDemo />
      </footer>
      <HeroParallaxDemo />
    </main>
  );
}

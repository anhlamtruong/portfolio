"use client";
import Image from "next/image";
import Cursor from "@/app/(home)/_components/cursor/cursor";
import Hero from "@/app/(home)/_components/hero/hero_section";
import VideoBackground from "@/app/(home)/_components/video_background";
import LoadingComponent from "@/app/(home)/_components/loading/loading";
import NavigationSidebar from "@/app/(home)/_components/navigation_bar/navigation_bar";

export default function Home() {
  return (
    <div>
      <LoadingComponent />
      <VideoBackground path="videos/space.mp4">
        <Cursor />
        <section className="flex content-between" id="Homepage">
          <Hero />
          <NavigationSidebar />
        </section>
      </VideoBackground>
      {/* <section id="Services">
        <Parallax type="services" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section> */}
    </div>
  );
}

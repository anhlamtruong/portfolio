"use client";
import Image from "next/image";
import Cursor from "@/app/(home)/_components/cursor/cursor";
import Navbar from "@/app/(home)/_components/navigation_bar/navigation_bar";
import Hero from "@/app/(home)/_components/hero/hero_section";
import VideoBackground from "@/app/(home)/_components/video_background";
import LoadingComponent from "@/app/(home)/_components/loading/loading";

export default function Home() {
  return (
    <div>
      <LoadingComponent />
      <VideoBackground path="videos/space.mp4">
        <Cursor />
        <section id="Homepage">
          <Navbar />
          <Hero />
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

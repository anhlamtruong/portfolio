"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-auto h-full -translate-y-59">
      <Image
        width={600}
        height={100}
        placeholder="blur"
        className="w-auto h-auto "
        priority={false}
        blurDataURL="https://image-component.nextjs.gallery/placeholder"
        src="/portfolio/Hero-Image.png"
        alt="hero-picture"
      ></Image>
    </div>
  );
};

export default Hero;

"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export const CustomAnimatedTooltip = ({
  name,
  position,
  image,
}: {
  name: string;
  position: string;
  image?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      <div
        className="group  relative -mr-4"
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => {
          setHoveredIndex(null);
          x.set(0); // Reset the x value to 0
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -right-1/2  z-50 flex translate-x-1/2  flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
          >
            <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent " />
            <div className="relative z-30 text-base font-bold text-white">
              Welcome to my Portfolio!
            </div>
            <div className="text-xs text-white">
              Feel free to explore and learn more about me.
            </div>
          </motion.div>
        </AnimatePresence>
        <CardContainer className="">
          <CardBody>
            <CardItem
              translateZ={100}
              as="button"
              className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
            >
              <Image
                onMouseMove={handleMouseMove}
                src={image ? image : "https://via.placeholder.com/300"}
                alt="Next.js Logo"
                width={300}
                height={300}
                priority
                className="rounded-full object-cover"
              />
            </CardItem>
            <CardItem>
              <div className="details flex flex-col items-center gap-2">
                <h1 className="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-5xl font-bold text-transparent">
                  {name}
                </h1>
                <span className="text-lg font-bold">
                  {position ? position : "No position"}
                </span>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </>
  );
};

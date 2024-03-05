"use client";
import { animate, useMotionValue, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { useMeasure } from "react-use";

export const data = [
  {
    image:
      "https://framerusercontent.com/images/VIqlDWL1UV6azfAV9xBz0MPhw.jpeg?scale-down-to=1024",
    title: "Petrified Forest",
  },
  {
    image:
      "https://framerusercontent.com/images/L1RFqeJ6NviUiTVLT3u2pL6IU.jpeg?scale-down-to=1024",
    title: "Mountain Valley",
  },
  {
    image:
      "https://framerusercontent.com/images/CzfcVySzXAvy0AuiJGpGMtrpus.jpeg?scale-down-to=512",
    title: "Zion",
  },
  {
    image:
      "https://framerusercontent.com/images/I6xwwDpEjzsZzRHm0K43uSBUTFw.jpeg?scale-down-to=1024",
    title: "Saguro",
  },
  {
    image:
      "https://framerusercontent.com/images/xzKVdjf3wAmhNYnOArbE2UDgm8.jpeg?scale-down-to=1024",
    title: "Josha Tree",
  },
  {
    image:
      "https://framerusercontent.com/images/Q44lHbttA8VG6mS9allIhkYAR8Y.jpeg?scale-down-to=1024",
    title: "Cannon Beach",
  },
];
function Page() {
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 16;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 10,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);
  return (
    <div className=" overflow-hidden w-screen p-8  h-screen bg-black text-white">
      <motion.div
        ref={ref}
        style={{ x: xTranslation }}
        className=" absolute left-0 flex gap-8 items-center "
      >
        {[...data, ...data].map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default Page;

const Card = ({ item }) => {
  return (
    <div className="flex   shrink-0 justify-center items-center gap-4 ">
      <Image
        alt={item.title}
        height={64}
        width={64}
        src={item.image}
        className="rounded-xl "
      />
      <span className="text-[3rem] font-bold w-full whitespace-nowrap">
        {item.title}
      </span>
    </div>
  );
};

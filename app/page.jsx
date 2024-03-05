"use client";

import { useWindowSize } from "@react-hook/window-size";
import { useSpring, motion, inView, useInView } from "framer-motion";
import Image from "next/image";
import normalizeWheel from "normalize-wheel";
import { useEffect, useRef, useState } from "react";
import { useRafLoop } from "react-use";
import { data } from "./scroll/page";

const _ = {
  speed: 2,
  threshold: 0.014,
  wheelFactor: 1.8,
  dragFactor: 1.2,
};

export default function Home() {
  const isScrolling = useRef(false);
  const x = useRef(0);

  const speed = useSpring(_.speed, {
    damping: 100,
    stiffness: 1000,
    mass: 1,
  });

  const [currentX, setCurrentX] = useState(0);

  const boxRef = useRef(null);

  const onWheel = (e) => {
    const normalized = normalizeWheel(e);

    setCurrentX(normalized.pixelY * _.wheelFactor);
    console.log("mouse wheel");

    // Reset speed on scroll end
    // window.clearTimeout(isScrolling.current);
    // isScrolling.current = setTimeout(function () {
    //   speed.set(_.speed);
    // }, 30);
  };

  return (
    <main
      className="flex flex-col max-w-screen overflow-x-hidden"
      onWheel={onWheel}
    >
      {Array.from({ length: 2 }).map((item, index) => (
        <div
          className="h-screen text-[6rem] text-white font-thin w-full flex items-center justify-center bg-black"
          key={index}
        >
          Test
        </div>
      ))}
      <motion.div ref={boxRef}>
        <div className="flex gap-4 flex-col">
          <MyMarquee
            x={x}
            currentX={currentX}
            setCurrentX={setCurrentX}
            direction="left"
            speedDetails={{ damping: 100, stiffness: 1000, mass: 1 }}
          />
          <MyMarquee
            x={x}
            direction="left"
            speedDetails={{ damping: 100, stiffness: 600, mass: 2 }}
          />
        </div>
      </motion.div>
      {Array.from({ length: 3 }).map((item, index) => (
        <div
          className="h-screen text-[6rem] text-white font-thin w-full flex items-center justify-center bg-black"
          key={index}
        >
          Test
        </div>
      ))}
    </main>
  );
}

const MyMarquee = ({ x, direction, speedDetails, currentX, setCurrentX }) => {
  const speed = useSpring(_.speed, speedDetails);

  const marquee = useRef(null);

  const slowDown = useRef(false);

  const onDragStart = () => {
    slowDown.current = true;
    marquee.current.classList.add("drag");
    speed.set(0);
  };

  const onDrag = (e, info) => {
    speed.set(_.dragFactor * -info.delta.x);
  };

  const onHover = (e, info) => {
    speed.set(0);
  };

  const onDragEnd = (e) => {
    slowDown.current = false;
    marquee.current.classList.remove("drag");
    currentX = _.speed;
  };

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < _.threshold) return;
    currentX *= 0.66;
    if (currentX < 0) {
      currentX = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }
    speed.set(_.speed + x.current);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div
        className="marquee flex gap-4"
        ref={marquee}
        // onWheel={onWheel}
        onHover={onHover}
        onHoverEnd={onDragEnd}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <MarqueeItem speed={speed}>
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
        <MarqueeItem speed={speed}>
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
      </motion.div>
    </>
  );
};

const MarqueeItem = ({ children, speed }) => {
  const item = useRef(null);
  const rect = useRef({});
  const x = useRef(0);

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;
    const xPercentage = (x.current / rect.current.width) * 100;

    // xPercentage = Math.max(xPercentage, -99);
    // console.log(xPercentage, "this is xPercentage");
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;
    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    rect.current = item.current.getBoundingClientRect();
  }, [width, height]);

  const loop = (e) => {
    // console.log("this is speed got", speed.get());
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div
      draggable={false}
      className="item shrink-0 flex gap-4 items-center  text-white text-[8rem] whitespace-nowrap"
      ref={item}
    >
      {children}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="flex pointer-events-none   shrink-0 justify-center items-center gap-4">
      <Image
        alt={item.title}
        height={64}
        width={64}
        src={item.image}
        className="rounded-xl  "
      />
      <span className="text-[3rem] font-bold w-full whitespace-nowrap">
        {item.title}
      </span>
    </div>
  );
};

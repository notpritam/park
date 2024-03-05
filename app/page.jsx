"use client";

import { useWindowSize } from "@react-hook/window-size";
import { useSpring, motion, inView, useInView } from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useEffect, useRef, useState } from "react";
import { useRafLoop } from "react-use";

const _ = {
  content: "Around the world, around the world.",
  speed: 2,
  threshold: 0.014,
  wheelFactor: 1.8,
  dragFactor: 1.2,
};

export default function Home() {
  const isScrolling = useRef(false);
  const constraintsRef = useRef(null);
  const x = useRef(0);
  const speed = useSpring(_.speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  const boxRef = useRef(null);

  const inView = useInView(boxRef);

  const [speedEnabled, setSpeedEnabled] = useState(false);

  useEffect(() => {
    setSpeedEnabled(inView);
  }, [inView]);

  const onWheel = (e) => {
    if (speedEnabled) {
      const normalized = normalizeWheel(e);
      x.current = normalized.pixelY * _.wheelFactor;

      // console.log(x.current, "this is current speed");

      // Reset speed on scroll end
      window.clearTimeout(isScrolling.current);
      isScrolling.current = setTimeout(function () {
        speed.set(_.speed);
      }, 30);
    }
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
      <motion.div className="main" whileInView={"visible"} ref={boxRef}>
        <MyMarquee x={x} speed={speed} />
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

const MyMarquee = ({ x, speed }) => {
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

  const onDragEnd = (e) => {
    slowDown.current = false;
    marquee.current.classList.remove("drag");
    x.current = _.speed;
  };

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < _.threshold) return;
    x.current *= 0.66;
    console.log("regular x", x.current);
    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }
    speed.set(_.speed + x.current);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div
        className="marquee"
        ref={marquee}
        // onWheel={onWheel}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <MarqueeItem content={_.content} speed={speed} />
      </motion.div>
    </>
  );
};

const MarqueeItem = ({ content, speed }) => {
  const item = useRef(null);
  const rect = useRef({});
  const x = useRef(0);

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;
    const xPercentage = (x.current / rect.current.width) * 100;

    // xPercentage = Math.max(xPercentage, -99);
    console.log(xPercentage, "this is xPercentage");
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;
    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    rect.current = item.current.getBoundingClientRect();
  }, [width, height]);

  const loop = (e) => {
    console.log("this is speed got", speed.get());
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div className="item text-white text-[8rem] whitespace-nowrap" ref={item}>
      {content}
    </div>
  );
};

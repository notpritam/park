"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  PanInfo,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useRafLoop } from "react-use";
import { useWindowSize } from "@react-hook/window-size";

/**
 * @see https://14islands.com/blog/interactive-marquee-with-framer-motion/
 *
 * @see https://codesandbox.io/s/x3r465?file=/src/App.js
 */

type MarqueeItemProps = {
  children: React.ReactNode;
  speed: MotionValue<any>;
};

const MarqueeItem: React.FC<MarqueeItemProps> = (props) => {
  const { children, speed } = props;

  const itemRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useRef(0);
  const [width, height] = useWindowSize();

  const setX = () => {
    if (!itemRef.current || !rectRef.current) {
      return;
    }

    const xPercentage = (x.current / rectRef.current.width) * 100;

    console.log(
      xPercentage,
      x.current,
      rectRef.current.width,
      x.current / rectRef.current.width,
      "this is item details"
    );

    if (xPercentage < -100) {
      x.current = 0;
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width;
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = () => {
    //Substracts the current x from the speed set by useSpring
    x.current -= speed.get();
    setX();
  };

  const [_, loopStart] = useRafLoop(loop, false);

  useEffect(() => {
    loopStart();
  }, []);

  return (
    <motion.div className="item" ref={itemRef}>
      {children}
    </motion.div>
  );
};

type MarqueeProps = {
  speed?: number;
  threshold?: number;
  wheelFactor?: number;
  dragFactor?: number;
  children: React.ReactNode;
};

export const InteractiveMarquee: React.FC<MarqueeProps> = (props) => {
  const { speed = 1, threshold = 0.014, wheelFactor = 1.8, children } = props;

  const marqueeRef = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const x = useRef(0);
  const [wWidth] = useWindowSize();
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  const opacity = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  );

  const handleOnWheel = (e: React.WheelEvent<HTMLDivElement> | undefined) => {
    const normalized = normalizeWheel(e);

    // This will use the wheel to speed up the timeline
    x.current = normalized.pixelY * wheelFactor;

    console.log(x.current, normalized.pixelY);

    // reset speed on scroll end
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed);
    }, 30);
  };

  const loop = () => {
    /**
     * Do nothing if we're slowing down
     * or
     * Our x is less than the threshold
     *
     * The threshold basically tells how much to speed up
     *
     * Without this stop - x.current will mutiple expodentially
     */
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return;
    }

    /**
     * This portion speeds up the spring until it reaches the `threshold`
     */
    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    //speedSpring sets the speed for the marquee items that gets passed to the item components
    speedSpring.set(speed + x.current);
  };

  useRafLoop(loop);

  return (
    <>
      {/* <motion.div className="bg" style={{ opacity }} ref={constraintsRef} /> */}
      <motion.div className="marquee" ref={marqueeRef} onWheel={handleOnWheel}>
        <MarqueeItem speed={speedSpring}>{children}</MarqueeItem>
        <MarqueeItem speed={speedSpring}>{children}</MarqueeItem>
      </motion.div>
    </>
  );
};

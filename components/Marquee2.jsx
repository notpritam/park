"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Marquee2 = ({ children, speed }) => {
  const containerRef = useRef(null);
  const animationControls = useAnimation();
  const [scrollSpeed, setScrollSpeed] = useState(speed);

  // Scroll speed detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollDelta = window.scrollY;
      setScrollSpeed(scrollDelta);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate animation duration based on scroll speed
  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const animationDuration =
      ((containerWidth + children.length * 10) / scrollSpeed) * 1000; // Adjust the multiplier for desired scrolling speed
    animationControls.start({
      x: -containerWidth,
      transition: {
        duration: animationDuration,
        ease: "linear",
        loop: Infinity,
      },
    });
  }, [scrollSpeed]);

  return (
    <div
      ref={containerRef}
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
    >
      <motion.div
        animate={animationControls}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee2;

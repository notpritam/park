"use client";
import React from "react";
// 1. Importing framer-motion
import { motion } from "framer-motion";

// 2. Defining Variants
const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 5,
        ease: "linear",
      },
    },
  },
};

const Marquee = () => {
  return (
    <div>
      <div className="marquee">
        {/* 3. Using framer motion */}
        <motion.div
          className="track"
          variants={marqueeVariants}
          animate="animate"
        >
          <h1>
            {`Let's Work Together. Let's Work Together. Let's Work Together. Let's
            Work Together. Let's Work Together. Let's Work Together. Let's Work
            Together`}
          </h1>
          <h1>
            {`Let's Work Together. Let's Work Together. Let's Work Together. Let's
            Work Together. Let's Work Together. Let's Work Together. Let's Work
            Together`}
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;

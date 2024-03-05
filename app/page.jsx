"use client";

import normalizeWheel from "normalize-wheel";
import { useRef } from "react";

const _ = {
  content: "Around the world, around the world.",
  speed: 2,
  threshold: 0.014,
  wheelFactor: 1.8,
  dragFactor: 1.2,
};

export default function Home() {
  return (
    <main className="flex flex-col max-w-screen">
      {Array.from({ length: 5 }).map((item, index) => (
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

const MyMarquee = () => {
  const marquee = useRef(null);
  const isScrolling = useRef(false);
  const constraintsRef = useRef(null);
  const x = useRef(0);

  const onWheel = (e) => {
    const normalized = normalizeWheel(e);
    x.current = normalized.pixelY * _.wheelFactor;

    // Reset speed on scroll end
    window.clearTimeout(isScrolling.current);
    isScrolling.current = setTimeout(function () {
      speed.set(_.speed);
    }, 30);
  };

  return (
    <>
      <div className="marquee" ref={marquee}></div>
    </>
  );
};

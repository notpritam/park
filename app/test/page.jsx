/* eslint-disable @next/next/no-img-element */
"use client";

import { useWindowSize } from "@react-hook/window-size";
import { useSpring, motion } from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useEffect, useRef } from "react";
import { useRafLoop } from "react-use";

const _ = {
  speed: 1,
  threshold: 0.014,
  wheelFactor: 1.25,
  dragFactor: 1.2,
};

const data = [
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
      "https://framerusercontent.com/images/Q44lHbttA8VG6mS9allIhkYAR8Y.jpeg?scale-down-to=1024",
    title: "Cannon Beach",
  },
  {
    image:
      "https://framerusercontent.com/images/3LKCYdYAgamssbz1JJSOnu8vM.jpg?scale-down-to=1024",
    title: "Redwood",
  },
  {
    image:
      "https://framerusercontent.com/images/NcLJHjVnMgsxeBqzuinazFIEXoc.jpg?scale-down-to=1024",
    title: "Brookings",
  },
];

const data3 = [
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
  {
    image:
      "https://framerusercontent.com/images/q7JcwecvpKTVhzSu8X3xeEJUmM.jpg?scale-down-to=1024",
    title: "Grand Teton",
  },
];

const data2 = [
  {
    image:
      "https://framerusercontent.com/images/hTsiS6tZ2GARqbwWY5dIUHGtcU.jpeg?scale-down-to=1024",
    title: "Yosemite",
  },
  {
    image:
      "https://framerusercontent.com/images/gLC4I3K6WZDH2d8LImM944p2oVw.jpeg?scale-down-to=1024",
    title: "Catalina",
  },
  {
    image:
      "https://framerusercontent.com/images/fJDYXXbxmLW7qi3QCMfWXJRvPc.jpeg?scale-down-to=1024",
    title: "Great Sand Dunes",
  },
  {
    image:
      "https://framerusercontent.com/images/xzKVdjf3wAmhNYnOArbE2UDgm8.jpeg?scale-down-to=1024",
    title: "Sedona",
  },
  {
    image:
      "https://framerusercontent.com/images/NSExEw4QIpuVtifFprhP3QxjY.jpeg?scale-down-to=1024",
    title: "Morro Bay",
  },
];

const data4 = [
  {
    image: "https://www.touropia.com/gfx/b/2020/09/badlands.jpg",
    title: "Badlands",
  },
  {
    image: "https://www.touropia.com/gfx/b/2020/09/niagara_falls.jpg",
    title: "Niagara Falls",
  },
  {
    image: "https://www.touropia.com/gfx/b/2020/09/big_sur.jpg",
    title: "Big Sur",
  },
  {
    image: "https://www.touropia.com/gfx/b/2020/09/florida_keys.jpg",
    title: "Florida Keys",
  },
  {
    image: "https://www.touropia.com/gfx/b/2020/09/manhattan.jpg",
    title: "Manhattan",
  },
];

export default function Home() {
  const x = useRef(0);
  const x2 = useRef(0);
  const x3 = useRef(0);
  const x4 = useRef(0);

  const onWheel = (e) => {
    const normalized = normalizeWheel(e);
    x.current = normalized.pixelY * _.wheelFactor;
    x2.current = normalized.pixelY * _.wheelFactor;
    x3.current = normalized.pixelY * _.wheelFactor;
    x4.current = normalized.pixelY * _.wheelFactor;
  };

  return (
    <main
      className="flex flex-col max-w-screen overflow-x-hidden items-center text-center"
      onWheel={onWheel}
    >
      {Array.from({ length: 1 }).map((item, index) => (
        <div
          className="h-screen text-[5rem] text-white font-thin w-full flex items-center justify-center bg-black"
          key={index}
        >
          Insert Beautiful Hero Section Here
        </div>
      ))}
      <div className="flex items-center justify-center flex-col gap-4 mt-[8rem] text-[4rem] max-w-[500px] font-semibold ">
        <span className="text-[64px] text-white font-cavet">
          Featured journeys
        </span>
        <span className="text-[18px] text-[#808080] font-light">
          Each photo unveils part of a journey through America, capturing
          moments from serene beaches at dawn to the vibrant twilight over the
          Pacific.
        </span>
      </div>

      <div className="mt-[10rem] flex flex-col gap-[30px]">
        <MarqueeContainer
          x={x}
          direction={"left"}
          springDetails={{ damping: 200, stiffness: 1000, mass: 1 }}
          cardData={data}
        />
        <MarqueeContainer
          x={x2}
          direction={"right"}
          springDetails={{ damping: 200, stiffness: 1000, mass: 1 }}
          cardData={data2}
        />
        <MarqueeContainer
          x={x3}
          direction={"left"}
          springDetails={{ damping: 200, stiffness: 1000, mass: 1 }}
          cardData={data3}
        />
        <MarqueeContainer
          x={x4}
          direction={"right"}
          springDetails={{ damping: 200, stiffness: 1000, mass: 1 }}
          cardData={data4}
        />
      </div>

      {Array.from({ length: 2 }).map((item, index) => (
        <div
          className="h-screen text-[6rem] text-white font-thin w-full flex items-center justify-center bg-black"
          key={index}
        >
          Another Section
        </div>
      ))}
    </main>
  );
}

const MarqueeContainer = ({ x, direction, springDetails, cardData }) => {
  var initialValue = _.speed;
  if (direction === "right") {
    initialValue *= -1;
  }

  const speed = useSpring(initialValue, springDetails);

  const loop = () => {
    if (Math.abs(x.current) < _.threshold) return; // to preserver a minimum speed

    x.current *= 0.66; // so we gradiuallly decrease the speed to a threshold other wise it will infinitley speed

    if (direction === "right") {
      speed.set((_.speed + x.current) * -1);
    } else {
      speed.set(_.speed + x.current);
    }
  };

  useRafLoop(loop, true);
  return (
    <motion.div className="flex gap-[30px]">
      <MarqueeItem speed={speed}>
        {cardData.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </MarqueeItem>
      <MarqueeItem speed={speed}>
        {cardData.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </MarqueeItem>
      <MarqueeItem speed={speed}>
        {cardData.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </MarqueeItem>
      <MarqueeItem speed={speed}>
        {cardData.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </MarqueeItem>
    </motion.div>
  );
};

const MarqueeItem = ({ children, speed }) => {
  const item = useRef(null);
  const rect = useRef({});
  const x = useRef(0);

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;

    var xPercentage = (x.current / rect.current.width) * 100;
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;

    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    rect.current = item.current.getBoundingClientRect();
  }, [width, height]);

  const loop = (e) => {
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  return (
    <div
      draggable={false}
      className="item shrink-0 flex gap-[40px] items-center  text-white  whitespace-nowrap"
      ref={item}
    >
      {children}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <div className="flex pointer-events-none   shrink-0 justify-center items-center gap-[30px]">
      <div className="max-h-[104px] rounded-xl relative max-w-[104px] overflow-clip ">
        <img
          alt={item.title}
          src={item.image}
          className="  h-full w-full min-h-[104px] min-w-[104px] object-cover object-center"
        />
      </div>
      <span className="text-[3rem] font-medium w-full whitespace-nowrap">
        {item.title}
      </span>
    </div>
  );
};

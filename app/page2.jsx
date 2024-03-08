/* eslint-disable @next/next/no-img-element */
"use client";

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

export default function Home() {
  return (
    <main className="flex flex-col max-w-screen overflow-x-hidden items-center text-center">
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

const MyMarquee = ({ x, direction, speedDetails, cardData }) => {
  var initialValue = _.speed;

  if (direction === "right") {
    initialValue *= -1;
  }

  const speed = useSpring(initialValue, speedDetails);

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
    if (slowDown.current || Math.abs(x.current) < _.threshold) return; // to preserver a minimum speed

    x.current *= 0.66; // so we gradiuallly decrease the speed to a threshold other wise it will infinitley speed

    if (direction === "right") {
      speed.set((_.speed + x.current) * -1);
    } else {
      speed.set(_.speed + x.current);
    }
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div
        className="marquee flex gap-[30px]"
        ref={marquee}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        <MarqueeItem speed={speed}>
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
        <MarqueeItem speed={speed}>
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
        <MarqueeItem speed={speed}>
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>{" "}
        <MarqueeItem speed={speed}>
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
      </motion.div>
    </>
  );
};

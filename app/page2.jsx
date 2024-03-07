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

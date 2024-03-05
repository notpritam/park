// "use client";
// import { animate, useMotionValue, motion } from "framer-motion";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import { useMeasure } from "react-use";

// function Page() {
//   let [ref, { width }] = useMeasure();

//   const xTranslation = useMotionValue(0);

//   useEffect(() => {
//     let controls;
//     let finalPosition = -width / 2 - 16;

//     controls = animate(xTranslation, [0, finalPosition], {
//       ease: "linear",
//       duration: 10,
//       repeat: Infinity,
//       repeatType: "loop",
//       repeatDelay: 0,
//     });

//     return controls.stop;
//   }, [xTranslation, width]);
//   return (
//     <div className=" overflow-hidden w-screen p-8  h-screen bg-black text-white">
//       <motion.div
//         ref={ref}
//         style={{ x: xTranslation }}
//         className=" absolute left-0 flex gap-8 items-center "
//       >
//         {[...data, ...data].map((item, index) => (
//           <Card key={index} item={item} />
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default Page;

// const Card = ({ item }) => {
//   return (
//     <div className="flex   shrink-0 justify-center items-center gap-4 ">
//       <Image
//         alt={item.title}
//         height={64}
//         width={64}
//         src={item.image}
//         className="rounded-xl "
//       />
//       <span className="text-[3rem] font-bold w-full whitespace-nowrap">
//         {item.title}
//       </span>
//     </div>
//   );
// };

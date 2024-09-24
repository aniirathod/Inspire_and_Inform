import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Progress from "./Progress";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          setLoading(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 25);
  }, [loading]);
  return (
    <div className="container relative ">
      {/* First page blackish */}
      <motion.div
        className="absolute z-50 flex flex-col items-center justify-center w-screen min-h-screen bg-blackish lg:flex-row "
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 1.5,
          type: "spring",
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Progress classname=" right-72">{`${progress} % `}</Progress>
        <Progress classname=" left-72">{`${progress} % `}</Progress>
      </motion.div>

      {/* second page white */}
      <motion.div
        className="absolute top-0 flex items-center justify-center w-screen min-h-screen bg-white "
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      ></motion.div>
    </div>
  );
};

export default Loading;

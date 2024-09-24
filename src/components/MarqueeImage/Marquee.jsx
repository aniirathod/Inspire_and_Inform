import { motion } from "framer-motion";
import React from "react";

const Marquee = ({ classname = "", children, duration }) => {
  return (
    <>
      <div className={`whitespace-nowrap flex   ${classname} `}>
        <motion.div
          className="flex w-full "
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration,
          }}
        >
          {children}
        </motion.div>
        <motion.div
          className="flex w-full "
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration,
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default Marquee;

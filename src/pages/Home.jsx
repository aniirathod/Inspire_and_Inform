import React, { useState, useEffect, useRef } from "react";
import { HeroSection } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AllPosts } from "./index";
import { motion, useInView } from "framer-motion";

const Home = () => {
  let status = useSelector((state) => state.auth.status);
  let exploreRef = useRef(null);
  let btnRef = useRef(null);

  let isInViewExplore = useInView(exploreRef, {
    amount: 1,
  });

  let isInViewBtn = useInView(btnRef, { amount: 1 });
  let varient = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  };
  return (
    <div>
      <HeroSection />
      <div className="w-full py-16 lg:py-14">
        <div>
          <div
            className="flex justify-center w-full overflow-hidden text-3xl tracking-wide xs:text-4xl lg:text-5xl lg:mt-6 "
            ref={exploreRef}
          >
            <motion.div
              variants={varient}
              initial="initial"
              animate={isInViewExplore ? "animate" : ""}
            >
              Explore Inspiration
            </motion.div>
          </div>
          <div className="-mt-16 overflow-hidden">
            <div>
              <AllPosts />
            </div>
          </div>

          <div className="flex justify-center w-full mt-24 " ref={btnRef}>
            <motion.div
              variants={varient}
              initial="initial"
              animate={isInViewBtn ? "animate" : ""}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={isInViewBtn ? { y: [0, -10, 0] } : ""}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Link
                  to={status ? "/all-posts" : "/login"}
                  className="text-lg bg-[#0D0D23] text-white p-4 rounded-full"
                >
                  {" "}
                  {status ? "Explore More" : "Login to Explore"}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignOutBtn from "./SignOutBtn";

const SlidingWindow = ({ isOpen, setIsOpen, navLinks }) => {
  const navigate = useNavigate();
  let authStatus = useSelector((state) => state.auth.status);

  const slidingVariant = {
    initial: {
      y: "-100%",
    },
    animate: {
      y: isOpen ? "0%" : "-100%",
      transition: {
        type: "spring",
        duration: 1,
        damping: 25,
      },
    },
    exit: {
      y: "-115%",
      transition: {
        type: "spring",
        damping: 30,
        duration: 1,
      },
    },
  };

  const pageVariant = {
    initial: {
      y: "-100%",
    },
    animate: {
      y: isOpen ? "0%" : "-100%",
      transition: {
        type: "spring",
        duration: 1,
        damping: 25,
      },
    },
    exit: {
      y: "-115%",
      transition: {
        type: "spring",
        duration: 1,
        damping: 30,
      },
    },
  };

  return (
    <div className="relative ">
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 z-30 w-full h-full text-white bg-black "
          variants={slidingVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="p-4">
            <div className="mt-44">
              <ul>
                {navLinks.map((links) =>
                  links.active ? (
                    <li
                      key={links.name}
                      className="mb-5 text-5xl font-semibold tracking-tighter text-white/90"
                    >
                      <div
                        onClick={() => {
                          navigate(links.slug);
                          setIsOpen(false);
                        }}
                      >
                        {links.name}
                      </div>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li className="mb-5 text-5xl font-semibold tracking-tighter text-white/90">
                    <SignOutBtn />
                  </li>
                )}
              </ul>
              <ul className="mt-16">
                {["Linkdin", "Github", "Email"].map((socialLinks) => (
                  <li
                    key={socialLinks}
                    className="mb-2 text-3xl font-medium tracking-tighter text-white/90"
                  >
                    {socialLinks}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      <motion.div
        className="fixed right-0 z-20 w-full h-full bg-white top-24"
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit="exit"
      ></motion.div>
    </div>
  );
};

export default SlidingWindow;

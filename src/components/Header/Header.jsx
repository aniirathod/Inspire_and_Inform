import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOutBtn from "./SignOutBtn";
import { SlidingWindow } from "../index";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  let authStatus = useSelector((state) => state.auth.status);
  let userData = useSelector((state) => state.auth.userData);

  let navigate = useNavigate();

  //slide window open
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const container = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
  };

  let navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <motion.div className="w-11/12 m-auto text-white">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="fixed z-50 flex items-center justify-between w-11/12 pt-8 overflow-hidden mix-blend-difference "
      >
        {/* show username on phones on left side */}
        <div
          className={`${
            authStatus ? "lg:hidden w-1/3 font-semibold text-base" : "hidden"
          }`}
        >
          {authStatus ? <div>{userData.name}</div> : ""}
        </div>

        <motion.div variants={item} className="">
          <Link
            to="/"
            className="z-30 flex flex-col w-1/3 text-lg font-semibold tracking-wide lg:flex-row lg:gap-2 lg:text-2xl leading-6"
          >
            <div>Inspire</div>
            <div>Inform</div>
          </Link>
        </motion.div>

        {/* Right */}
        {/* menu icon for phones */}
        <motion.div
          variants={item}
          className="flex flex-col items-end justify-end w-1/3 gap-2 lg:hidden h-9"
          onClick={handleToggle}
        >
          <div
            className={`block h-1 bg-white transform transition-all duration-500 ease-in-out rounded-full ${
              isOpen ? "w-1/5 " : "w-1/4"
            } `}
          ></div>
          <div
            className={`block h-1 bg-white transform transition-all duration-500 ease-in-out rounded-full ${
              isOpen ? "w-1/4  " : "w-1/5"
            }`}
          ></div>
          <div
            className={`block h-1 bg-white transform transition-all duration-500 ease-in-out rounded-full ${
              isOpen ? "w-1/5 " : "w-1/4"
            } `}
          ></div>
        </motion.div>
        {/* menu content for big screens */}
        <div className="justify-end hidden text-base font-semibold tracking-tight h-7 lg:flex">
          <ul className="flex gap-14 overflow-hidden list-none ">
            {navLinks.map((links) =>
              links.active ? (
                <motion.div
                  variants={item}
                  key={links.link}
                  className="relative cursor-pointer group"
                >
                  <li>
                    <button onClick={() => navigate(links.slug)}>
                      {links.name}
                    </button>
                  </li>
                </motion.div>
              ) : null
            )}
            {authStatus && (
              <motion.li variants={item}>
                <SignOutBtn />
              </motion.li>
            )}
            {authStatus && (
              <motion.li
                variants={item}
                className="bg-orange-100 px-3 rounded-full text-black "
              >
                {userData.name}
              </motion.li>
            )}
          </ul>
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <SlidingWindow
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navLinks={navLinks}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;

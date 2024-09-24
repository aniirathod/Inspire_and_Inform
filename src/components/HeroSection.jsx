import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Marquee } from "./index";
import { useSelector } from "react-redux";

const HeroSection = () => {
  let status = useSelector((state) => state.auth.status);
  //varients
  const container = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.02,
      },
    },
  };

  const item = {
    initial: {
      opacity: 0,
      y: 100,
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

  // marquee images
  let images = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1672287579272-117257d2da18?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "kurko kurun",
      work: "Artist",
    },
    {
      image:
        "https://images.unsplash.com/photo-1508835277982-1c1b0e205603?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Nivk Kronisk",
      work: "Salesman",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_1280.jpg",
      name: "Jhon sibra",
      work: "Developer",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2022/01/18/15/40/vietnam-6947337_640.jpg",
      name: "Jinayana ",
      work: "Model",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2020/09/05/03/20/singer-5545481_1280.jpg",
      name: "AR Ragnork",
      work: "Singer",
    },
    {
      image:
        "https://media.istockphoto.com/id/1279844456/photo/young-indian-business-woman-entrepreneur-looking-at-camera-in-the-office.jpg?s=612x612&w=0&k=20&c=QuLbOHis00BKOYksMEJhmQulJJmCSrvcIV6StHCivfk=",
      name: "Simran Roy",
      work: "HR Lead",
    },
    {
      image:
        "https://media.istockphoto.com/id/1040308104/photo/mature-handsome-business-man.jpg?s=612x612&w=0&k=20&c=QbyH3XFmLOoy8NESjLQC8PYsm6g3UBL6COFaF-Qnnbk=",
      name: "shojiko tenge",
      work: "Photographer",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2022/09/02/20/03/man-7428290_1280.jpg",
      name: "Abhinav Tyagi",
      work: "Content Creator",
    },
  ];

  return (
    <>
      <motion.div
        className="w-full min-h-screen pt-36 "
        variants={container}
        initial="initial"
        animate="animate"
      >
        <div className=" w-full h-[25vh] xs:h-[29vh] lg:h-[30vh] flex flex-col justify-center items-center relative select-none font-markazi font-medium">
          <div className=" lg:py-2 overflow-hidden text-4xl  xs:text-[2.6rem]  lg:text-8xl lg:tracking-wide ">
            <motion.div variants={item}> Empowering Minds</motion.div>
          </div>
          <div className="flex flex-col lg:py-1 overflow-hidden text-center text-4xl xs:text-[2.5rem] lg:text-6xl lg:tracking-wide lg:flex-row">
            <motion.div variants={item}>Where Knowledge</motion.div>{" "}
            <motion.div variants={item} className="-mt-2 lg:-mt-0 lg:ml-5">
              Meets Inspiration
            </motion.div>
          </div>
        </div>
        <div className="mt-3 overflow-hidden xs:-mt-3 lg:mt-0 h-14 lg:h-7 ">
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center w-full text-lg font-light tracking-tight text-center lg:text-xl lg:tracking-wide lg:font-medium "
          >
            A Community of Learners and Creators, Sharing Knowledge to Inspire
            and Empower Everyone
          </motion.div>
        </div>

        <div className="flex items-center justify-center h-16 mt-12 overflow-hidden text-xs font-semibold tracking-wide lg:h-14">
          <motion.div variants={item}>
            <Link
              to={status ? "/all-posts" : "/login"}
              className="bg-[#0D0D23] text-white p-4 rounded-full"
            >
              {status ? "Explore more" : "Get Started"}
            </Link>
          </motion.div>
        </div>

        {/* marquee image slider */}

        <div className="flex w-full overflow-hidden mt-14 lg:mt16">
          <Marquee duration={"60"}>
            {images.map((imgs, index) => (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{
                  delay: index * 0.01,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                key={index}
                className="pl-8"
              >
                <Card image={imgs.image} name={imgs.name} work={imgs.work} />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;

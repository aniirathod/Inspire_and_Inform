import React, { useEffect, useState, useRef } from "react";
import { PostCard } from "../components";
import databasesService from "../appwrite/database";
import { motion, useInView } from "framer-motion";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse w-80 h-60 ">
    <div className="w-full rounded-xl">
      <div className="w-full mb-1">
        <div className="w-full bg-gray-300 h-52 rounded-3xl"></div>
      </div>
    </div>
    <div className="pl-2">
      <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from the database
    databasesService.getPosts([]).then((res) => {
      if (res) {
        setPosts(res.documents);
        setLoading(false);
      }
    });
  }, []);

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
  const postVarient = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
  };

  const postRef = useRef(null);
  const postView = useInView(postRef);
  return (
    <div className="w-11/12 pt-32 mx-auto ">
      <motion.div
        variants={container}
        initial="initial"
        animate={postView ? "animate" : ""}
        className="flex flex-wrap justify-center w-full gap-9"
        ref={postRef}
      >
        {loading
          ? // Skeleton loader while posts are being fetched

            Array(8)
              .fill(0)
              .map((_, index) => <SkeletonLoader key={index} />)
          : posts.map((post) => (
              <motion.div className="" variants={postVarient}>
                {<PostCard {...post} />}
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
};

export default AllPosts;

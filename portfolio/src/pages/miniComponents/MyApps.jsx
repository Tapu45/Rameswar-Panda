import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://backend-1-986s.onrender.com/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const appCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50,
        damping: 15,
        delay: i * 0.05 
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0.8, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 8 
      }
    }
  };

  return (
    <motion.div 
      className="w-full flex flex-col gap-8 sm:gap-12 bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="relative" variants={titleVariants}>
        <motion.h1 
          className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MY APPS
        </motion.h1>
        <motion.span 
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.span>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={containerVariants}
      >
        {apps &&
          apps.map((element, index) => {
            return (
              <motion.div
                key={element._id}
                custom={index}
                variants={appCardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="h-fit p-7 flex flex-col justify-center items-center gap-3 rounded-lg border border-blue-500/20 
                  bg-gradient-to-b from-slate-800/80 to-blue-900/30 backdrop-blur-sm transition-all duration-300 
                  shadow-lg shadow-blue-500/10 hover:shadow-blue-400/30"
                >
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <motion.img
                      src={element.svg && element.svg.url}
                      alt={element.name}
                      className="h-12 sm:h-24 w-auto"
                      initial={{ filter: "grayscale(80%)" }}
                      whileHover={{ 
                        filter: "grayscale(0%)",
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.div>
                  <motion.p 
                    className="text-blue-200 text-center font-medium"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {element.name}
                  </motion.p>
                </Card>
              </motion.div>
            );
          })}
      </motion.div>

      {apps && apps.length === 0 && (
        <motion.div 
          className="text-center text-blue-300 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading applications...
        </motion.div>
      )}

      <motion.div
        className="w-full flex justify-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div 
          className="px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-full text-sm text-blue-300 border border-blue-500/20"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
        >
          <motion.span 
            animate={{ 
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
          >
            The tools I use daily
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MyApps;
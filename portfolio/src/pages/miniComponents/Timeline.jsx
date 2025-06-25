import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading"; // Import the Loading component

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-1-986s.onrender.com/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timelines);
      } catch (error) {
        // Optionally handle error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    getMyTimeline();
  }, []);

  // Show loading component while loading
  if (loading) return <Loading text="Loading Timeline..." />;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        duration: 0.6 
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: i => ({
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 15,
        delay: i * 0.1 
      },
    }),
  };

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="overflow-x-hidden text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-wide"
        variants={titleVariants}
      >
        Timeline
      </motion.h1>
      
      <motion.ol 
        className="relative border-s-2 border-blue-600/40 ml-3"
        variants={containerVariants}
      >
        {timeline &&
          timeline.map((element, index) => {
            return (
              <motion.li 
                className="mb-10 ms-6" 
                key={element._id}
                custom={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span 
                  className="absolute flex items-center justify-center w-7 h-7 bg-blue-900 rounded-full -start-3.5 ring-8 ring-gray-900/80 shadow-lg shadow-blue-500/20"
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "#3b82f6",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.svg
                    className="w-3 h-3 text-blue-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </motion.svg>
                </motion.span>
                
                <motion.div
                  className="p-4 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-blue-500/10 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                >
                  <motion.h3 
                    className="mb-2 text-xl font-bold text-blue-300 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {element.title}
                  </motion.h3>
                  
                  <motion.time 
                    className="flex items-center mb-3 text-sm font-medium text-blue-400/80 bg-blue-900/30 w-fit px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <motion.span
                      className="inline-block w-2 h-2 mr-2 bg-blue-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    ></motion.span>
                    {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                  </motion.time>
                  
                  <motion.p 
                    className="text-base font-normal text-blue-100/70 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {element.description}
                  </motion.p>
                </motion.div>
              </motion.li>
            );
          })}
      </motion.ol>
    </motion.div>
  );
};

export default Timeline;
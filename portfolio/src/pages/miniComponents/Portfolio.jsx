import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://backend-1-986s.onrender.com/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  const projectVariants = {
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

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="relative mb-12" variants={titleVariants}>
        <motion.h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={titleVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MY{" "}
          <span className="font-extrabold text-blue-400">
            PORTFOLIO
          </span>
        </motion.h1>
        <motion.h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={titleVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MY <span className="font-extrabold text-blue-400">WORK</span>
        </motion.h1>
        <motion.span 
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          variants={lineVariants}
        ></motion.span>
      </motion.div>

    

<motion.div 
  className="grid grid-cols-1 md:grid-cols-3 gap-8"
  variants={containerVariants}
>
  {(viewAll ? projects : projects.slice(0, 9)).map((element, index) => (
    <motion.div
      key={element._id}
      custom={index}
      variants={projectVariants}
      whileHover={{ 
        scale: 1.03,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="flex h-full"
    >
      <Link
        to={`/project/${element._id}`}
        className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-300"
        style={{
          boxShadow: "0 10px 30px -15px rgba(2, 12, 27, 0.7)",
          border: "1px solid rgba(43, 108, 176, 0.1)"
        }}
      >
        {/* Glass effect top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 opacity-80"></div>
        
        {/* Project banner image with frame */}
        <div className="relative p-3 pt-4">
          <motion.div
            className="overflow-hidden rounded-lg relative"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            style={{ 
              boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.1)" 
            }}
          >
            <motion.img
              src={element.projectBanner && element.projectBanner.url}
              alt={element.title}
              className="w-full h-52 object-cover transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-400/40"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-400/40"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-400/40"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-400/40"></div>
          </motion.div>
        </div>
        
        {/* Project title area */}
        <div className="p-3 pt-1 pb-4 flex-grow flex flex-col justify-between">
          <motion.h3 
            className="text-lg font-semibold text-blue-50 mb-2 text-center group-hover:text-blue-300 transition-colors duration-300"
          >
            {element.title}
          </motion.h3>
          
          {/* Tech badge placeholder - would need data from your API */}
          <div className="flex flex-wrap justify-center gap-2 mt-auto">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/20">
              View Project
            </span>
          </div>
        </div>
        
        {/* Hover effects */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.8 }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          <motion.p 
            className="text-white font-bold text-lg tracking-wide text-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {element.title}
          </motion.p>
          <motion.div 
            className="flex items-center justify-center mt-2 space-x-1"
          >
            <motion.span 
              className="h-0.5 w-5 bg-blue-400"
              initial={{ width: 0 }}
              whileHover={{ width: "20px" }}
            ></motion.span>
            <motion.span 
              className="h-0.5 w-0 group-hover:w-10 bg-blue-400 transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "40px" }}
            ></motion.span>
            <motion.span 
              className="h-0.5 w-5 bg-blue-400"
              initial={{ width: 0 }}
              whileHover={{ width: "20px" }}
            ></motion.span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  ))}
</motion.div>



      {projects && projects.length > 9 && (
        <motion.div 
          className="w-full text-center my-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="w-52 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 shadow-lg shadow-blue-700/30 transition-all duration-300"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Show Less" : "Show More"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Portfolio;
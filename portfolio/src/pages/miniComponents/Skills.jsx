import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SkillsSkeleton = () => (
  <motion.div 
    className="w-full flex flex-col gap-8 sm:gap-12 bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="relative">
      <div className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="h-10 w-48 bg-blue-900/40 rounded animate-pulse mb-2"></div>
      </div>
      <div className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"></div>
    </div>
    <div className="flex items-center mb-8">
      <span className="text-blue-300 text-base mr-2">🛠️</span>
      <span className="text-blue-200 text-base font-medium">
        Sharpening pencils for my skills... Please wait!
      </span>
    </div>
    <div className="flex justify-center gap-8 mb-6">
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="w-20 h-20 rounded-full bg-blue-900/30 border-2 border-blue-700/40 flex items-center justify-center shadow-lg animate-pulse" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
      {[...Array(2)].map((_, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {[...Array(4)].map((__, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <div className="h-5 w-32 bg-blue-900/40 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-10 bg-blue-900/40 rounded animate-pulse"></div>
              </div>
              <div className="w-full h-3 bg-blue-900/40 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-900 rounded-full animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="w-full flex justify-center mt-8">
      <div 
        className="px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-full text-sm text-blue-300 border border-blue-500/20 flex items-center gap-2"
      >
        <Sparkles size={14} className="text-blue-400" />
        <span>Loading skills... The suspense is skill-ing us!</span>
      </div>
    </div>
  </motion.div>
);

const marqueeAnimation = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 18,
        ease: "linear"
      }
    }
  }
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://backend-1-986s.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
      setLoading(false);
    };
    getMySkills();
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

  const cardVariants = {
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

  if (loading) return <SkillsSkeleton />;

  // Split skills into two columns
  const leftSkills = skills.filter((_, i) => i % 2 === 0);
  const rightSkills = skills.filter((_, i) => i % 2 === 1);

  // Marquee: duplicate logos for seamless loop
  const allLogos = [...skills, ...skills];

  return (
    <motion.div 
      className="w-full flex flex-col gap-10  p-8 rounded-2xl shadow-xl bg-slate-800/40 text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title */}
      <motion.div className="relative" variants={titleVariants}>
        <motion.h1 
          className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          SKILLS
        </motion.h1>
        <motion.span 
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.span>
      </motion.div>

      {/* Logos Reel Marquee */}
      <div
        className="relative w-full overflow-hidden mb-8"
        style={{ height: "6rem" }}
      >
        <motion.div
          className="flex gap-10 items-center"
          style={{
            width: "max-content",
            minWidth: "100%",
          }}
          {...marqueeAnimation}
        >
          {allLogos.map((tool, idx) => (
            <div
              key={tool._id + idx}
              className="w-20 h-20 rounded-full bg-blue-900/30 border-2 border-blue-700/40 flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <img src={tool.svg?.url} alt={tool.title} className="h-12 w-12" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Two-column Skills Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {[leftSkills, rightSkills].map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {column.map((skill, idx) => (
              <div key={skill._id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-100 font-medium">{skill.title}</span>
                  <span className="text-blue-300 font-mono text-xs">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-3 bg-blue-900/40 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05, type: "spring" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="w-full flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-full text-sm text-blue-300 border border-blue-500/20 flex items-center gap-2"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
        >
          <Sparkles size={14} className="text-blue-400" />
          <span>Continuously improving and adding new skills</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
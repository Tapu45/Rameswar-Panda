import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://personal-portfolio-backend-zuwv.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
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

  // Generate random colors for cards
  const getGradient = (index) => {
    const gradients = [
      "from-blue-900/80 to-sky-900/30", 
      "from-indigo-900/80 to-blue-900/30",
      "from-purple-900/80 to-indigo-900/30",
      "from-slate-800/80 to-blue-900/30",
      "from-slate-900/80 to-indigo-900/30"
    ];
    return gradients[index % gradients.length];
  };

  // Get skill level description
  const getSkillLevel = (index) => {
    const levels = ["Beginner", "Intermediate", "Advanced", "Expert", "Master"];
    return levels[index % levels.length];
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
          SKILLS
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
        {skills &&
          skills.map((element, index) => {
            return (
              <motion.div
                key={element._id}
                custom={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Card
                  className={`h-fit p-6 flex flex-col justify-center items-center gap-4 rounded-lg border border-blue-500/20 
                  bg-gradient-to-b ${getGradient(index)} backdrop-blur-sm transition-all duration-300 
                  shadow-lg shadow-blue-500/10 hover:shadow-blue-400/30 relative overflow-hidden`}
                >
                  {/* Card decoration */}
                  <motion.div 
                    className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
                    animate={{ 
                      scale: hoveredIndex === index ? 1.5 : 1,
                      opacity: hoveredIndex === index ? 0.3 : 0.1
                    }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <motion.div
                    initial={{ rotate: -5 }}
                    whileHover={{ 
                      rotate: 5, 
                      scale: 1.2,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="relative group"
                  >
                    {/* Animated sparkles icon */}
                    {hoveredIndex === index && (
                      <motion.div 
                        className="absolute -top-4 -right-4 text-yellow-300 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1],
                          rotate: [0, 20, 0],
                          opacity: [0, 1, 0.8] 
                        }}
                        transition={{ 
                          duration: 0.7,
                          repeat: 1,
                          repeatType: "reverse" 
                        }}
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    )}
                    
                    <motion.div className="relative p-1 rounded-full">
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20"
                        animate={{ 
                          scale: hoveredIndex === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.img
                        src={element.svg && element.svg.url}
                        alt={element.title}
                        className="h-16 sm:h-24 w-auto relative z-10"
                        initial={{ filter: "grayscale(100%)" }}
                        animate={{ 
                          filter: hoveredIndex === index ? "grayscale(0%)" : "grayscale(80%)",
                          scale: hoveredIndex === index ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div className="text-center flex flex-col gap-1">
                    <motion.p 
                      className="text-blue-200 font-semibold tracking-wide"
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0.8,
                        y: hoveredIndex === index ? -2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {element.title}
                    </motion.p>
                    
                    {/* Skill level indicator that appears on hover */}
                    <motion.div
                      className="flex items-center justify-center gap-1 text-xs"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-blue-400/80">{getSkillLevel(index)}</span>
                      <ArrowRight size={10} className="text-blue-400/60" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Bottom glow effect */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </Card>
              </motion.div>
            );
          })}
      </motion.div>
      
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
import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Mail, Calendar, Languages, Briefcase, User } from "lucide-react";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="w-full flex flex-col overflow-x-hidden p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Heading Section */}
      <motion.div
        className="relative"
        variants={itemVariants}
      >
        <motion.h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={itemVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT <span className="font-extrabold text-blue-400">ME</span>
        </motion.h1>
        <motion.span
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.span>
      </motion.div>

      {/* Backdrop Circle Decorations */}
      <div className="absolute overflow-hidden z-0">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>


      {/* Main Content Section */}
      <motion.div className="flex flex-col gap-8 mt-8" variants={containerVariants}>
        {/* Unified About Container */}
        <motion.div
          className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-blue-500/10 flex-1 flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Professional Summary */}
          <div className="mb-2">
            <p className="text-blue-100/90 leading-relaxed">
              I am a dedicated and goal-oriented BTech Computer Science Engineering student, passionate about learning new technologies and staying updated with industry trends. I focus on continuous self-improvement and exploring innovative solutions to overcome challenges, with a strong drive for excellence and delivering high-quality work.
            </p>
          </div>
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-100/90">
            <div className="flex items-center gap-3">
              <User size={20} className="text-blue-300" />
              <span className="font-medium">Name:</span>
              <span>Rameswar Panda</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-300" />
              <span className="font-medium">DOB:</span>
              <span>25 July 2004</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-blue-300" />
              <span className="font-medium">Email:</span>
              <span>rameswarpanda25@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase size={20} className="text-blue-300" />
              <span className="font-medium">Experience:</span>
              <span>1+ years</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-300" />
              <span className="font-medium">Location:</span>
              <span>Bhubaneswar, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Languages size={20} className="text-blue-300" />
              <span className="font-medium">Languages:</span>
              <span>English, Hindi, Odia, French</span>
            </div>
          </div>
          {/* What I Love */}
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-300">
                <Heart size={20} />
              </span>
              <span className="text-blue-200 font-medium">What I love:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8 text-blue-100/80">
              {[
                "Building intuitive user interfaces",
                "Optimizing application performance",
                "Learning new technologies",
                "Problem-solving and debugging",
                "Creating clean, maintainable code",
                "Collaborating with creative teams"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-cyan-400">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Quote Section */}
          <div
            className="mt-6 bg-blue-900/20 p-5 rounded-lg border border-blue-500/20 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 text-blue-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <div className="relative z-10">
              <p className="text-blue-100 italic">
                "I believe in writing clean, maintainable code that solves real problems and creates meaningful user experiences."
              </p>
              <p className="text-blue-300 text-right mt-2">— My Development Philosophy</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
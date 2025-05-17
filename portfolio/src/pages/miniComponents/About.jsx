import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Mail, 
  MapPin, 
  Globe, 
  Rocket, 
  Award, 
  BookOpen, 
  Heart, 
  Zap,
  User,
  Code
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("personal");

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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 70,
        duration: 0.8 
      },
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
        delay: i * 0.1 
      },
    }),
  };

  // Personal information
  const personalInfo = [
    { icon: <User size={18} />, label: "Name", value: "Rameswar Panda" },
    { icon: <Calendar size={18} />, label: "Birth Date", value: "July 25, 2004" },
    { icon: <Mail size={18} />, label: "Email", value: "rameswarpanda891@gmail.com" },
    { icon: <MapPin size={18} />, label: "Location", value: "Berhampur, India" },
    { icon: <Globe size={18} />, label: "Languages", value: "English, Hindi, Odia" },
    { icon: <Rocket size={18} />, label: "Experience", value: "1+ Years" },
  ];

  // Education info
  const education = [
    {
      degree: "B.Tech in Computer Science",
      institution: "National Institute of Technology",
      year: "2020 - 2024",
      description: "Specialized in advanced algorithms and full-stack development",
    },
    {
      degree: "Higher Secondary Education",
      institution: "CHSE, Odisha",
      year: "2018 - 2020",
      description: "Focused on science and mathematics with programming foundations",
    },
  ];

  // Career objectives
  const objectives = [
    "Contribute to innovative projects that solve real-world problems",
    "Specialize in full-stack development with a focus on modern technologies",
    "Grow as a technical leader while mentoring junior developers",
    "Build accessible and sustainable applications that make a difference",
  ];

  // Key skills with proficiency
  const keySkills = [
    { name: "JavaScript", proficiency: 90 },
    { name: "React", proficiency: 85 },
    { name: "Node.js", proficiency: 80 },
    { name: "TypeScript", proficiency: 75 },
    { name: "MongoDB", proficiency: 85 },
    { name: "Express", proficiency: 80 },
  ];

  return (
    <motion.div 
      className="w-full flex flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
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
      <motion.div className="grid md:grid-cols-5 gap-8 mt-8" variants={containerVariants}>
        {/* Profile Image Section (2/5 width) */}
        <motion.div className="md:col-span-2 flex flex-col gap-6" variants={containerVariants}>
          <motion.div 
            className="relative overflow-hidden rounded-xl shadow-xl shadow-blue-500/20 border border-blue-500/20 h-full"
            variants={imageVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src="/tapu.jpg"
              alt="avatar"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, filter: "blur(10px)" }}
              animate={{ 
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8 }
              }}
            />
            
            {/* Image Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"
            >
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-blue-100">Rameswar Panda</h3>
                <p className="text-blue-200 flex items-center gap-2">
                  <Code size={16} />
                  <span>Fullstack Developer</span>
                </p>
                
                {/* Social Tags */}
                <div className="flex gap-2 mt-2">
                  {["GitHub", "LinkedIn", "Twitter"].map((platform, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {platform}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* About Content Section (3/5 width) */}
        <motion.div className="md:col-span-3 flex flex-col gap-6" variants={containerVariants}>
          {/* Tab Navigation */}
          <motion.div className="flex border-b border-blue-500/20 mb-2">
            {[
              { id: "personal", icon: <User size={16} />, label: "About Me" },
              { id: "education", icon: <BookOpen size={16} />, label: "Education" },
              { id: "objectives", icon: <Rocket size={16} />, label: "Objectives" },
             // { id: "skills", icon: <Zap size={16} />, label: "Skills" }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? "border-blue-500 text-blue-300" 
                    : "border-transparent text-blue-400/60 hover:text-blue-300/80"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Personal Description Tab Content */}
          {activeTab === "personal" && (
            <motion.div 
              className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-blue-500/10 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div className="space-y-4">
                <motion.p className="text-blue-100/90 leading-relaxed">
                  My name is Rameswar Panda, a dedicated and goal-oriented BTech Computer Science Engineering student, passionate about learning new technologies and staying updated with industry trends.
                </motion.p>
                
                <motion.p className="text-blue-100/90 leading-relaxed">
                  I focus on continuous self-improvement and exploring innovative solutions to overcome challenges, whether technical or conceptual. With a strong drive for excellence, I take pride in delivering high-quality work while embracing new opportunities to grow both personally and professionally in the ever-evolving tech landscape.
                </motion.p>
                
                {/* Personal Info Cards */}
                <motion.div className="grid grid-cols-2 gap-4 mt-6">
                  {personalInfo.map((info, index) => (
                    <motion.div 
                      key={index}
                      custom={index}
                      variants={cardVariants}
                      className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 flex flex-col"
                      whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.3)" }}
                    >
                      <div className="flex items-center gap-2 text-blue-400 mb-1 text-sm">
                        {info.icon}
                        <span>{info.label}</span>
                      </div>
                      <div className="text-blue-100 font-medium">{info.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div className="pt-4 flex items-center gap-3">
                  <span className="text-blue-300">
                    <Heart size={20} />
                  </span>
                  <span className="text-blue-200 font-medium">What I love:</span>
                </motion.div>
                
                <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8 text-blue-100/80">
                  {[
                    "Building intuitive user interfaces",
                    "Optimizing application performance",
                    "Learning new technologies",
                    "Problem-solving and debugging",
                    "Creating clean, maintainable code",
                    "Collaborating with creative teams"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <span className="text-cyan-400">•</span> {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          )}
          
          {/* Education Tab Content */}
          {activeTab === "education" && (
            <motion.div 
              className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-blue-500/10 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    className="relative pl-6 border-l-2 border-blue-500/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (index * 0.2) }}
                    />
                    <h3 className="text-xl font-bold text-blue-200">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-blue-300 mt-1">
                      <BookOpen size={16} />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="text-blue-400/70 mt-1 text-sm">{edu.year}</div>
                    <p className="mt-2 text-blue-100/80">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Objectives Tab Content */}
          {activeTab === "objectives" && (
            <motion.div 
              className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-blue-500/10 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-4">
                <p className="text-blue-100/90 leading-relaxed">
                  As a developer, I strive to create meaningful impact through technology. My professional objectives include:
                </p>
                
                <div className="grid gap-4 mt-4">
                  {objectives.map((objective, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-4 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.3)" }}
                    >
                      <div className="p-2 bg-blue-500/20 rounded-full text-blue-300">
                        <Award size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-100">{objective}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Quote Section */}
          <motion.div 
            className="mt-auto bg-blue-900/20 p-5 rounded-lg border border-blue-500/20 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.3)" }}
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
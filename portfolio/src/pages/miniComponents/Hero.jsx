import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Code,
  Server,
  Layout,
  Database,
  Coffee,
  Clock,
  User
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "https://backend-1-986s.onrender.com/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

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

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: i => ({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: i * 0.1,
      },
    }),
  };

  const floatingCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.3 + (i * 0.1),
      }
    }),
    floating: i => ({
      y: [0, i % 2 === 0 ? -8 : -12, 0],
      transition: {
        duration: i % 2 === 0 ? 4 : 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  // Tech stack for the floating cards
  const techStack = [
    { name: "Frontend", icon: <Layout />, color: "from-blue-500 to-cyan-400" },
    { name: "Backend", icon: <Server />, color: "from-purple-500 to-blue-500" },
    { name: "Database", icon: <Database />, color: "from-green-500 to-emerald-400" },
    { name: "Development", icon: <Code />, color: "from-orange-500 to-amber-400" },
  ];

  // Professional stats
  

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left content (2/3 of the space) */}
        <div className="lg:col-span-3">
          <motion.div 
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <motion.span 
              className="bg-emerald-400 rounded-full h-3 w-3"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.span>
            <p className="font-light tracking-wider">Available for work</p>
          </motion.div>

          <motion.h1 
            className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
            variants={itemVariants}
          >
            Hey, I'm Rameswar
          </motion.h1>

          <motion.h1 
            className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] font-black text-blue-300"
            variants={itemVariants}
          >
            <Typewriter
              words={["FULLSTACK DEVELOPER"]}
              loop={50}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </motion.h1>

          <motion.div 
            className="w-fit px-6 py-3 bg-slate-800/60 backdrop-blur-sm rounded-[20px] flex gap-5 items-center mt-6 md:mt-8 lg:mt-10 border border-blue-500/20 shadow-lg shadow-blue-500/10"
            variants={itemVariants}
          >
            {[
              { icon: <Youtube className="text-red-500 w-7 h-7" />, url: user.youtubeUrl },
              { icon: <Instagram className="text-pink-500 w-7 h-7" />, url: user.instagramURL },
              { icon: <Facebook className="text-blue-500 w-7 h-7" />, url: user.facebookURL },
              { icon: <Linkedin className="text-sky-400 w-7 h-7" />, url: user.linkedInURL },
              { icon: <Twitter className="text-blue-400 w-7 h-7" />, url: user.twitterURL }
            ].map((social, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={socialIconVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={social.url} target="_blank">
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-8 flex gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={user.githubURL} target="_blank">
                <Button className="rounded-[30px] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 shadow-lg shadow-blue-700/30">
                  <span>
                    <Github />
                  </span>
                  <span>Github</span>
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={user.resume && user.resume.url} target="_blank">
                <Button className="rounded-[30px] flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-5 shadow-lg shadow-cyan-700/30">
                  <span>
                    <ExternalLink />
                  </span>
                  <span>Resume</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.p 
            className="mt-10 text-xl tracking-[2px] font-light text-blue-100/80 leading-relaxed"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {user.aboutMe}
          </motion.p>
        </div>

        {/* Right content (1/3 of the space) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          {/* Floating Tech Stack Cards */}
          <div className="relative h-[300px] lg:h-[400px]">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={floatingCardVariants}
                initial="hidden"
                animate={["visible", "floating"]}
                className={`absolute ${getPositionClass(index)} w-44 p-4 rounded-xl backdrop-blur-md 
                bg-gradient-to-br ${tech.color} bg-opacity-20 border border-white/10 shadow-xl`}
                style={{ zIndex: 10 - index }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-white">
                    {tech.icon}
                  </div>
                  <span className="font-semibold text-white">{tech.name}</span>
                </div>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <motion.div 
              className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-blue-500/10"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-cyan-500/10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Professional Stats */}
          
        </div>
      </div>

      <motion.hr 
        className="my-10 border-blue-500/30"
        variants={itemVariants}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
};

// Helper function to position the floating cards
const getPositionClass = (index) => {
  const positions = [
    "top-0 right-0",
    "top-1/4 left-4",
    "bottom-1/4 right-8",
    "bottom-0 left-0"
  ];
  return positions[index % positions.length];
};

export default Hero;
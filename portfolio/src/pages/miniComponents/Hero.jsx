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
import ProfileCard from "@/animation/profilecard";

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


  // Tech stack for the floating cards

  // Professional stats


  return (
    <>
      <motion.div
        className="hidden md:block w-full bg-transparent p-8 rounded-2xl shadow-xl text-blue-50"
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
               words={[
    "FULLSTACK DEVELOPER",
    "SOFTWARE DEVELOPER",
    "FRONTEND DEVELOPER",
    "BACKEND DEVELOPER",
    "DEVOPS ENGINEER"
  ]}
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
                // { icon: <Youtube className="text-red-500 w-7 h-7" />, url: user.youtubeUrl },
                //{ icon: <Instagram className="text-pink-500 w-7 h-7" />, url: user.instagramURL },
                // { icon: <Facebook className="text-blue-500 w-7 h-7" />, url: user.facebookURL },
                { icon: <Linkedin className="text-sky-400 w-7 h-7" />, url: "https://www.linkedin.com/in/rameswar-panda-993945275" },
                { icon: <Twitter className="text-blue-400 w-7 h-7" />, url: user.twitterURL },
                {
                  icon: (
                    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                      <g>
                        <path d="M16.1 2.5c-2.2 0-4.3.9-5.9 2.5L3.6 11.6c-3.2 3.2-3.2 8.3 0 11.5l6.6 6.6c3.2 3.2 8.3 3.2 11.5 0l6.6-6.6c3.2-3.2 3.2-8.3 0-11.5l-6.6-6.6C20.4 3.4 18.3 2.5 16.1 2.5zm0 2c1.7 0 3.3.7 4.5 1.9l6.6 6.6c2.5 2.5 2.5 6.6 0 9.1l-6.6 6.6c-2.5 2.5-6.6 2.5-9.1 0l-6.6-6.6c-2.5-2.5-2.5-6.6 0-9.1l6.6-6.6C12.8 5.2 14.4 4.5 16.1 4.5zm0 4.5a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10z" fill="#FFA116" />
                      </g>
                    </svg>
                  ),
                  url: "https://leetcode.com/Rameswar45/"
                },
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
                  <Button className="shiny-travel rounded-[30px] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 shadow-lg shadow-blue-700/30">
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
                  <Button className="shiny-travel rounded-[30px] flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-5 shadow-lg shadow-cyan-700/30">
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
          <div className="lg:col-span-2 flex flex-col justify-center items-center">
            <div className="neon-img-wrapper">
              <img
                src="/rameswar.jpg"
                alt="Rameswar Panda"
                className="rounded-full object-cover w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] border-4 border-blue-400 shadow-xl"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
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

      <div className="block md:hidden  flex items-center justify-center ">
        <ProfileCard
          name="Rameswar Panda"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/rameswar.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
        />
      </div>
    </>
  );
};

// Helper function to position the floating cards

export default Hero;
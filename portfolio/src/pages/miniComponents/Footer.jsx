import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut"
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 0.4,
        duration: 0.8
      },
    },
  };

  return (
    <motion.footer
      className="p-8 mt-10 w-full  mx-auto bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 rounded-t-2xl shadow-lg shadow-blue-900/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        variants={lineVariants}
      />

      <motion.div
        className="mt-8 flex flex-col md:flex-row justify-between items-center"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 md:mb-0 text-center md:text-left tracking-[8px] bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={textVariants}
        >
          THANK YOU FOR VISITING
        </motion.h1>

        <motion.div
          className="text-blue-300/80 text-sm flex flex-col sm:flex-row gap-2 sm:gap-4 text-center md:text-right"
          variants={textVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            whileHover={{ color: "#93c5fd" }}
          >
            © 2025 Rameswar Panda
          </motion.span>
          <motion.span className="hidden sm:inline-block text-blue-500/30">|</motion.span>
          <motion.a
            href="#top"
            className="hover:text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          className="text-blue-200/80 text-center text-base max-w-xl mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Thank you for visiting my portfolio.<br />
          I hope you enjoyed exploring my work, passions, and aspirations.<br />
          If my journey inspired you or sparked your curiosity, feel free to connect or reach out.<br />
          <span className="text-cyan-300 font-semibold">Wishing you creativity, growth, and endless possibilities ahead!</span>
        </motion.p>
        <motion.div
          className="p-2 rounded-full bg-blue-900/20 border border-blue-500/10 shadow-inner"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </motion.svg>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
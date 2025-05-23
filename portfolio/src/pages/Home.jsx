import React, { useEffect } from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import { ThemeProvider } from "@/components/theme-provider";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import Footer from "./miniComponents/Footer";
import Navbar from "../components/ui/navbar";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  // Scroll progress indicator animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section wrapper component for consistent animations
  const SectionWrapper = ({ children, className = "", delay = 0, id = "" }) => {
    return (
      <motion.div
        id={id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          delay: delay
        }}
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <ThemeProvider defaultTheme="dark">
      {/* Navbar */}
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-gray-950 -z-10">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-950/20 blur-[150px] top-[-250px] right-[-250px]" />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-900/20 blur-[150px] bottom-[-250px] left-[-250px]" />
      </div>
      
      {/* Main Content */}
      <article className="w-full px-3 md:px-4 flex flex-col gap-10 pt-20">
        {/* Hero Section */}
        <SectionWrapper className="mt-6 md:mt-10" id="home">
          <Hero />
        </SectionWrapper>
        
        {/* Timeline Section */}
        <SectionWrapper delay={0.05} id="timeline">
          <Timeline />
        </SectionWrapper>
        
        {/* About Section */}
        <SectionWrapper delay={0.05} id="about">
          <About />
        </SectionWrapper>
        
        {/* Skills Section */}
        <SectionWrapper delay={0.05} id="skills">
          <Skills />
        </SectionWrapper>
        
        {/* Portfolio Section */}
        <SectionWrapper delay={0.05} id="portfolio">
          <Portfolio />
        </SectionWrapper>
        
        {/* MyApps Section */}
        <SectionWrapper delay={0.05} id="apps">
          <MyApps />
        </SectionWrapper>
        
        {/* Contact Section */}
        <SectionWrapper delay={0.05} id="contact">
          <Contact />
        </SectionWrapper>

        {/* Footer */}
       
      </article>
      
      {/* Floating Scroll To Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3.5 rounded-full bg-blue-900/80 backdrop-blur-sm border border-blue-500/20 shadow-lg shadow-blue-500/20 text-blue-200 z-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.7)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </ThemeProvider>
  );
};

export default Home;
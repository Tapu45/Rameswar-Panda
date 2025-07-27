import React, { useEffect, useRef } from "react";
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
import DarkVeil from "@/animation/bg";
import { trackSectionView, createSectionTimeTracker } from "@/lib/analytics";

const Home = () => {
  // Scroll progress indicator animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sectionTracker = useRef(createSectionTimeTracker());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Setup intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section came into view
            trackSectionView(entry.target.id, entry.target.id);
            sectionTracker.current.enterSection(entry.target.id);
          } else {
            // Section left view
            sectionTracker.current.leaveSection(entry.target.id, entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // Fire when 20% of the section is visible
    );
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    
    // Report all section times when unmounting
    return () => {
      sectionTracker.current.reportAllSectionTimes();
      observer.disconnect();
    };
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
      <div className="fixed inset-0 -z-20 w-full h-full">
        <DarkVeil
          hueShift={20}
          noiseIntensity={0.04}
          scanlineIntensity={0.08}
          speed={0.7}
          scanlineFrequency={0.04}
          warpAmount={0.07}
          resolutionScale={1}
        />
      </div>
      {/* Navbar */}
      {/* <div className="hidden md:block">
  <Navbar />
</div> */}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Background Gradients */}


      {/* Main Content */}
      <article className="w-full px-3 md:px-4 flex flex-col gap-10 md:pt-20">
        {/* Hero Section */}
        <SectionWrapper className="mt-6 md:mt-0" id="hero">
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
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </ThemeProvider>
  );
};

export default Home;
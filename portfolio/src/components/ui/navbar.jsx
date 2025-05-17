import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Clock, 
  User, 
  Code2, 
  Briefcase, 
  Layers, 
  Mail, 
  Menu, 
  X,
  ChevronRight
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { title: "Home", href: "#home", icon: <Home size={18} /> },
    { title: "Timeline", href: "#timeline", icon: <Clock size={18} /> },
    { title: "About", href: "#about", icon: <User size={18} /> },
    { title: "Skills", href: "#skills", icon: <Code2 size={18} /> },
    { title: "Portfolio", href: "#portfolio", icon: <Briefcase size={18} /> },
    { title: "Apps", href: "#apps", icon: <Layers size={18} /> },
    { title: "Contact", href: "#contact", icon: <Mail size={18} /> },
  ];

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    hover: { 
      scale: 1.05, 
      color: "#60a5fa",
      transition: { type: "spring", stiffness: 400 } 
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.substring(1));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-gradient-to-r from-gray-900/85 via-blue-950/85 to-slate-900/85 backdrop-blur-md shadow-lg shadow-blue-900/10" 
          : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="w-full px-5 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="text-blue-300 font-bold text-2xl tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 font-extrabold">
            Rameswar Panda
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div 
          className="hidden md:flex gap-7 items-center"
          variants={navbarVariants}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-blue-100 hover:text-blue-300 transition-colors font-medium text-base flex items-center gap-2"
              variants={linkVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                className="text-blue-400"
              >
                {link.icon}
              </motion.span>
              {link.title}
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-blue-300 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gradient-to-b from-slate-900 to-blue-950/90 backdrop-blur-md shadow-lg shadow-blue-900/10 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-blue-100 hover:text-blue-300 transition-colors p-3 rounded-md hover:bg-blue-900/30 flex items-center justify-between"
                  variants={linkVariants}
                  whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.2)" }}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-blue-400">{link.icon}</span>
                    <span className="text-base">{link.title}</span>
                  </span>
                  <ChevronRight size={16} className="text-blue-500/70" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChromaGrid from "@/animation/chromagrid";

const PortfolioSkeleton = () => (
  <motion.div
    className="w-full bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900 p-8 rounded-2xl shadow-xl text-blue-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="relative mb-12">
      <div className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
        lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
        mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="h-10 w-48 bg-blue-900/40 rounded animate-pulse mb-2"></div>
      </div>
      <div className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
        md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
        tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
        <div className="h-10 w-32 bg-blue-900/40 rounded animate-pulse mb-2"></div>
      </div>
      <div
        className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
      ></div>
    </div>
    <div className="flex items-center mb-8">
      <span className="text-blue-300 text-base mr-2">🚀</span>
      <span className="text-blue-200 text-base font-medium">
        Plotting your portfolio on the space-time continuum... Please wait!
      </span>
    </div>

    <div className="h-[600px] flex items-center justify-center">
      <div className="w-full flex flex-wrap justify-center gap-4">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="w-[300px] rounded-[20px] overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-blue-500/20"
          >
            <div className="p-[10px]">
              <div className="w-full h-[180px] bg-blue-900/30 animate-pulse rounded-[10px]"></div>
            </div>
            <div className="p-3">
              <div className="h-5 w-2/3 bg-blue-900/40 animate-pulse mb-3 rounded"></div>
              <div className="h-4 w-1/3 bg-blue-900/30 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-center mt-8">
      <div
        className="px-6 py-3 bg-blue-900/30 backdrop-blur-sm rounded-full text-sm text-blue-300 border border-blue-500/20 flex items-center gap-2"
      >
        <span className="text-blue-400">🛰️</span>
        <span>Loading projects... The universe is expanding!</span>
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-1-986s.onrender.com/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };
    getMyProjects();
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  if (loading) return <PortfolioSkeleton />;

  // Display 8 projects by default (2 rows of 4), or all if viewAll is true
  const displayProjects = viewAll ? projects : projects.slice(0, 8);

  // Convert projects to ChromaGrid format
  const chromaItems = displayProjects.map(project => ({
    image: project.projectBanner?.url || '/placeholder.jpg',
    title: project.title?.length > 25 ? project.title.substring(0, 22) + '...' : project.title,
    subtitle: "View Details",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg, #4F46E5, #000)",
    url: `/project/${project._id}`
  }));

  // Function to handle navigation - ChromaGrid only opens URL in new tab
  // We need to manually capture clicks and use navigate
  const handleChromaGridClick = (url) => {
    if (url && url.startsWith('/project/')) {
      navigate(url);
    }
  };

  return (
    <motion.div
      className="w-full bg-slate-800/40 p-8 rounded-2xl shadow-xl text-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="relative mb-8" variants={titleVariants}>
        <motion.h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={titleVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MY{" "}
          <span className="font-extrabold text-blue-400">
            PORTFOLIO
          </span>
        </motion.h1>
        <motion.h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200"
          variants={titleVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MY <span className="font-extrabold text-blue-400">WORK</span>
        </motion.h1>
        <motion.span
          className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-blue-500/30"
          variants={lineVariants}
        ></motion.span>
      </motion.div>

      <div className="h-auto relative mb-8">
        <ChromaGrid
          items={chromaItems}
          radius={350}
          damping={0.5}
          fadeOut={0.7}
          ease="power3.out"
          className="py-4"
          onCardClick={handleChromaGridClick}
        />
      </div>

      {/* Show More/Less button only if projects > 8 */}
      {projects.length > 8 && (
        <motion.div
          className="w-full text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="w-52 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 shadow-lg shadow-blue-700/30 transition-all duration-300"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Show Less" : "Show More"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Portfolio;
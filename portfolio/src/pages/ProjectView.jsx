import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Info,
  Code2,
  Layers,
  Rocket,
  Github,
  ExternalLink,
  CheckCircle
} from "lucide-react";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    const getProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://backend-1-986s.onrender.com/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectLink(res.data.project.projectLink);
        setProjectBanner(
          res.data.project.projectBanner && res.data.project.projectBanner.url
        );
        setProjectBannerPreview(
          res.data.project.projectBanner && res.data.project.projectBanner.url
        );
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ").filter(item => item.trim() !== "");
  const technologiesList = technologies.split(", ").filter(item => item.trim() !== "");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-slate-900 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Return Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleReturnToPortfolio}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-5 py-6 shadow-lg shadow-blue-900/30"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Return to Portfolio</span>
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <motion.div 
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div 
            className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900/90 to-blue-950/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/20 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Project Banner & Title */}
            <motion.div 
              className="relative h-[350px] sm:h-[400px] overflow-hidden border-b border-blue-500/20"
              variants={itemVariants}
            >
              <div className="absolute inset-0">
                <img
                  src={projectBannerPreview || "/avatarHolder.jpg"}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/50 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h1 
                  className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {title}
                </motion.h1>
              </div>
            </motion.div>

            {/* Project Details */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Quick Links */}
              <motion.div 
                className="flex flex-wrap gap-4 items-center"
                variants={itemVariants}
              >
                {gitRepoLink && (
                  <a 
                    href={gitRepoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30 transition-colors duration-300"
                  >
                    <Github size={18} />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {projectLink && (
                  <a 
                    href={projectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700/80 text-white px-4 py-2 rounded-full transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                    <span>Live Project</span>
                  </a>
                )}
              </motion.div>

              {/* Description */}
              <motion.div 
                className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-blue-500/20">
                  <Info className="text-blue-400" size={24} />
                  <h2 className="text-2xl font-bold text-blue-300">Description</h2>
                </div>
                
                <ul className="space-y-3">
                  {descriptionList.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3 text-blue-100/90"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                      <span>{item}.</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Technologies */}
              <motion.div 
                className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-blue-500/20">
                  <Code2 className="text-green-400" size={24} />
                  <h2 className="text-2xl font-bold text-green-300">Technologies</h2>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  {technologiesList.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="bg-blue-900/40 text-blue-200 px-3 py-2 rounded-full text-sm border border-blue-500/20 shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.4 + (index * 0.05),
                        type: "spring",
                        stiffness: 260, 
                        damping: 20 
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(59, 130, 246, 0.5)" 
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Two Columns Layout for Stack and Deployed */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={itemVariants}
              >
                {/* Stack */}
                <motion.div 
                  className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-blue-500/20">
                    <Layers className="text-yellow-400" size={24} />
                    <h2 className="text-2xl font-bold text-yellow-300">Stack</h2>
                  </div>
                  
                  <p className="text-blue-100/90">{stack}</p>
                </motion.div>

                {/* Deployed */}
                <motion.div 
                  className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-blue-500/20">
                    <Rocket className="text-purple-400" size={24} />
                    <h2 className="text-2xl font-bold text-purple-300">Deployed</h2>
                  </div>
                  
                  <p className="text-blue-100/90">{deployed}</p>
                </motion.div>
              </motion.div>

              {/* Links Section - Bottom */}
              <motion.div 
                className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 shadow-lg mt-8"
                variants={itemVariants}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gitRepoLink && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-blue-300">
                        <Github size={20} />
                        <span className="font-semibold">GitHub Repository</span>
                      </div>
                      <a
                        href={gitRepoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all transition-colors"
                      >
                        {gitRepoLink}
                      </a>
                    </div>
                  )}
                  
                  {projectLink && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-teal-300">
                        <ExternalLink size={20} />
                        <span className="font-semibold">Project URL</span>
                      </div>
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all transition-colors"
                      >
                        {projectLink}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectView;
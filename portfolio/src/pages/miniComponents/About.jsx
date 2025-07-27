import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Mail, Calendar, Languages, Briefcase, User } from "lucide-react";

const travelImages = [
  "https://pohcdn.com/sites/default/files/styles/node__blog_post__bp_banner/public/live_banner/luxembourg-1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwkpWxgiPbS9D1Iw0RvLqYr3dBFGdtZRYgqw&s",
  "https://miro.medium.com/v2/resize:fit:2000/0*lm35oJDt_4ZS11tT.jpeg",
  "https://cdn.britannica.com/09/99109-050-54B5261E/view-Christchurch-Lyttelton-Harbour-New-Zealand.jpg",
  "https://whc.unesco.org/uploads/thumbs/site_0438_0035-1200-630-20241024162522.jpg",
];

const About = () => {
  const [showHobbiesOnly, setShowHobbiesOnly] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    if (!showHobbiesOnly) return;
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % travelImages.length);
    }, 2500);
    return () => clearInterval(slideInterval.current);
  }, [showHobbiesOnly]);

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
      {!showHobbiesOnly && (
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
      )}

      {/* Backdrop Circle Decorations */}
      {!showHobbiesOnly && (
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
      )}

      <motion.div className="flex flex-col gap-8 mt-8" variants={containerVariants}>
        {/* Unified About Container */}
        {!showHobbiesOnly && (
          <motion.div
            className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-blue-500/10 flex-1 flex flex-col gap-8 relative"
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
            {/* Show Hobbies Only Button */}
            <div className="flex justify-end mt-4">
              <span
                className="text-cyan-300 underline underline-offset-4 cursor-pointer hover:text-cyan-200 transition text-base hidden sm:inline"
                style={{ userSelect: "none" }}
                onClick={() => setShowHobbiesOnly(true)}
                title="Click to see only my hobbies"
              >
                Want to know more?
              </span>
            </div>
          </motion.div>
        )}

        {/* Hobbies Only Section */}
        {showHobbiesOnly && (
          <motion.div
            className="flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-blue-800/30 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-cyan-300 font-extrabold mb-6 text-3xl tracking-wide drop-shadow-lg">
              My Hobbies & Dreams
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr] gap-8 w-full max-w-4xl items-stretch">
              {/* Left: Hobbies */}
              <div className="flex flex-col gap-6 h-full">
                {/* Music */}
                <div className="flex items-center bg-slate-800/60 rounded-xl p-5 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition h-full min-h-[120px]">
                  <span className="text-3xl mr-4 animate-pulse">🎧</span>
                  <div className="flex-1">
                    <h4 className="text-cyan-200 font-semibold text-lg mb-1 flex items-center gap-2">
                      Listening to Music
                      <a
                        href="https://open.spotify.com/playlist/3v5vQwQ8nHkQkQkQkQkQkQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                        title="My Spotify Playlist"
                      >
                        {/* Spotify SVG */}
                        <svg className="w-6 h-6 text-green-400 hover:text-green-300 transition" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.371 0 0 5.371 0 12c0 6.627 5.371 12 12 12s12-5.373 12-12c0-6.629-5.373-12-12-12zm5.438 17.438c-.229.373-.707.492-1.08.264-2.953-1.807-6.675-2.213-11.06-1.205-.428.098-.857-.168-.955-.594-.098-.428.168-.857.594-.955 4.74-1.07 8.823-.617 12.09 1.289.373.229.492.707.264 1.101zm1.543-3.07c-.287.467-.893.617-1.359.33-3.381-2.08-8.547-2.684-12.547-1.463-.521.156-1.072-.137-1.229-.658-.156-.521.137-1.072.658-1.229 4.484-1.346 10.08-.684 13.859 1.684.467.287.617.893.318 1.336zm.164-3.164c-4.08-2.426-10.857-2.646-14.438-1.463-.637.197-1.318-.146-1.514-.783-.197-.637.146-1.318.783-1.514 4.016-1.244 11.373-.992 15.984 1.684.574.34.756 1.08.416 1.654-.34.574-1.08.756-1.654.422z" />
                        </svg>
                      </a>
                    </h4>
                    <p className="text-blue-100/90 text-sm">
                      Music is my daily companion—whether coding or relaxing, there’s always a playlist running in the background.<br />
                      <span className="text-cyan-300 font-medium">Here is my favorite music:</span>{" "}
                      <a
                        href="https://open.spotify.com/playlist/3v5vQwQ8nHkQkQkQkQkQkQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-cyan-200"
                      >
                        Spotify Playlist
                      </a>
                    </p>
                  </div>
                </div>

                {/* Movies */}

                <div className="flex items-start bg-slate-800/60 rounded-xl p-5 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition h-full min-h-[120px] w-full min-w-0">
                  <span className="text-3xl mr-4">🎬</span>
                  <div className="flex-1 w-full min-w-0">
                    <h4 className="text-cyan-200 font-semibold text-lg mb-1 flex items-center gap-2">
                      Watching Movies & Web Series
                      <a
                        href="https://boxd.it/LUnJ0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                        title="My Letterboxd List"
                      >

                      </a>
                    </h4>
                    <p className="text-blue-100/90 text-sm break-words">
                      I’m a huge fan of <span className="font-bold text-blue-200">Christopher Nolan</span>—his movies are a cinematic experience like no other!<br />
                      I also admire <span className="font-bold text-blue-200">Lokesh Kanagaraj</span> and <span className="font-bold text-blue-200">David Fincher</span> for their unique storytelling and direction.<br />
                      <span className="text-cyan-300 font-medium block mt-1">Here is my favorite movies list:</span>{" "}
                      <a
                        href="https://boxd.it/LUnJ0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-cyan-200"
                      >
                        Letterboxd List
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* Right: Dream with Slider */}
              <div className="flex flex-col items-center justify-center bg-slate-800/60 rounded-xl p-0 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition h-full min-h-[380px] md:min-h-[410px] w-full">
                <div className="w-full h-56 md:h-64 rounded-t-xl overflow-hidden relative">
                  <img
                    src={travelImages[currentSlide]}
                    alt={`Travel ${currentSlide + 1}`}
                    className="object-cover w-full h-full transition-all duration-700"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {travelImages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === currentSlide ? "bg-cyan-400" : "bg-cyan-800/60"} border border-cyan-300`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center px-6 py-6">
                  <span className="text-5xl mb-2 animate-bounce">🌏</span>
                  <h4 className="text-cyan-200 font-semibold text-2xl mb-2 text-center">Dream: Explore the World</h4>
                  <p className="text-blue-100/90 text-center text-base">
                    Exploring the world is my ultimate dream—there’s something magical about discovering new places, meeting people from different cultures, and experiencing the beauty our planet has to offer.<br />
                    The thought of one day setting foot in every country fills me with excitement and hope. This dream inspires me to work harder, stay curious, and never stop believing in endless possibilities.
                  </p>
                </div>
              </div>
            </div>
            <button
              className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-lg font-semibold shadow-lg hover:from-blue-800 hover:to-cyan-700 transition"
              onClick={() => setShowHobbiesOnly(false)}
            >
              Back to About Me
            </button>
          </motion.div>
        )}  {showHobbiesOnly && (
          <motion.div
            className="flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-blue-800/30 p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-cyan-300 font-extrabold mb-6 text-3xl tracking-wide drop-shadow-lg">
              My Hobbies & Dreams
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              {/* Left: Hobbies */}
              <div className="flex flex-col gap-6 md:col-span-2">
                {/* Music */}
                <div className="flex items-center bg-slate-800/60 rounded-xl p-5 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition">
                  <span className="text-3xl mr-4 animate-pulse">🎧</span>
                  <div className="flex-1">
                    <h4 className="text-cyan-200 font-semibold text-lg mb-1 flex items-center gap-2">
                      Listening to Music
                      <a
                        href="https://open.spotify.com/playlist/3v5vQwQ8nHkQkQkQkQkQkQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                        title="My Spotify Playlist"
                      >
                        {/* Spotify SVG */}
                        <svg className="w-6 h-6 text-green-400 hover:text-green-300 transition" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.371 0 0 5.371 0 12c0 6.627 5.371 12 12 12s12-5.373 12-12c0-6.629-5.373-12-12-12zm5.438 17.438c-.229.373-.707.492-1.08.264-2.953-1.807-6.675-2.213-11.06-1.205-.428.098-.857-.168-.955-.594-.098-.428.168-.857.594-.955 4.74-1.07 8.823-.617 12.09 1.289.373.229.492.707.264 1.101zm1.543-3.07c-.287.467-.893.617-1.359.33-3.381-2.08-8.547-2.684-12.547-1.463-.521.156-1.072-.137-1.229-.658-.156-.521.137-1.072.658-1.229 4.484-1.346 10.08-.684 13.859 1.684.467.287.617.893.318 1.336zm.164-3.164c-4.08-2.426-10.857-2.646-14.438-1.463-.637.197-1.318-.146-1.514-.783-.197-.637.146-1.318.783-1.514 4.016-1.244 11.373-.992 15.984 1.684.574.34.756 1.08.416 1.654-.34.574-1.08.756-1.654.422z" />
                        </svg>
                      </a>
                    </h4>
                    <p className="text-blue-100/90 text-sm">
                      Music is my daily companion—whether coding or relaxing, there’s always a playlist running in the background.<br />
                      <span className="text-cyan-300 font-medium">Here is my favorite music:</span>{" "}
                      <a
                        href="https://open.spotify.com/playlist/3v5vQwQ8nHkQkQkQkQkQkQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-cyan-200"
                      >
                        Spotify Playlist
                      </a>
                    </p>
                  </div>
                </div>
                {/* Coding */}
                <div className="flex items-center bg-slate-800/60 rounded-xl p-5 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition">
                  <span className="text-3xl mr-4">💻</span>
                  <div>
                    <h4 className="text-cyan-200 font-semibold text-lg mb-1">Coding</h4>
                    <p className="text-blue-100/90 text-sm">
                      I love building things, solving problems, and sometimes just breaking stuff to see how it works!
                    </p>
                  </div>
                </div>
                {/* Movies */}
                <div className="flex items-center bg-slate-800/60 rounded-xl p-5 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition">
                  <span className="text-3xl mr-4">🎬</span>
                  <div className="flex-1">
                    <h4 className="text-cyan-200 font-semibold text-lg mb-1 flex items-center gap-2">
                      Watching Movies & Web Series
                      <a
                        href="https://boxd.it/LUnJ0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2"
                        title="My Letterboxd List"
                      >
                        {/* Letterboxd SVG */}
                        <svg className="w-6 h-6 text-orange-400 hover:text-orange-300 transition" viewBox="0 0 32 32" fill="currentColor">
                          <g>
                            <path d="M16.1 2.5c-2.2 0-4.3.9-5.9 2.5L3.6 11.6c-3.2 3.2-3.2 8.3 0 11.5l6.6 6.6c3.2 3.2 8.3 3.2 11.5 0l6.6-6.6c3.2-3.2 3.2-8.3 0-11.5l-6.6-6.6C20.4 3.4 18.3 2.5 16.1 2.5zm0 2c1.7 0 3.3.7 4.5 1.9l6.6 6.6c2.5 2.5 2.5 6.6 0 9.1l-6.6 6.6c-2.5 2.5-6.6 2.5-9.1 0l-6.6-6.6c-2.5-2.5-2.5-6.6 0-9.1l6.6-6.6C12.8 5.2 14.4 4.5 16.1 4.5zm0 4.5a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10z" />
                          </g>
                        </svg>
                      </a>
                    </h4>
                    <p className="text-blue-100/90 text-sm">
                      I’m a huge fan of <span className="font-bold text-blue-200">Christopher Nolan</span>—his movies are a cinematic experience like no other!<br />
                      I also admire <span className="font-bold text-blue-200">Lokesh Kanagaraj</span> and <span className="font-bold text-blue-200">David Fincher</span> for their unique storytelling and direction.<br />
                      <span className="text-cyan-300 font-medium">Here is my favorite movies list:</span>{" "}
                      <a
                        href="https://boxd.it/LUnJ0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-cyan-200"
                      >
                        Letterboxd List
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* Right: Dream with Slider */}
              <div className="flex flex-col items-center justify-center bg-slate-800/60 rounded-xl p-0 shadow border border-cyan-500/10 hover:shadow-cyan-400/20 transition h-full">
                <div className="w-full h-56 md:h-64 rounded-t-xl overflow-hidden relative">
                  <img
                    src={travelImages[currentSlide]}
                    alt={`Travel ${currentSlide + 1}`}
                    className="object-cover w-full h-full transition-all duration-700"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {travelImages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${idx === currentSlide ? "bg-cyan-400" : "bg-cyan-800/60"} border border-cyan-300`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center px-6 py-6">
                  <span className="text-5xl mb-2 animate-bounce">🌏</span>
                  <h4 className="text-cyan-200 font-semibold text-2xl mb-2 text-center">Dream: Explore the World</h4>
                  <p className="text-blue-100/90 text-center text-base">
                    One of my biggest dreams is to travel to every country and experience all cultures.<br />
                    Sometimes, this dream is what motivates me to work harder every day!
                  </p>
                </div>
              </div>
            </div>
            <button
              className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-lg font-semibold shadow-lg hover:from-blue-800 hover:to-cyan-700 transition"
              onClick={() => setShowHobbiesOnly(false)}
            >
              Back to About Me
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default About;
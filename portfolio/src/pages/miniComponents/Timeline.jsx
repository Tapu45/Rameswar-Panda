import axios from "axios";
import React, { useEffect, useState } from "react";

const TimelineSkeleton = () => (
  <div className="w-full p-8 rounded-2xl shadow-xl text-blue-50 animate-pulse">
    <div className="overflow-x-hidden text-3xl mb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-wide">
      <div className="h-8 w-48 bg-blue-900/40 rounded mb-2"></div>
    </div>
    <div className="flex items-center mb-8">
      <span className="text-blue-300 text-base mr-2">🕰️</span>
      <span className="text-blue-200 text-base font-medium">
        Assembling the time machine... Please wait!
      </span>
    </div>
    <div className="relative w-full">
      <div className="flex flex-col space-y-8 min-h-[400px]">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center min-h-[120px] max-h-[120px]"
          >
            <div className="w-4 h-4 bg-blue-400 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-8 w-3/4 bg-blue-900/40 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-blue-900/20 rounded mb-1"></div>
              <div className="h-4 w-1/3 bg-blue-900/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-1-986s.onrender.com/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timelines);
      } catch (error) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    getMyTimeline();
  }, []);

  // Responsive: show vertical timeline on mobile, horizontal on md+
  return (
    <div className="w-full max-w-8xl mx-auto p-8 rounded-3xl shadow-2xl text-blue-50 border border-blue-800/30">
      <h1 className="text-4xl md:text-5xl mb-10 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-wide text-center drop-shadow-lg">
        My Journey
      </h1>

      {/* Mobile: Vertical Timeline */}
      <div className="block md:hidden">
        {loading ? (
          <TimelineSkeleton />
        ) : (
          <div className="relative flex flex-col items-center">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-700 via-cyan-400/60 to-blue-700 rounded-full z-0" style={{ transform: "translateX(-50%)" }} />
            {timeline.map((element, index) => (
              <div key={element._id} className="relative flex flex-col items-center w-full mb-12">
                {/* Dot */}
                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 via-cyan-400 to-blue-900 rounded-full border-4 border-blue-900 shadow-xl z-10 flex items-center justify-center animate-pulse">
                  <svg
                    className="w-3 h-3 text-blue-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                </div>
                {/* Card */}
                <div className="mt-2 p-6 bg-gradient-to-br from-slate-800/80 via-blue-900/60 to-cyan-900/30 backdrop-blur-lg rounded-2xl border border-blue-500/20 shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-[1.025] w-full max-w-xs mx-auto z-10">
                  <h3 className="mb-2 text-xl font-bold text-blue-200 tracking-wide text-center">
                    {element.title}
                  </h3>
                  <time className="flex items-center justify-center mb-3 text-sm font-semibold text-cyan-300 bg-blue-900/40 w-full px-4 py-1 rounded-full shadow-inner">
                    <span className="inline-block w-2 h-2 mr-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                  </time>
                  <p className="text-base font-normal text-blue-100/80 leading-relaxed text-center">
                    {element.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        {loading ? (
          <TimelineSkeleton />
        ) : (
          <div className="relative w-full" style={{ height: 350 }}>
            <div
              className="flex space-x-12 min-w-full px-2 relative z-10 will-change-transform"
              style={{ height: 350, position: "relative" }}
            >
              {/* Horizontal line only as wide as the cards */}
              <div
                className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-blue-700 via-cyan-400/60 to-blue-700 rounded-full z-0"
                style={{
                  width: `calc(${timeline.length} * 260px + ${(timeline.length - 1) * 3}rem)`,
                  minWidth: "260px",
                  transform: "translateY(-50%)",
                }}
              />
              {timeline &&
                timeline.map((element, index) => (
                  <div
                    className="timeline-item-horizontal flex flex-col items-center min-w-[260px] max-w-[260px] relative group"
                    key={element._id}
                  >
                    {/* Dot */}
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-700 via-cyan-400 to-blue-900 rounded-full border-4 border-blue-900 shadow-xl mb-4 z-20 flex items-center justify-center animate-pulse">
                      <svg
                        className="w-3 h-3 text-blue-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <circle cx="10" cy="10" r="10" />
                      </svg>
                    </div>
                    {/* Card */}
                    <div className="p-6 bg-gradient-to-br from-slate-800/80 via-blue-900/60 to-cyan-900/30 backdrop-blur-lg rounded-2xl border border-blue-500/20 shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-[1.025] w-full">
                      <h3 className="mb-2 text-xl font-bold text-blue-200 tracking-wide group-hover:text-cyan-200 transition-colors duration-200 text-center">
                        {element.title}
                      </h3>
                      <time className="flex items-center justify-center mb-3 text-sm font-semibold text-cyan-300 bg-blue-900/40 w-full px-4 py-1 rounded-full shadow-inner">
                        <span className="inline-block w-2 h-2 mr-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                      </time>
                      <p className="text-base font-normal text-blue-100/80 leading-relaxed text-center">
                        {element.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
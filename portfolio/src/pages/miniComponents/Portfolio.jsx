import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://personal-portfolio-backend-zuwv.onrender.com/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PORTFOLIO
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {viewAll
    ? projects &&
      projects.map((element) => {
        return (
          <Link
            to={`/project/${element._id}`}
            key={element._id}
            className="group relative block overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-[#0ef]"
          >
            <img
              src={element.projectBanner && element.projectBanner.url}
              alt={element.title}
              className="w-full h-auto object-cover transition-transform duration-300"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            {/* Title Text */}
            <div className="absolute bottom-0 left-0 w-full text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-lg">
              <p>{element.title}</p>
            </div>
          </Link>
        );
      })
    : projects &&
      projects.slice(0, 9).map((element) => {
        return (
          <Link
            to={`/project/${element._id}`}
            key={element._id}
            className="group relative block overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-[#0ef]"
          >
            <img
              src={element.projectBanner && element.projectBanner.url}
              alt={element.title}
              className="w-full h-auto object-cover transition-transform duration-300"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            {/* Title Text */}
            <div className="absolute bottom-0 left-0 w-full text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-lg">
              <p>{element.title}</p>
            </div>
          </Link>
        );
      })}
</div>



      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

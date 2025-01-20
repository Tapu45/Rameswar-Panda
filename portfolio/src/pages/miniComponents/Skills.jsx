import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://personal-portfolio-backend-zuwv.onrender.com/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills &&
          skills.map((element) => {
            return (
              <Card
                className="h-fit p-6 flex flex-col justify-center items-center gap-4 rounded-lg border-2 border-transparent 
                bg-gradient-to-t from-indigo-200 via-blue-100 to-indigo-200 transition-all duration-300 transform hover:scale-105 
                hover:shadow-xl hover:border-[#0ef]"
                key={element._id}
              >
                <img
                  src={element.svg && element.svg.url}
                  alt={element.title}
                  className="h-16 sm:h-24 w-auto transition-all duration-300 transform hover:scale-125"
                />
                <p className="text-gray-800 text-center font-semibold">{element.title}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;

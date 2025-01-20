import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* Heading Section */}
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {/* Subtitle */}
      <div className="text-center mt-4">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>

      {/* Main About Section */}
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14 items-center">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src="/tapu.jpg"
              alt="avatar"
              className="bg-white p-2 sm:p-4 rounded-lg shadow-lg h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Description Section */}
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-xl">
              <p className="text-white">
                My name is Rameswar Panda, a dedicated and goal-oriented BTech Computer Science Engineering student, passionate about learning new technologies and staying updated with industry trends. I focus on continuous self-improvement and exploring innovative solutions to overcome challenges, whether technical or conceptual. With a strong drive for excellence, I take pride in delivering high-quality work while embracing new opportunities to grow both personally and professionally in the ever-evolving tech landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

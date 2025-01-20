import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

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
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load

    const getProject = async () => {
      await axios
        .get(`https://personal-portfolio-backend-zuwv.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5  shadow-lg rounded-lg">
          <div className="space-y-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToPortfolio}>
                Return to Portfolio
              </Button>
            </div>

            {/* Project Title and Banner */}
            <div className="border-b border-gray-300 pb-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-600 mb-4 shadow-lg">
  {title}
</h1>
              <div className="w-full h-[500px] overflow-hidden rounded-lg shadow-md">
                <img
                  src={
                    projectBannerPreview
                      ? projectBannerPreview
                      : "/avatarHolder.jpg"
                  }
                  alt="Project Banner"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
              <p className="text-2xl font-semibold text-blue-600 mb-4">Description:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {descriptionList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Technologies Section */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md mb-6">
              <p className="text-2xl font-semibold text-green-600 mb-4">Technologies:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {technologiesList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Stack Section */}
            <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-6">
              <p className="text-2xl font-semibold text-yellow-600 mb-4">Stack:</p>
              <p className="text-gray-700">{stack}</p>
            </div>

            {/* Deployed Section */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-md mb-6">
              <p className="text-2xl font-semibold text-purple-600 mb-4">Deployed:</p>
              <p className="text-gray-700">{deployed}</p>
            </div>

            {/* GitHub Repository Link */}
            <div className="bg-teal-50 p-6 rounded-lg shadow-md mb-6">
              <p className="text-2xl font-semibold text-teal-600 mb-4">GitHub Repository Link:</p>
              <Link
                className="text-sky-700 hover:text-sky-900"
                target="_blank"
                to={gitRepoLink}
              >
                {gitRepoLink}
              </Link>
            </div>

            {/* Project Link */}
            <div className="bg-pink-50 p-6 rounded-lg shadow-md">
              <p className="text-2xl font-semibold text-pink-600 mb-4">Project Link:</p>
              <Link
                className="text-sky-700 hover:text-sky-900"
                target="_blank"
                to={projectLink}
              >
                {projectLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;

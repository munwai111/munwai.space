import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import Swiper from "swiper";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const ProjectCarousel = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const projects = [
    {
      id: 1,
      title: "VTAC UX/UI Design & Pathway Tool Transformation",
      description:
        "Developed a multi-tiered MVP solution to support high school students' academic transition, applying strategic thinking and user-focused design to improve decision-making at scale.",
      role: "Marketing Communication Intern - UX/UI Design Team",
      skills: [
        "UX Design",
        "UI Design",
        "Research",
        "Psychology",
        "Data Analysis",
      ],
      outcomes:
        "Enhanced user experience through data-informed, empathetic front-end development and improved decision-making processes for students.",
      period: "Mar 2025 - Apr 2025",
      type: "Internship",
    },
    {
      id: 2,
      title: "UNIQLO Global Management Program 2024",
      description:
        "Australia Sole Representative - Conducted in-depth research and data analysis to support financial forecasting, stakeholder behaviour insights, and innovative business strategy development.",
      role: "Global Management Program Participant",
      skills: [
        "Strategy",
        "Research",
        "Leadership",
        "Data Analysis",
        "Business Development",
      ],
      outcomes:
        "Global Selection & Recognition (top 0.7% globally), Strategic Excellence & Executive Commendation, Leadership & Team Empowerment",
      period: "Jul 2024 - Aug 2024",
      type: "Program",
    },
    {
      id: 3,
      title: "RMIT CIAIRI Research Assistant",
      description:
        "Led multidisciplinary research for systematic literature review exploring diverse success factors, demonstrating analytical depth and strong academic research capabilities.",
      role: "Research Assistant Intern",
      skills: [
        "Research",
        "Analysis",
        "AI",
        "Literature Review",
        "Academic Writing",
      ],
      outcomes:
        "Co-developed UI Design Specification plan for web-based AI tool supporting RMIT Grants, contributed to conflict intervention strategies.",
      period: "Jul 2024 - Apr 2025",
      type: "Internship",
    },
    {
      id: 4,
      title: "Xolvit & VTAC SDG Challenge - Successful Xolver 2024",
      description:
        "Led the development of a business proposal addressing SDG challenges, demonstrating leadership, innovation, and a commitment to social impact through structured problem-solving.",
      role: "Project Lead & Innovator",
      skills: [
        "Innovation",
        "Leadership",
        "Social Impact",
        "Strategic Planning",
        "Video Production",
      ],
      outcomes:
        "CEO-Endorsed Internship Offer – VTAC Collaboration, successful project implementation plan development.",
      period: "Feb 2024 - Apr 2024",
      type: "Challenge",
    },
    {
      id: 5,
      title: "YakBit AI Technology Advancement Strategy",
      description:
        "Developed a strategic and actionable business proposal for Yakbit, collaborating in a team with diverse professional backgrounds to support the company's growth in AI applications.",
      role: "Customer Journey Researcher",
      skills: [
        "AI Strategy",
        "Business Development",
        "Customer Research",
        "Team Collaboration",
        "Proposal Development",
      ],
      outcomes:
        "Delivered user-focused insights to guide business development and innovation in AI applications for corporate use.",
      period: "Jun 2024",
      type: "Freelance",
    },
  ];

  useEffect(() => {
    const swiper = new Swiper(".projectSwiper", {
      effect: "cards",
      grabCursor: true,
      modules: [EffectCards],
      cardsEffect: {
        slideShadows: true,
        rotate: true,
        perSlideOffset: 8,
      },
      on: {
        slideChange: function () {
          // Force a reflow to ensure CSS updates properly
          const slides = this.slides;
          slides.forEach((slide, index) => {
            if (index === this.activeIndex) {
              slide.classList.add("swiper-slide-active");
            } else {
              slide.classList.remove("swiper-slide-active");
            }
          });

          // Trigger a small delay to ensure CSS transitions work
          setTimeout(() => {
            this.update();
          }, 50);
        },
        init: function () {
          // Ensure proper initial state
          const slides = this.slides;
          slides.forEach((slide, index) => {
            if (index === this.activeIndex) {
              slide.classList.add("swiper-slide-active");
            } else {
              slide.classList.remove("swiper-slide-active");
            }
          });
        },
      },
    });

    setSwiperInstance(swiper);

    return () => {
      if (swiper) {
        swiper.destroy();
      }
    };
  }, []);

  const nextProject = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevProject = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
          Featured Projects
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Swipe through my key projects and achievements
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="swiper projectSwiper">
          <div className="swiper-wrapper">
            {projects.map((project) => (
              <div className="swiper-slide" key={project.id}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 w-full">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        {project.type}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {project.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
                      {project.role}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 transition-colors duration-300">
                      Description
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 transition-colors duration-300">
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 transition-colors duration-300">
                      Outcomes
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
                      {project.outcomes}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevProject}
          className="absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextProject}
          className="absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-slate-700 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;

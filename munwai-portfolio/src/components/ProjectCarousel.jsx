import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    {
      id: 6,
      title: "Kansai University Winter Exchange Program",
      description:
        "Selected for a prestigious RMIT-affiliated global program to explore entrepreneurship and business culture in Osaka, Japan's mercantile capital.",
      role: "Exchange Student & Innovation Participant",
      skills: [
        "Entrepreneurship",
        "Cross-cultural Communication",
        "Innovation",
        "Japanese Language",
        "International Collaboration",
      ],
      outcomes:
        "Developed and presented innovative solutions to real-world business challenges, completed Japanese language course (Survival Level).",
      period: "Jan 2023",
      type: "Exchange",
    },
    {
      id: 7,
      title: "Sonus Anima Intelligentia (SAI): AI-Driven Music Therapy Tool",
      description:
        "Self-directed research, development, and analysis project creating an AI-driven, self-regulated music therapy tool.",
      role: "Lead Developer & Researcher",
      skills: [
        "AI Development",
        "Music Therapy",
        "Self-Regulation",
        "Research",
        "Innovation",
      ],
      outcomes:
        "Work in progress - developing innovative AI applications for therapeutic interventions.",
      period: "2025",
      type: "Personal Project",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextProject();
    }
    if (isRightSwipe) {
      prevProject();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
          Projects & Experience
        </h2>
        {!isMobile && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevProject}
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextProject}
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <div
        className="relative overflow-hidden"
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full flex-shrink-0">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300">
                      {project.role}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 transition-colors duration-300">
                      {project.period} • {project.type}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-4 transition-colors duration-300">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                    Skills & Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">
                    Outcomes & Results:
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    {project.outcomes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;

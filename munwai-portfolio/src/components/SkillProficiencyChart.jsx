import React, { useState, useEffect, useMemo } from "react";

const SkillProficiencyChart = () => {
  const [animatedValues, setAnimatedValues] = useState({});

  const skills = useMemo(
    () => [
      { name: "Data Analysis", level: 9.0, color: "from-blue-500 to-blue-600" },
      {
        name: "Digital Marketing",
        level: 8.5,
        color: "from-green-500 to-green-600",
      },
      {
        name: "Cross-Cultural Communication",
        level: 9.0,
        color: "from-purple-500 to-purple-600",
      },
      {
        name: "Public Speaking",
        level: 8.0,
        color: "from-orange-500 to-orange-600",
      },
      {
        name: "Strategic Thinking",
        level: 8.5,
        color: "from-red-500 to-red-600",
      },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate each skill bar with staggered timing
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedValues((prev) => ({
                ...prev,
                [skill.name]: skill.level,
              }));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const chartElement = document.getElementById("skill-chart");
    if (chartElement) {
      observer.observe(chartElement);
    }

    return () => observer.disconnect();
  }, [skills]);

  return (
    <div className="py-12">
      <div
        id="skill-chart"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 mx-auto max-w-4xl"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            My Core Skill Levels
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Skill levels based on professional experience and project outcomes
          </p>
        </div>

        <div className="space-y-8">
          {skills.map((skill) => {
            const animatedValue = animatedValues[skill.name] || 0;
            const percentage = (animatedValue / 10) * 100;

            return (
              <div key={skill.name} className="group">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {skill.name}
                  </h4>
                  <span className="text-lg font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                    {skill.level}/10
                  </span>
                </div>

                <div className="relative">
                  {/* Background bar */}
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    {/* Progress bar */}
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{
                        width: `${percentage}%`,
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                      }}
                    >
                      {/* Shine effect */}
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>

                  {/* Skill level indicator */}
                  <div
                    className="absolute top-0 transform -translate-x-1/2 transition-all duration-1000 ease-out"
                    style={{ left: `${percentage}%` }}
                  >
                    <div className="w-6 h-6 bg-white dark:bg-gray-800 border-3 border-gray-300 dark:border-gray-600 rounded-full shadow-lg transform -translate-y-1"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Skill levels based on professional experience and project outcomes
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillProficiencyChart;

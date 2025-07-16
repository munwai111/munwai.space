import React, { useState, useEffect } from "react";
import { Target, Bot, Users, Megaphone } from "lucide-react";

// Move domains array outside the component
const domains = [
  {
    name: "Digital Strategy",
    percentage: 30,
    description: "Strategic digital transformation initiatives",
    icon: Target,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "AI/Data Analytics",
    percentage: 25,
    description: "Machine learning and data-driven insights",
    icon: Bot,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Leadership & Volunteering",
    percentage: 25,
    description: "Team leadership and community engagement",
    icon: Users,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Branding/Communication",
    percentage: 20,
    description: "Brand development and strategic communication",
    icon: Megaphone,
    color: "from-orange-500 to-orange-600",
  },
];

const ProjectDomainChart = () => {
  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate each domain bar with staggered timing
          domains.forEach((domain, index) => {
            setTimeout(() => {
              setAnimatedValues((prev) => ({
                ...prev,
                [domain.name]: domain.percentage,
              }));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const chartElement = document.getElementById("domain-chart");
    if (chartElement) {
      observer.observe(chartElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-16">
      <div
        id="domain-chart"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 mx-auto max-w-5xl"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Project Focus Distribution
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Distribution based on project portfolio and professional experience
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {domains.map((domain) => {
            const animatedValue = animatedValues[domain.name] || 0;

            return (
              <div key={domain.name} className="group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <domain.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {domain.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
                      {domain.percentage}%
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      of total project focus
                    </p>
                  </div>
                </div>

                <div className="relative">
                  {/* Background bar */}
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    {/* Progress bar */}
                    <div
                      className={`h-full bg-gradient-to-r ${domain.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{
                        width: `${animatedValue}%`,
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                      }}
                    >
                      {/* Shine effect */}
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
          {domains.map((domain) => (
            <div key={`summary-${domain.name}`} className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <domain.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {animatedValues[domain.name] || 0}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {domain.name.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Distribution based on project portfolio and professional experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDomainChart;

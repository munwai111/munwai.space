import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Brain,
  TrendingUp,
  Globe,
  Briefcase,
  Heart,
  Calendar,
  Building,
} from "lucide-react";

// Import actual badge images from certificates
import badgeAIFundamentals from "../assets/Artificial Intelligence Fundamentals.png";
import badgeBlockchain from "../assets/Blockchain For Business.png";
import badgeCulturalIntelligence from "../assets/Building Cultural Intelligence.png";
import badgeGlobalLeadership from "../assets/Developing Global Leadership.png";
import badgeGlobalExperience from "../assets/Global Leader Experience.png";
import badgeWILReady from "../assets/RMIT WIL Ready.png";
import badgePeerMentoring from "../assets/Peer Mentoring.png";
import badgePractera from "../assets/Practera Certificate Badge.png";
import badgeBusinessCase from "../assets/1. Making the Business Case.png";

// Import company logos
import googleLogo from "../assets/google-logo.png";
import linkedinLearningLogo from "../assets/linkedin-learning-logo-new.png";
import rmitLogo from "../assets/rmit-logo.png";
import kansaiLogo from "../assets/kansai-logo.png";
import xolvitLogo from "../assets/xolvit-logo.png";
import vtacLogo from "../assets/vtac-logo.png";
import sparkLogo from "../assets/spark-logo.png";

const CertificationSection = () => {
  const [activeCategory, setActiveCategory] = useState("digital");

  const categories = {
    digital: {
      title: "Digital & Emerging Technologies",
      icon: Brain,
      color: "blue",
      description:
        "Cutting-edge technology certifications positioning me at the forefront of digital transformation",
      count: 3,
      certifications: [
        {
          title: "IBM SkillBuild – Artificial Intelligence Fundamentals",
          organization: "IBM",
          date: "Jun 2025",
          badge: badgeAIFundamentals,
          skills: [
            "Machine Learning",
            "AI Ethics",
            "Data Science",
            "Neural Networks",
          ],
          impact:
            "Equipped with foundational AI knowledge to drive intelligent automation and data-driven decision making in modern enterprises",
          future:
            "Essential for leading AI integration initiatives and developing ethical AI solutions in business environments",
          credentialUrl:
            "https://www.credly.com/badges/40bf2413-4088-4a23-91bd-73eb57a7744e",
        },
        {
          title: "Career Essentials in Generative AI",
          organization: "LinkedIn Learning, Microsoft, NASBA, PMI",
          date: "Dec 2023",
          logos: [linkedinLearningLogo],
          skills: [
            "Prompt Engineering",
            "GPT Applications",
            "AI Content Creation",
            "Workflow Automation",
          ],
          impact:
            "Mastered generative AI tools to enhance productivity and creative problem-solving across industries",
          future:
            "Critical for revolutionizing content creation, customer service, and business process optimization",
          credentialUrl:
            "https://www.linkedin.com/learning/certificates/2dc0674c7da7becfb04a579550422dbabe22cea16bfebe00b956af55fbf4c983",
        },
        {
          title: "Blockchain for Business",
          organization: "RMIT MicroCred",
          date: "Jul 2022",
          badge: badgeBlockchain,
          skills: [
            "Distributed Ledger",
            "Smart Contracts",
            "Cryptocurrency",
            "Supply Chain Innovation",
          ],
          impact:
            "Understanding blockchain applications for transparent, secure, and decentralized business operations",
          future:
            "Foundational for Web3 adoption, digital asset management, and trustless business ecosystems",
          credentialUrl:
            "https://www.credly.com/badges/0f5e7837-81f9-4841-8f4c-65e22bd2003a?source=linked_in_profile",
        },
      ],
    },
    marketing: {
      title: "Marketing, Communication & Business",
      icon: TrendingUp,
      color: "green",
      description:
        "Strategic marketing and business development expertise for digital-first organizations",
      count: 5,
      certifications: [
        {
          title: "Fundamentals of Digital Marketing",
          organization: "Google Digital Garage",
          date: "Dec 2023",
          logos: [googleLogo],
          skills: [
            "SEO/SEM",
            "Social Media Strategy",
            "Analytics",
            "Content Marketing",
          ],
          impact:
            "Comprehensive digital marketing foundation to drive online presence and customer acquisition",
          future:
            "Essential for navigating the evolving digital marketplace and omnichannel customer experiences",
          credentialUrl:
            "https://skillshop.exceedlms.com/student/award/ky1nubzrXxdTqZidsDFEXG7x",
        },
        {
          title: "Advance as a Digital Marketing Specialist",
          organization: "LinkedIn Learning, PMI, IIBA, NASBA",
          date: "Dec 2023",
          logos: [linkedinLearningLogo],
          skills: [
            "Campaign Management",
            "Marketing Automation",
            "Customer Journey Mapping",
            "ROI Analysis",
          ],
          impact:
            "Advanced digital marketing strategies to optimize conversion rates and customer lifetime value",
          future:
            "Critical for data-driven marketing in an increasingly personalized and automated landscape",
          credentialUrl:
            "https://www.linkedin.com/learning/certificates/cc0912294e80594e714542fb04ad929c0af59d825ea791171cac729e30088d93?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BKDzDwcaaSnG9dU7qO4cVxQ%3D%3D",
        },
        {
          title: "Creating Your Personal Brand",
          organization: "LinkedIn Learning and NASBA",
          date: "Dec 2023",
          logos: [linkedinLearningLogo],
          skills: [
            "Brand Strategy",
            "Professional Networking",
            "Content Creation",
            "Thought Leadership",
          ],
          impact:
            "Strategic personal branding to establish professional credibility and industry influence",
          future:
            "Vital for career advancement and establishing expertise in the digital professional landscape",
          credentialUrl:
            "https://www.linkedin.com/learning/certificates/25338ec39929b3be66280e4a487f59b22ff0b7024776192f1661e7734252d8a0?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BKDzDwcaaSnG9dU7qO4cVxQ%3D%3D",
        },
        {
          title: "The Intrapreneurship's Roadmap Cluster",
          organization: "RMIT MicroCred",
          date: "Dec 2023",
          badge: badgeBusinessCase,
          skills: [
            "Innovation Management",
            "Strategic Thinking",
            "Change Leadership",
            "Business Development",
          ],
          impact:
            "Entrepreneurial mindset within corporate structures to drive innovation and organizational growth",
          future:
            "Essential for leading digital transformation and fostering innovation in established organizations",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Winter Program (Entrepreneurship & Business)",
          organization: "Kansai University",
          date: "Jan 2023",
          logos: [kansaiLogo],
          skills: [
            "Startup Strategy",
            "Business Model Innovation",
            "Market Analysis",
            "Cross-cultural Business",
          ],
          impact:
            "International business perspective and entrepreneurial skills for global market expansion",
          future:
            "Critical for developing culturally-aware business strategies in the global economy",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
      ],
    },
    cultural: {
      title: "Cultural Intelligence & Global Leadership",
      icon: Globe,
      color: "purple",
      description:
        "Global leadership capabilities for diverse, multicultural, and international business environments",
      count: 5,
      certifications: [
        {
          title: "Building Cultural Intelligence",
          organization: "RMIT MicroCred",
          date: "Jul 2024",
          badge: badgeCulturalIntelligence,
          skills: [
            "Cross-cultural Communication",
            "Cultural Adaptation",
            "Global Mindset",
            "Inclusive Leadership",
          ],
          impact:
            "Enhanced ability to lead diverse teams and navigate complex multicultural business environments",
          future:
            "Critical for success in globalized markets and remote, diverse workforce management",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Developing Global Leadership",
          organization: "RMIT Leadership Short Course",
          date: "Sep 2023",
          badge: badgeGlobalLeadership,
          skills: [
            "International Strategy",
            "Global Team Management",
            "Cross-border Collaboration",
            "Cultural Sensitivity",
          ],
          impact:
            "Leadership competencies to manage international projects and multicultural stakeholder relationships",
          future:
            "Essential for executive roles in multinational corporations and global market expansion",
          credentialUrl:
            "https://www.credly.com/badges/80519c51-dc7f-4ec4-aa33-bc29805a0e54/print",
        },
        {
          title: "Melbourne Open Doors Program",
          organization: "RMIT and CommonPurpose",
          date: "Aug 2023",
          logos: [rmitLogo],
          skills: [
            "Community Leadership",
            "Social Impact",
            "Stakeholder Engagement",
            "Systems Thinking",
          ],
          impact:
            "Community leadership experience to drive positive social change and sustainable business practices",
          future:
            "Vital for ESG leadership and creating businesses that balance profit with social responsibility",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Global Leader Experience",
          organization: "RMIT Online Short Course",
          date: "Sep 2022",
          badge: badgeGlobalExperience,
          skills: [
            "Global Perspective",
            "Leadership Development",
            "International Relations",
            "Strategic Vision",
          ],
          impact:
            "Comprehensive global leadership foundation for international business and cross-cultural management",
          future:
            "Foundational for leadership roles in the interconnected global business landscape",
          credentialUrl:
            "https://www.credly.com/badges/0420cc69-7668-480d-b0ac-8d5874bd835c/linked_in_profile",
        },
        {
          title: "Global Leader Experience Melbourne",
          organization: "RMIT and CommonPurpose",
          date: "Aug 2022",
          logos: [rmitLogo],
          skills: [
            "Leadership Practice",
            "Community Engagement",
            "Collaborative Problem-solving",
            "Social Innovation",
          ],
          impact:
            "Practical leadership experience in addressing complex social and business challenges",
          future:
            "Essential for developing solutions to global challenges through business innovation",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
      ],
    },
    workplace: {
      title: "Workplace Readiness & Employability",
      icon: Briefcase,
      color: "orange",
      description:
        "Professional development and industry-ready skills for modern workplace excellence",
      count: 7,
      certifications: [
        {
          title: "RMIT WIL Ready",
          organization: "RMIT MicroCred",
          date: "Jul 2024",
          badge: badgeWILReady,
          skills: [
            "Work Integrated Learning",
            "Professional Practice",
            "Industry Readiness",
            "Career Development",
          ],
          impact:
            "Comprehensive preparation for professional work environments and industry integration",
          future:
            "Essential foundation for seamless transition into professional roles and career advancement",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Child Safety for Students | RMIT WIL Certified",
          organization: "RMIT MicroCred",
          date: "Jul 2024",
          logos: [rmitLogo],
          skills: [
            "Child Protection",
            "Safety Protocols",
            "Professional Ethics",
            "Compliance Management",
          ],
          impact:
            "Professional certification ensuring safe and ethical practice in educational and community environments",
          future:
            "Critical for roles involving community engagement, education, and social responsibility",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "2-Week Industry Experience Program Completer",
          organization: "Practera & RMIT",
          date: "Apr 2024",
          badge: badgePractera,
          skills: [
            "Industry Exposure",
            "Professional Networks",
            "Real-world Application",
            "Career Exploration",
          ],
          impact:
            "Direct industry experience providing practical insights into professional work environments",
          future:
            "Valuable for understanding industry dynamics and building professional relationships",
          credentialUrl: "https://openbadgepassport.com/app/badge/info/719771",
        },
        {
          title: "Successful Xolver for SDG 4",
          organization: "Xolvit & VTAC",
          date: "Apr 2024",
          logos: [xolvitLogo, vtacLogo],
          skills: [
            "Problem Solving",
            "Sustainable Development",
            "Innovation Thinking",
            "Social Impact",
          ],
          impact:
            "Demonstrated ability to develop innovative solutions for global education challenges",
          future:
            "Essential for contributing to sustainable development and social innovation initiatives",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Pathway Completion 2024",
          organization: "RMIT Plus",
          date: "Jul 2024",
          logos: [rmitLogo],
          skills: [
            "Academic Excellence",
            "Personal Development",
            "Leadership Skills",
            "Community Engagement",
          ],
          impact:
            "Comprehensive personal and professional development through structured pathway program",
          future:
            "Foundation for continued learning and leadership development throughout career",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Student Ambassador Achievement",
          organization: "RMIT Career Connect",
          date: "Mar 2024",
          logos: [rmitLogo],
          skills: [
            "Representation",
            "Communication",
            "Event Management",
            "Peer Support",
          ],
          impact:
            "Leadership experience in representing the university and supporting fellow students",
          future:
            "Valuable for roles requiring representation, communication, and community building",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
        {
          title: "Employee Training",
          organization: "Spark Event Group",
          date: "Feb 2024",
          logos: [sparkLogo],
          skills: [
            "Event Management",
            "Customer Service",
            "Team Collaboration",
            "Professional Standards",
          ],
          impact:
            "Professional training in event management and customer service excellence",
          future:
            "Applicable to roles requiring event coordination, customer relations, and team management",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
      ],
    },
    mentoring: {
      title: "Mentoring, Volunteering & Recognition",
      icon: Heart,
      color: "red",
      description:
        "Community leadership and mentoring excellence demonstrating commitment to supporting others",
      count: 1,
      certifications: [
        {
          title: "RMIT Peer Mentoring Program – Certificate of Appreciation",
          organization: "RMIT Peer Mentoring Program",
          date: "Oct 2024 (Sem 1 2023 – Sem 2 2024)",
          badge: badgePeerMentoring,
          skills: [
            "Mentoring",
            "Peer Support",
            "Active Listening",
            "Guidance & Development",
          ],
          impact:
            "Demonstrated commitment to supporting fellow students through comprehensive mentoring program",
          future:
            "Essential for leadership roles requiring team development, coaching, and talent nurturing",
          credentialUrl:
            "https://www.linkedin.com/in/mun-wai-looi-086886225/details/certifications/",
        },
      ],
    },
  };

  const currentCategory = categories[activeCategory];

  const getCategoryIcon = (category) => {
    const IconComponent = categories[category].icon;
    return <IconComponent className="w-6 h-6" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      blue: "bg-blue-500 text-white border-blue-500",
      green: "bg-green-500 text-white border-green-500",
      purple: "bg-purple-500 text-white border-purple-500",
      orange: "bg-orange-500 text-white border-orange-500",
      red: "bg-red-500 text-white border-red-500",
    };
    return colors[categories[category].color] || colors.blue;
  };

  const getInactiveColor = (category) => {
    const colors = {
      blue: "border-blue-200 text-blue-600 hover:bg-blue-50",
      green: "border-green-200 text-green-600 hover:bg-green-50",
      purple: "border-purple-200 text-purple-600 hover:bg-purple-50",
      orange: "border-orange-200 text-orange-600 hover:bg-orange-50",
      red: "border-red-200 text-red-600 hover:bg-red-50",
    };
    return colors[categories[category].color] || colors.blue;
  };

  const getSkillColor = (category) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
      red: "bg-red-100 text-red-800",
    };
    return colors[categories[category].color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Certifications & Awards
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications and academic achievements demonstrating
            continuous learning and expertise across key domains
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                activeCategory === key
                  ? getCategoryColor(key)
                  : `bg-white dark:bg-gray-800 ${getInactiveColor(key)}`
              }`}
            >
              {getCategoryIcon(key)}
              <span className="hidden sm:inline">{category.title}</span>
              <span className="sm:hidden">{category.title.split(" ")[0]}</span>
              <span className="ml-1 text-sm font-bold">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Category Content */}
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getCategoryColor(
                activeCategory
              )}`}
            >
              {getCategoryIcon(activeCategory)}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentCategory.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentCategory.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header with Badge/Logo */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        {cert.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{cert.organization}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {cert.badge ? (
                        <img
                          src={cert.badge}
                          alt={`${cert.title} badge`}
                          className="w-16 h-16 object-contain"
                        />
                      ) : cert.logos && cert.logos.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {cert.logos.slice(0, 2).map((logo, logoIndex) => (
                            <img
                              key={logoIndex}
                              src={logo}
                              alt={`${cert.organization} logo`}
                              className="w-12 h-12 object-contain"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillColor(
                            activeCategory
                          )}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Value */}
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Impact & Value
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {cert.impact}
                    </p>
                  </div>

                  {/* Future Implications */}
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Future Implications
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {cert.future}
                    </p>
                  </div>

                  {/* View Credential Button */}
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${getCategoryColor(
                      activeCategory
                    )} hover:opacity-90`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Credential
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Category Impact Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Category Impact Summary
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentCategory.count} certifications demonstrating expertise in{" "}
              {currentCategory.title.toLowerCase()}. These credentials position
              me to contribute effectively in modern, technology-driven
              organizations while driving innovation and sustainable business
              practices.
            </p>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="text-center">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${getCategoryColor(
                  key
                )}`}
              >
                {getCategoryIcon(key)}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {category.title.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;

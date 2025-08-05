import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  Download,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  Code,
  Users,
  Brain,
  Target,
} from "lucide-react";
import Swiper from "swiper";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const ResumeSection = ({ downloadCV }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Use a more landscape card for professional experience
  const cardClass =
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300 w-full h-full flex flex-col justify-between shadow-lg hover:shadow-xl rounded-xl p-8 break-words mx-auto";

  const experienceCards = [
    // Each card is a JSX element (copy from your previous Professional Experience cards)
    // Card 1
    <div className={cardClass} key={0}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          User-Centered UI/UX Design Implementation
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          VTAC/Xolvit Industry Challenge – UX Design Track
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Melbourne CBD
          <Badge className="ml-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
            Onsite
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Mar 2025 - Apr 2025
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin">
          • Utilised comprehensive design tools (Figma, Adobe XD, Photoshop,
          Canva) to conceptualise and build user-focused interfaces aimed at
          enhancing the student application journey
          <br />
          • Applied human-centered design principles, incorporating iterative
          feedback loops and usability metrics to improve user experience and
          accessibility
          <br />• Enhanced user experience through data-informed, empathetic
          front-end development and improved decision-making processes for
          students
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Figma
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Adobe XD
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Photoshop
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Canva
          </Badge>
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            User Research
          </Badge>
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Design Thinking
          </Badge>
        </div>
      </CardContent>
    </div>,
    // Card 2
    <div className={cardClass} key={1}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          Global Management Program 2024
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          UNIQLO Australia Sole Representative
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Tokyo, Japan
          <Badge className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            International
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Jul 2024 - Aug 2024
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin">
          • Conducted in-depth research and data analysis to support financial
          forecasting, stakeholder behaviour insights, and innovative business
          strategy development
          <br />
          • Collaborated with global teams to develop comprehensive business
          strategies and market analysis for international expansion
          <br />• Demonstrated exceptional leadership abilities and proactive
          approach to challenges, earning recognition as Australia's sole
          representative
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Target className="w-3 h-3 mr-1" />
            Strategy
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            Leadership
          </Badge>
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Research
          </Badge>
          <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
            <Target className="w-3 h-3 mr-1" />
            Business Development
          </Badge>
        </div>
      </CardContent>
    </div>,
    // Card 3
    <div className={cardClass} key={2}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          RMIT CIAIRI Research Assistant
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          Research & Innovation Team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Melbourne, Australia
          <Badge className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Academic
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Jul 2024 - Apr 2025
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin">
          • Led multidisciplinary research for systematic literature review
          exploring diverse success factors, demonstrating analytical depth and
          strong academic research capabilities
          <br />
          • Co-developed UI Design Specification plan for web-based AI tool
          supporting RMIT Grants, contributed to conflict intervention
          strategies
          <br />• Applied advanced research methodologies and data analysis
          techniques to support academic and industry research initiatives
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Research
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            AI Tools
          </Badge>
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            Analysis
          </Badge>
          <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
            <Target className="w-3 h-3 mr-1" />
            Academic Writing
          </Badge>
        </div>
      </CardContent>
    </div>,
  ];

  useEffect(() => {
    const swiper = new Swiper(".experienceSwiper", {
      effect: "cards",
      grabCursor: true,
      modules: [EffectCards],
      cardsEffect: {
        slideShadows: true,
        rotate: true,
        perSlideOffset: 12,
      },
      spaceBetween: 20,
    });

    setSwiperInstance(swiper);

    return () => {
      if (swiper) {
        swiper.destroy();
      }
    };
  }, []);

  const nextCard = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevCard = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
            Resume
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        </div>

        {/* Professional Experience Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300 flex items-center justify-center">
              <Briefcase className="w-6 h-6 mr-2" />
              Professional Experience
            </h3>
            <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Swipe through my professional journey
            </p>
          </div>

          {/* Swiper Container */}
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="swiper experienceSwiper">
              <div className="swiper-wrapper">
                {experienceCards.map((card, index) => (
                  <div className="swiper-slide" key={index}>
                    {card}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevCard}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
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
              onClick={nextCard}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110"
            >
              <svg
                className="w-6 h-6"
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

        {/* Education Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 mr-2" />
              Education
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
                  Bachelor of Applied Science (Psychology)
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                  RMIT University
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                  <MapPin className="w-4 h-4 mr-1" />
                  Melbourne, Australia
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  2022 - 2024
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                  • Major in Psychology with focus on organisational behaviour,
                  human motivation, and communication
                  <br />
                  • Completed research projects in cross-cultural collaboration,
                  leadership development, and strategic thinking
                  <br />• Achieved academic excellence with strong foundation in
                  data analysis and research methodologies
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                    Psychology
                  </Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                    Research
                  </Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                    Data Analysis
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
                  Diploma of Business
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                  RMIT University
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                  <MapPin className="w-4 h-4 mr-1" />
                  Melbourne, Australia
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  2021 - 2022
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                  • Foundation in business principles, marketing, and strategic
                  management
                  <br />
                  • Developed skills in project management, stakeholder
                  engagement, and business communication
                  <br />• Applied learning through practical business challenges
                  and case studies
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                    Business
                  </Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                    Marketing
                  </Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                    Strategy
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="text-center">
          <Button
            onClick={downloadCV}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 px-8 py-3 text-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Full CV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;

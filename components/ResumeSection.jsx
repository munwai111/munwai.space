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
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300 w-full h-full flex flex-col shadow-lg hover:shadow-xl rounded-xl p-6 md:p-8 break-words overflow-hidden";

  const experienceCards = [
    // Card 1: UI/UX Designer, User Behavioural Researcher, and Marketing Communication
    <div className={cardClass} key={0}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          UI/UX Designer, User Behavioural Researcher, and Marketing
          Communication
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          VTAC Headquarter, Melbourne CBD
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
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin leading-relaxed space-y-2">
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Developed a multi-tiered MVP solution using Figma to support high
            school students' academic transition, applying strategic thinking
            and user-focused design to improve decision-making at scale.
            Tackling VTAC's SDG challenge in bettering education services.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Spearheaded behavioural and market benchmarking for VTAC's Pathway
            Building and Course Selection UIs (using Figma), comparing
            competitor tools and user feedback through a behavioural evaluation
            scale to identify and rank the strengths and gaps of each website's
            features, functionalities, and redundancies – developing a
            data-driven, user-centred front-end design.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Effectively communicated project progress and insights to key
            stakeholders (using Canva), demonstrating leadership, structured
            thinking, and the ability to influence decision-making in a
            team-driven environment.
          </p>
        </div>
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">
            Achievement:
          </p>
          <p className="text-xs text-green-700 dark:text-green-400">
            Highly praised for a consistent display of excellence in work ethic
            and quality output from the CEO.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 mt-3">
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Figma
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
    // Card 2: Research Assistant and Research & Behavioural Data Scientist
    <div className={cardClass} key={1}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          Research Assistant and Research & Behavioural Data Scientist
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          Building 91 (RMIT CIAIRI), RMIT University, Melbourne CBD
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Melbourne CBD
          <Badge className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Hybrid
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Jul 2024 - Apr 2025
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin leading-relaxed space-y-2">
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Led multidisciplinary research for a systematic literature review
            (SLR) exploring diverse success factors, demonstrating analytical
            depth and strong academic research capabilities.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Used Scopus, VosViewer, Google Scholar and Google Workspace for
            qualitative and quantitative research, bibliometrics visualisation,
            and data analysis.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Designed and implemented project frameworks and methodology, E2E
            data science workflow, data bibliometrics visualisation method,
            systematic data validation, and Office automation systems, cutting
            admin time while ensuring data accuracy.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Co-developed a UI/UX Design Specification plan with Canva for a
            web-based AI tool supporting RMIT Grants, blending UX strategy with
            a user-centric approach to digital innovation.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Strategised conflict intervention and people management, analysing
            evolving sociodynamic group settings in the RACE team to support
            effective communication and collaborative resolution between users,
            researchers, and engineers.
          </p>
        </div>
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">
            Achievement:
          </p>
          <p className="text-xs text-green-700 dark:text-green-400">
            Helped securing government support and a research grant from the
            Australian Research Council (ARC).
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 mt-3">
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Research
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Data Science
          </Badge>
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            Analysis
          </Badge>
          <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
            <Target className="w-3 h-3 mr-1" />
            UI/UX Design
          </Badge>
        </div>
      </CardContent>
    </div>,
    // Card 3: Global Business Analyst and Brand Strategist - UNIQLO GMP2024
    <div className={cardClass} key={2}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          Global Business Analyst and Brand Strategist
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          UNIQLO GMP2024 - Uniqlo Co., Ltd, Ariake Office (Global Headquarter),
          Tokyo
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
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin leading-relaxed space-y-2">
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Developed data-accurate financial forecasting for UNIQLO Global
            and Japan-local business marketing and expansion budget, customers
            and investors' behavioural insights, and innovative business
            strategy development in branding communication – with deep research
            and data analysis using scholarly, financial, government and fashion
            market databases.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Projected UNIQLO's rebranding plan with innovative and
            data-informed solutions (using Canva and MS 365 Suite) to UNIQLO
            executives, clearly communicated with confidence and deep
            understanding of the brand's values, customer behaviour and the
            alignment between clients, media, and the company's philosophy.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Collaborated effectively across time zones and diverse cultural
            backgrounds, aligning team goals and maintaining proactive
            engagement to drive effective, globally-minded teamwork.
          </p>
        </div>
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">
            Achievement:
          </p>
          <p className="text-xs text-green-700 dark:text-green-400">
            Globally selected as the top 0.7% of participants, completed the
            program with outstanding strategic excellence and executive-level
            communication, highly praised for my demonstration of strong
            leadership, collaboration, and team empowerment.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 mt-3">
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
    // Card 4: Customer Journey Researcher
    <div className={cardClass} key={3}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          Customer Journey Researcher
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          Practera Nano-Industrial Program (YakBit.AI Startup)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Online/Remote work
          <Badge className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
            Remote
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Jun 2024 - Jun 2024
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin leading-relaxed space-y-2">
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Strategised an actionable business proposal for re-targeting
            Yakbit.AI's resource allocations and target focus, virtually
            collaborating with a multidisciplinary team and the co-founder to
            support the company's growth in AI applications for corporate use.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Conducted customer journey research and analysis, delivering
            user-focused insights to guide business development and innovation
            (using Google Scholar, Google Trends and IBM SPSS).
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Optimised proposal structure and visual presentation using Canva,
            ensuring clear, professional communication of complex ideas to
            executives and co-founders.
          </p>
        </div>
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-1">
            Achievement:
          </p>
          <p className="text-xs text-green-700 dark:text-green-400">
            Praised by the startup co-founder for a rigorous, detail-rich
            project plan now serving as the blueprint for their next milestone.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 mt-3">
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Research
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Data Analysis
          </Badge>
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            Strategy
          </Badge>
        </div>
      </CardContent>
    </div>,
    // Card 5: GenAI Prompt Consultant
    <div className={cardClass} key={4}>
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
          GenAI Prompt Consultant
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
          Online/Remote work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
          <MapPin className="w-4 h-4 mr-1" />
          Online/Remote work
          <Badge className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
            Remote
          </Badge>
        </div>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
          <Calendar className="w-4 h-4 mr-1" />
          Nov 2024 - Current Date
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300 font-sora-thin leading-relaxed space-y-2">
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Critically prompt engineered to assess open-source AI models'
            limitations, following an objective assessment framework (THE-ARC;
            Tone, Helpfulness, Efficiency/Conciseness, Accuracy, Relevance,
            Clarity) - thoroughly pinpoint, compare, and rank the strength &
            weakness, and robustness of the models. Providing useful insights
            for AI self-recalibrations and AI engineers' manual interventions.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Applied psycho-behavioural analysis through UX research and
            lived-experiences to ensure relatability and reliability to specific
            users' intentional use cases, AI knowledge, knowledge areas,
            language literacy, and user behaviours. Building a behaviourally
            adaptive AI model to 'Humanise' user and AI's interactions for more
            effective and satisfactory output.
          </p>
          <p
            className="break-words hyphens-none"
            style={{
              paddingLeft: "1.25rem",
              textIndent: "-1.25rem",
              wordBreak: "normal",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            • Worked on 40+ projects, excelled in a hybrid work environment,
            showcasing reliable time management, multitasking, and the ability
            to balance shifting priorities to meet deadlines and deliver
            consistent, high-quality outcomes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
            <Brain className="w-3 h-3 mr-1" />
            AI Engineering
          </Badge>
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
            <Code className="w-3 h-3 mr-1" />
            Prompt Engineering
          </Badge>
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
            <Users className="w-3 h-3 mr-1" />
            UX Research
          </Badge>
          <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
            <Target className="w-3 h-3 mr-1" />
            Behavioural Analysis
          </Badge>
        </div>
      </CardContent>
    </div>,
  ];

  useEffect(() => {
    let swiper = null;
    let timeoutId = null;

    // Wait for DOM to be ready
    const initSwiper = () => {
      const swiperElement = document.querySelector(".experienceSwiper");
      if (!swiperElement) {
        timeoutId = setTimeout(initSwiper, 100);
        return;
      }

      swiper = new Swiper(".experienceSwiper", {
        effect: "cards",
        grabCursor: true,
        modules: [EffectCards],
        cardsEffect: {
          slideShadows: true,
          rotate: true,
          perSlideOffset: 12,
        },
        spaceBetween: 20,
        slidesPerView: 1,
        centeredSlides: true,
        on: {
          init: function () {
            this.update();
          },
          slideChange: function () {
            this.update();
          },
        },
      });

      setSwiperInstance(swiper);
    };

    initSwiper();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
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
            <div
              className="swiper experienceSwiper"
              style={{
                width: "100%",
                height: "auto",
                minHeight: "600px",
                paddingBottom: "40px",
              }}
            >
              <div className="swiper-wrapper">
                {experienceCards.map((card, index) => (
                  <div
                    className="swiper-slide"
                    key={index}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "stretch",
                      padding: "0",
                    }}
                  >
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
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">
                  Bachelor of Applied Science (Psychology)
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                  RMIT University, Melbourne, Australia
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
                  • Graduated with a Distinction and an RMIT School Leaver
                  Scholar reception.
                  <br />• Kansai University Winter School (Japan, 2023):
                  Superior performance in cross-cultural entrepreneurship and
                  Japanese language.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                    Psychology
                  </Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                    Research
                  </Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                    Cross-Cultural Studies
                  </Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
                    Distinction
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

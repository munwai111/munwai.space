import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import Swiper from "swiper";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const TestimonialCarousel = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Rearranged testimonials with latest initiatives and references up front
  const testimonials = [
    {
      id: 1,
      quote:
        "I had the pleasure of meeting Mun Wai during the Xolvit SDG Challenge, where he participated as part of a team working on innovative solutions for Sustainable Development Goals. Throughout the challenge, Mun Wai demonstrated remarkable problem-solving abilities and creative thinking.",
      author: "Helen Baker",
      role: "CEO/Founder",
      organization: "Xolvit",
      context: "SDG Challenge 2024",
    },
    {
      id: 2,
      quote:
        "Throughout the program, Mun Wai consistently demonstrated exceptional leadership abilities and a proactive approach to both challenges and opportunities.",
      author: "Vivi Jin",
      role: "Talent Acquisition Senior Partner",
      organization: "UNIQLO",
      context: "Global Management Program 2024",
    },
    {
      id: 3,
      quote:
        "It is a delight to write a recommendation for Mun Wai Looi. I have had the pleasure of working with Mun Wai as part of the CIAIRI research team, where he has consistently demonstrated exceptional research skills, analytical thinking, and a strong commitment to academic excellence.",
      author: "Dr. Haytham Fayek",
      role: "Senior Lecturer",
      organization: "RMIT University",
      context: "Foundation of AI",
    },
    {
      id: 4,
      quote:
        "It is with pleasure that I recommend Mun Wai Looi for any future endeavors. During his time with our Research and Innovation team, Mun Wai consistently demonstrated exceptional analytical skills, creativity, and a strong work ethic.",
      author: "Tim Stroh",
      role: "Research Team Lead",
      organization: "RMIT University",
      context: "Research & Innovation Team",
    },
    {
      id: 5,
      quote:
        "I am writing to recommend Mun Wai Looi for any position that requires strong analytical skills, dedication, and the ability to work effectively in a team environment. During his time as a research assistant, Mun Wai demonstrated exceptional commitment to his work and consistently delivered high-quality results.",
      author: "Dr. Freya Cristea",
      role: "Senior Lecturer",
      organization: "RMIT University",
      context: "Psychology Department",
    },
    {
      id: 6,
      quote:
        "Mun Wai has been an invaluable member of our team, bringing fresh perspectives and innovative solutions to complex challenges. His dedication to excellence and collaborative spirit make him a standout contributor.",
      author: "Caleb and Sean",
      role: "Program Coordinators",
      organization: "RMIT Plus",
      context: "Student Ambassador Program",
    },
    {
      id: 7,
      quote:
        "As a peer mentor, Mun Wai demonstrated exceptional leadership qualities and a genuine commitment to supporting fellow students. His ability to connect with mentees and provide meaningful guidance was truly outstanding.",
      author: "Mel Kidman",
      role: "Peer Mentoring Coordinator",
      organization: "RMIT University",
      context: "Peer Mentoring Program",
    },
    {
      id: 8,
      quote:
        "He is diligent, passionate, and demonstrates a strong understanding of psychological principles. His ability to apply theoretical knowledge to practical situations is commendable, and he consistently shows initiative in his learning and research endeavors.",
      author: "Nikos Thomacos",
      role: "Academic Supervisor",
      organization: "RMIT University",
      context: "Undergraduate Psychology Program",
    },
    {
      id: 9,
      quote:
        "Mun Wai's contributions in the classroom and his ability to apply his learning to real-world challenges align well with the values and capability outcomes of RMIT graduates.",
      author: "Dr. Ashenafi Biru",
      role: "Program Manager",
      organization: "RMIT University",
      context: "Foundation of Entrepreneurship",
    },
  ];

  useEffect(() => {
    const swiper = new Swiper(".testimonialSwiper", {
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

  const nextTestimonial = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevTestimonial = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-slate-800 dark:text-white mb-6 transition-colors duration-300">
          Testimonials
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          What colleagues and mentors say about my work
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative max-w-4xl mx-auto">
        <div className="swiper testimonialSwiper">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div className="swiper-slide" key={testimonial.id}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-slate-200 dark:border-slate-700">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-300 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 dark:text-white transition-colors duration-300">
                          {testimonial.author}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">
                          {testimonial.organization}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                          {testimonial.context}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
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
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
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
  );
};

export default TestimonialCarousel;

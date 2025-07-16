import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-16 px-6 bg-white dark:bg-slate-800 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12 transition-colors duration-300">
          What People Say
        </h2>

        <div className="relative">
          <div
            className="bg-slate-50 dark:bg-slate-700 rounded-lg p-8 shadow-lg transition-colors duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4 transition-colors duration-300" />

            <blockquote className="text-lg text-slate-700 dark:text-slate-200 mb-6 leading-relaxed transition-colors duration-300">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <cite className="text-slate-800 dark:text-white font-semibold not-italic transition-colors duration-300">
                  {currentTestimonial.author}
                </cite>
                <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
                  {currentTestimonial.role}
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium transition-colors duration-300">
                  {currentTestimonial.organization}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs transition-colors duration-300">
                  {currentTestimonial.context}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="sm"
              className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              {!isMobile && <span className="ml-1">Previous</span>}
            </Button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="sm"
              className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-300"
            >
              {!isMobile && <span className="mr-1">Next</span>}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 text-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
              {currentIndex + 1} of {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

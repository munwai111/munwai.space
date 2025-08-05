import React, { useEffect } from "react";
import Swiper from "swiper";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const SwiperCards = () => {
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      effect: "cards",
      grabCursor: true,
      modules: [EffectCards],
    });

    return () => {
      if (swiper) {
        swiper.destroy();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
          <div className="swiper-slide">Slide 4</div>
          <div className="swiper-slide">Slide 5</div>
          <div className="swiper-slide">Slide 6</div>
          <div className="swiper-slide">Slide 7</div>
          <div className="swiper-slide">Slide 8</div>
          <div className="swiper-slide">Slide 9</div>
        </div>
      </div>
    </div>
  );
};

export default SwiperCards;

"use client";
import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import EventsItem from "../components/EventsItem";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// import section css
import "./events.css";

export default function Events() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEventsData = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setSlides(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <section id="events" className="events">
      <div className="container" data-aos="fade-up">
        <SectionTitle
          title="Private Events"
          subtitle="Celebrate Special Moments at Di Menna"
        />

        <div
          className="events-description text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p>
            From intimate gatherings to grand celebrations, our dedicated team
            will create a memorable Italian experience for your special
            occasion.
          </p>
        </div>

        <div className="events-wrapper" data-aos="fade-up" data-aos-delay="200">
          {loading ? (
            <div className="events-loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <Swiper
                spaceBetween={0}
                effect={"fade"}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".events-pagination",
                  type: "bullets",
                  clickable: true,
                  dynamicBullets: true,
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                loop={true}
                className="events-slider"
              >
                {slides &&
                  slides.length > 0 &&
                  slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      <EventsItem item={slide} />
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className="events-navigation">
                <div className="events-pagination"></div>
              </div>
            </>
          )}
        </div>

        <div className="events-footer" data-aos="fade-up" data-aos-delay="300">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p>
                Custom menus and event packages available. Contact us to discuss
                your specific requirements.
              </p>
              <div className="events-cta">
                <a href="#contact" className="btn-contact">
                  <span>Contact for Events</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import Glightbox from "glightbox";
import "./hero.css";
import HeroBtn from "../components/HeroBtn";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize GLightbox
    const lightbox = new Glightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });

    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lightbox.destroy();
    };
  }, []);

  return (
    <section id="hero" className="d-flex align-items-center">
      <div
        className="container position-relative text-center text-lg-start"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <div className="row">
          <div className="col-lg-8">
            <h1>
              Welcome to <span>Di Menna</span>
            </h1>
            <h2>Authentic Italian Cuisine Since 1971</h2>
            <p className="hero-subtitle">
              A family tradition of excellence for over 50 years in Montréal
            </p>

            <div className="btns">
              <HeroBtn name="Our Menu" target="menu" icon="book" />
              <HeroBtn
                name="Book a Table"
                target="book-a-table"
                icon="calendar-check"
              />
            </div>
          </div>
          <div
            className={`col-lg-4 d-flex align-items-center justify-content-${
              isMobile ? "center" : "center"
            } position-relative`}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <a
              href="https://www.youtube.com/watch?v=m4_lwG2XOMk&ab_channel=Reunity"
              className="glightbox play-btn"
              aria-label="Watch our story"
            ></a>
          </div>
        </div>
      </div>
    </section>
  );
}

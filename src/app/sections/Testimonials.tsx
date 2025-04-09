"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import "./testimonials.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

// import required modules
import { EffectCards, Autoplay, Pagination } from "swiper/modules";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const getTestimonialsData = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTestimonialsData();
  }, []);

  // Function to get initials from client name
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Function to generate random stars (between 4 and 5)
  const getStars = () => {
    return Math.random() > 0.3 ? 5 : 4;
  };

  // Generate date for testimonial (within last 3 months)
  const getRandomDate = () => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const randomTime =
      threeMonthsAgo.getTime() +
      Math.random() * (today.getTime() - threeMonthsAgo.getTime());
    const randomDate = new Date(randomTime);

    return randomDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Testimonials" subtitle="What Our Guests Say" />

        <div
          className="testimonials-intro text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p>
            Discover the experiences of our valued guests who have enjoyed our
            authentic Italian cuisine and warm hospitality.
          </p>
        </div>

        <div
          className="row align-items-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="col-lg-5 testimonials-stats">
            <div className="stats-content">
              <div className="rating-overview">
                <div className="rating-value">4.8</div>
                <div className="rating-stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                </div>
                <div className="rating-count">Based on 458 reviews</div>
              </div>

              <div className="rating-sources">
                <div className="source-item">
                  <img src="/assets/images/google-logo.png" alt="Google" />
                  <div className="source-rating">
                    <span className="value">4.9</span>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>

                <div className="source-item">
                  <img src="/assets/images/yelp-logo.png" alt="Yelp" />
                  <div className="source-rating">
                    <span className="value">4.7</span>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                </div>

                <div className="source-item">
                  <img
                    src="/assets/images/tripadvisor-logo.png"
                    alt="TripAdvisor"
                  />
                  <div className="source-rating">
                    <span className="value">4.8</span>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="customer-quote">
                <i className="bi bi-quote"></i>
                <p>
                  Di Menna's authentic flavors transport me back to my summers
                  in Italy with every bite.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-7 testimonials-carousel">
            {isLoading ? (
              <div className="testimonials-loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="testimonials-cards-container">
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay, Pagination]}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    el: ".testimonials-pagination",
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="testimonials-swiper"
                >
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="testimonial-card">
                        <div className="testimonial-header">
                          {testimonial.avatar ? (
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.client}
                              className="testimonial-avatar"
                            />
                          ) : (
                            <div className="testimonial-initials">
                              {getInitials(testimonial.client)}
                            </div>
                          )}

                          <div className="testimonial-meta">
                            <h3>{testimonial.client}</h3>
                            <span className="testimonial-position">
                              {testimonial.position}
                            </span>

                            <div className="testimonial-rating">
                              {[...Array(getStars())].map((_, i) => (
                                <i key={i} className="bi bi-star-fill"></i>
                              ))}
                              {getStars() === 4 && (
                                <i className="bi bi-star"></i>
                              )}
                            </div>
                          </div>

                          <div className="testimonial-date">
                            {getRandomDate()}
                          </div>
                        </div>

                        <div className="testimonial-content">
                          <p>{testimonial.content}</p>
                        </div>

                        <div className="testimonial-footer">
                          <div className="testimonial-source">
                            <i className="bi bi-google"></i>
                            <span>Posted on Google</span>
                          </div>
                          <div className="testimonial-verified">
                            <i className="bi bi-patch-check-fill"></i>
                            <span>Verified Visit</span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="testimonials-controls">
                  <div className="testimonials-pagination"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="testimonials-footer"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a
            href="https://g.page/r/dimenna/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-leave-review"
          >
            <i className="bi bi-pencil-square"></i>
            <span>Leave Your Review</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// src/app/sections/Events.tsx
"use client";
import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import EventsItem from "../components/EventsItem"; // Ensure this component expects `item` of type `EventSlide`

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // if you are using fade effect

// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// import section css
import "./events.css"; // Ensure this CSS file exists and is correctly styled

// Define the interface for the structure of your event data
// This interface is now updated to match what EventsItem expects
interface EventSlide {
  id: number; // As expected by EventsItem
  image: string; // As expected by EventsItem
  title: string; // As expected by EventsItem
  price: number; // As expected by EventsItem (was string in placeholder, now number)
  content: string; // As expected by EventsItem
  details: string[]; // As expected by EventsItem (array of strings)
  summary: string; // As expected by EventsItem
  // You can add any other properties that your API might return and you might use elsewhere,
  // but these are the ones EventsItem seems to require.
}

export default function Events() {
  const [slides, setSlides] = useState<EventSlide[]>([]); // Explicitly typed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  const getEventsData = () => {
    setLoading(true);
    setError(null); // Reset error before new fetch
    fetch("http://localhost:3000/api/events") // Ensure this API returns data matching EventSlide[]
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch events: ${res.status} ${res.statusText}`
          );
        }
        return res.json();
      })
      .then((data: EventSlide[]) => {
        // Explicitly type the fetched data
        setSlides(data);
        setLoading(false);
      })
      .catch((e: Error) => {
        // Catch block with typed error
        console.error("Failed to fetch events:", e.message);
        setError(
          `Failed to load events. Please try again later. (${e.message})`
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getEventsData();
  }, []); // Empty dependency array means this runs once on mount

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
              {" "}
              {/* Style this loading container */}
              <div className="spinner"></div> {/* Style this spinner */}
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div
              className="events-error text-center"
              style={{ color: "red", padding: "20px" }}
            >
              <p>{error}</p>
              <button
                onClick={getEventsData}
                className="btn-retry"
                style={{ marginTop: "10px" }}
              >
                Retry
              </button>{" "}
              {/* Style btn-retry */}
            </div>
          ) : slides && slides.length > 0 ? (
            <>
              <Swiper
                spaceBetween={0} // Adjust as needed
                effect={"fade"}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: ".events-pagination",
                  type: "bullets",
                  clickable: true,
                  dynamicBullets: true, // If you want dynamic bullets
                }}
                modules={[Autoplay, Pagination, EffectFade]}
                loop={slides.length > 1} // Enable loop only if more than one slide
                className="events-slider" // Your custom class for styling the Swiper container
              >
                {slides.map(
                  (
                    slide // slide is now correctly typed as EventSlide
                  ) => (
                    <SwiperSlide key={slide.id}>
                      {" "}
                      {/* slide.id is now recognized and correctly typed */}
                      <EventsItem item={slide} />{" "}
                      {/* EventsItem should expect an item of type EventSlide */}
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              {slides.length > 1 && ( // Only show pagination if there's more than one slide
                <div className="events-navigation">
                  <div className="events-pagination"></div>{" "}
                  {/* This is where pagination bullets will render */}
                </div>
              )}
            </>
          ) : (
            <p className="text-center no-events-message">
              {" "}
              {/* Style this message */}
              Currently, there are no special events to display. Please check
              back soon!
            </p>
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
                  {" "}
                  {/* Style this button */}
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

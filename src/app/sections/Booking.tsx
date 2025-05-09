// src/app/sections/Booking.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../components/SectionTitle"; // Adjust path if necessary
import "./booking.css"; // Your styles for this section

// Define a unique ID for the OpenTable container
const OPENTABLE_WIDGET_CONTAINER_ID = "ot-widget-container-dimenna-booking";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("19:00"); // Default to a common time
  const [partySize, setPartySize] = useState("2");
  const openTableContainerRef = useRef<HTMLDivElement>(null); // Ref for the direct widget container

  // --- IMPORTANT: REPLACE WITH YOUR ACTUAL OPENTABLE RESTAURANT ID ---
  const openTableRestaurantId = "YOUR_REAL_OPENTABLE_RESTAURANT_ID_HERE";
  // --- IMPORTANT: REPLACE WITH YOUR ACTUAL OPENTABLE RESTAURANT ID ---

  const partySizes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "10",
    "12",
    "15",
    "20",
  ];

  const popularTimes = [
    { label: "Lunch (12:00 PM)", time: "12:00" },
    { label: "Early Eve (5:30 PM)", time: "17:30" },
    { label: "Dinner (7:00 PM)", time: "19:00" },
    { label: "Late Eve (9:00 PM)", time: "21:00" },
  ];

  useEffect(() => {
    if (
      !openTableRestaurantId ||
      openTableRestaurantId === "YOUR_REAL_OPENTABLE_RESTAURANT_ID_HERE"
    ) {
      console.warn(
        "OpenTable Restaurant ID is not set. Booking widget will not load."
      );
      if (openTableContainerRef.current) {
        openTableContainerRef.current.innerHTML =
          "<p style='color: orange; text-align: center;'>Booking widget configuration is pending.</p>";
      }
      return;
    }

    // Ensure the container exists before trying to load the script (for direct widget embed)
    if (!openTableContainerRef.current) {
      // This check is more relevant if you ONLY use the direct embed.
      // If you also have the redirect form, this might not be an issue.
      // console.warn("OpenTable container ref for direct widget not found initially.");
    }

    const scriptId = "opentable-widget-loader-script";
    // Prevent duplicate script injection if component re-renders for other reasons
    if (document.getElementById(scriptId)) {
      // console.log("OpenTable script already in DOM.");
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.opentable.com/widget/reservation/loader?rid=${openTableRestaurantId}&domain=com&type=standard&theme=standard&lang=en-US&overlay=false&iframe=true&widgetview=true`;
    script.async = true;

    document.body.appendChild(script);
    // The script, when loaded, is expected to find and populate the div with id OPENTABLE_WIDGET_CONTAINER_ID

    return () => {
      // Clean up the loader script tag itself
      const existingScript = document.getElementById(scriptId);
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }

      // Clean up the OpenTable widget from its designated container
      if (openTableContainerRef.current) {
        // OpenTable often injects an iframe.
        const otIframe = openTableContainerRef.current.querySelector(
          `iframe[src*="opentable.com/widget"], iframe[src*="otrestaurant.com"]` // More specific iframe selectors
        );
        if (otIframe) {
          otIframe.remove();
        }
        // Clear any other content OpenTable might have put in our designated container
        openTableContainerRef.current.innerHTML = "";
      }

      // AGGRESSIVE GLOBAL CLEANUP FOR ROGUE OPENTABLE ELEMENTS
      // These selectors target common global elements OpenTable might inject.
      // You might need to inspect your page and add/modify these based on what you find.
      const rogueSelectors = [
        'iframe[src*="opentable.com"][style*="display: none"]', // Hidden tracking iframes
        'iframe[name^="opentable"]',
        'iframe[id^="ot-"]',
        'div[id^="ot-"]',
        'div[class*="ot-"]', // Be cautious with class-based general selectors
        'div[class*="OT_"]',
        "div[data-ot-template]",
        ".ot-reservations-widget-modal-open", // Modal related classes
        ".ot-modal-container",
        ".ot-widget-overlay",
        'div[aria-labelledby^="ot-modal-title"]',
        'script[src*="opentable.com/widget"]', // Other OT scripts
        'link[href*="opentable.com/widget"]', // OT stylesheets
      ];

      rogueSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          // Safety check: Only remove if it's a direct child of body OR
          // not contained within your main React app root (adjust 'root' if your app's root ID is different)
          // AND ensure it's not our script loader or our designated container.
          const mainReactAppRoot =
            document.getElementById("root") || document.body; // Fallback to body if no 'root'
          if (el.id !== scriptId && el.id !== OPENTABLE_WIDGET_CONTAINER_ID) {
            if (
              el.parentElement === document.body ||
              !mainReactAppRoot.contains(el)
            ) {
              // console.log("Attempting to remove rogue OpenTable element:", el);
              el.remove();
            }
          }
        });
      });

      // Remove classes OpenTable might add to the body for modals etc.
      document.body.classList.remove(
        "ot-modal-open",
        "ot-body-no-scroll",
        "ReactModal__Body--open"
      );
    };
  }, [openTableRestaurantId]); // Re-run if restaurant ID changes

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";
    // Appending T00:00:00 helps ensure consistent date parsing across browsers
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      // English (US) locale for date formatting
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getTodayForMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const handleReservationRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your reservation.");
      return;
    }

    // Format date and time for OpenTable URL parameter (YYYY-MM-DD and HH:MM)
    const dateForParam = selectedDate;
    const timeForParam = selectedTime;

    // Construct OpenTable URL (check OpenTable documentation for the most current URL structure)
    // This is a common structure for redirecting to the reservation page with pre-filled details
    const openTableUrl = `https://www.opentable.com/restaurant/profile/${openTableRestaurantId}/search?dtpDate=${dateForParam}&dtpTime=${timeForParam}&partySize=${partySize}&徠form=true&corrid=some-unique-identifier`;
    // Alternative structure:
    // const openTableUrl = `https://www.opentable.com/restref/client/?rid=${openTableRestaurantId}&restref=${openTableRestaurantId}&datetime=${dateForParam}T${timeForParam}&partysize=${partySize}&domain=com&lang=en-US&corrid=optional-correlation-id`;

    window.open(openTableUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book-a-table" className="book-a-table">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Reservations" subtitle="Book Your Table" />
        <div className="booking-wrapper">
          <div className="row gy-4">
            {" "}
            {/* gy-4 for vertical gutter between columns on mobile */}
            <div
              className="col-lg-5 booking-content"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="booking-info">
                <h3>Dine With Us at Di Menna</h3>
                <p>
                  Experience authentic Italian cuisine in an elegant atmosphere.
                  Easily book your table using our form or directly via
                  OpenTable.
                </p>

                <div className="booking-details">
                  <div className="detail-item">
                    <i className="bi bi-clock-fill"></i>
                    <div>
                      <h4>Opening Hours</h4>
                      <p>
                        Tuesday - Thursday: 11:00 AM - 10:00 PM
                        <br />
                        Friday - Saturday: 11:00 AM - 11:00 PM
                        <br />
                        Sunday: 11:00 AM - 9:00 PM
                        <br />
                        Monday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div>
                      <h4>Location</h4>
                      <p>
                        6313 Jarry Street East
                        <br />
                        Saint-Léonard, Montréal, QC H1P 1W1
                      </p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <h4>Contact</h4>
                      <p>
                        (514) 326-4200
                        {/* <br />
                        reservations@dimenna.com {/* Optional if all bookings via OT */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-7 opentable-widget-area"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* OPTION 1: Custom Form to Redirect to OpenTable */}
              <div className="custom-booking-form-container">
                <div className="reservation-header">
                  <h4>Make a Reservation</h4>
                  <div className="opentable-badge">
                    <span>Powered by</span>
                    <img
                      src="/assets/images/opentable-logo.png" // Ensure this path is correct
                      alt="OpenTable"
                    />
                  </div>
                </div>
                <form
                  className="booking-form validate-form"
                  onSubmit={handleReservationRedirect}
                >
                  <div className="row">
                    <div className="col-md-4 form-group">
                      <label htmlFor="booking-party-size">Guests</label>
                      <select
                        id="booking-party-size"
                        className="form-select" // Use Bootstrap 5 class or your custom styled select
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        required
                      >
                        {partySizes.map((size) => (
                          <option key={size} value={size}>
                            {size} {parseInt(size) === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 form-group">
                      <label htmlFor="booking-date">Date</label>
                      <input
                        id="booking-date"
                        type="date"
                        className="form-control"
                        min={getTodayForMinDate()}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label htmlFor="booking-time">Time</label>
                      <input
                        id="booking-time"
                        type="time"
                        className="form-control"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        step="900" // 15-minute intervals (900 seconds)
                      />
                    </div>
                  </div>
                  {selectedDate && (
                    <div className="selected-date-display">
                      {formatDateForDisplay(selectedDate)}
                    </div>
                  )}
                  <div className="popular-times-container">
                    <label className="popular-times-label">
                      Popular Times:
                    </label>
                    <div className="popular-times">
                      {popularTimes.map((timeOption) => (
                        <button
                          type="button"
                          key={timeOption.time}
                          className={`time-btn ${
                            selectedTime === timeOption.time ? "active" : ""
                          }`}
                          onClick={() => setSelectedTime(timeOption.time)}
                        >
                          {timeOption.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="app-btn mt-3">
                      {/* Using your existing AppBtn styling potentially */}
                      Check Availability
                    </button>
                  </div>
                </form>
              </div>

              {/* OPTION 2: Embed the OpenTable Widget Directly */}
              {/* The loader script in useEffect is meant to populate the div below */}
              <div className="opentable-direct-widget-container mt-5">
                <h4 className="text-center mb-3">Or Book Directly Here:</h4>
                <div
                  ref={openTableContainerRef}
                  id={OPENTABLE_WIDGET_CONTAINER_ID}
                  style={{ minHeight: "300px" }}
                >
                  {/* OpenTable widget will be injected here by its script */}
                  {/* You can add a loading spinner here that gets replaced by the widget */}
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#ccc",
                    }}
                  >
                    Loading reservation module...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

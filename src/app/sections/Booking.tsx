// src/app/sections/Booking.tsx
"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle"; // Ensure this path is correct
import "./booking.css"; // Ensure this path is correct

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [partySize, setPartySize] = useState("2"); // partySize is a string
  // const [isOpenTableLoaded, setIsOpenTableLoaded] = useState(false); // This variable is not used, you might remove it if not needed

  // OpenTable restaurant ID for Di Menna (this is a placeholder - replace with actual ID)
  const openTableRestaurantId = "123456"; // Replace with your actual OpenTable restaurant ID

  // Available party sizes
  const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "12"];

  // Popular times for quick selection
  const popularTimes = [
    { label: "Lunch", time: "12:00" },
    { label: "Early Dinner", time: "17:30" },
    { label: "Dinner", time: "19:00" },
    { label: "Late Dinner", time: "21:00" },
  ];

  // Initialize OpenTable widget when component mounts
  useEffect(() => {
    // Load OpenTable script
    const script = document.createElement("script");
    script.src =
      "https://www.opentable.com/widget/reservation/loader?rid=" +
      openTableRestaurantId +
      "&domain=com&type=standard&theme=standard&lang=en-US&overlay=false&iframe=true";
    script.async = true;
    // script.onload = () => setIsOpenTableLoaded(true); // If isOpenTableLoaded is not used, this line can be removed
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      // A more robust cleanup might be needed depending on OpenTable's widget behavior
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [openTableRestaurantId]); // Add openTableRestaurantId to dependencies

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      // English locale for date formatting
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const getToday = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle OpenTable redirect
  const handleReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validate inputs
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your reservation.");
      return;
    }

    // Date for OpenTable parameter (YYYY-MM-DD)
    const dateForParam = selectedDate;
    // Time for OpenTable parameter (HH:MM)
    const timeForParam = selectedTime;

    // Construct OpenTable URL
    const openTableUrl = `https://www.opentable.com/restref/client/?rid=${openTableRestaurantId}&restref=client&datetime=${dateForParam}T${timeForParam}&party=${partySize}&domain=com&lang=en-US`;

    // Redirect to OpenTable in a new tab
    window.open(openTableUrl, "_blank");
  };

  return (
    <section id="book-a-table" className="book-a-table">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Reservations" subtitle="Book Your Table" />

        <div className="booking-wrapper">
          <div className="row">
            <div
              className="col-lg-6 booking-content"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="booking-info">
                <h3>Dine with Us at Di Menna</h3>
                <p>
                  Experience authentic Italian cuisine in an elegant atmosphere.
                  Our tables are available for reservation through OpenTable.
                </p>

                <div className="booking-details">
                  <div className="detail-item">
                    <i className="bi bi-clock"></i>
                    <div>
                      <h4>Hours</h4>
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
                    <i className="bi bi-geo-alt"></i>
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
                    <i className="bi bi-telephone"></i>
                    <div>
                      <h4>Contact</h4>
                      <p>
                        (514) 326-4200
                        <br />
                        reservations@dimenna.com{" "}
                        {/* Ensure this email is correct */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 booking-form-wrapper"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="booking-form-container">
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

                <form className="booking-form" onSubmit={handleReservation}>
                  <div className="form-group">
                    <label>Party Size</label>
                    <select
                      className="form-control" // Ensure you have styles for .form-control
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                    >
                      {partySizes.map((size) => (
                        <option key={size} value={size}>
                          {size} {parseInt(size) === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      min={getToday()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                    {selectedDate && (
                      <div className="selected-date-display">
                        {" "}
                        {/* Style this class for a nice display */}
                        {formatDate(selectedDate)}
                      </div>
                    )}
                  </div>

                  <div className="form-group time-selection">
                    <label>Time</label>
                    <div className="popular-times">
                      {" "}
                      {/* Style this class */}
                      {popularTimes.map((timeOption) => (
                        <button
                          type="button"
                          key={timeOption.time}
                          className={`time-btn ${
                            /* Style .time-btn and .active */
                            selectedTime === timeOption.time ? "active" : ""
                          }`}
                          onClick={() => setSelectedTime(timeOption.time)}
                        >
                          {timeOption.label} {/* e.g., "Lunch", "Dinner" */}
                        </button>
                      ))}
                    </div>
                    <input
                      type="time"
                      className="form-control"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      step="900" // e.g., 15-minute increments (900 seconds)
                    />
                  </div>

                  <div className="form-footer">
                    <button type="submit" className="reservation-btn">
                      {" "}
                      {/* Style .reservation-btn */}
                      <span>Find a Table</span>
                      <i className="bi bi-arrow-right-circle"></i>
                    </button>

                    <p className="reservation-note">
                      {" "}
                      {/* Style .reservation-note */}
                      By clicking "Find a Table" you will be redirected to
                      OpenTable to complete your reservation.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Commented section, uncomment if needed
        <div
          className="reservation-footer"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p>
            For parties larger than 12 or special events, please contact us
            directly at (514) 326-4200 or email events@dimenna.com
          </p>
        </div>
        */}
      </div>
    </section>
  );
}

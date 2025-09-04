// src/app/sections/Booking.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../components/SectionTitle"; // Adjust path if necessary
import "./booking.css"; // Your styles for this section
import Image from "next/image";
import { useTranslation } from "../contexts/TranslationContext";

// Define a unique ID for the OpenTable container (used by embedded widget if you enable it)
const OPENTABLE_WIDGET_CONTAINER_ID = "ot-widget-container-dimenna-booking";

export default function Booking() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("19:00"); // Default to 7:00 PM
  const [partySize, setPartySize] = useState("2");
  const openTableContainerRef = useRef<HTMLDivElement>(null);

  // --- YOUR OPENTABLE CONFIGURATION ---
  const openTableRestaurantId = "264712"; // YOUR OPENTABLE ID
  const openTableRestaurantSlug = "restaurant-di-menna-reservations-montreal"; // YOUR OPENTABLE SLUG
  const openTableDomain = "opentable.ca"; // Domain for Canada
  const openTableLang = "en-CA"; // Language (en-CA or fr-CA if supported by OT for destination)
  // --- END OPENTABLE CONFIGURATION ---

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
    { label: t("booking.popularTimeLabels.lunch"), time: "12:00" },
    { label: t("booking.popularTimeLabels.earlyEve"), time: "17:30" },
    { label: t("booking.popularTimeLabels.dinner"), time: "19:00" },
    { label: t("booking.popularTimeLabels.lateEve"), time: "21:00" },
  ];

  // useEffect to load the SCRIPT for the EMBEDDED WIDGET (OPTION 2)
  // If you ONLY use redirection (OPTION 1), this useEffect is less critical
  // but useful if you decide to enable OPTION 2.
  useEffect(() => {
    if (!openTableRestaurantId) {
      console.warn(
        "OpenTable Restaurant ID is not set. Booking widget will not load."
      );
      if (openTableContainerRef.current) {
        openTableContainerRef.current.innerHTML =
          "<p style='color: orange; text-align: center;'>Booking widget configuration is pending.</p>";
      }
      return;
    }

    const scriptId = "opentable-widget-loader-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://${openTableDomain}/widget/reservation/loader?rid=${openTableRestaurantId}&domain=${
      openTableDomain.split(".")[1]
    }&type=standard&theme=standard&lang=${openTableLang}&overlay=false&iframe=true&widgetview=true`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
      if (openTableContainerRef.current) {
        openTableContainerRef.current.innerHTML = "";
      }
      const rogueSelectors = [
        `iframe[src*="${openTableDomain}"][style*="display: none"]`,
        'iframe[name^="opentable"]',
        'iframe[id^="ot-"]',
        'div[id^="ot-"]',
        'div[class*="ot-"]',
        'div[class*="OT_"]',
        "div[data-ot-template]",
        ".ot-reservations-widget-modal-open",
        ".ot-modal-container",
        ".ot-widget-overlay",
        'div[aria-labelledby^="ot-modal-title"]',
        `script[src*="${openTableDomain}/widget"]`,
        `link[href*="${openTableDomain}/widget"]`,
      ];
      rogueSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (el.id !== scriptId && el.id !== OPENTABLE_WIDGET_CONTAINER_ID) {
            el.remove();
          }
        });
      });
      document.body.classList.remove(
        "ot-modal-open",
        "ot-body-no-scroll",
        "ReactModal__Body--open"
      );
    };
  }, [openTableRestaurantId, openTableDomain, openTableLang]);

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString(openTableLang, {
      // Use openTableLang for consistency
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getTodayForMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleReservationRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!openTableRestaurantId) {
      alert(
        "OpenTable Restaurant ID is not configured. Please contact support."
      );
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for your reservation.");
      return;
    }

    const dateForParam = selectedDate;
    const timeForParam = selectedTime;
    const dateTimeString = `${dateForParam}T${timeForParam}`;

    const openTableUrl = `https://${openTableDomain}/r/${openTableRestaurantSlug}?restref=${openTableRestaurantId}&datetime=${dateTimeString}&covers=${partySize}&lang=${openTableLang}&ot_source=RestaurantWebsite`;

    console.log("Redirecting to OpenTable:", openTableUrl);
    window.open(openTableUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="book-a-table" className="book-a-table">
      <div className="container" data-aos="fade-up">
        <SectionTitle
          title={t("booking.title")}
          subtitle={t("booking.subtitle")}
        />
        <div className="booking-wrapper">
          <div className="row gy-4">
            <div
              className="col-lg-5 booking-content"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="booking-info">
                <h3>{t("booking.dineWithUs")}</h3>
                <p>{t("booking.dineWithUsDescription")}</p>
                <div className="booking-details">
                  <div className="detail-item">
                    <i className="bi bi-clock-fill"></i>
                    <div>
                      <h4>{t("booking.info.hours")}</h4>{" "}
                      {/* Ou "Dining Room Hours" si vous préférez être plus spécifique ici aussi */}
                      <p>
                        {t("booking.hoursDetailed.tuesday")}
                        <br />
                        {t("booking.hoursDetailed.wednesday")}
                        <br />
                        {t("booking.hoursDetailed.thursday")}
                        <br />
                        {t("booking.hoursDetailed.friday")}
                        <br />
                        {t("booking.hoursDetailed.saturday")}
                        <br />
                        {t("booking.hoursDetailed.sunday")}
                        <br />
                        {t("booking.hoursDetailed.monday")}
                      </p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div>
                      <h4>{t("booking.info.location")}</h4>
                      <p>{t("booking.info.address")}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <h4>{t("booking.info.contact")}</h4>
                      <p>{t("booking.info.phone")}</p>
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
              {/* OPTION 1: Custom form redirecting to OpenTable (RECOMMENDED AND ENABLED) */}
              <div className="custom-booking-form-container">
                <div className="reservation-header">
                  <h4>{t("booking.makeReservation")}</h4>
                  <div className="opentable-badge">
                    <span>{t("booking.poweredBy")}</span>
                    <Image
                      src="/assets/images/opentable-logo.png" // VERIFY THIS PATH
                      alt="OpenTable"
                      width={200} // REPLACE WITH YOUR ACTUAL ORIGINAL IMAGE WIDTH
                      height={40} // REPLACE WITH YOUR ACTUAL ORIGINAL IMAGE HEIGHT
                      style={{
                        width: "100px", // Desired display width
                        height: "auto", // Auto height to maintain aspect ratio
                        marginLeft: "8px",
                        verticalAlign: "middle",
                      }}
                    />
                  </div>
                </div>
                <form
                  className="booking-form validate-form"
                  onSubmit={handleReservationRedirect}
                >
                  <div className="row">
                    <div className="col-md-4 form-group">
                      <label htmlFor="booking-party-size">
                        {t("booking.form.guests")}
                      </label>
                      <select
                        id="booking-party-size"
                        className="form-select"
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        required
                      >
                        {partySizes.map((size) => (
                          <option key={size} value={size}>
                            {size}{" "}
                            {parseInt(size) === 1
                              ? t("booking.form.guest")
                              : t("booking.form.guests_plural")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 form-group">
                      <label htmlFor="booking-date">
                        {t("booking.form.date")}
                      </label>
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
                      <label htmlFor="booking-time">
                        {t("booking.form.time")}
                      </label>
                      <input
                        id="booking-time"
                        type="time"
                        className="form-control"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                        step="900" // 15-minute intervals
                      />
                    </div>
                  </div>
                  {selectedDate && (
                    <div className="selected-date-display mt-2">
                      {formatDateForDisplay(selectedDate)}
                    </div>
                  )}
                  <div className="popular-times-container mt-3">
                    <label className="popular-times-label">
                      {t("booking.form.popularTimes")}
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
                      {t("booking.checkAvailability")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

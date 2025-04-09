"use client";

import React from "react";
import SectionTitle from "../components/SectionTitle";
import "./menu.css";

export default function Menu() {
  return (
    <section id="menu" className="menu-download">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Our Menu" subtitle="Authentic Italian Cuisine" />

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="menu-download-container"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="menu-content">
                <h3>Discover Our Traditional Italian Delights</h3>
                <p>
                  Since 1971, Di Menna has been serving authentic Italian
                  cuisine made with the freshest ingredients and traditional
                  family recipes. From our handmade pasta to our wood-fired
                  pizzas and chef's specialties, each dish is prepared with
                  passion and expertise.
                </p>
                <p>
                  Download our menu below to explore our complete selection of
                  antipasti, pasta, pizza, secondi, and dolci.
                </p>

                <div className="menu-categories">
                  <div className="category">
                    <i className="bi bi-egg-fried"></i>
                    <span>Antipasti</span>
                  </div>
                  <div className="category">
                    <i className="bi bi-cup-hot"></i>
                    <span>Zuppe</span>
                  </div>
                  <div className="category">
                    <i className="bi bi-award"></i>
                    <span>Pasta</span>
                  </div>
                  <div className="category">
                    <i className="bi bi-circle"></i>
                    <span>Pizza</span>
                  </div>
                  <div className="category">
                    <i className="bi bi-apple"></i>
                    <span>Dolci</span>
                  </div>
                </div>

                <div className="menu-download-buttons">
                  <a
                    href="/assets/menu/dimenna-menu.pdf"
                    download
                    className="download-btn"
                  >
                    <i className="bi bi-download"></i> Download Dinner Menu
                  </a>
                  <a
                    href="/assets/menu/dimenna-wine.pdf"
                    download
                    className="download-btn wine"
                  >
                    <i className="bi bi-download"></i> Download Wine List
                  </a>
                </div>
              </div>

              <div className="menu-image">
                <div className="image-container">
                  <div className="menu-overlay">
                    <div className="overlay-content">
                      <h4>Serving daily from</h4>
                      <p className="hours">11:00 AM - 11:00 PM</p>
                      <span className="divider"></span>
                      <p className="since">Authentic Italian Since 1971</p>
                    </div>
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

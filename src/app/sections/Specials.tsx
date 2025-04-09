"use client";

import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import SpecialsItem from "../components/SpecialsItem";
import "./specials.css";
import Preloader from "../components/Preloader";

export default function Specials() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState([
    {
      id: 1,
      name: "Chef's Signature Pasta",
      active: true,
    },
    {
      id: 2,
      name: "Seasonal Risotto",
      active: false,
    },
    {
      id: 3,
      name: "Wood-Fired Pizza",
      active: false,
    },
    {
      id: 4,
      name: "Weekend Selection",
      active: false,
    },
    {
      id: 5,
      name: "Family Platters",
      active: false,
    },
  ]);

  const getSpecialsData = () => {
    fetch("http://localhost:3000/api/specials")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    getSpecialsData();
  }, []);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleFilterActive = (id) => {
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      active: filter.id === id,
    }));
    setFilters(updatedFilters);
  };

  const handleSpecialChange = (id) => {
    handleFilterActive(id);
    const updatedItems = items.map((item) => ({
      ...item,
      active: item.id === id,
    }));
    setItems(updatedItems);
  };

  return (
    <section id="specials" className="specials">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Our Specialties" subtitle="Chef's Selection" />

        <div
          className="specials-description text-center"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <p>
            Experience our chef's carefully crafted specialties that capture the
            essence of traditional Italian cuisine with a modern twist.
          </p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 mb-4">
            <div className="specials-tabs-wrapper">
              <ul className="specials-tabs">
                {filters.map((filter) => (
                  <li className="specials-tab-item" key={filter.id}>
                    <a
                      className={`specials-tab-link ${
                        filter.active ? "active" : ""
                      }`}
                      onClick={() => handleSpecialChange(filter.id)}
                    >
                      <span>{filter.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="row specials-content"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="col-lg-12">
            <div className="tab-content">
              {!items ? (
                <Preloader />
              ) : items.length > 0 ? (
                items.map((item) => <SpecialsItem key={item.id} item={item} />)
              ) : (
                <Preloader />
              )}
            </div>
          </div>
        </div>

        <div
          className="specials-footer text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p>
            All specials are prepared daily with fresh ingredients. Specials may
            vary based on seasonal availability.
          </p>
          <div className="specials-cta">
            <a href="#book-a-table" className="btn-book">
              Reserve Your Table
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

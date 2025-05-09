"use client";

import React, { useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import ChefsItem from "../components/ChefsItem";

// Sample data for featured chef
const featuredChef = {
  id: 1,
  name: "Concezio Di Menna",
  position: "Executive Chef",
  photo: "/assets/images/chefs/chef_1.png", // Replace with actual image path
  bio: "Concezio Di Menna carries on the family legacy as the executive chef of Restaurant Di Menna, located at 6313 Jarry East in Montreal. Founded in 1971 by Franco Di Menna, the restaurant is known for its authentic Italian cuisine and warm, inviting atmosphere.",
  experience: "15",
  quote:
    "Cooking is about heart and tradition, passed down from generation to generation.",
  specialties: [
    "Traditional Italian Cuisine",
    "Artisanal Pizzas",
    "Homemade Fresh Pasta",
  ],
  achievements: [
    "Executive Chef at Restaurant Di Menna",
    "Continuing a family culinary tradition since 1971",
    "Renowned for excellence in Italian dining in Montreal",
  ],
};

export default function Chefs() {
  useEffect(() => {
    // Initialize AOS animation library
    if (typeof window !== "undefined") {
      import("aos").then(({ default: AOS }) => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: false,
          mirror: false,
        });
      });
    }
  }, []);

  return (
    <section id="chefs" className="chef-feature">
      <div className="container">
        <SectionTitle
          title="Featured Chef"
          subtitle="The Heart of Our Kitchen"
          center={true}
        />

        <ChefsItem item={featuredChef} />
      </div>
    </section>
  );
}

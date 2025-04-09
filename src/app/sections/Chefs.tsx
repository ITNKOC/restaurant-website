"use client";

import React, { useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import ChefsItem from "../components/ChefsItem";

// Sample data for featured chef
const featuredChef = {
  id: 1,
  name: "Michael Wilson",
  position: "Executive Chef",
  photo: "/assets/images/chefs/chefs-1.jpg", // Replace with your actual image path
  bio: "With over 15 years of culinary expertise, Chef Michael brings a wealth of international experience to our kitchen. He specializes in combining classic techniques with modern innovation, creating unforgettable dining experiences that celebrate the finest seasonal ingredients.",
  experience: "15",
  quote:
    "Cooking is about passion, so it may look slightly temperamental in a way that it's too assertive to the naked eye.",
  specialties: [
    "Modern French Cuisine",
    "Mediterranean Fusion",
    "Molecular Gastronomy",
  ],
  achievements: [
    "Michelin Star Chef (2018-2022)",
    "International Culinary Olympics Gold Medalist",
    "Featured in Gourmet Magazine's '40 Under 40'",
    "Graduate of Le Cordon Bleu, Paris",
    "Host of 'Cuisine Reimagined' Culinary Workshop Series",
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

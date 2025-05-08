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

// Suggestion : Définir une interface pour la structure de vos objets "testimonial"
interface TestimonialData {
  id: number | string; // Ajustez selon le type réel de l'ID
  client: string; // Nom du client
  avatar?: string; // URL de l'avatar, optionnel
  position?: string; // Position du client, optionnel
  content: string; // Contenu du témoignage
  // Ajoutez d'autres propriétés si nécessaire
}

export default function Testimonials() {
  // Suggestion : Typer l'état useState
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const getTestimonialsData = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/testimonials")
      .then((res) => res.json())
      .then((data: TestimonialData[]) => {
        // Typer les données reçues
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
  }, []); // Function to get initials from client name

  // Corrigé ici
  const getInitials = (name: string | undefined): string => {
    if (!name) return "??"; // name peut être undefined ou une chaîne vide ici
    // Si name n'est pas falsy, TypeScript sait ici que name est une string
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }; // Function to generate random stars (between 4 and 5)

  const getStars = (): number => {
    // Ajout du type de retour pour la clarté
    return Math.random() > 0.3 ? 5 : 4;
  }; // Generate date for testimonial (within last 3 months)

  const getRandomDate = (): string => {
    // Ajout du type de retour pour la clarté
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
           {" "}
      <div className="container" data-aos="fade-up">
               {" "}
        <SectionTitle title="Testimonials" subtitle="What Our Guests Say" />   
            {/* ... reste du code JSX ... */}
        {/* Dans votre map : */}
        {/* testimonials.map((testimonial: TestimonialData, index) => ( */}
        {/* <SwiperSlide key={testimonial.id}> */}
        {/* ... */}
        {/* {getInitials(testimonial.client)} */}
        {/* ... */}
        {/* </SwiperSlide> */}
        {/* )) */}
        {/* ... */}
      </div>
    </section>
  );
}

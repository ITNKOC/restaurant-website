"use client";

import React, { useState, useEffect, useCallback } from "react";
import SectionTitle from "../components/SectionTitle";
import GalleryItem from "../components/GalleryItem";
import Preloader from "../components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: number;
  image: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  const getGalleryData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/gallery");

      if (!res.ok) {
        throw new Error(`Failed to fetch gallery data: ${res.status}`);
      }

      const data = await res.json();
      setImages(data);
      setFilteredImages(data);
      // Pas besoin d'extraire les catégories

      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load gallery");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGalleryData();

    // Initialize AOS animation library
    if (typeof window !== "undefined") {
      import("aos").then(({ default: AOS }) => {
        AOS.init({
          duration: 800,
          easing: "ease-in-out",
          once: false,
          mirror: false,
        });
      });
    }
  }, [getGalleryData]);

  // Fonction de filtrage retirée

  // Retry loading if there was an error
  const handleRetry = () => {
    setError(null);
    getGalleryData();
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="gallery" className="gallery">
      <div className="container" data-aos="fade-up">
        <SectionTitle
          title="Notre Galerie"
          subtitle="Découvrez l'ambiance de notre restaurant"
        />

        {loading ? (
          <div className="text-center py-5">
            <Preloader />
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p className="text-danger mb-3">{error}</p>
            <button className="btn btn-outline-primary" onClick={handleRetry}>
              Réessayer
            </button>
          </div>
        ) : (
          <>
            {/* Filtres retirés comme demandé */}

            <div
              className="container-fluid py-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  className="row g-0"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  key="gallery" // Plus besoin de changer la clé car pas de filtrage
                >
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <GalleryItem key={image.id} item={image} index={index} />
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <p>Aucune image trouvée</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

import React, { useEffect, useState, useRef } from "react";
import Glightbox from "glightbox";
import "./galleryItem.css";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryItemProps {
  item: {
    id: number;
    image: string;
  };
  index: number;
}

export default function GalleryItem({ item, index }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Glightbox
    const lightbox = new Glightbox({
      selector: ".gallery-lightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      plyr: {
        css: "https://cdn.plyr.io/3.6.12/plyr.css",
        js: "https://cdn.plyr.io/3.6.12/plyr.js",
        config: {
          ratio: "16:9",
          fullscreen: { enabled: true },
        },
      },
    });

    // Observer for reveal animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Clean up on unmount
    return () => {
      lightbox.destroy();
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  // Generate randomized animation delay for natural feel
  const staggerDelay = 0.1 + (index % 8) * 0.05;

  return (
    <div
      className="gallery-item-container col-lg-3 col-md-4 col-sm-6"
      ref={imageRef}
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div
        className={`gallery-item ${isLoaded ? "loaded" : ""}`}
        style={{ animationDelay: `${staggerDelay}s` }}
      >
        <div className="gallery-overlay">
          <div className="gallery-buttons">
            <button
              className="view-btn"
              aria-label="View larger"
              onClick={(e) => {
                e.preventDefault();
                const lightboxElement = document.querySelector(
                  `#gallery-lightbox-${item.id}`
                );
                if (lightboxElement) {
                  (lightboxElement as HTMLElement).click();
                }
              }}
            >
              <i className="bi bi-zoom-in"></i>
            </button>
          </div>
        </div>

        <a
          href={item.image}
          className="gallery-lightbox"
          id={`gallery-lightbox-${item.id}`}
          data-gallery="gallery-item"
          data-glightbox=""
          aria-label={`View image ${item.id}`}
        >
          <div className="image-wrapper">
            <Image
              width={500}
              height={300}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={item.image}
              alt={`Gallery image ${item.id}`}
              className="gallery-image"
              onLoad={() => {
                // Small delay to ensure smooth transition
                setTimeout(() => setIsLoaded(true), 300);
              }}
              priority={item.id <= 4}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEggJ4FJXjBwAAAABJRU5ErkJggg=="
              placeholder="blur"
            />
            <div className="image-loader">
              <span className="loader-spinner"></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

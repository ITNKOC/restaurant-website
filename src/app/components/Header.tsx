"use client";

import React, { useState, useEffect } from "react";
import "./header.css";
import AppBtn from "./AppBtn";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scroll, setScroll] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Vérifiez si le menu est ouvert en surveillant la classe sur le body
  const isMenuOpen =
    typeof document !== "undefined"
      ? document.body.classList.contains("menu-open")
      : false;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ne pas cacher le header quand le menu est ouvert
      if (document.body.classList.contains("menu-open")) {
        setIsVisible(true);
      }
      // Déterminer la visibilité du header en fonction de la direction de défilement
      else if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScroll(currentScrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Vérifications initiales
    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <header
      id="header"
      className={`fixed-top d-flex align-items-center 
        ${scroll > 100 ? "header-scrolled" : ""} 
        ${!isVisible ? "header-hidden" : ""}
        ${isMobile ? "mobile-header" : ""}
        ${isMenuOpen ? "menu-open" : ""}`}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
        <div className="logo-container">
          <Link
            href="/"
            className="logo me-auto me-lg-0"
            aria-label="Di Menna Restaurant - Page d'accueil"
          >
            <Image
              src="/assets/images/logo2.svg"
              alt="Di Menna Restaurant"
              width={217}
              height={46}
              className="img-fluid"
              priority
            />
          </Link>
        </div>

        {/* Le menu de navigation est invisible en mobile, seul le bouton toggle est visible */}
        <div className="d-none d-lg-block">
          <Nav />
        </div>

        <div className="header-cta d-none d-lg-flex">
          <AppBtn name="Réserver une table" icon="calendar-check" />
        </div>
      </div>
    </header>
  );
}

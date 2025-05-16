"use client";

import React, { useState, useEffect } from "react";
import "./header.css";
import AppBtn from "./AppBtn";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isNavMenuOpen) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
          setIsHeaderVisible(false);
        } else if (
          currentScrollY < lastScrollY &&
          lastScrollY - currentScrollY > 5
        ) {
          setIsHeaderVisible(true);
        }
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
      setScrollPosition(currentScrollY);
    };

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let observer: MutationObserver | null = null;
    const navElement = document.getElementById("navbar");
    if (navElement) {
      observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const targetElement = mutation.target as HTMLElement;
            setIsNavMenuOpen(
              targetElement.classList.contains("mobile-menu-active")
            );
          }
        }
      });
      observer.observe(navElement, { attributes: true });
    } else {
      console.warn(
        "Header.tsx: #navbar element not found for MutationObserver. Mobile menu open state might not sync correctly with header styles."
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [lastScrollY, isNavMenuOpen]);

  return (
    <header
      id="header"
      className={`
        fixed-top d-flex align-items-center 
        ${scrollPosition > 100 && !isNavMenuOpen ? "header-scrolled" : ""} 
        ${
          !isHeaderVisible && scrollPosition > 100 && !isNavMenuOpen
            ? "header-hidden"
            : ""
        }
        ${isMobileView && !isNavMenuOpen ? "mobile-header-bg" : ""}
        ${isNavMenuOpen ? "menu-is-open" : ""}
      `}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <div className="logo-container">
          <Link
            href="/"
            className="logo"
            aria-label="Di Menna Restaurant - Homepage"
          >
            <Image
              src="/assets/images/logo2.svg"
              alt="Di Menna Restaurant Logo"
              width={180}
              height={38}
              className="img-fluid"
              priority
            />
          </Link>
        </div>

        {/* Wrapper pour Nav, important pour le positionnement mobile et desktop */}
        <div className="navigation-wrapper order-lg-2">
          <Nav />
        </div>

        <div className="header-cta d-none d-lg-flex align-items-center order-lg-3">
          <AppBtn
            name="Book a Table"
            section="book-a-table"
            icon="calendar-check"
          />
        </div>
      </div>
    </header>
  );
}

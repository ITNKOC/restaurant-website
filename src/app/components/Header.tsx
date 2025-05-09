"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useRef
import "./header.css";
import AppBtn from "./AppBtn"; // Assuming AppBtn.tsx is in the same directory or correct path
import Nav from "./Nav"; // Assuming Nav.tsx is in the same directory or correct path
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scroll, setScroll] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false); // State to track Nav's open state

  // Ref to observe Nav component's active class for mobile menu
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide header if Nav's mobile menu is open
      if (isNavMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > 100) {
        // Only apply hide/show logic after scrolling past 100px
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Near the top of the page
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScroll(currentScrollY);
    };

    const handleResize = () => {
      const mobileCheck = window.innerWidth <= 991; // Bootstrap lg breakpoint
      setIsMobile(mobileCheck);
      if (!mobileCheck && isNavMenuOpen) {
        // If resized to desktop while mobile menu was open, ensure Nav knows to close
        // This might require a callback prop from Nav or a more global state management
        // For now, this local state for header styling is primary.
      }
    };

    // Initial checks
    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Observer for Nav's open state (when Nav adds 'active' to its navbar-mobile class)
    // This is a more robust way to sync Header's knowledge of Nav's state
    let observer: MutationObserver | null = null;
    const navElement = document.getElementById("navbar"); // The <nav id="navbar"> inside Nav.tsx

    if (navElement) {
      observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const targetElement = mutation.target as HTMLElement;
            setIsNavMenuOpen(
              targetElement.classList.contains("navbar-mobile") &&
                targetElement.classList.contains("active")
            );
          }
        }
      });
      observer.observe(navElement, { attributes: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [lastScrollY, isNavMenuOpen]); // Added isNavMenuOpen dependency

  return (
    <header
      id="header"
      // `fixed-top` is Bootstrap, ensure it's needed if you're not using Bootstrap for layout
      // `d-flex align-items-center` are also Bootstrap
      className={`
        fixed-top d-flex align-items-center 
        ${scroll > 100 && !isNavMenuOpen ? "header-scrolled" : ""} 
        ${!isVisible && scroll > 100 && !isNavMenuOpen ? "header-hidden" : ""}
        ${isMobile && !isNavMenuOpen ? "mobile-header" : ""}
        ${isNavMenuOpen ? "menu-is-open" : ""}
      `}
    >
      {/* container-fluid and container-xl are Bootstrap classes */}
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <div className="logo-container">
          <Link
            href="/"
            className="logo" // Removed me-auto me-lg-0, handle spacing via justify-content-between on parent
            aria-label="Di Menna Restaurant - Homepage"
          >
            <Image
              src="/assets/images/logo2.svg" // Ensure this path is correct
              alt="Di Menna Restaurant Logo"
              width={200} // Adjusted for potentially smaller header
              height={42} // Adjusted for potentially smaller header
              className="img-fluid" // Bootstrap class
              priority // Good for LCP
            />
          </Link>
        </div>

        {/* Nav component is now ALWAYS rendered. 
            Its internal logic handles desktop vs mobile (hamburger) display.
            It should be a flex item to be positioned correctly by justify-content-between.
            If Nav needs to be pushed to the right, its own root div or the wrapper here can use ms-auto on desktop.
        */}
        <div className="navigation-wrapper ms-lg-auto" ref={navRef}>
          {" "}
          {/* ms-lg-auto pushes nav to right on large screens */}
          <Nav />
        </div>

        {/* CTA Button - hidden on mobile by Bootstrap d-none d-lg-flex */}
        <div className="header-cta d-none d-lg-flex align-items-center">
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

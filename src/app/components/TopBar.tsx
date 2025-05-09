"use client";

import React, { useState, useEffect, useRef } from "react";
import "./topBar.css";

interface SocialLink {
  id: number;
  icon: string;
  url: string;
  label: string;
}

interface Language {
  code: string;
  name: string;
  flag: string; // Added for image path
}

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false); // Changed from 'scroll' to 'scrolled' boolean
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // This state is key
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: "FR",
    name: "Français",
    flag: "fr",
  }); // Store object
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const socialLinks: SocialLink[] = [
    {
      id: 1,
      icon: "facebook",
      url: "https://facebook.com/dimennarestaurant",
      label: "Facebook",
    },
    {
      id: 2,
      icon: "instagram",
      url: "https://instagram.com/dimennarestaurant",
      label: "Instagram",
    },
    {
      id: 3,
      icon: "twitter",
      url: "https://twitter.com/dimennarestaurant",
      label: "Twitter",
    },
  ];

  const availableLanguages: Language[] = [
    { code: "FR", name: "Français", flag: "fr" },
    { code: "EN", name: "English", flag: "en" },
    { code: "JP", name: "日本語", flag: "jp" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Set boolean based on scroll position
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const checkMenuState = () => {
      // Check if the body has the class 'mobile-nav-active' (set by Nav.tsx)
      // Or check the navbar element directly
      const navbarMobileActive =
        document.body.classList.contains("mobile-nav-active") ||
        document.querySelector(".navbar-mobile.active");
      setMenuOpen(!!navbarMobileActive);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        showLanguageDropdown
      ) {
        setShowLanguageDropdown(false);
      }
    };

    handleScroll();
    handleResize();
    updateTime();
    checkMenuState(); // Initial check

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    // Use MutationObserver for more reliable menu state checking if class is added/removed from body or navbar
    const observer = new MutationObserver(checkMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      observer.observe(navbarElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      observer.disconnect();
      clearInterval(timeInterval);
    };
  }, [showLanguageDropdown]);

  const updateTime = () => {
    const now = new Date();
    // Consider locale for time formatting if you have multi-language
    setCurrentTime(
      now.toLocaleTimeString(
        selectedLanguage.code === "FR" ? "fr-CA" : "en-US",
        { hour: "2-digit", minute: "2-digit", hour12: false }
      )
    );
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    // Here you would typically i18n.changeLanguage(language.code);
    console.log("Language changed to:", language.code);
    updateTime(); // Update time format if necessary
  };

  return (
    <header // Changed div to header for semantics, ensure it's the actual top bar
      id="topbar"
      className={`d-flex align-items-center fixed-top ${
        scrolled ? "topbar-scrolled" : ""
      } ${isMobile ? "mobile-topbar" : ""} ${menuOpen ? "menu-is-open" : ""}`}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="contact-info d-flex align-items-center">
          <div className="info-item">
            <i className="bi bi-phone-fill"></i>
            <span>+1 (514) 325-9222</span>
          </div>
          <div className="info-item">
            <i className="bi bi-clock-fill"></i>
            <span>Mar-Sam: 11h - 21h</span>
          </div>
          <div className="info-item d-none d-md-flex">
            <i className="bi bi-geo-alt-fill"></i>
            <span>6313 rue Jarry Est, Montréal</span>
          </div>
        </div>

        <div className="topbar-right d-flex align-items-center">
          {!isMobile && ( // Hide time and social on very small screens if needed, or use d-none d-sm-flex
            <>
              <div className="current-time d-none d-lg-flex me-3">
                {" "}
                {/* Changed to d-lg-flex */}
                <i className="bi bi-clock"></i>
                <span>{currentTime}</span>
              </div>
              <div className="social-links d-none d-lg-flex align-items-center me-3">
                {" "}
                {/* Changed to d-lg-flex */}
                {socialLinks.map((link) => (
                  <a
                    href={link.url}
                    key={link.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitez notre page ${link.label}`}
                    title={link.label} // Added title
                  >
                    <i className={`bi bi-${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </>
          )}

          <div
            className="languages"
            ref={languageDropdownRef}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setShowLanguageDropdown(!showLanguageDropdown);
              if (e.key === "Escape" && showLanguageDropdown)
                setShowLanguageDropdown(false);
            }}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox" // More appropriate for language selection
            aria-expanded={showLanguageDropdown}
            aria-label="Sélectionnez une langue"
          >
            <div className="selected-language">
              <span
                className={`flag flag-${selectedLanguage.flag.toLowerCase()} me-2`}
              ></span>
              <span>{selectedLanguage.code}</span>
              <i
                className={`bi bi-chevron-down ms-1 ${
                  showLanguageDropdown ? "rotate-180" : ""
                }`}
              ></i>
            </div>

            {showLanguageDropdown && (
              <ul
                className="language-dropdown"
                role="listbox" // ARIA role
                aria-activedescendant={selectedLanguage.code} // Points to current selection
              >
                {availableLanguages.map((lang) => (
                  <li
                    key={lang.code}
                    role="option"
                    id={lang.code} // For aria-activedescendant
                    aria-selected={selectedLanguage.code === lang.code}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange(lang);
                      }}
                      className={
                        selectedLanguage.code === lang.code ? "active" : ""
                      }
                    >
                      <span
                        className={`flag flag-${lang.flag.toLowerCase()}`}
                      ></span>
                      {lang.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

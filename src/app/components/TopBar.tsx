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
  active: boolean;
}

export default function TopBar() {
  const [scroll, setScroll] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("FR");
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Updated social links with additional information
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

  // Available languages
  const languages: Language[] = [
    { code: "FR", name: "Français", active: true },
    { code: "EN", name: "English", active: false },
    { code: "JP", name: "日本語", active: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Function to check if menu is open (for external state changes)
    const checkMenuState = () => {
      const navbarMobile = document.querySelector(".navbar-mobile");
      setMenuOpen(navbarMobile?.classList.contains("active") || false);
    };

    // Function to handle clicking outside of language dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node) &&
        showLanguageDropdown
      ) {
        setShowLanguageDropdown(false);
      }
    };

    // Initial checks
    handleScroll();
    handleResize();
    updateTime();

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);

    // Check menu state periodically
    const menuCheckInterval = setInterval(checkMenuState, 300);

    // Update time every minute
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(menuCheckInterval);
      clearInterval(timeInterval);
    };
  }, [showLanguageDropdown]);

  // Update current time
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  };

  // Handle language selection
  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setShowLanguageDropdown(false);

    // In a real application, you would handle language change here
    // For example, by updating a language context or triggering an API call
  };

  return (
    <div
      id="topbar"
      className={`d-flex align-items-center fixed-top ${
        scroll > 100 ? "topbar-scrolled" : ""
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
          <div className="current-time d-none d-md-flex me-4">
            <i className="bi bi-clock"></i>
            <span>{currentTime}</span>
          </div>

          <div className="social-links d-none d-md-flex align-items-center">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                key={link.id}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitez notre page ${link.label}`}
              >
                <i className={`bi bi-${link.icon}`}></i>
              </a>
            ))}
          </div>

          <div
            className="languages"
            ref={languageDropdownRef}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-expanded={showLanguageDropdown}
            aria-label="Sélectionnez une langue"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowLanguageDropdown(!showLanguageDropdown);
              } else if (e.key === "Escape" && showLanguageDropdown) {
                setShowLanguageDropdown(false);
              }
            }}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <div className="selected-language">
              <span>{selectedLanguage}</span>
              <i
                className={`bi bi-chevron-down ${
                  showLanguageDropdown ? "rotate-180" : ""
                }`}
              ></i>
            </div>

            {/* Language dropdown with conditional rendering for better performance */}
            {showLanguageDropdown && (
              <ul
                className="language-dropdown"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0)",
                }}
                role="menu"
              >
                {languages.map((lang) => (
                  <li key={lang.code} role="menuitem">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange(lang.code);
                      }}
                      className={selectedLanguage === lang.code ? "active" : ""}
                      aria-current={
                        selectedLanguage === lang.code ? "true" : "false"
                      }
                    >
                      <span
                        className={`flag flag-${lang.code.toLowerCase()}`}
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
    </div>
  );
}

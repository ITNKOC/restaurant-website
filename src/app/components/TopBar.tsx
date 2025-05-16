// src/app/components/TopBar.tsx
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
  flag: string;
}

export default function TopBar() {
  // PAS besoin de 'scrolled' ici, on va se baser sur la visibilité du header principal
  // const [scrolled, setScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Nouvel état
  const [mainNavMenuOpen, setMainNavMenuOpen] = useState(false); // Pour le menu de Nav.tsx
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: "FR",
    name: "Français",
    flag: "fr",
  });
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
  ];

  const availableLanguages: Language[] = [
    { code: "FR", name: "Français", flag: "fr" },
    { code: "EN", name: "English", flag: "en" },
  ];

  useEffect(() => {
    const mainHeaderElement = document.getElementById("header"); // Le header principal
    const mainNavbarElement = document.getElementById("navbar"); // L'élément nav dans Header.tsx

    const checkHeaderVisibility = () => {
      if (mainHeaderElement) {
        // Le header est visible s'il n'a PAS la classe 'header-hidden'
        setIsHeaderVisible(
          !mainHeaderElement.classList.contains("header-hidden")
        );
      }
    };

    const checkMainNavMenuState = () => {
      if (mainNavbarElement) {
        setMainNavMenuOpen(
          mainNavbarElement.classList.contains("mobile-menu-active")
        );
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    // Initialisations
    checkHeaderVisibility();
    checkMainNavMenuState();
    window.addEventListener("scroll", checkHeaderVisibility, { passive: true }); // Vérifier au scroll aussi
    document.addEventListener("mousedown", handleClickOutside);

    let headerObserver: MutationObserver | null = null;
    if (mainHeaderElement) {
      headerObserver = new MutationObserver(checkHeaderVisibility);
      headerObserver.observe(mainHeaderElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    let navObserver: MutationObserver | null = null;
    if (mainNavbarElement) {
      navObserver = new MutationObserver(checkMainNavMenuState);
      navObserver.observe(mainNavbarElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      window.removeEventListener("scroll", checkHeaderVisibility);
      document.removeEventListener("mousedown", handleClickOutside);
      if (headerObserver) headerObserver.disconnect();
      if (navObserver) navObserver.disconnect();
    };
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    console.log("Language changed to:", language.code);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  return (
    <header
      id="topbar"
      className={`d-flex align-items-center fixed-top ${
        !isHeaderVisible && !mainNavMenuOpen ? "topbar-hidden" : "" // Nouvelle classe pour cacher
      } ${mainNavMenuOpen ? "topbar-menu-open" : ""}`}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Contact Info - Visible à partir de SM (small) */}
        <div className="contact-info d-none d-sm-flex align-items-center">
          <div className="info-item">
            <i className="bi bi-phone-fill"></i>
            <a href="tel:+15143264200">+1 (514) 326-4200</a>
          </div>
        </div>

        {/* Right side: Social links & Language selector */}
        {/* Sur XS, ce conteneur sera poussé à droite car contact-info est caché */}
        <div className="topbar-right d-flex align-items-center">
          {/* Social Links - Visible à partir de SM */}
          <div className="social-links d-none d-sm-flex align-items-center me-sm-2 me-md-3">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                key={link.id}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <i className={`bi bi-${link.icon}`}></i>
              </a>
            ))}
          </div>

          {/* Language Selector - Toujours visible */}
          <div
            className="languages"
            ref={languageDropdownRef}
            onClick={toggleLanguageDropdown}
            // ... (props onKeyDown, tabIndex, role, aria-* inchangées) ...
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleLanguageDropdown();
              if (e.key === "Escape" && showLanguageDropdown)
                setShowLanguageDropdown(false);
            }}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={showLanguageDropdown}
            aria-label="Select language"
          >
            <div className="selected-language">
              <span
                className={`flag flag-${selectedLanguage.flag.toLowerCase()} me-1`}
              ></span>
              <span>{selectedLanguage.code}</span>
              <i
                className={`bi bi-chevron-down ms-1 icon-chevron ${
                  showLanguageDropdown ? "rotate-180" : ""
                }`}
              ></i>
            </div>

            {showLanguageDropdown && (
              <ul
                className="language-dropdown"
                role="listbox"
                aria-label="Available languages"
              >
                {availableLanguages.map((lang) => (
                  <li
                    key={lang.code}
                    role="option"
                    aria-selected={selectedLanguage.code === lang.code}
                    className={
                      selectedLanguage.code === lang.code ? "active-lang" : ""
                    }
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange(lang);
                      }}
                    >
                      <span
                        className={`flag flag-${lang.flag.toLowerCase()}`}
                      ></span>
                      {lang.name}
                    </button>
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

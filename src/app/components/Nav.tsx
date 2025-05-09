"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navs } from "../data/data"; // Assure-toi que ce chemin est correct et que navs est bien exporté
import AppBtn from "./AppBtn"; // Assure-toi que ce chemin est correct
import "./nav.css"; // Assure-toi que ce chemin est correct

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Renommé pour clarté
  const [navList, setNavList] = useState(() =>
    navs.map((nav) => ({
      ...nav,
      active: nav.target === "hero" && pathname === "/",
    }))
  ); // Initial active state
  const [currentScroll, setCurrentScroll] = useState(0); // Renommé pour clarté

  const menuWrapperRef = useRef<HTMLDivElement>(null); // Pour le div racine du composant Nav
  const navbarRef = useRef<HTMLElement>(null); // Pour l'élément <nav>

  // Gérer la fermeture du menu en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        // Vérifier si le clic n'est PAS sur le bouton de toggle lui-même
        const toggleButton =
          navbarRef.current.querySelector(".mobile-nav-toggle");
        if (toggleButton && toggleButton.contains(event.target as Node)) {
          return; // Ne pas fermer si on clique sur le toggle
        }
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Gérer le défilement du corps lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-nav-is-open"); // Classe pour des styles globaux si besoin
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-is-open");
    }
    return () => {
      // Cleanup
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-is-open");
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Mettre à jour l'état actif du lien de navigation au défilement (pour la page d'accueil)
  const updateNavActiveState = useCallback(() => {
    if (pathname !== "/") {
      // Sur les autres pages, on peut désactiver tous les liens ou avoir une logique différente
      setNavList((prevNavList) =>
        prevNavList.map((n) => ({ ...n, active: false }))
      );
      return;
    }

    const headerHeight = document.getElementById("header")?.offsetHeight || 0;
    // Ajoute un petit offset pour que le lien devienne actif un peu avant d'atteindre le haut de la section
    const position = window.scrollY + headerHeight + 50;

    const newNavList = navs.map((navItem) => {
      const section = document.getElementById(navItem.target);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        return {
          ...navItem,
          active: position >= sectionTop && position < sectionBottom,
        };
      }
      return { ...navItem, active: false };
    });
    setNavList(newNavList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, navs]); // navs est stable, pathname peut changer

  useEffect(() => {
    if (pathname === "/") {
      // Seulement pour la page d'accueil
      window.addEventListener("scroll", updateNavActiveState, {
        passive: true,
      });
      updateNavActiveState(); // Appel initial
      return () => window.removeEventListener("scroll", updateNavActiveState);
    } else {
      // S'assurer que les liens ne sont pas marqués comme actifs sur d'autres pages
      setNavList(navs.map((n) => ({ ...n, active: false })));
    }
  }, [pathname, updateNavActiveState]);

  // Gérer le défilement vers une section
  const handleScrollToSection = (sectionId: string) => {
    if (isOpen) setIsOpen(false); // Fermer le menu mobile

    const navigateAndScroll = () => {
      const headerElement = document.getElementById("header");
      const offset = headerElement ? headerElement.offsetHeight : 0;
      const targetElement = document.getElementById(sectionId);

      if (targetElement) {
        const elementPosition = targetElement.offsetTop;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      } else {
        console.warn(`Section with ID "${sectionId}" not found.`);
      }
    };

    if (pathname === "/") {
      navigateAndScroll();
    } else {
      // Si on n'est pas sur la page d'accueil, naviguer d'abord, puis scroller
      // Stocker la section cible pour scroller après la navigation
      sessionStorage.setItem("scrollToSectionAfterNav", sectionId);
      router.push("/");
      // Un useEffect sur la page d'accueil (ou dans ce composant) gérera le scroll post-navigation
    }
  };

  // Gérer le scroll après redirection vers la page d'accueil
  useEffect(() => {
    if (pathname === "/") {
      const sectionToScroll = sessionStorage.getItem("scrollToSectionAfterNav");
      if (sectionToScroll) {
        // Donner un petit délai pour que la page se rende avant de scroller
        setTimeout(() => {
          const headerElement = document.getElementById("header");
          const offset = headerElement ? headerElement.offsetHeight : 0;
          const targetElement = document.getElementById(sectionToScroll);
          if (targetElement) {
            const elementPosition = targetElement.offsetTop;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth",
            });
          }
          sessionStorage.removeItem("scrollToSectionAfterNav");
        }, 100);
      }
    }
  }, [pathname]); // Se déclenche quand le pathname change (après redirection)

  // Rendu des icônes (tu peux externaliser ça dans une fonction helper si tu veux)
  const renderNavIcon = (navName: string) => {
    switch (navName) {
      case "Home":
        return <i className="bi bi-house-door-fill me-1"></i>;
      case "About":
        return <i className="bi bi-info-circle-fill me-1"></i>;
      case "Menu":
        return <i className="bi bi-journal-richtext me-1"></i>;
      case "Chefs":
        return <i className="bi bi-person-hearts me-1"></i>; // Exemple d'icône pour Chefs
      case "Gallery":
        return <i className="bi bi-images me-1"></i>;
      case "Contact":
        return <i className="bi bi-envelope-fill me-1"></i>;
      default:
        return null;
    }
  };

  return (
    <div ref={menuWrapperRef} className="nav-component-wrapper">
      {" "}
      {/* Renommé pour éviter confusion avec .nav-container de Bootstrap */}
      <nav
        id="navbar"
        ref={navbarRef}
        className={`main-navbar ${isOpen ? "mobile-menu-active" : ""}`} // Classes plus spécifiques
      >
        {/* Liste des liens de navigation (pour desktop ET mobile) */}
        <ul className="nav-links-list">
          {navList.map((navItem) => (
            <li
              key={navItem.id}
              className={navItem.active ? "active-nav-link-item" : ""}
            >
              <a
                href={`#${navItem.target}`} // Garder pour accessibilité SEO, mais JS gère le clic
                className={`nav-link-item ${navItem.active ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(navItem.target);
                }}
                role="button"
                aria-current={navItem.active ? "page" : undefined}
              >
                {renderNavIcon(navItem.name)}
                <span>{navItem.name}</span>
                <div className="nav-link-highlight"></div>{" "}
                {/* Pour l'effet de soulignement desktop */}
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton "Book a Table" DANS le menu mobile */}
        {/* Sa visibilité est contrôlée par CSS via .mobile-menu-active */}
        <div className="mobile-menu-book-btn">
          <AppBtn
            name="Book a Table"
            section="book-a-table"
            icon="calendar-check"
          />
        </div>

        {/* Bouton Hamburger Toggle (toujours présent, affichage géré par CSS) */}
        <button
          type="button"
          className="mobile-nav-toggle-button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="navbar" // Doit pointer vers l'ID de l'élément <nav>
          onClick={handleToggleMenu}
        >
          <div className={`hamburger-icon ${isOpen ? "is-active" : ""}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      </nav>
      {/* Overlay pour le menu mobile */}
      <div
        className={`mobile-nav-overlay ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1} // Pour l'accessibilité
      ></div>
    </div>
  );
}

// src/app/components/Nav.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navs } from "../data/data";
import AppBtn from "./AppBtn";
import "./nav.css";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [navList, setNavList] = useState(() =>
    navs.map((nav) => ({
      ...nav,
      active: nav.target === "hero" && pathname === "/",
    }))
  );

  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        const toggleButton = navbarRef.current.querySelector(
          ".mobile-nav-toggle-button"
        );
        if (toggleButton && toggleButton.contains(event.target as Node)) return;
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-nav-is-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-is-open");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-is-open");
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const updateNavActiveState = useCallback(() => {
    if (pathname !== "/") {
      setNavList((prevNavList) =>
        prevNavList.map((n) => ({ ...n, active: false }))
      );
      return;
    }
    const headerHeight = document.getElementById("header")?.offsetHeight || 0;
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
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("scroll", updateNavActiveState, {
        passive: true,
      });
      updateNavActiveState();
      return () => window.removeEventListener("scroll", updateNavActiveState);
    } else {
      setNavList(navs.map((n) => ({ ...n, active: false })));
    }
  }, [pathname, updateNavActiveState]);

  const handleScrollToSection = (sectionId: string) => {
    console.log(`Nav.tsx: Attempting to scroll to section: "${sectionId}"`); // LOG DE DÉBOGAGE
    if (isOpen) setIsOpen(false);

    const navigateAndScroll = () => {
      const headerElement = document.getElementById("header");
      const offset = headerElement ? headerElement.offsetHeight : 0;
      const targetElement = document.getElementById(sectionId);

      if (targetElement) {
        const elementPosition = targetElement.offsetTop;
        console.log(
          `Nav.tsx: Found targetElement "#${sectionId}", offsetTop: ${
            targetElement.offsetTop
          }, calculated scroll: ${elementPosition - offset}`
        ); // LOG
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      } else {
        console.warn(
          `Nav.tsx: Target element with ID "${sectionId}" NOT FOUND on this page.`
        ); // LOG
      }
    };

    if (pathname === "/") {
      navigateAndScroll();
    } else {
      console.log(
        `Nav.tsx: Not on homepage. Setting sessionStorage and redirecting to / for section "${sectionId}".`
      ); // LOG
      sessionStorage.setItem("scrollToSectionAfterNav", sectionId);
      router.push("/");
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      const sectionToScroll = sessionStorage.getItem("scrollToSectionAfterNav");
      if (sectionToScroll) {
        console.log(
          `Nav.tsx: Found scrollToSectionAfterNav: "${sectionToScroll}" on homepage.`
        ); // LOG
        setTimeout(() => {
          const headerElement = document.getElementById("header");
          const offset = headerElement ? headerElement.offsetHeight : 0;
          const targetElement = document.getElementById(sectionToScroll);
          if (targetElement) {
            const elementPosition = targetElement.offsetTop;
            console.log(
              `Nav.tsx: Scrolling after redirect to "#${sectionToScroll}", top: ${
                elementPosition - offset
              }`
            ); // LOG
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth",
            });
          } else {
            console.warn(
              `Nav.tsx: After redirect, target element with ID "${sectionToScroll}" NOT FOUND.`
            ); // LOG
          }
          sessionStorage.removeItem("scrollToSectionAfterNav");
        }, 150); // Augmenté le délai légèrement
      }
    }
  }, [pathname, router]); // Ajout de router aux dépendances si utilisé à l'intérieur

  const renderNavIcon = (navName: string) => {
    switch (navName) {
      case "Home":
        return <i className="bi bi-house-door-fill me-1"></i>;
      case "About":
        return <i className="bi bi-info-circle-fill me-1"></i>;
      case "Menu":
        return <i className="bi bi-journal-richtext me-1"></i>;
      case "Chefs":
        return <i className="bi bi-person-hearts me-1"></i>;
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
      <nav
        id="navbar"
        ref={navbarRef}
        className={`main-navbar ${isOpen ? "mobile-menu-active" : ""}`}
      >
        <ul className="nav-links-list">
          {navList.map((navItem) => (
            <li
              key={navItem.id}
              className={navItem.active ? "active-nav-link-item" : ""}
            >
              <a
                href={`#${navItem.target}`}
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
                <div className="nav-link-highlight"></div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-menu-book-btn">
          <AppBtn
            name="Book a Table"
            section="book-a-table"
            icon="calendar-check"
          />
        </div>

        <button
          type="button"
          className="mobile-nav-toggle-button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="navbar"
          onClick={handleToggleMenu}
        >
          <div className={`hamburger-icon ${isOpen ? "is-active" : ""}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      </nav>

      <div
        className={`mobile-nav-overlay ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
      ></div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navs } from "../data/data";
import "./nav.css";
import AppBtn from "./AppBtn";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [navList, setNavList] = useState(navs);
  const [scroll, setScroll] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null); // For click outside
  const navbarRef = useRef<HTMLElement>(null); // For the nav element itself

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Ensure navbarRef.current exists and also check if the click is outside mobile-nav-toggle
      // as the toggle button is outside navbar-mobile when menu is closed but part of it when open.
      const toggleButton =
        navbarRef.current?.querySelector(".mobile-nav-toggle");
      if (
        menuRef.current && // Check the main wrapper
        !menuRef.current.contains(event.target as Node) &&
        navbarRef.current && // Check the nav element
        !navbarRef.current.contains(event.target as Node) &&
        (!toggleButton || !toggleButton.contains(event.target as Node)) && // Check toggle button
        open
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-nav-active"); // For global styling if needed
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-active");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("mobile-nav-active");
    };
  }, [open]);

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  const handleNavActive = () => {
    if (pathname !== "/") return; // Only run scroll-based active state on homepage

    const position =
      window.scrollY +
      (document.getElementById("header")?.offsetHeight || 0) +
      50; // Adjusted offset

    setNavList(
      navs.map((nav) => {
        // Use original navs data to prevent stale state issues
        const currentNav = { ...nav, active: false };
        const targetSection: HTMLElement | null = document.querySelector(
          "#" + nav.target
        );

        if (
          targetSection &&
          position >= targetSection.offsetTop &&
          position <= targetSection.offsetTop + targetSection.offsetHeight
        ) {
          currentNav.active = true;
        }
        return currentNav;
      })
    );
  };

  const handleScrollTo = (section: string) => {
    const header: HTMLElement | null = document.querySelector("#header");
    if (!header) return;

    const offset = header.offsetHeight;

    if (pathname === "/") {
      const targetEl: HTMLElement | null = document.querySelector(
        "#" + section
      );
      if (!targetEl) return;
      const elementPosition = targetEl.offsetTop;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    } else {
      // If on a different page, navigate to home and then scroll
      // Store target section in sessionStorage or query param to handle after navigation
      sessionStorage.setItem("scrollToSection", section);
      router.push("/");
      // Scrolling will be handled by a useEffect in the destination page or a global listener
    }

    if (open) {
      setOpen(false);
    }
  };

  // Effect to scroll to section if redirected from another page
  useEffect(() => {
    if (pathname === "/") {
      const sectionToScroll = sessionStorage.getItem("scrollToSection");
      if (sectionToScroll) {
        const header: HTMLElement | null = document.querySelector("#header");
        const offset = header ? header.offsetHeight : 0;
        const targetEl: HTMLElement | null = document.querySelector(
          "#" + sectionToScroll
        );
        if (targetEl) {
          const elementPosition = targetEl.offsetTop;
          // Timeout to allow page to render before scrolling
          setTimeout(() => {
            window.scrollTo({
              top: elementPosition - offset,
              behavior: "smooth",
            });
            sessionStorage.removeItem("scrollToSection");
          }, 100);
        } else {
          sessionStorage.removeItem("scrollToSection"); // Clean up if target not found
        }
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    if (pathname === "/") {
      // Only add scroll listener on homepage
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleNavActive(); // Initial check
    }
    return () => {
      if (pathname === "/") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pathname]); // Rerun if pathname changes

  useEffect(() => {
    if (pathname === "/") {
      handleNavActive();
    } else {
      // On other pages, clear active states or set a default
      setNavList(navs.map((nav) => ({ ...nav, active: false })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll, pathname]); // Rerun on scroll or pathname change

  return (
    // The menuRef div is for click-outside detection when the menu is open.
    // It might not need to wrap the entire Nav structure if nav#navbar itself is used.
    // For now, this structure is fine.
    <div ref={menuRef} className="nav-container">
      <nav
        id="navbar"
        ref={navbarRef}
        className={`navbar order-last order-lg-0 ${
          // order classes might be better on nav-container
          open ? "navbar-mobile active" : ""
        }`}
      >
        <ul className="nav-menu">
          {navList.map((nav) => (
            <li key={nav.id} className={nav.active ? "active-nav-item" : ""}>
              <a
                className={`nav-link scrollto ${nav.active ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault(); // Good practice for JS-handled links
                  handleScrollTo(nav.target);
                }}
                href={`#${nav.target}`} // Keep href for accessibility and SEO
                role="button" // Since it's handled by JS
              >
                {nav.name === "Home" ? (
                  <i className="bi bi-house-door-fill me-1"></i> // Using filled icons for active feel
                ) : nav.name === "Menu" ? (
                  <i className="bi bi-journal-richtext me-1"></i> // More appropriate for menu
                ) : nav.name === "About" ? (
                  <i className="bi bi-info-circle-fill me-1"></i>
                ) : nav.name === "Contact" ? (
                  <i className="bi bi-envelope-fill me-1"></i>
                ) : nav.name === "Gallery" ? (
                  <i className="bi bi-images me-1"></i>
                ) : null}
                <span>{nav.name}</span>
                <div className="nav-item-highlight"></div>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile book button - only visible when mobile menu is open */}
        {open && (
          <div className="mobile-book-btn d-lg-none">
            {" "}
            {/* Ensure it's only for mobile views */}
            <AppBtn name="Réserver" icon="calendar-check" />
          </div>
        )}

        {/* Hamburger toggle button */}
        <button
          type="button" // Explicitly set type
          className="mobile-nav-toggle"
          aria-label="Toggle Menu"
          aria-expanded={open} // Accessibility for screen readers
          aria-controls="navbar" // Points to the element it controls
          onClick={handleToggleMenu}
        >
          <div className={`hamburger ${open ? "active" : ""}`}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </button>
      </nav>

      {/* Overlay for mobile menu */}
      {/* Always render overlay but control visibility with CSS for smoother transitions */}
      <div
        className={`nav-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
      ></div>
    </div>
  );
}

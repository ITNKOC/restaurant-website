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
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
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
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  const handleNavActive = () => {
    let position = scroll + 200;
    setNavList(
      navList.map((nav) => {
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
    const targetEl: HTMLElement | null = document.querySelector("#" + section);

    if (pathname === "/") {
      if (!targetEl) return;
      const elementPosition = targetEl.offsetTop;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    } else {
      router.push(`/#${section}`);
    }

    // Close mobile menu after navigation
    if (open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleNavActive();
  }, [scroll]);

  return (
    <div ref={menuRef}>
      <nav
        id="navbar"
        className={`navbar order-last order-lg-0 ${
          open ? "navbar-mobile" : ""
        }`}
      >
        <ul className="nav-menu">
          {navList.map((nav) => (
            <li key={nav.id} className={nav.active ? "active-nav-item" : ""}>
              <a
                className={`nav-link scrollto ${nav.active ? "active" : ""}`}
                onClick={() => handleScrollTo(nav.target)}
              >
                {nav.name === "Home" ? (
                  <i className="bi bi-house me-1"></i>
                ) : nav.name === "Menu" ? (
                  <i className="bi bi-menu-button-wide me-1"></i>
                ) : nav.name === "About" ? (
                  <i className="bi bi-info-circle me-1"></i>
                ) : nav.name === "Contact" ? (
                  <i className="bi bi-envelope me-1"></i>
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
          <div className="mobile-book-btn d-block d-lg-none">
            <AppBtn name="Réserver" icon="calendar-check" />
          </div>
        )}

        <button
          className="mobile-nav-toggle"
          aria-label="Toggle Menu"
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
      {open && (
        <div className="nav-overlay" onClick={() => setOpen(false)}></div>
      )}
    </div>
  );
}

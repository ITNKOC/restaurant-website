import React from "react";
import "./appBtn.css";

interface AppBtnProps {
  name: string;
  section?: string;
  variant?: "primary" | "secondary";
  icon?: string;
}

export default function AppBtn({
  name,
  section = "book-a-table",
  variant = "primary",
  icon,
}: AppBtnProps) {
  const handleScrollTo = () => {
    const header: HTMLElement | null = document.querySelector("#header");
    if (!header) return;

    const offset = header.offsetHeight;
    const targetEl: HTMLElement | null = document.querySelector("#" + section);
    if (!targetEl) return;

    const elementPosition = targetEl.offsetTop;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`app-btn ${variant} ${icon ? "with-icon" : ""}`}
      onClick={handleScrollTo}
      aria-label={name}
    >
      {icon && <i className={`bi bi-${icon} me-2`}></i>}
      <span>{name}</span>
      <div className="app-btn-background"></div>
    </button>
  );
}

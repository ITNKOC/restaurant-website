import React from "react";
import "./heroBtn.css";

interface HeroBtnProps {
  name: string;
  target: string;
  icon?: string;
}

export default function HeroBtn({ name, target, icon }: HeroBtnProps) {
  const handleScrollTo = (section: string) => {
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
    <a
      onClick={() => handleScrollTo(target)}
      className={`btn-hero animated fadeInUp scrollto ${
        name.toLowerCase().includes("book") ? "ms-4" : ""
      }`}
      role="button"
      aria-label={name}
    >
      {icon && <i className={`bi bi-${icon} me-2`}></i>}
      {name}
    </a>
  );
}

// src/app/components/Preloader.tsx
import React from "react";
import "./preloader.css"; // Même fichier CSS, mais avec différents styles

export default function Preloader() {
  return (
    <div id="preloader" className="preloader-reveal">
      {" "}
      {/* Nouvelle classe */}
      <div className="preloader-panel preloader-panel-left"></div>
      <div className="preloader-panel preloader-panel-right"></div>
      <div className="preloader-center-content">
        {/* Vous pouvez mettre un petit logo ou texte ici aussi qui apparaîtrait brièvement */}
        <span className="preloader-brand-name">DI MENNA</span>
      </div>
    </div>
  );
}

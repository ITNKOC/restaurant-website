// src/components/HeroBtnFestival.tsx

import React from "react";
// import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // Si vous utilisez FontAwesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Si vous utilisez FontAwesome

// Définissez le type pour les props, identique ou similaire à HeroBtnProps
export interface HeroBtnFestivalProps {
  name: string;
  target: string; // L'ID de la section cible pour le défilement
  icon?: string; // Nom de l'icône (ex: 'utensils', 'calendar-alt')
  // icon?: IconDefinition; // Pour FontAwesome
  onClick?: () => void;
  isExternalLink?: boolean;
  href?: string;
  className?: string; // Permet de passer des classes supplémentaires (ex: pour différencier des boutons du festival)
  primary?: boolean; // Pour distinguer le bouton principal du festival
}

const HeroBtnFestival: React.FC<HeroBtnFestivalProps> = ({
  name,
  target,
  icon,
  onClick,
  isExternalLink = false,
  href,
  className = "",
  primary = false, // Par défaut, ce n'est pas le bouton primaire du festival
}) => {
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with id "${targetId}" not found.`);
    }
  };

  // Détermine les classes CSS à appliquer
  // btn-festival est la classe de base pour tous les boutons du festival
  // btn-festival-primary pour le bouton principal (par ex. "View Fest Menu")
  // btn-festival-secondary pour le bouton secondaire (par ex. "Book Your Feast")
  const baseFestivalClass = "btn-festival";
  const festivalStyleClass = primary
    ? "btn-festival-primary"
    : "btn-festival-secondary";

  const buttonContent = (
    <>
      {icon && <i className={`bi bi-${icon} me-2`}></i>}{" "}
      {/* Exemple avec Bootstrap Icons */}
      {/* Si FontAwesome: icon && <FontAwesomeIcon icon={icon} className="me-2" /> */}
      {name}
    </>
  );

  if (isExternalLink && href) {
    return (
      <a
        href={href}
        className={`${baseFestivalClass} ${festivalStyleClass} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseFestivalClass} ${festivalStyleClass} ${className}`}
      >
        {buttonContent}
      </button>
    );
  }

  // Comportement par défaut : lien d'ancre
  return (
    <a
      href={`#${target}`}
      onClick={(e) => handleScrollTo(e, target)}
      className={`${baseFestivalClass} ${festivalStyleClass} ${className}`}
    >
      {buttonContent}
    </a>
  );
};

export default HeroBtnFestival;

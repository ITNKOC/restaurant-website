// src/app/components/SectionTitle.tsx (CORRIGÉ)
import React from "react";
import "./sectionTitle.css"; // Assurez-vous que ce fichier CSS existe et est correct

export default function SectionTitle({
  title,
  subtitle,
  center, // Récupérer la prop 'center'
}: {
  title: string;
  subtitle: string;
  center?: boolean; // <-- Ajoutez cette ligne pour la prop 'center'
}) {
  // Vous pouvez maintenant utiliser la prop 'center' pour modifier le style si besoin
  // Par exemple, en ajoutant une classe conditionnellement :
  const divClasses = ["section-title"]; // Classe de base
  if (center) {
    divClasses.push("text-center"); // 'text-center' serait une classe CSS dans sectionTitle.css
    // ou directement dans votre CSS global pour centrer le texte.
  }

  return (
    <div className={divClasses.join(" ")}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

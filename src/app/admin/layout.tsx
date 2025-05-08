// src/app/admin/layout.tsx
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {" "}
      {/* ou la langue appropriée */}
      <body>
        {" "}
        {/* Le body doit être ici si ce layout est le plus proche des pages */}
        {/* Vous pouvez ajouter ici une en-tête ou une navigation spécifique à l'admin plus tard */}
        {/* <h1>Admin Section Layout (pour test)</h1> */}
        {children}
      </body>
    </html>
  );
}

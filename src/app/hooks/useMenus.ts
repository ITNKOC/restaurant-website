// src/app/hooks/useMenus.ts
"use client"; // Ce hook sera utilisé dans des composants clients

import { useState, useEffect, useCallback } from "react";

export interface MenuFile {
  // Exporter l'interface pour la réutiliser
  id: string;
  name: string;
  type: string;
  blobUrl: string;
  uploadDate: string;
  // Ajoute d'autres champs si ton API les renvoie et si tu en as besoin
  pathname?: string;
  contentType?: string;
  size?: number;
}

export function useMenus() {
  const [menuFiles, setMenuFiles] = useState<MenuFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    console.log("useMenus: Fetching menus...");
    try {
      const response = await fetch("/api/list-menus", { signal }); // Passer le signal AbortController
      console.log(
        "useMenus: API response status:",
        response.status,
        "ok:",
        response.ok
      );

      if (!response.ok) {
        let errorText = "Failed to fetch menus from API.";
        try {
          const errorData = await response.json();
          errorText =
            errorData.error ||
            `API Error (${response.status}): ${response.statusText}`;
        } catch (e) {
          errorText = `API Error (${response.status}): ${response.statusText}. Response not JSON.`;
        }
        throw new Error(errorText);
      }

      const data: MenuFile[] = await response.json();
      console.log("useMenus: Data received:", data);

      if (Array.isArray(data)) {
        setMenuFiles(data);
      } else {
        console.warn(
          "useMenus: Data from API was not an array. Setting empty array.",
          data
        );
        setMenuFiles([]); // S'assurer que c'est toujours un tableau
        // Tu pourrais aussi lancer une erreur ici si le format est critique
        // throw new Error("Invalid data format received from API.");
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("useMenus: Fetch aborted.");
        return; // Ne rien faire si la requête a été annulée
      }
      console.error("useMenus: Error caught:", err.message, err);
      setError(
        err.message || "An unknown error occurred while fetching menus."
      );
      setMenuFiles([]); // Réinitialiser en cas d'erreur
    } finally {
      setLoading(false);
      console.log("useMenus: Fetching finished.");
    }
  }, []); // useCallback avec tableau de dépendances vide

  // Premier fetch au montage
  useEffect(() => {
    const controller = new AbortController(); // Pour annuler le fetch si le composant est démonté
    fetchMenus(controller.signal);

    return () => {
      console.log("useMenus: Cleanup useEffect - aborting fetch.");
      controller.abort(); // Annuler le fetch si le composant est démonté pendant le fetch
    };
  }, [fetchMenus]); // Dépendance à fetchMenus (qui est stable)

  // Fournir une fonction pour rafraîchir manuellement si nécessaire
  const refreshMenus = useCallback(() => {
    const controller = new AbortController();
    return fetchMenus(controller.signal);
    // Note: le cleanup du controller ici serait plus complexe si refreshMenus est appelé rapidement plusieurs fois.
    // Pour l'instant, on suppose qu'il est appelé de manière contrôlée.
  }, [fetchMenus]);

  return { menuFiles, loading, error, refreshMenus };
}

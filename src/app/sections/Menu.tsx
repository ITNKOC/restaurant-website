"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./menu.module.css"; // Si Menu.tsx est dans src/app/sections/, ajustez le chemin

const MENU_TYPES = {
  RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  ALCOHOL: "alcohol",
};

interface MenuFile {
  id: string;
  name: string;
  type: string;
  url: string; // Sera l'URL Cloudinary
  public_id?: string; // Optionnel ici, mais bon pour la cohérence
  uploadDate: string;
}

// Renommé en MenuPage pour éviter confusion si vous avez un composant nommé Menu aussi
export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  const [menuFiles, setMenuFiles] = useState<MenuFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (typeof window !== "undefined") {
      try {
        const savedMenus = localStorage.getItem("menuFiles");
        if (savedMenus) {
          setMenuFiles(JSON.parse(savedMenus));
        }
      } catch (e) {
        console.error(
          "Erreur lors du parsing des menuFiles depuis localStorage sur la page menu",
          e
        );
        setError("Impossible de charger les informations des menus.");
        setMenuFiles([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // Important pour le rendu côté serveur ou build
    }
  }, []);

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

  // ... (le reste de votre JSX pour la page Menu)
  // Le JSX que vous avez fourni précédemment devrait fonctionner.
  // Assurez-vous que les boutons "View Menu" et "Download" utilisent bien file.url
  // Ex: <a href={file.url} target="_blank" ...>View Menu</a>
  // Ex: <a href={file.url} download={file.name} ...>Download</a>

  return (
    <>
      <Head>
        <title>Nos Menus | DiMenna</title>
        <meta
          name="description"
          content="Découvrez nos menus restaurant, livraison, et notre sélection d'alcools chez DiMenna."
        />
        {/* Assurez-vous que les polices sont chargées, cf. réponse précédente */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.menuPageContainer}>
        {" "}
        {/* Appliquez le style conteneur principal */}
        <section id="menu-header" className={styles.menuHeader}>
          {/* ... Votre code pour le header de la page menu ... */}
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Nos Menus</h1>
                <p>Découvrez nos sélections soigneusement élaborées</p>
              </div>
            </div>
          </div>
        </section>
        <section id="menu-content" className={styles.menuContent}>
          {/* ... Votre code pour les onglets et l'affichage des menus ... */}
          <div className="container">
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.RESTAURANT ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.RESTAURANT)}
              >
                Menu Restaurant
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.DELIVERY ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.DELIVERY)}
              >
                Menu Livraison
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.ALCOHOL ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.ALCOHOL)}
              >
                Sélection d'Alcools
              </button>
            </div>

            <div className={styles.menuDisplay}>
              <h2>
                {activeTab === MENU_TYPES.RESTAURANT
                  ? "Menu Restaurant"
                  : activeTab === MENU_TYPES.DELIVERY
                  ? "Menu Livraison"
                  : "Sélection d'Alcools"}
              </h2>

              {loading ? (
                <div className={styles.loadingMessage}>
                  Chargement des menus...
                </div>
              ) : error ? (
                <div
                  className={styles.noMenusMessage}
                  style={{ color: "#FF8C00" }}
                >
                  {error}
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className={styles.noMenusMessage}>
                  <p>
                    Aucun menu disponible pour cette catégorie pour le moment.
                    Veuillez revenir plus tard.
                  </p>
                </div>
              ) : (
                <div className={styles.menuList}>
                  {filteredFiles.map((file) => (
                    <div key={file.id} className={styles.menuItem}>
                      <div className={styles.menuItemContent}>
                        <div className={styles.menuIcon}>
                          <i className="bi bi-file-earmark-pdf"></i>{" "}
                          {/* Assurez-vous d'avoir Bootstrap Icons si vous utilisez cette classe */}
                        </div>
                        <div className={styles.menuInfo}>
                          <h3>{file.name}</h3>
                          {/* Formater la date pour une meilleure lisibilité */}
                          <p>
                            Mis à jour le:{" "}
                            {new Date(file.uploadDate).toLocaleDateString(
                              "fr-FR"
                            )}
                          </p>
                        </div>
                        <div className={styles.menuActions}>
                          <a
                            href={file.url}
                            className={styles.viewButton}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Voir Menu
                          </a>
                          <a
                            href={file.url}
                            className={styles.downloadButton}
                            download={file.name}
                          >
                            Télécharger
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// src/app/sections/Menu.tsx
"use client";
import React, { useState } from "react"; // useEffect et useCallback sont maintenant dans useMenus
import Head from "next/head";
import styles from "./menu.module.css";
import { useMenus, MenuFile } from "../hooks/useMenus"; // Importer le hook et l'interface

const MENU_TYPES = {
  /* ... comme avant ... */ RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  ALCOHOL: "alcohol",
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  // Utiliser notre hook personnalisé !
  const { menuFiles, loading, error } = useMenus();

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

  const getTabDisplayName = (tabKey: string) => {
    /* ... comme avant ... */
    switch (tabKey) {
      case MENU_TYPES.RESTAURANT:
        return "Restaurant Menu";
      case MENU_TYPES.DELIVERY:
        return "Delivery Menu";
      case MENU_TYPES.ALCOHOL:
        return "Wine & Spirits";
      default:
        return "Menu";
    }
  };

  return (
    <>
      <Head>
        {/* ... Head content ... */}
        <title>Our Menus | DiMenna Restaurant</title>
        <meta
          name="description"
          content="Explore our restaurant, delivery, and beverage menus at DiMenna Restaurant."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.menuPageContainer}>
        <section id="menu-header" className={styles.menuHeader}>
          {/* ... Header ... */}
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-9">
                <h1>Our Culinary Selections</h1>
                <p>
                  Discover our carefully crafted menus, offering a taste of
                  authentic Italian tradition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu-content" className={styles.menuContent}>
          <div className="container">
            <div className={styles.tabs}>
              {/* ... Tab buttons, `disabled={loading}` ... */}
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.RESTAURANT ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.RESTAURANT)}
                disabled={loading}
              >
                {getTabDisplayName(MENU_TYPES.RESTAURANT)}
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.DELIVERY ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.DELIVERY)}
                disabled={loading}
              >
                {getTabDisplayName(MENU_TYPES.DELIVERY)}
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.ALCOHOL ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.ALCOHOL)}
                disabled={loading}
              >
                {getTabDisplayName(MENU_TYPES.ALCOHOL)}
              </button>
            </div>

            <div className={styles.menuDisplay}>
              <h2 className={styles.menuTypeTitle}>
                {getTabDisplayName(activeTab)}
              </h2>
              {/* ... Affichage des messages de chargement/erreur et de la liste, comme avant ... */}
              {loading && (
                <div className={styles.messageContainer}>
                  <p>Loading menus...</p>
                </div>
              )}
              {error && (
                <div
                  className={`${styles.messageContainer} ${styles.errorMessage}`}
                >
                  <p>{error}</p>
                </div>
              )}
              {!loading && !error && filteredFiles.length === 0 && (
                <div className={styles.messageContainer}>
                  <p>
                    No menus are currently available for this category. Please
                    check back later.
                  </p>
                </div>
              )}
              {!loading && !error && filteredFiles.length > 0 && (
                <div className={styles.menuList}>
                  {filteredFiles.map(
                    (
                      file: MenuFile // Spécifier le type ici
                    ) => (
                      <div key={file.id} className={styles.menuItem}>
                        <div className={styles.menuItemContent}>
                          <div className={styles.menuIcon}>
                            <i className="bi bi-file-earmark-text-fill"></i>
                          </div>
                          <div className={styles.menuInfo}>
                            <h3>{file.name.replace(/\.[^/.]+$/, "")}</h3>
                            <p>
                              Last Updated:{" "}
                              {new Date(file.uploadDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className={styles.menuActions}>
                            <a
                              href={file.blobUrl}
                              className={`${styles.menuButton} ${styles.viewButton}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${file.name}`}
                            >
                              <i className="bi bi-eye-fill"></i> View Menu
                            </a>
                            <a
                              href={file.blobUrl}
                              className={`${styles.menuButton} ${styles.downloadButton}`}
                              download={file.name}
                              aria-label={`Download ${file.name}`}
                            >
                              <i className="bi bi-download"></i> Download
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

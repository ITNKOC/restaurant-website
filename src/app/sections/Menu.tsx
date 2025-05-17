// src/app/sections/Menu.tsx
"use client";
import React, { useState } from "react";
import Head from "next/head";
import styles from "./menu.module.css";
import { useMenus, MenuFile } from "../hooks/useMenus"; // Assurez-vous que ce chemin est correct

// MENU_TYPES mis à jour comme ci-dessus
const MENU_TYPES = {
  RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  GROUP: "group",
  SPECIAL: "special",
  // ALCOHOL: "alcohol",
};

// Configuration des onglets pour faciliter le mappage
const tabConfigurations = [
  { key: MENU_TYPES.RESTAURANT, label: "Restaurant Menu" },
  { key: MENU_TYPES.DELIVERY, label: "Delivery Menu" },
  { key: MENU_TYPES.GROUP, label: "Group Menus" },
  { key: MENU_TYPES.SPECIAL, label: "Special Offers" }, // ou "Seasonal Menus"
  // { key: MENU_TYPES.ALCOHOL, label: "Wine & Spirits" },
];

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  const { menuFiles, loading, error } = useMenus();

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

  // La fonction getTabDisplayName n'est plus nécessaire si on utilise tabConfigurations.find
  const currentTabLabel =
    tabConfigurations.find((tab) => tab.key === activeTab)?.label || "Menu";

  return (
    <>
      <Head>
        <title>Our Menus | DiMenna Restaurant</title>
        <meta
          name="description"
          content="Explore our restaurant, delivery, group, special, and beverage menus at DiMenna Restaurant."
        />
        {/* Vos liens de polices... */}
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

      <div id="menu" className={styles.menuPageContainer}>
        <section id="menu-header" className={styles.menuHeader}>
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-9">
                <h1>Our Culinary Selections</h1>
                <p>
                  Discover our carefully crafted menus, offering a taste of
                  authentic Italian tradition for every occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="menu-content-inner" className={styles.menuContent}>
          <div className="container">
            <div className={styles.tabs}>
              {tabConfigurations.map((tab) => (
                <button
                  key={tab.key}
                  className={`${styles.tab} ${
                    activeTab === tab.key ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  disabled={loading}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Section d'introduction pour les menus de groupe */}
            {activeTab === MENU_TYPES.GROUP && !loading && (
              <div className={styles.groupMenuIntro}>
                <h2>Planning an Event?</h2>
                <p>
                  Our group menus are perfectly designed for your special
                  occasions, corporate events, or family gatherings. Explore our
                  curated selections to make your event memorable. For
                  personalized arrangements or larger parties, please{" "}
                  <a href="#contact">contact us</a>.{" "}
                  {/* Assurez-vous d'avoir une section contact avec id="contact" */}
                </p>
              </div>
            )}

            {/* Section d'introduction pour les menus spéciaux */}
            {activeTab === MENU_TYPES.SPECIAL && !loading && (
              <div className={styles.specialMenuIntro}>
                {" "}
                {/* Style similaire à groupMenuIntro ou unique */}
                <h2>Seasonal Delights & Special Offers</h2>
                <p>
                  Experience the best of the season with our limited-time
                  special menus. Currently featuring our acclaimed Lobster
                  Festival!
                  {/* Vous pourriez rendre cela dynamique si les noms de fichiers des menus spéciaux le permettent */}
                </p>
              </div>
            )}

            <div className={styles.menuDisplay}>
              <h2 className={styles.menuTypeTitle}>{currentTabLabel}</h2>
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
                  {filteredFiles.map((file: MenuFile) => (
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
                              "en-US", // ou fr-CA selon la langue du site/utilisateur
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

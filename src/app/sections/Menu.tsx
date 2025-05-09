// src/app/sections/Menu.tsx (or your actual path)
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./menu.module.css"; // Adjust path if Menu.tsx is elsewhere

// Constants for menu types (good practice)
const MENU_TYPES = {
  RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  ALCOHOL: "alcohol", // Or "Wine & Spirits", "Beverages"
};

interface MenuFile {
  id: string;
  name: string;
  type: string; // Corresponds to one of MENU_TYPES
  url: string; // Cloudinary URL for the PDF
  public_id?: string; // Optional Cloudinary public ID
  uploadDate: string; // ISO date string
}

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
        } else {
          // If no menus in localStorage, you might want to fetch them here
          // or display a message indicating no menus are available.
          // For now, it will show "No menus available..." if localStorage is empty.
          console.log("No menus found in localStorage for MenuPage.");
        }
      } catch (e) {
        console.error(
          "Error parsing menuFiles from localStorage on MenuPage",
          e
        );
        setError("Could not load menu information. Please try again later.");
        setMenuFiles([]); // Ensure it's an empty array on error
      } finally {
        setLoading(false);
      }
    } else {
      // Handle server-side rendering or build time where localStorage is not available
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

  const getTabDisplayName = (tabKey: string) => {
    switch (tabKey) {
      case MENU_TYPES.RESTAURANT:
        return "Restaurant Menu";
      case MENU_TYPES.DELIVERY:
        return "Delivery Menu";
      case MENU_TYPES.ALCOHOL:
        return "Wine & Spirits"; // Or "Beverage Selection"
      default:
        return "Menu";
    }
  };

  return (
    <>
      <Head>
        <title>Our Menus | DiMenna Restaurant</title>
        <meta
          name="description"
          content="Explore our restaurant, delivery, and beverage menus at DiMenna Restaurant."
        />
        {/* Ensure fonts are loaded. These are good defaults for an Italian theme. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous" // Use "anonymous" for crossOrigin with Google Fonts
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.menuPageContainer}>
        <section id="menu-header" className={styles.menuHeader}>
          <div className="container">
            {" "}
            {/* Using Bootstrap container for consistency */}
            <div className="row justify-content-center text-center">
              <div className="col-lg-9">
                {" "}
                {/* Slightly wider column for header text */}
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
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.RESTAURANT ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.RESTAURANT)}
              >
                {getTabDisplayName(MENU_TYPES.RESTAURANT)}
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.DELIVERY ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.DELIVERY)}
              >
                {getTabDisplayName(MENU_TYPES.DELIVERY)}
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === MENU_TYPES.ALCOHOL ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(MENU_TYPES.ALCOHOL)}
              >
                {getTabDisplayName(MENU_TYPES.ALCOHOL)}
              </button>
            </div>

            <div className={styles.menuDisplay}>
              <h2 className={styles.menuTypeTitle}>
                {getTabDisplayName(activeTab)}
              </h2>

              {loading ? (
                <div className={styles.messageContainer}>
                  <p>Loading menus...</p>
                </div>
              ) : error ? (
                <div
                  className={`${styles.messageContainer} ${styles.errorMessage}`}
                >
                  <p>{error}</p>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className={styles.messageContainer}>
                  <p>
                    No menus are currently available for this category. Please
                    check back later.
                  </p>
                </div>
              ) : (
                <div className={styles.menuList}>
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id || file.public_id}
                      className={styles.menuItem}
                    >
                      {" "}
                      {/* Use public_id as fallback key */}
                      <div className={styles.menuItemContent}>
                        <div className={styles.menuIcon}>
                          {/* Using a generic PDF icon. You can customize per type if desired. */}
                          <i className="bi bi-file-earmark-text-fill"></i>{" "}
                          {/* Bootstrap Icon */}
                        </div>
                        <div className={styles.menuInfo}>
                          <h3>{file.name.replace(/\.[^/.]+$/, "")}</h3>{" "}
                          {/* Remove file extension */}
                          <p>
                            Last Updated:{" "}
                            {new Date(file.uploadDate).toLocaleDateString(
                              "en-US", // US English date format
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </p>
                        </div>
                        <div className={styles.menuActions}>
                          <a
                            href={file.url}
                            className={`${styles.menuButton} ${styles.viewButton}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${file.name}`}
                          >
                            <i className="bi bi-eye-fill"></i> View Menu
                          </a>
                          <a
                            href={file.url}
                            className={`${styles.menuButton} ${styles.downloadButton}`}
                            download={file.name} // Suggests the original file name for download
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

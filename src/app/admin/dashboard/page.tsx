// src/app/admin/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCheck from "../../components/AuthCheck"; // Assurez-vous que ce chemin est correct
import styles from "./dashboard.module.css";
import { useMenus, MenuFile } from "../../hooks/useMenus"; // Assurez-vous que ce chemin est correct

// MENU_TYPES mis à jour comme à l'étape 1
const MENU_TYPES = {
  RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  GROUP: "group",
  SPECIAL: "special",
  ALCOHOL: "alcohol",
};

// Configuration des onglets pour le dashboard
const dashboardTabConfigurations = [
  { key: MENU_TYPES.RESTAURANT, label: "Restaurant Menus" },
  { key: MENU_TYPES.DELIVERY, label: "Delivery Menus" },
  { key: MENU_TYPES.GROUP, label: "Group Menus" },
  { key: MENU_TYPES.SPECIAL, label: "Special Menus" },
  { key: MENU_TYPES.ALCOHOL, label: "Wine & Spirits" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  const {
    menuFiles,
    loading: loadingMenus,
    error: fetchError,
    refreshMenus,
  } = useMenus();

  const [uploading, setUploading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload PDF files only.");
      e.target.value = ""; // Réinitialiser l'input
      return;
    }

    setUploading(true);
    setActionError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("menuType", activeTab); // menuType est déterminé par l'onglet actif

    try {
      const response = await fetch("/api/upload-menu", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || `Upload failed: ${response.statusText}`
        );
      }
      await refreshMenus();
      alert("Menu uploaded successfully!");
    } catch (err: any) {
      console.error("Upload failed:", err);
      setActionError(err.message || "An unknown error occurred during upload.");
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ""; // Réinitialiser l'input de fichier
    }
  };

  const handleDeleteFile = async (menuId: string, menuName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the menu "${menuName}"? This action is permanent.`
      )
    ) {
      return;
    }
    setActionError(null);
    try {
      const response = await fetch("/api/delete-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuIdToDelete: menuId }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete menu.");
      }
      await refreshMenus();
      alert(result.message || "Menu deleted successfully.");
    } catch (err: any) {
      console.error("Deletion failed:", err);
      setActionError(err.message || "Could not delete the menu.");
    }
  };

  const handleLogout = () => router.push("/admin/login"); // Ou la page de déconnexion de Clerk/Auth0

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);
  const currentTabLabel =
    dashboardTabConfigurations.find((tab) => tab.key === activeTab)?.label ||
    "Manage Menus";

  return (
    <AuthCheck>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>

        <div className={styles.tabs}>
          {dashboardTabConfigurations.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
              disabled={uploading || loadingMenus}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <h2>{currentTabLabel}</h2> {/* Utilise le label de l'onglet actif */}
          <div className={styles.uploadSection}>
            <label
              className={`${styles.uploadButton} ${
                uploading || loadingMenus ? styles.uploadButtonDisabled : ""
              }`}
            >
              {uploading
                ? "Uploading..."
                : `Upload New ${currentTabLabel.replace(" Menus", "")} PDF`}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploading || loadingMenus}
                style={{ display: "none" }}
              />
            </label>
            {/* Vous pouvez ajouter un spinner visuel si uploading est true */}
            {uploading && <div className={styles.simpleSpinner}></div>}
          </div>
          {(fetchError || actionError) && (
            <p className={styles.errorMessage}>
              {" "}
              {/* Style unifié pour les erreurs */}
              Error: {fetchError || actionError}
            </p>
          )}
          {loadingMenus &&
            !fetchError /* Ne pas montrer "Loading menus..." s'il y a déjà une erreur de fetch */ && (
              <p className={styles.loadingMessage}>Loading menus...</p>
            )}
          <div className={styles.filesList}>
            {!loadingMenus && filteredFiles.length === 0 && !fetchError && (
              <p>No menus uploaded for this category yet.</p>
            )}
            {filteredFiles.map((file: MenuFile) => (
              <div key={file.id} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <p className={styles.fileName}>{file.name}</p>
                  <p className={styles.fileDate}>
                    Uploaded:{" "}
                    {new Date(file.uploadDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <div className={styles.fileActions}>
                  <a
                    href={file.blobUrl}
                    download={file.name}
                    className={styles.downloadButton}
                    title={`Download ${file.name}`}
                  >
                    Download
                  </a>
                  <a
                    href={file.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewButton}
                    title={`View ${file.name}`}
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteFile(file.id, file.name)}
                    className={styles.deleteButton}
                    disabled={uploading} // Désactiver pendant l'upload pour éviter les conflits
                    title={`Delete ${file.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}

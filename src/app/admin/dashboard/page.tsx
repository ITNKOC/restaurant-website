// src/app/admin/dashboard/page.tsx
"use client";

import React, { useState } from "react"; // useCallback et useEffect sont maintenant dans useMenus
import { useRouter } from "next/navigation";
import AuthCheck from "../../components/AuthCheck";
import styles from "./dashboard.module.css";
import { useMenus, MenuFile } from "../../hooks/useMenus"; // Importer le hook et l'interface

const MENU_TYPES = {
  RESTAURANT: "restaurant",
  DELIVERY: "delivery",
  ALCOHOL: "alcohol",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  // Utiliser notre hook personnalisé !
  const {
    menuFiles,
    loading: loadingMenus,
    error: fetchError,
    refreshMenus,
  } = useMenus();

  const [uploading, setUploading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null); // Erreur spécifique aux actions (upload/delete)
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload PDF files only.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setActionError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("menuType", activeTab);

    try {
      const response = await fetch("/api/upload-menu", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || `Upload failed: ${response.statusText}`
        );

      await refreshMenus(); // Rafraîchir la liste des menus après l'upload
      alert("Menu uploaded successfully!");
    } catch (err: any) {
      console.error("Upload failed:", err);
      setActionError(err.message || "An unknown error occurred during upload.");
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleDeleteFile = async (menuId: string, menuName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete the menu "${menuName}"? This action is permanent.`
      )
    )
      return;

    setActionError(null);
    // On pourrait mettre un état de chargement spécifique à la suppression ici
    try {
      const response = await fetch("/api/delete-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuIdToDelete: menuId }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to delete menu.");

      await refreshMenus(); // Rafraîchir la liste
      alert(result.message || "Menu deleted successfully.");
    } catch (err: any) {
      console.error("Deletion failed:", err);
      setActionError(err.message || "Could not delete the menu.");
    }
  };

  const handleLogout = () => router.push("/admin/login");

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

  const getTabDisplayName = (tabKey: string) => {
    /* ... comme avant ... */
    switch (tabKey) {
      case MENU_TYPES.RESTAURANT:
        return "Restaurant";
      case MENU_TYPES.DELIVERY:
        return "Delivery";
      case MENU_TYPES.ALCOHOL:
        return "Wine & Spirits";
      default:
        return "";
    }
  };

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
          {/* ... boutons d'onglets, s'assurer que `disabled` utilise `uploading || loadingMenus` ... */}
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.RESTAURANT ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.RESTAURANT)}
            disabled={uploading || loadingMenus}
          >
            Restaurant Menu
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.DELIVERY ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.DELIVERY)}
            disabled={uploading || loadingMenus}
          >
            Delivery Menu
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.ALCOHOL ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.ALCOHOL)}
            disabled={uploading || loadingMenus}
          >
            Wine & Spirits
          </button>
        </div>

        <div className={styles.content}>
          <h2>{getTabDisplayName(activeTab)} Menu Management</h2>
          <div className={styles.uploadSection}>
            {/* ... input de fichier ... */}
            <label
              className={`${styles.uploadButton} ${
                uploading || loadingMenus ? styles.uploadButtonDisabled : ""
              }`}
            >
              {uploading ? "Uploading..." : "Upload New PDF Menu"}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploading || loadingMenus}
                style={{ display: "none" }}
              />
            </label>
            {uploading && <div className={styles.spinner}></div>}
          </div>

          {/* Afficher l'erreur de fetch OU l'erreur d'action */}
          {(fetchError || actionError) && (
            <p
              className={styles.errorMessage}
              style={{ color: "red", marginTop: "10px" }}
            >
              Error: {fetchError || actionError}
            </p>
          )}
          {loadingMenus && (
            <p className={styles.loadingMessage}>Loading menus...</p>
          )}

          <div className={styles.filesList}>
            {/* ... affichage de la liste des fichiers, comme avant ... */}
            {!loadingMenus && filteredFiles.length === 0 && !fetchError && (
              <p>No menus uploaded for this category yet.</p>
            )}
            {filteredFiles.map(
              (
                file: MenuFile // Spécifier le type ici
              ) => (
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
                      disabled={uploading}
                      title={`Delete ${file.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}

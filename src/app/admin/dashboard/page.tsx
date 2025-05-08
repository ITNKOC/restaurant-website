// src/app/admin/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthCheck from "../../components/AuthCheck"; // Vérifiez ce chemin
import styles from "./dashboard.module.css";

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
  public_id?: string; // ID public de Cloudinary pour la gestion (ex: suppression)
  uploadDate: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(MENU_TYPES.RESTAURANT);
  const [menuFiles, setMenuFiles] = useState<MenuFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Pour les erreurs d'upload
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMenus = localStorage.getItem("menuFiles");
      if (savedMenus) {
        try {
          setMenuFiles(JSON.parse(savedMenus));
        } catch (e) {
          console.error(
            "Erreur lors du parsing des menuFiles depuis localStorage",
            e
          );
          setMenuFiles([]); // Réinitialiser en cas de données corrompues
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menuFiles", JSON.stringify(menuFiles));
    }
  }, [menuFiles]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Veuillez téléverser uniquement des fichiers PDF.");
      return;
    }

    setUploading(true);
    setError(null); // Réinitialiser les erreurs précédentes

    const formData = new FormData();
    formData.append("file", file); // La clé 'file' doit correspondre à ce que l'API attend

    try {
      const response = await fetch("/api/upload-menu", {
        // L'URL de votre API route
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `Échec du téléversement: ${response.statusText}`
        );
      }

      const newFile: MenuFile = {
        id: Date.now().toString(), // Ou un ID unique généré autrement
        name: file.name,
        type: activeTab,
        url: result.url, // L'URL retournée par Cloudinary via votre API
        public_id: result.public_id, // L'ID public retourné par Cloudinary
        uploadDate: new Date().toLocaleString(),
      };

      setMenuFiles((prevFiles) => [...prevFiles, newFile]);
    } catch (err: any) {
      console.error("Échec du téléversement:", err);
      setError(
        err.message || "Une erreur inconnue est survenue lors du téléversement."
      );
    } finally {
      setUploading(false);
      // Réinitialiser l'input de fichier pour permettre de retéléverser le même fichier si nécessaire
      if (e.target) {
        e.target.value = "";
      }
    }
  };

  const handleDeleteFile = (id: string) => {
    // TODO IMPORTANT : Cette fonction supprime uniquement de localStorage.
    // Pour supprimer de Cloudinary, vous aurez besoin d'une autre API route
    // qui utilise cloudinary.uploader.destroy(public_id, { resource_type: 'raw' }).
    // C'est une étape cruciale pour une gestion complète.
    const fileToDelete = menuFiles.find((file) => file.id === id);
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer "${fileToDelete?.name}" de la liste ?\n(Cela ne supprime PAS encore le fichier de Cloudinary.)`
      )
    ) {
      setMenuFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminLoggedIn");
    }
    router.push("/admin/login");
  };

  const filteredFiles = menuFiles.filter((file) => file.type === activeTab);

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
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.RESTAURANT ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.RESTAURANT)}
          >
            Restaurant Menu
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.DELIVERY ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.DELIVERY)}
          >
            Delivery Menu
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === MENU_TYPES.ALCOHOL ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(MENU_TYPES.ALCOHOL)}
          >
            Alcohol Menu
          </button>
        </div>

        <div className={styles.content}>
          <h2>
            {activeTab === MENU_TYPES.RESTAURANT
              ? "Restaurant"
              : activeTab === MENU_TYPES.DELIVERY
              ? "Delivery"
              : "Alcohol"}{" "}
            Menu Management
          </h2>

          <div className={styles.uploadSection}>
            <label className={styles.uploadButton}>
              {/* Le texte du bouton change si en cours d'upload */}
              {uploading ? "Téléversement..." : "Téléverser Menu PDF"}
              <input
                type="file"
                accept="application/pdf" // Accepter uniquement les PDF
                onChange={handleFileUpload}
                disabled={uploading}
                style={{ display: "none" }} // Cacher l'input standard
              />
            </label>
          </div>
          {/* Afficher les messages d'erreur */}
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>Erreur: {error}</p>
          )}

          <div className={styles.filesList}>
            {filteredFiles.length === 0 ? (
              <p>Aucun menu téléversé pour cette catégorie.</p>
            ) : (
              filteredFiles.map((file) => (
                <div key={file.id} className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <p className={styles.fileName}>{file.name}</p>
                    <p className={styles.fileDate}>
                      Téléversé le: {file.uploadDate}
                    </p>
                    {/* <p className={styles.fileDate}>Public ID: {file.public_id}</p> */}{" "}
                    {/* Pour débogage */}
                  </div>
                  <div className={styles.fileActions}>
                    <a
                      href={file.url} // URL Cloudinary
                      download={file.name} // Permet de télécharger avec le nom original
                      className={styles.downloadButton}
                    >
                      Download
                    </a>
                    <a
                      href={file.url} // URL Cloudinary
                      target="_blank" // Ouvre dans un nouvel onglet
                      rel="noopener noreferrer"
                      className={styles.viewButton}
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className={styles.deleteButton}
                    >
                      Supprimer (Liste){" "}
                      {/* Préciser que ça supprime de la liste seulement pour l'instant */}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}

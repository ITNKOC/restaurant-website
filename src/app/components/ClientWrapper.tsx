"use client";

import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "../sections/Footer";
import BackToTopBtn from "./BackToTopBtn";
import LoadingScreen from "./LoadingScreen";
import { TranslationProvider } from "../contexts/TranslationContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Charger le script Bootstrap
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.integrity =
      "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL";
    bootstrapScript.crossOrigin = "anonymous";
    document.body.appendChild(bootstrapScript);

    return () => {
      clearTimeout(timer);
      if (bootstrapScript.parentNode) {
        bootstrapScript.parentNode.removeChild(bootstrapScript);
      }
    };
  }, []);

  return (
    <TranslationProvider>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BackToTopBtn />
        </>
      )}
    </TranslationProvider>
  );
}
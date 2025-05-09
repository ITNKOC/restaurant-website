"use client";

// Import des styles
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "glightbox/dist/css/glightbox.css";
import "aos/dist/aos.css";
import "./globals.css";

// Import des polices Google
import { Playfair_Display, Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";

// Import des composants personnalisés
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./sections/Footer";
import BackToTopBtn from "./components/BackToTopBtn";
import LoadingScreen from "./components/LoadingScreen";

// Définition des polices
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="description"
          content="Restaurant DiMenna - La meilleure expérience culinaire"
        />
        <meta name="theme-color" content="#0c0b09" />
        <link rel="icon" href="/favicon.ico" />
        <title>Restaurant Di Menna</title>
      </head>
      <body className={`${playfair.variable} ${openSans.variable}`}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {/* <TopBar /> */}
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <BackToTopBtn />
          </>
        )}
      </body>
    </html>
  );
}

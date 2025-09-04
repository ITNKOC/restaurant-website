// Import des styles
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "glightbox/dist/css/glightbox.css";
import "aos/dist/aos.css";
import "./globals.css";

// Import des polices Google - Optimisées pour restaurant italien
import { Cormorant_Garamond, Inter } from "next/font/google";

// Import des composants personnalisés
import ClientWrapper from "./components/ClientWrapper";

// Définition des polices italiennes élégantes
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

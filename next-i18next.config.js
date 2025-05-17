// next-i18next.config.js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "fr", // Votre langue par défaut
    locales: ["fr", "en"], // Langues supportées
    localeDetection: true, // Détecter la langue du navigateur (optionnel, mais bon pour la première visite)
  },
  // Optionnel: si vos fichiers de traduction ne sont pas dans public/locales
  localePath: path.resolve("./public/locales"),
  // Optionnel: recharger les traductions en mode développement si les fichiers JSON changent
  reloadOnPrerender: process.env.NODE_ENV === "development",
  // Vous pouvez ajouter d'autres configurations i18next ici si besoin
  // ns: ['common', 'footer', 'menu'], // Lister vos namespaces si vous en avez plusieurs
  // defaultNS: 'common',
};

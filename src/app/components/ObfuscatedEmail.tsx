// src/app/components/ObfuscatedEmail.tsx
"use client";

import React, { useEffect, useState } from "react";

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  tld: string; // Top-Level Domain (e.g., 'ca', 'com')
}

const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({
  user,
  domain,
  tld,
}) => {
  const [email, setEmail] = useState<string>(
    "[Email hidden, enable JavaScript]"
  ); // Placeholder

  useEffect(() => {
    // Décode et assemble l'e-mail côté client
    // Utilisation d'un léger délai pour s'assurer que le DOM est prêt et pour déjouer certains bots très simples
    const timer = setTimeout(() => {
      const decodedEmail = `${user}@${domain}.${tld}`;
      setEmail(decodedEmail);
    }, 50); // Un petit délai peut parfois aider

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [user, domain, tld]);

  if (email.startsWith("[Email hidden")) {
    return (
      <span
        aria-live="polite"
        style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.5" }}
      >
        {email}
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} aria-label={`Email us at ${email}`}>
      {email}
    </a>
  );
};

export default ObfuscatedEmail;

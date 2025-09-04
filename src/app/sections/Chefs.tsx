"use client";

import React, { useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import ChefsItem from "../components/ChefsItem";
import { useTranslation } from "../contexts/TranslationContext";

export default function Chefs() {
  const { t } = useTranslation();

  // Dynamic data for featured chef using translations
  const featuredChef = {
    id: 1,
    name: t('chefs.name'),
    position: t('chefs.position'),
    photo: "/assets/images/chefs/chef_1.png",
    bio: t('chefs.bio'),
    experience: t('chefs.experience'),
    quote: t('chefs.quote'),
    specialties: [
      t('chefs.specialties.0'),
      t('chefs.specialties.1'),
      t('chefs.specialties.2'),
    ],
    achievements: [
      t('chefs.achievements.0'),
      t('chefs.achievements.1'),
      t('chefs.achievements.2'),
    ],
  };
  useEffect(() => {
    // Initialize AOS animation library
    if (typeof window !== "undefined") {
      import("aos").then(({ default: AOS }) => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: false,
          mirror: false,
        });
      });
    }
  }, []);

  return (
    <section id="chefs" className="chef-feature">
      <div className="container">
        <SectionTitle
          title={t('chefs.title')}
          subtitle={t('chefs.subtitle')}
          center={true}
        />

        <ChefsItem item={featuredChef} />
      </div>
    </section>
  );
}

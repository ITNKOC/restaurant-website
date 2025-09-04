"use client";

import React from "react";
import Head from "next/head";
import ObfuscatedEmail from "../components/ObfuscatedEmail";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "../contexts/TranslationContext";
import "./recruitment.css";
const Recruitment = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>Join Our Team | Recruitment - Di Menna</title>
        <meta
          name="description"
          content="Explore career opportunities at Di Menna. We are looking for passionate individuals to join our dedicated team."
        />
        {/* Ajoutez ici les liens vers les polices si elles sont différentes de celles chargées globalement */}
      </Head>

      {/* Section Hero stylisée pour correspondre au thème */}
      <section
        id="recruitment-hero"
        className="recruitment-hero d-flex align-items-center"
      >
        <div className="container text-center">
          {" "}
          {/* Ajout de text-center ici */}
          <h1 data-aos="fade-up">{t('recruitment.hero.title')}</h1>
          <h2 data-aos="fade-up" data-aos-delay="200">
            {t('recruitment.hero.subtitle')}
          </h2>
        </div>
      </section>

      <main id="main">
        {/* Section principale du contenu */}
        <section id="recruitment-introduction" className="recruitment-section">
          <div className="container">
            <SectionTitle
              title={t('recruitment.main.title')}
              subtitle={t('recruitment.main.subtitle')}
              data-aos="fade-up"
            />
            <div className="row justify-content-center">
              <div
                className="col-lg-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="content-box text-center">
                  {" "}
                  {/* text-center pour le contenu interne */}
                  {/* Titre interne, déjà stylisé par SectionTitle ou pourrait être un h3 */}
                  {/* <h3>Shape the Future of Dining With Us</h3> */}
                  <p>
                    {t('recruitment.main.description1')}
                  </p>
                  <p>
                    {t('recruitment.main.description2')}
                  </p>
                  <p>
                    {t('recruitment.main.description3')}
                  </p>
                  <div className="cta-button-container mt-4">
                    {" "}
                    {/* Ajout de marge */}
                    <a
                      href={`mailto:${"info"}@${"dimenna"}.${"com"}`} // Placeholder pour le composant
                      className="btn-recruit app-style-btn" // Classe pour le style assorti
                      data-aos="zoom-in"
                      data-aos-delay="200"
                      style={{ display: "none" }} // Caché, remplacé par ObfuscatedEmail visuellement
                    >
                      placeholder
                    </a>
                    <ObfuscatedEmail user="info" domain="dimenna" tld="com" />
                    {/* Le composant ObfuscatedEmail va rendre le lien cliquable */}
                    {/* Vous devrez styliser le <a> rendu par ObfuscatedEmail pour qu'il ressemble à un bouton */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section des valeurs */}
        <section id="values" className="values recruitment-section section-bg">
          <div className="container">
            <SectionTitle
              title={t('recruitment.values.title')}
              subtitle={t('recruitment.values.subtitle')}
              data-aos="fade-up"
            />

            <div className="row">
              {[
                {
                  icon: "bi-star-fill",
                  titleKey: "excellence",
                  delay: "100",
                },
                {
                  icon: "bi-people-fill",
                  titleKey: "teamwork",
                  delay: "200",
                },
                {
                  icon: "bi-lightbulb-fill",
                  titleKey: "innovation",
                  delay: "300",
                },
                {
                  icon: "bi-heart-fill",
                  titleKey: "passion",
                  delay: "400",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4" // mt-lg-0 enlevé pour mobile first
                  data-aos="fade-up"
                  data-aos-delay={value.delay}
                >
                  <div className="value-box">
                    <div className="icon">
                      <i className={`bi ${value.icon}`}></i>
                    </div>
                    <h3>{t(`recruitment.values.${value.titleKey}.title`)}</h3>
                    <p>{t(`recruitment.values.${value.titleKey}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA finale */}
        <section id="join-cta" className="join-cta recruitment-section">
          <div className="container" data-aos="zoom-in">
            {" "}
            {/* data-aos sur le container */}
            <div className="row justify-content-center">
              <div className="col-lg-9 text-center">
                <h3>{t('recruitment.cta.title')}</h3>
                <p>
                  {t('recruitment.cta.description')}
                </p>
                <div className="cta-button-container">
                  {" "}
                  {/* Conteneur pour le bouton */}
                  <a
                    href={`mailto:${"info"}@${"dimenna"}.${"com"}`} // Placeholder
                    className="btn-recruit app-style-btn"
                    style={{ display: "none" }} // Caché
                  >
                    placeholder
                  </a>
                  <ObfuscatedEmail user="info" domain="dimenna" tld="com" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Recruitment;

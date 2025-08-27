"use client";

import React from "react";
import Head from "next/head";
import ObfuscatedEmail from "../components/ObfuscatedEmail";
import SectionTitle from "../components/SectionTitle";
import "./recruitment.css";
const Recruitment = () => {
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
          <h1 data-aos="fade-up">Join Our Culinary Family</h1>
          <h2 data-aos="fade-up" data-aos-delay="200">
            Embark on a rewarding journey with Di Menna.
          </h2>
        </div>
      </section>

      <main id="main">
        {/* Section principale du contenu */}
        <section id="recruitment-introduction" className="recruitment-section">
          <div className="container">
            <SectionTitle
              title="Careers at Di Menna"
              subtitle="We're Hiring Passionate Individuals"
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
                    At Di Menna, we believe our strength lies in the dedication
                    and passion of our team. We are constantly seeking
                    enthusiastic individuals who share our commitment to
                    culinary excellence and exceptional hospitality.
                  </p>
                  <p>
                    Whether you are a seasoned professional or eager to begin
                    your career in the vibrant restaurant industry, we offer a
                    dynamic and supportive environment where your talents can
                    flourish.
                  </p>
                  <p>
                    Join us and benefit from competitive remuneration,
                    opportunities for professional growth, and a positive work
                    culture that celebrates innovation and teamwork.
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
              title="Our Core Values"
              subtitle="The Principles That Guide Us"
              data-aos="fade-up"
            />

            <div className="row">
              {" "}
              {/* Pas de justify-content-center ici pour permettre un espacement naturel */}
              {[
                {
                  icon: "bi-star-fill", // Icône plus remplie
                  title: "Excellence",
                  text: "We strive for unparalleled excellence in every dish we serve and every interaction we have.",
                  delay: "100",
                },
                {
                  icon: "bi-people-fill", // Icône plus remplie
                  title: "Teamwork",
                  text: "Collaboration and mutual support are the cornerstones of our success and a thriving work environment.",
                  delay: "200",
                },
                {
                  icon: "bi-lightbulb-fill", // Icône plus remplie
                  title: "Innovation",
                  text: "We embrace creativity and continuously seek innovative ways to enhance our guests' experiences.",
                  delay: "300",
                },
                {
                  icon: "bi-heart-fill", // Icône plus remplie
                  title: "Passion",
                  text: "Our deep passion for Italian cuisine and hospitality drives us to exceed expectations daily.",
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
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
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
                <h3>Ready to Take the Next Step?</h3>
                <p>
                  If you're excited by the prospect of contributing to a leading
                  Italian restaurant, we invite you to send us your application.
                  Let's explore your future at Di Menna.
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

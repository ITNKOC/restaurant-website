"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./recruitment"; // Assure-toi que le chemin est correct

// Si tu utilises Bootstrap Icons, assure-toi qu'ils sont chargés
// import 'bootstrap-icons/font/bootstrap-icons.css';

const RecruitmentPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Durée un peu plus courte pour un effet plus vif
      once: true,
      offset: 100, // Se déclenche un peu plus tard
      easing: "ease-out-quad", // Easing plus doux
    });
  }, []);

  return (
    <>
      <Head>
        <title>Careers at DiMenna | Join Our Culinary Team</title>
        <meta
          name="description"
          content="Explore exciting career opportunities at DiMenna Restaurant. We're passionate about food, hospitality, and building a talented team."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.pageContainer}>
        {/* --- Section Héros --- */}
        <section id="recruitment-hero" className={styles.heroSection}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <h1 data-aos="fade-down">Become a Part of DiMenna</h1>
                <h2 data-aos="fade-up" data-aos-delay="200">
                  Where Passion for Italian Cuisine Meets Opportunity
                </h2>
                <div
                  data-aos="fade-up"
                  data-aos-delay="400"
                  style={{ marginTop: "30px" }}
                >
                  <a href="#why-join-us" className={styles.btnJoinTeam}>
                    <span>Explore Opportunities</span>
                  </a>
                </div>
                {/* <a href="#why-join-us" className={styles.scrollDownIndicator} aria-label="Scroll down">
                  <i className="bi bi-chevron-down"></i>
                </a> */}
              </div>
            </div>
          </div>
        </section>

        <main id="main">
          {/* --- Section "Pourquoi Nous Rejoindre ?" --- */}
          <section id="why-join-us" className={styles.whyJoinUsSection}>
            <div className="container">
              <div className={styles.sectionTitle} data-aos="fade-up">
                <h2>Why Build Your Career With Us?</h2>
                <p className={styles.subtitle}>
                  At DiMenna, we're more than just a restaurant; we're a family
                  dedicated to culinary artistry and exceptional guest
                  experiences.
                </p>
              </div>
              <div className={styles.whyJoinUsGrid}>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <h3>A Thriving Team Culture</h3>
                  <p>
                    Work in a supportive, collaborative environment where every
                    member is valued and empowered to contribute their best.
                  </p>
                </div>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h3>Growth & Development</h3>
                  <p>
                    We invest in our team's future with continuous learning
                    opportunities, mentorship, and clear paths for career
                    advancement.
                  </p>
                </div>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-award-fill"></i>
                  </div>
                  <h3>Commitment to Excellence</h3>
                  <p>
                    Be part of a team that takes pride in delivering outstanding
                    quality, from our authentic dishes to our impeccable
                    service.
                  </p>
                </div>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-building-fill-check"></i>
                  </div>
                  <h3>Inspiring Work Environment</h3>
                  <p>
                    Our beautifully designed restaurant provides an elegant and
                    motivating backdrop for your daily work.
                  </p>
                </div>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-emoji-smile-fill"></i>
                  </div>
                  <h3>Passion for Hospitality</h3>
                  <p>
                    Share your love for creating memorable dining experiences in
                    a place that cherishes genuine Italian hospitality.
                  </p>
                </div>
                <div
                  className={styles.featureBox}
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className={styles.featureBoxIcon}>
                    <i className="bi bi-currency-exchange"></i>
                  </div>
                  <h3>Competitive Rewards</h3>
                  <p>
                    We offer attractive compensation packages, benefits, and
                    recognition for your hard work and dedication.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section "Notre Culture / Nos Valeurs" --- */}
          <section id="our-culture" className={styles.cultureSection}>
            <div className="container">
              <div className={styles.sectionTitle} data-aos="fade-up">
                <h2>Our Guiding Principles</h2>
                <p className={styles.subtitle}>
                  The values that shape our identity and drive our commitment to
                  an unparalleled dining experience.
                </p>
              </div>
              {/* Tu peux réutiliser .whyJoinUsGrid et .featureBox ici, ou créer .valueItem comme dans le CSS */}
              <div className="row justify-content-center">
                {" "}
                {/* Utilisation de row pour un espacement plus standardisé via Bootstrap col */}
                <div
                  className="col-lg-3 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className={`${styles.featureBox} ${styles.valueItem}`}>
                    {" "}
                    {/* Combinaison ou style dédié */}
                    <div className={styles.featureBoxIcon}>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <h3>Excellence</h3>
                    <p>
                      Striving for the pinnacle of culinary art and service in
                      every detail.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className={`${styles.featureBox} ${styles.valueItem}`}>
                    <div className={styles.featureBoxIcon}>
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <h3>Teamwork</h3>
                    <p>
                      Believing in collective strength and mutual support to
                      achieve greatness.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className={`${styles.featureBox} ${styles.valueItem}`}>
                    <div className={styles.featureBoxIcon}>
                      <i className="bi bi-lightbulb-fill"></i>
                    </div>
                    <h3>Innovation</h3>
                    <p>
                      Constantly exploring new horizons in taste and guest
                      experience.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className={`${styles.featureBox} ${styles.valueItem}`}>
                    <div className={styles.featureBoxIcon}>
                      <i className="bi bi-heart-fill"></i>
                    </div>
                    <h3>Passion</h3>
                    <p>
                      A deep-rooted love for Italian tradition and genuine
                      hospitality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Section "Comment Postuler" --- */}
          <section id="how-to-apply" className={styles.howToApplySection}>
            <div className="container">
              <div className={styles.sectionTitle} data-aos="fade-up">
                <h2>Ready to Start Your Journey?</h2>
              </div>
              <div className="row justify-content-center">
                <div
                  className="col-lg-8"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className={styles.contentWrapper}>
                    {" "}
                    {/* Ajout d'un wrapper pour le contenu */}
                    <h3>Join the DiMenna Family</h3>
                    <p>
                      We are excited to hear from talented individuals who are
                      eager to contribute to our legacy of fine Italian dining.
                      If you're ready to take the next step in your career and
                      believe you'd be a great fit for our team, we encourage
                      you to reach out.
                    </p>
                    <p>
                      Please send your resume and a cover letter detailing your
                      experience and why you're passionate about joining DiMenna
                      to:
                    </p>
                    <a
                      href="mailto:careers@dimenna.ca" /* REMPLACE PAR TON EMAIL */
                      className={styles.btnJoinTeam}
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <span>Apply via Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default RecruitmentPage;

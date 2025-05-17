"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import styles from "./lobsterFestHero.module.css";
import HeroBtnFestival, {
  HeroBtnFestivalProps,
} from "../components/HeroBtnFestival";

export default function LobsterFestHero(): JSX.Element {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  // Props pour les boutons du festival
  const festMenuButtonProps: HeroBtnFestivalProps = {
    name: "View Fest Menu",
    target: "lobster-fest-menu",
    icon: "utensils", // ou 'fish-fins' pour Bootstrap Icons, ou l'icône FontAwesome correspondante
    primary: true, // Indique que c'est le bouton principal du festival
  };

  const bookTableButtonProps: HeroBtnFestivalProps = {
    name: "Book Your Feast",
    target: "book-a-table",
    icon: "calendar-check", // ou 'calendar3-event' pour Bootstrap Icons
    primary: false, // Ce n'est pas le bouton primaire, donc il utilisera le style secondaire
  };

  return (
    <section
      id="hero-lobster-fest"
      className={`${styles.heroLobsterFest} d-flex align-items-center`}
    >
      <div
        className="container position-relative text-center text-lg-start"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <div className="row">
          <div className="col-lg-9">
            <h1 className={styles.h1}>
              Di Menna's Grand <span className={styles.span}>Lobster Fest</span>
            </h1>
            <h2 className={styles.h2}>
              An Ocean of Flavor Awaits! Indulge in the Season's Finest.
            </h2>

            <div className={styles.btns}>
              <HeroBtnFestival {...festMenuButtonProps} />
              <HeroBtnFestival {...bookTableButtonProps} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

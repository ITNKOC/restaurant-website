"use client";

import React from "react";
import Image from "next/image";
import aboutImage from "../../../public/assets/images/Frank 2.jpg";
import "./about.css";
import { useTranslation } from "../contexts/TranslationContext";

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="about-img">
              <Image src={aboutImage} alt="Di Menna Restaurant Interior" />
            </div>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>{t('about.title')}</h3>
            <p className="fst-italic">
              {t('about.subtitle')}
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i> {t('about.features.0')}
              </li>
              <li>
                <i className="bi bi-check-circle"></i> {t('about.features.1')}
              </li>
              <li>
                <i className="bi bi-check-circle"></i> {t('about.features.2')}
              </li>
            </ul>
            <p>
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

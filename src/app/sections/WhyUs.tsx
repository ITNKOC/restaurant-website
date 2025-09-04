"use client";

import React from "react";
import "./whyUs.css";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "../contexts/TranslationContext";

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">
        <SectionTitle
          title={t('whyUs.title')}
          subtitle={t('whyUs.subtitle')}
        />

        <div className="row">
          {[0, 1, 2].map((index) => (
            <div
              className="col-lg-4"
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="why-box">
                <div className="icon-wrapper">
                  <div className={`icon-${index === 0 ? 'tradition' : index === 1 ? 'quality' : 'experience'}`}></div>
                </div>
                <h4>{t(`whyUs.reasons.${index}.title`)}</h4>
                <p>{t(`whyUs.reasons.${index}.content`)}</p>
                <div className="decorative-line"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="why-us-footer" data-aos="fade-up" data-aos-delay="400">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">{t('whyUs.stats.years')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">{t('whyUs.stats.customers')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">{t('whyUs.stats.dishes')}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="quote-container">
                <blockquote>
                  "{t('whyUs.quote')}"
                </blockquote>
                <cite>{t('whyUs.quoteAuthor')}</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

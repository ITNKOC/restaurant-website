// src/app/sections/Footer.tsx (ou votre chemin)
"use client";

import React from "react";
import "./footer.css"; // Assurez-vous que ce chemin est correct
import Image from "next/image";
import ObfuscatedEmail from "../components/ObfuscatedEmail"; // <--- IMPORTATION AJOUTÉE (Ajustez le chemin si nécessaire)
import { useTranslation } from "../contexts/TranslationContext";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer id="footer">
      {/* Decorative wave element */}
      <div className="footer-wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="container">
        <div className="row">
          {/* Brand & About */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-brand">
              <div className="logo">
                <a href="/" className="logo me-auto me-lg-0">
                  <Image
                    src="/assets/images/logo2.svg"
                    alt="Restaurant Logo"
                    width={217}
                    height={46}
                    className="img-fluid"
                    priority
                  />
                </a>
              </div>
              <p className="tagline">{t('footer.tagline')}</p>
              <p>
                {t('footer.description')}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-contact">
              <h4>{t('footer.contact.title')}</h4>

              <div className="contact-info-item">
                <i className="bi bi-geo-alt"></i>
                <div className="details">
                  <h5>{t('footer.contact.address')}</h5>
                  <p>
                    6313 Jarry Street East
                    <br />
                    Saint-Léonard, QC, Canada H1P1W1
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="bi bi-telephone"></i>
                <div className="details">
                  <h5>{t('footer.contact.phone')}</h5>
                  <p>(514) 326-4200</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="bi bi-envelope"></i>
                <div className="details">
                  <h5>{t('footer.contact.email')}</h5>
                  <ObfuscatedEmail
                    user="info"
                    domain="dimenna"
                    tld="com"
                  />{" "}
                  {/* <--- NOUVELLE LIGNE */}
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-hours">
              <h4>{t('footer.hours.diningRoom')}</h4>
              <table className="hours-table">
                <tbody>
                  <tr>
                    <td>{t('footer.hours.days.monday')}</td>
                    <td>{t('footer.hours.days.closed')}</td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.tuesday')}</td>
                    <td>11:00am - 2:00pm</td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.wednesday')}</td>
                    <td>
                      11:00am - 2:00pm
                      <br />
                      4:00pm - 8:00pm
                    </td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.thursday')}</td>
                    <td>
                      11:00am - 2:00pm
                      <br />
                      4:00pm - 8:30pm
                    </td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.friday')}</td>
                    <td>
                      11:00am - 2:00pm
                      <br />
                      4:00pm - 9:30pm
                    </td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.saturday')}</td>
                    <td>4:00pm - 9:30pm</td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.sunday')}</td>
                    <td>4:00pm - 8:00pm</td>{" "}
                    {/* Corrigé ici (manquait am/pm mais le vôtre est ok) */}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="footer-hours mt-4">
              <h4>{t('footer.hours.takeout')}</h4>
              <table className="hours-table">
                <tbody>
                  <tr>
                    <td>{t('footer.hours.days.monday')}</td>
                    <td>{t('footer.hours.days.closed')}</td>
                  </tr>
                  <tr>
                    <td>Sunday - Tuesday - Wednesday</td>
                    <td>11:00am - 8:00pm</td>
                  </tr>
                  <tr>
                    <td>{t('footer.hours.days.thursday')}</td>
                    <td>11:00am - 9:00pm</td>
                  </tr>
                  <tr>
                    <td>Friday - Saturday</td>
                    <td>11:00am - 10:00pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Newsletter and Social Media */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-subscribe">
              <h4>{t('footer.newsletter.title')}</h4>
              <p>
                {t('footer.newsletter.description')}
              </p>

              <form className="subscribe-form">
                <input type="email" placeholder={t('footer.newsletter.placeholder')} required />
                <button type="submit">
                  <i className="bi bi-send"></i>
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="footer-social mt-4">
              <h4>{t('footer.social.title')}</h4>
              <div className="social-links">
                <a
                  href="https://www.instagram.com/dimennaresto/"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/restaurantdimenna"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright & Nav */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-lg-6">
              <p className="copyright">
                © {new Date().getFullYear()}{" "}
                <strong>Di Menna Restaurant</strong>. {t('footer.copyright')}
              </p>
            </div>
            <div className="col-lg-6">
              <div className="footer-nav">
                <a href="#menu">{t('footer.nav.menu')}</a>
                <a href="#about">{t('footer.nav.about')}</a>
                <a href="#book-a-table">{t('footer.nav.reservations')}</a>
                <a href="#chefs">{t('footer.nav.chefs')}</a>
                <a href="#recruitment-hero">{t('footer.nav.careers')}</a>
                <a href="#contact">{t('footer.nav.contact')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

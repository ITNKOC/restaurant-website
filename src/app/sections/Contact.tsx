// src/app/sections/Contact.tsx
"use client";
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle"; // Assurez-vous que ce chemin est correct
import ObfuscatedEmail from "../components/ObfuscatedEmail"; // <--- IMPORTATION AJOUTÉE (Ajustez le chemin)
import { useTranslation } from "../contexts/TranslationContext";
import "./contact.css"; // Assurez-vous que ce chemin est correct

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    sent: false,
    error: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ loading: true, sent: false, error: false });
    console.log("Form Data Submitted:", formData);
    setTimeout(() => {
      setFormStatus({ loading: false, sent: true, error: false });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setFormStatus({ loading: false, sent: false, error: false });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />
        <div className="contact-intro">
          <p>
            {t('contact.intro')}
          </p>
        </div>
      </div>

      <div className="map-container" data-aos="zoom-in">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.791478013668!2d-73.58204188425301!3d45.55504877910207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91e0ab0a9a291%3A0x5e93f060b5905678!2s6313%20Rue%20Jarry%20E%2C%20Saint-L%C3%A9onard%2C%20QC%20H1P%201W1!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca" // Remplacez par votre URL Google Maps valide
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map"
          title="Di Menna Restaurant Location"
        ></iframe>
        <div className="map-overlay">
          <div className="map-card">
            <h3>{t('contact.restaurantName')}</h3>
            <p>{t('contact.restaurantTagline')}</p>
            <div className="map-actions">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=6313+Jarry+Street+East+Saint-Léonard+QC+H1P+1W1"
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
              >
                <i className="bi bi-pin-map-fill"></i> {t('contact.getDirections')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container contact-section" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-info">
              {/* Info Card: Location */}
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>{t('contact.location')}</h4>
                    <p>
                      6313 Jarry Street East
                      <br />
                      Saint-Léonard, QC H1P 1W1
                    </p>
                    <p className="text-muted">{t('contact.locationDetails')}</p>
                  </div>
                </div>
              </div>

              {/* Info Card: Dining Hours - MODIFIÉ */}
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div className="info-content">
                    <h4>{t('contact.diningHours')}</h4>
                    <div className="hours-grid">
                      <div className="day">{t('footer.hours.days.monday')}:</div>
                      <div className="time">{t('footer.hours.days.closed')}</div>

                      <div className="day">{t('footer.hours.days.tuesday')}:</div>
                      <div className="time">{t('contact.hours.tuesday').replace('Mardi: ', '').replace('Tuesday: ', '')}</div>

                      <div className="day">{t('footer.hours.days.wednesday')}:</div>
                      <div className="time">
                        {t('contact.hours.wednesday').replace('Mercredi: ', '').replace('Wednesday: ', '')}
                      </div>

                      <div className="day">{t('footer.hours.days.thursday')}:</div>
                      <div className="time">
                        {t('contact.hours.thursday').replace('Jeudi: ', '').replace('Thursday: ', '')}
                      </div>

                      <div className="day">{t('footer.hours.days.friday')}:</div>
                      <div className="time">
                        {t('contact.hours.friday').replace('Vendredi: ', '').replace('Friday: ', '')}
                      </div>

                      <div className="day">{t('footer.hours.days.saturday')}:</div>
                      <div className="time">{t('contact.hours.saturday').replace('Samedi: ', '').replace('Saturday: ', '')}</div>

                      <div className="day">{t('footer.hours.days.sunday')}:</div>
                      <div className="time">{t('contact.hours.sunday').replace('Dimanche: ', '').replace('Sunday: ', '')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card: Call Us */}
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="info-content">
                    <h4>{t('contact.callUs')}</h4>
                    <p>
                      <a href="tel:+15143264200">(514) 326-4200</a>
                    </p>
                    <p className="text-muted">{t('contact.callForReservations')}</p>
                  </div>
                </div>
              </div>

              {/* Info Card: Email - MODIFIÉ */}
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>{t('contact.email')}</h4>
                    {/* Remplacer le lien mailto direct par le composant ObfuscatedEmail */}
                    <ObfuscatedEmail user="info" domain="dimenna" tld="com" />
                    <p className="text-muted" style={{ marginTop: "5px" }}>
                      {t('contact.emailResponse')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-form-container">
              <h3>{t('contact.sendMessage')}</h3>
              <p>
                {t('contact.sendMessageIntro')}
              </p>
              <form
                onSubmit={handleSubmit}
                className="contact-form php-email-form"
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="name">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="email">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject')}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message')}</label>
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-status my-3">
                  {formStatus.loading && (
                    <div className="status-message loading-message">
                      <i className="bi bi-arrow-repeat spinning"></i> {t('contact.form.sending')}
                    </div>
                  )}
                  {formStatus.sent && (
                    <div className="status-message success-message">
                      <i className="bi bi-check-circle"></i> {t('contact.form.sent')}
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="status-message error-message">
                      <i className="bi bi-exclamation-triangle"></i> {t('contact.form.error')}
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <button type="submit" disabled={formStatus.loading}>
                    {formStatus.loading ? t('contact.form.sendingButton') : t('contact.form.sendButton')}{" "}
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import "./contact.css";

export default function Contact() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, sent: false, error: false });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ loading: false, sent: true, error: false });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ loading: false, sent: false, error: false });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Contact" subtitle="Get in Touch" />

        <div className="contact-intro">
          <p>
            We'd love to hear from you! Whether you have a question about our
            menu, want to make a reservation, or need information about our
            private events, our team is here to help.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-container" data-aos="zoom-in">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.0913780455997!2d-73.5837123!3d45.5364045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91f10d052e0f5%3A0xa2ca2f13b4748a36!2s6313%20Rue%20Jarry%20E%2C%20Saint-L%C3%A9onard%2C%20QC%20H1P%201W1%2C%20Canada!5e0!3m2!1sen!2sus!4v1715966487068!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map"
        ></iframe>

        <div className="map-overlay">
          <div className="map-card">
            <h3>Di Menna Restaurant</h3>
            <p>Authentic Italian cuisine in the heart of Saint-Léonard</p>
            <div className="map-actions">
              <a
                href="https://goo.gl/maps/RkPQgZDJqWTX9HhYA"
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
              >
                <i className="bi bi-pin-map-fill"></i> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container contact-section" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Location</h4>
                    <p>
                      6313 Jarry Street East
                      <br />
                      Saint-Léonard, QC H1P 1W1
                    </p>
                    <p className="text-muted">Ample parking available</p>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-clock"></i>
                  </div>
                  <div className="info-content">
                    <h4>Dining Hours</h4>
                    <div className="hours-grid">
                      <div className="day">Sunday-Monday:</div>
                      <div className="time">Closed</div>

                      <div className="day">Tuesday:</div>
                      <div className="time">11:00am - 2:00pm</div>

                      <div className="day">Wed-Thu:</div>
                      <div className="time">
                        11:00am - 2:00pm
                        <br />
                        4:30pm - 8:00pm
                      </div>

                      <div className="day">Friday:</div>
                      <div className="time">
                        11:00am - 2:00pm
                        <br />
                        4:30pm - 9:00pm
                      </div>

                      <div className="day">Saturday:</div>
                      <div className="time">4:30pm - 9:00pm</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>
                      <a href="tel:+15143259222">(514) 325-9222</a>
                    </p>
                    <p className="text-muted">Call for reservations</p>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-item">
                  <div className="icon-container">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:info@dimenna.ca">info@dimenna.ca</a>
                    </p>
                    <p className="text-muted">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-form-container">
              <h3>Send Us a Message</h3>
              <p>
                We'd be delighted to hear from you. Please fill out the form
                below, and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="name">Your Name</label>
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
                    <label htmlFor="email">Your Email</label>
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
                  <label htmlFor="subject">Subject</label>
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
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-status">
                  {formStatus.loading && (
                    <div className="status-message loading-message">
                      <i className="bi bi-arrow-repeat spinning"></i> Sending
                      message...
                    </div>
                  )}
                  {formStatus.sent && (
                    <div className="status-message success-message">
                      <i className="bi bi-check-circle"></i> Your message has
                      been sent. Thank you!
                    </div>
                  )}
                  {formStatus.error && (
                    <div className="status-message error-message">
                      <i className="bi bi-exclamation-triangle"></i> There was
                      an error sending your message. Please try again.
                    </div>
                  )}
                </div>

                <div className="text-end">
                  <button type="submit" disabled={formStatus.loading}>
                    {formStatus.loading ? "Sending..." : "Send Message"}{" "}
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

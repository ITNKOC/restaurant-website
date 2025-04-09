import React from "react";
import "./footer.css";
import Image from "next/image";

export default function Footer() {
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
              <p className="tagline">Fine Italian Cuisine</p>
              <p>
                Discover authentic Italian cuisine in an elegant setting. An
                unforgettable culinary experience in the heart of Montreal.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-contact">
              <h4>Contact Us</h4>

              <div className="contact-info-item">
                <i className="bi bi-geo-alt"></i>
                <div className="details">
                  <h5>Address</h5>
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
                  <h5>Phone</h5>
                  <p>(514) 325-9222</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="bi bi-envelope"></i>
                <div className="details">
                  <h5>Email</h5>
                  <p>info@dimenna.ca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-hours">
              <h4>Dining Room Hours</h4>
              <table className="hours-table">
                <tbody>
                  <tr>
                    <td>Sunday - Monday</td>
                    <td>Closed</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>11:00am - 2:00pm</td>
                  </tr>
                  <tr>
                    <td>Wednesday - Thursday</td>
                    <td>
                      11:00am - 2:00pm
                      <br />
                      4:30pm - 8:00pm
                    </td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>
                      11:00am - 2:00pm
                      <br />
                      4:30pm - 9:00pm
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>4:30pm - 9:00pm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="footer-hours mt-4">
              <h4>Takeout/Delivery Hours</h4>
              <table className="hours-table">
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>Closed</td>
                  </tr>
                  <tr>
                    <td>Tuesday - Thursday</td>
                    <td>11:00am - 8:00pm</td>
                  </tr>
                  <tr>
                    <td>Friday - Saturday</td>
                    <td>11:00am - 9:00pm</td>
                  </tr>
                  <tr>
                    <td>Sunday</td>
                    <td>11:00am - 8:00pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Newsletter and Social Media */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-subscribe">
              <h4>Stay Informed</h4>
              <p>
                Subscribe to our newsletter to receive our latest offers,
                special events, and exclusive promotions.
              </p>

              <form className="subscribe-form">
                <input type="email" placeholder="Your email" required />
                <button type="submit">
                  <i className="bi bi-send"></i>
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="footer-social mt-4">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" aria-label="TripAdvisor">
                  <i className="bi bi-star"></i>
                </a>
                <a href="#" aria-label="Google">
                  <i className="bi bi-google"></i>
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
                &copy; {new Date().getFullYear()}{" "}
                <strong>Di Menna Restaurant</strong>. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="footer-nav">
                <a href="#menu">Menu</a>
                <a href="#about">About</a>
                <a href="#gallery">Gallery</a>
                <a href="#events">Events</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Head from "next/head";
import "./recruitment";

const Recruitment = () => {
  return (
    <>
      <Head>
        <title>Join Our Team | Recruitment</title>
        <meta
          name="description"
          content="Join our team and be part of our exciting journey. Contact us to learn about opportunities."
        />
      </Head>

      <section id="recruitment-hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 data-aos="fade-up">Join Our Team</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">
                Be part of our exciting journey
              </h2>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="recruitment-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center" data-aos="fade-up">
                <div className="recruitment-box">
                  <h3>We're Looking for Talented People</h3>
                  <p>
                    At DiMenna, we believe that our success is built on the
                    talent and dedication of our team. We're always looking for
                    passionate individuals who share our values and vision.
                  </p>
                  <p>
                    Whether you're an experienced professional or just starting
                    your career, we offer a collaborative environment where you
                    can grow and make a meaningful impact.
                  </p>
                  <p>
                    Our team enjoys competitive compensation, opportunities for
                    professional development, and a positive work culture that
                    values innovation and excellence.
                  </p>
                  <div className="join-button-container">
                    <a
                      href="mailto:info@dimenna.ca"
                      className="btn-join-team"
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    >
                      Contact Us To Join Our Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="values section-bg">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Our Values</h2>
            </div>

            <div className="row justify-content-center">
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="value-box">
                  <div className="icon">
                    <i className="bi bi-star"></i>
                  </div>
                  <h3>Excellence</h3>
                  <p>
                    We strive for excellence in everything we do, delivering the
                    highest quality service.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="value-box">
                  <div className="icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <h3>Teamwork</h3>
                  <p>
                    We believe in collaboration and supporting each other to
                    achieve common goals.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="value-box">
                  <div className="icon">
                    <i className="bi bi-lightbulb"></i>
                  </div>
                  <h3>Innovation</h3>
                  <p>
                    We embrace new ideas and approaches to continuously improve
                    our services.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="value-box">
                  <div className="icon">
                    <i className="bi bi-heart"></i>
                  </div>
                  <h3>Passion</h3>
                  <p>
                    We are passionate about what we do and committed to
                    exceeding expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="join-cta" className="join-cta">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9 text-center" data-aos="zoom-in">
                <h3>Ready to Join Our Team?</h3>
                <p>
                  Send us your resume and let's start the conversation about
                  your future with us.
                </p>
                <a href="mailto:info@dimenna.ca" className="btn-join-team">
                  Contact Us Today
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Recruitment;

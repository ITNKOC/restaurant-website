import React from "react";
import Image from "next/image";
import aboutImage from "../../../public/assets/images/Frank 2.jpg";
import "./about.css";

export default function About() {
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
            <h3>A Family Tradition of Italian Excellence Since 1971</h3>
            <p className="fst-italic">
              Founded by Franco Di Menna, our restaurant has evolved from a
              simple pizzeria to one of Montréal's most beloved Italian dining
              destinations.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i> Authentic Italian recipes
                passed down through generations
              </li>
              <li>
                <i className="bi bi-check-circle"></i> Fresh, locally-sourced
                ingredients combined with imported Italian specialties
              </li>
              <li>
                <i className="bi bi-check-circle"></i> From our humble
                beginnings as a simple pizzeria to our current status as a
                full-service restaurant, we've maintained our commitment to
                quality and tradition while embracing innovation.
              </li>
            </ul>
            <p>
              Located at 6313 rue Jarry Est in Saint-Léonard, Di Menna has
              become a cornerstone of the community. Our menu features
              traditional antipasti, homemade pasta, best pizzas in Montreal,
              and classic Italian desserts. In 2016, we renovated our dining
              room and added a bar serving specialty cocktails and Italian
              beers, enhancing the dining experience while maintaining the warm,
              family atmosphere that has made us a neighborhood favorite for
              over five decades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

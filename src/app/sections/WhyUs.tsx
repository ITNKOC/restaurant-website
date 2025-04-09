import React from "react";
import "./whyUs.css";
import SectionTitle from "../components/SectionTitle";

export default function WhyUs() {
  const whyUsItems = [
    {
      id: 1,
      icon: "tradition",
      title: "Family Tradition",
      content:
        "Founded in 1971 by Franco Di Menna, our restaurant preserves authentic Italian recipes passed down through generations, bringing the true taste of Italy to Montréal for over 50 years.",
    },
    {
      id: 2,
      icon: "quality",
      title: "Premium Ingredients",
      content:
        "We import the finest ingredients directly from Italy and source fresh local produce daily, ensuring each dish delivers exceptional flavor and authenticity that celebrates true Italian culinary excellence.",
    },
    {
      id: 3,
      icon: "experience",
      title: "Unique Experience",
      content:
        "From our wood-fired pizzas to our homemade pasta and delectable desserts, every visit to Di Menna offers a journey through Italy's diverse regional cuisines in a warm, welcoming atmosphere.",
    },
  ];

  return (
    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">
        <SectionTitle
          title="Why Choose Us"
          subtitle="The Di Menna Difference"
        />

        <div className="row">
          {whyUsItems.map((item) => (
            <div
              className="col-lg-4"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={item.id * 100}
            >
              <div className="why-box">
                <div className="icon-wrapper">
                  <div className={`icon-${item.icon}`}></div>
                </div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
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
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Happy Customers Weekly</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Signature Dishes</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="quote-container">
                <blockquote>
                  "At Di Menna, we don't just serve food; we share our heritage,
                  passion, and the joy of Italian cuisine with every dish we
                  prepare."
                </blockquote>
                <cite>— The Di Menna Family</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import "./chefsItem.css";
import Image from "next/image";

interface ChefItemProps {
  item: {
    id: number;
    name: string;
    photo: string;
    position: string;
    bio: string;
    experience: string;
    specialties: string[];
    achievements: string[];
    quote: string;
  };
}

export default function ChefsItem({ item }: ChefItemProps) {
  return (
    <div className="row align-items-center">
      <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
        <div className="chef-card fade-in-up">
          <div className="chef-photo-container">
            <Image
              src={item.photo}
              alt={`Chef ${item.name}`}
              width={600}
              height={500}
              className="chef-photo"
              priority
            />
            <div className="chef-overlay"></div>
          </div>

          <div className="chef-info">
            <div className="chef-title">
              <h3 className="chef-name">{item.name}</h3>
              <span className="chef-position">{item.position}</span>
              <div className="chef-divider"></div>
            </div>

            <div className="chef-stats">
              <div className="stat-item">
                <div className="stat-value">{item.experience}</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{item.specialties.length}</div>
                <div className="stat-label">Specialties</div>
              </div>
            </div>

            <div className="chef-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
        <div className="chef-content fade-in-right">
          <blockquote className="chef-quote">{item.quote}</blockquote>

          <p className="chef-description">{item.bio}</p>

          <div className="chef-achievements">
            <h4 className="achievement-title">Achievements & Specialties</h4>
            <ul className="achievement-list">
              {item.achievements.map((achievement, index) => (
                <li key={index} className="achievement-item">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn-cta">Book a Table</button>
        </div>
      </div>
    </div>
  );
}

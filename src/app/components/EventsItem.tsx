import React from "react";
import "./eventsItem.css";

export default function EventsItem({
  item,
}: {
  item: {
    id: number;
    image: string;
    title: string;
    price: number;
    content: string;
    details: string[];
    summary: string;
  };
}) {
  return (
    <div className="row event-item">
      <div className="col-lg-6 event-image-col">
        <div className="event-image-container">
          <img src={item.image} className="img-fluid" alt={item.title} />
          <div className="event-image-overlay">
            <span className="event-category">
              {item.id === 1
                ? "Celebrations"
                : item.id === 2
                ? "Corporate"
                : "Special Occasions"}
            </span>
          </div>
        </div>
      </div>
      <div className="col-lg-6 pt-4 pt-lg-0 content">
        <div className="event-badge">Host Your Event</div>
        <h3>{item.title}</h3>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">{item.price}</span>
          <span className="unit">/ person</span>
        </div>
        <p className="fst-italic">{item.content}</p>

        <div className="event-features">
          {item.details.length > 0 &&
            item.details.map((detail, index) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div className="feature-text">{detail}</div>
              </div>
            ))}
        </div>

        <p className="event-summary">{item.summary}</p>

        <div className="event-cta">
          <a href="#book-a-table" className="btn-book-event">
            <span>Reserve This Package</span>
          </a>
        </div>
      </div>
    </div>
  );
}

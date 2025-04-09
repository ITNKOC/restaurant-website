import React from "react";
import "./specialsItem.css";

export default function SpecialsItem({
  item,
}: {
  item: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    content: string;
    active: boolean;
  };
}) {
  return (
    <div
      className={`tab-pane ${item.active ? "active show" : ""}`}
      id={`tab-${item.id.toString()}`}
    >
      <div className="row">
        <div className="col-lg-8 details order-2 order-lg-1">
          <h3>{item.title}</h3>
          <p className="fst-italic">{item.subtitle}</p>
          <p>{item.content}</p>
          <div className="special-item-footer">
            <div className="special-item-price">
              <span className="price-tag">Special Price</span>
              <span className="price-value">$26.95</span>
            </div>
            <div className="special-item-badge">
              <span>Chef's Choice</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center order-1 order-lg-2">
          <div className="special-img-container">
            <img src={item.image} alt={item.title} className="img-fluid" />
            <div className="special-img-overlay">
              <span>Di Menna</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

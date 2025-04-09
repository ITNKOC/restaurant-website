import React, { useRef, useEffect, useState } from "react";
import "./loadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="restaurant-name-container">
        <h1 className="restaurant-name">Di Menna</h1>

        <div className="italian-flag">
          <div className="stripe"></div>
          <div className="stripe"></div>
          <div className="stripe"></div>
        </div>

        <p className="sub-text">Autentica Cucina Italiana</p>

        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

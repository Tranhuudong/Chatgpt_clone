import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>DODO AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

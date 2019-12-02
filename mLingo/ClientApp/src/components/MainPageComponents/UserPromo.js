import React from "react";
import "../styles/css/Promo.css";

const UserPromo = props => {
  return (
    <div className="position-relative">
      <div className="help-others"></div>
      <div className="help-others-text">
        <h1>Help us develop the world!</h1>
        <h3>
          Join us now! <div className="d-block d-md-none"></div>Learn new things
          and share your knowledge with others!
        </h3>
      </div>
    </div>
  );
};

export default UserPromo;

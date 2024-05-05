import React from "react";
import FCHamburger from "../components/FCHamburger";
import locationPin from "../assets/images/locationPin1.png";

export default function FCMap({ location }) {
  const male = "";
  const seenMale = "";
  const female = "";
  const seenFemale = "";

  return (
    <div className="map-container">
      <div className="map">
        <FCHamburger />
        <div className="map-footer">
          <img src={locationPin} />
          <h3>{location}</h3>
        </div>
      </div>
    </div>
  );
}

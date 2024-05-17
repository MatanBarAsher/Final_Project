import React from "react";
import FCHamburger from "../components/FCHamburger";
import locationPin from "../assets/images/locationPin1.png";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import { useNavigate } from "react-router-dom";

export default function FCMap({ location }) {
  const male = <ManIcon />;
  const seenMale = <ManIcon color="white" />;
  const female = <WomanIcon />;
  const seenFemale = <WomanIcon color="white" />;

  return (
    <div className="map-container">
      <div className="map">
        <FCHamburger />
        <div className="map-footer">
          <img
            src={locationPin}
            width={"32px"}
            height={"42.5"}
            style={{ margin: 15 }}
          />
          <h3>{location}אני נמצא פה</h3>
        </div>
      </div>
    </div>
  );
}

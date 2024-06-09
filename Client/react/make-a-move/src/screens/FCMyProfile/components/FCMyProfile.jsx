import React from "react";
import background from "../../../assets/images/Matan.jpg";
import FCCustomX from "../../../components/FCCustomX";
import FCCustomEdit from "../../../components/FCCustomEdit";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";

export default function FCMyProfile({ name, image }) {
  return (
    <>
      <div className="side-menu">
        <FCCustomEdit color="white" />
        <div className="upper-side-prof">
          <FCCustomX color="white" />

          <div
            className="profile-image"
            style={{
              backgroundImage: `url(.${background})`,
              height: 100,
              width: 100,
              border: "4px solid white",
              borderRadius: "50%",
            }}
          ></div>
          <div className="myName">
            <h1>{name}מתן</h1>
          </div>
        </div>

        <div className="lower-side-prof">
            <p className="prop-details">שם:</p>
            <p className="prop-details">גיל:</p>
            <p className="prop-details">גר/ה ב:</p>
            <p className="prop-details">קצת על עצמי:</p>
        </div>
         <div className="footer-side-menu">
        <a className="side-menu-option">
          <WavingHandOutlinedIcon color="white" />
          <p>התנתקות</p>
        </a>
      </div>
      </div>
     
    </>
  );
}

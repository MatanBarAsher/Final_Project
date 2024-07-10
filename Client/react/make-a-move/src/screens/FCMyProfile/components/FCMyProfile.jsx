import React from "react";
import background from "../../../assets/images/Matan.jpg";
import FCCustomX from "../../../components/FCCustomX";
import FCCustomEdit from "../../../components/FCCustomEdit";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import { useNavigate } from "react-router";

export default function FCMyProfile({ name, image }) {
  const Navigate = useNavigate();
  return (
    <>
      <div className="side-menu">
        <div onClick={() => Navigate("/updateProfile")}>
          <FCCustomEdit color="white" />
        </div>
        <div className="upper-side-prof">
          <div onClick={() => Navigate("/sideMenu")}>
            <FCCustomX color="white" />
          </div>

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
          <p className="prof-details">שם:</p>
          <p className="prof-details">גיל:</p>
          <p className="prof-details">גר/ה ב:</p>
          <p className="prof-details">קצת על עצמי:</p>
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

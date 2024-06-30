import React from "react";
import FCCustomX from "../components/FCCustomX";
import background from "../assets/images/Matan.jpg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import { Navigate, useNavigate } from "react-router";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function FCSideMenu({ name, image }) {
  const Navigate = useNavigate();
  return (
    <div className="side-menu">
      <a onClick={() => Navigate("/home")}>
        <FCCustomX color="white" />
      </a>
      <div className="upper-side-menu">
        <h2>{name}</h2>
        <div
          className="p-image"
          style={{
            backgroundImage: `url(.${background})`,
            height: 100,
            width: 100,
            border: "4px solid white",
            borderRadius: "50%",
          }}
        ></div>
      </div>
      <div className="lower-side-menu">
        <a onClick={() => Navigate("/myProfile")} className="side-menu-option">
          <PersonOutlineOutlinedIcon />
          <p>אזור אישי</p>
        </a>
        <a onClick={() => Navigate("/matches")} className="side-menu-option">
          <FavoriteBorderIcon />
          <p>רשימת התאמות</p>
        </a>
        <a
          onClick={() => Navigate("/recommendations")}
          className="side-menu-option"
        >
          <StarBorderRoundedIcon />
          <p>המלצות</p>
        </a>
        <a
          onClick={() => Navigate("/updatePreferences")}
          className="side-menu-option"
        >
          <ModeEditOutlineOutlinedIcon color="white" />
          <p>עריכת העדפות</p>
        </a>
      </div>
      <div className="footer-side-menu">
        <a className="side-menu-option">
          <WavingHandOutlinedIcon color="white" />
          <p>התנתקות</p>
        </a>
      </div>
    </div>
  );
}

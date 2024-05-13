import React from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
const FCWellcome = () => {
  const navigate = useNavigate();

  return (
    <span>
      <img src={logo} className="logo" />
      <p style={{ color: "white" }}>Location based dating app</p>
      <FCCustomBtn title={"התחברות"} onClick={() => navigate("/signin")} />
      <FCCustomBtn title={"הרשמה"} onClick={() => navigate("/signup")} />
    </span>
  );
};

export default FCWellcome;

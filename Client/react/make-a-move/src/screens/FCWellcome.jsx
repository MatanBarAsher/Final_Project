import React from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";

const FCWellcome = () => {
  return (
    <>
      <img src={logo} className="logo" />
      <p style={{ color: "white" }}>Location based dating app</p>
      <FCCustomBtn title={"התחברות"} />
      <FCCustomBtn title={"הרשמה"} />
    </>
  );
};

export default FCWellcome;

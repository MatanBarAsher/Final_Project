import React from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";

const FCSignIn = () => {
  return (
    <>
      <img src={logo} className="logoSM" />
      <h1>התחברות</h1>
      <FCCustomTxtInp ph={"מס' טלפון"} />
      <p style={{ color: "white" }}>או</p>
      <FCCustomBtn title={"התחברות באמצעות דוא''ל"} />
      <FCCustomBtn title={"התחברות"} />
    </>
  );
};

export default FCSignIn;

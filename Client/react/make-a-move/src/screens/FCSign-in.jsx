import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";

const FCSignIn = () => {
  const navigate = useNavigate("");
  const [phone, setPhone] = useState();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const login = (e) => {
    console.log("user requested to signin");
    makeAmoveUserServer.login({ phone, password: "12345" }).then((response) => {
      if (response === true) {
        console.log("success");
        navigate("/location");
      } else {
        console.log("failure");
      }
    });
  };

  return (
    <span>
      <img src={logo} className="logoSM" />
      <h1>התחברות</h1>
      <FCCustomTxtInp ph={"מס' טלפון"} onChange={handlePhoneChange} />
      {/* <p style={{ color: "white" }}>או</p> */}
      {/* <FCCustomBtn title={"התחברות באמצעות דוא''ל"} /> */}
      <FCCustomBtn title={"התחברות"} onClick={login} />
    </span>
  );
};

export default FCSignIn;

import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";

const FCSignIn = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    console.log("user requested to signin");
    makeAmoveUserServer.login({ email, password }).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        navigate("/location");
      } else {
        console.log("failure");
      }
    });
  };

  return (
    <span>
      <img src={logo} className="logoSM" />
      <form onSubmit={login}>
        <h1>התחברות</h1>
        <FCCustomTxtInp ph={"דוא''ל"} onChange={handleEmailChange} required />
        <br />
        <br />

        <FCCustomTxtInp ph={"סיסמה"} onChange={handlePasswordChange} required />
        {/* <p style={{ color: "white" }}>או</p> */}
        {/* <FCCustomBtn title={"התחברות באמצעות דוא''ל"} /> */}
        <FCCustomBtn type="submit" title={"התחברות"} />
      </form>
    </span>
  );
};

export default FCSignIn;

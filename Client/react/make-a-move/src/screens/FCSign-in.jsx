import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCSignInGoogle from "../google/FCSignInGoogle";

const FCSignIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["email"]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["password"]: e.target.value }));
  };

  const login = (e) => {
    e.preventDefault();
    console.log("user requested to signin");
    console.log(loginData);
    makeAmoveUserServer.login(loginData).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        saveCurrentUserToLocalStorage(loginData["email"]);
        navigate("/location");
      } else {
        console.log("failure");
      }
    });
  };

  const saveCurrentUserToLocalStorage = (email) => {
    localStorage.setItem("current-email", JSON.stringify(email));
  };
  return (
    <span>
      <img src={logo} className="logoSM" />
      <form onSubmit={login}>
        <h1>התחברות</h1>
        <FCCustomTxtInp ph={"דוא''ל"} onChange={handleEmailChange} required />
        <br />
        <br />

        <FCCustomTxtInp
          type="password"
          ph={"סיסמה"}
          onChange={handlePasswordChange}
          required
        />
        {/* <p style={{ color: "white" }}>או</p> */}
        {/* <FCCustomBtn title={"התחברות באמצעות דוא''ל"} /> */}
        <FCCustomBtn type="submit" title={"התחברות"} />
      </form>
      <div className="google-signin-container">
        <p style={{ color: "white" }}>או</p>
        <FCSignInGoogle />
      </div>
    </span>
  );
};

export default FCSignIn;

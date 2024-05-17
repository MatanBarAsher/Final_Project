import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";

const FCSignIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["email"]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["password"]: e.target.value }));
  };

  const login = (e) => {
    e.preventDefault();
    console.log("user requested to signin");
    makeAmoveUserServer.login(loginData).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        saveCurrentUserToLocalStorage(loginData["email"]);
        // navigate("/location");
      } else {
        console.log("failure");
      }
    });
  };

  const saveCurrentUserToLocalStorage = (email) => {
    localStorage.setItem("cuurent-user", JSON.stringify(email));
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
    </span>
  );
};

export default FCSignIn;

import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";

const FCSignIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showModal, setShowModal] = useState(true); // State to manage modal visibility
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
        setShowModal((prev) => !prev); // Show modal on successful login
        navigate("/location");

        console.log("showModal state:", showModal);
      } else {
        console.log("failure");
      }
    });
  };

  const saveCurrentUserToLocalStorage = (email) => {
    localStorage.setItem("current-email", JSON.stringify(email));
  };

  const closeModal = () => {
    setShowModal(false);
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
        <FCCustomBtn type="submit" title={"התחברות"} />
      </form>
      {showModal && ( // Render modal if showModal is true
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>You logged in.</p>
          </div>
        </div>
      )}
    </span>
  );
};

export default FCSignIn;

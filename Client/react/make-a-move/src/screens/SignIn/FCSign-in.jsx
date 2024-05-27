import React, { useState } from "react";
import logo from "../../assets/images/Logo.png"; //"../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { ErrorDialog, SuccessDialog } from "./components";
import FCCustomTxtInp from "../../components/FCCustomTxtInp";
import FCCustomBtn from "../../components/FCCustomBtn";
import { makeAmoveUserServer } from "../../services";
import FCSignInGoogle from "../../google/FCSignInGoogle";
import { FCLoad } from "../../loading/FCLoad";

const FCSignIn = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to manage modal visibility
  const [showErrorModal, setShowErrorModal] = useState(false); // State to manage modal visibility

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["email"]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, ["password"]: e.target.value }));
  };

  const login = async (e) => {
    // e.preventDefault();
    setIsLoading(true); // Set loading to true before making the API call
    try {
      const response = await makeAmoveUserServer.login(loginData);
      if (response) {
        saveCurrentUserToLocalStorage(loginData["email"]);
        setShowSuccessModal(true); // Show modal on successful login
        navigate("/location");
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false); // Set loading to false after the API call completes
    }
  };

  const saveCurrentUserToLocalStorage = (email) => {
    localStorage.setItem("current-email", JSON.stringify(email));
  };

  return (
    <span>
      {isLoading && <FCLoad />}

      {!isLoading && ( // Render the form and other content only if isLoading is false
        <>
          <SuccessDialog
            open={showSuccessModal}
            setClose={() => {
              setShowSuccessModal(false);
              navigate("/location");
            }}
          />
          <ErrorDialog
            open={showErrorModal}
            setClose={() => {
              setShowErrorModal(false);
              // setLoginData({ email: "", password: "" });
            }}
          />
          <img src={"." + logo} className="logoSM" />
          <form onSubmit={login}>
            <h1>התחברות</h1>
            <FCCustomTxtInp
              ph={"דוא''ל"}
              onChange={handleEmailChange}
              required
            />
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
          <div className="google-signin-container">
            <p style={{ color: "white" }}>או</p>
            <FCSignInGoogle />
          </div>
        </>
      )}
    </span>
  );
};

export default FCSignIn;

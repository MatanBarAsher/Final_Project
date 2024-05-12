import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCCustomMailInp from "../components/FCCustomMailInp";
import FCCustomPasswordInp from "../components/FCCustomPasswordInp";
import FCCustomPhoneInp from "../components/FCCustomPhoneInp";
import { Margin } from "@mui/icons-material";

export const FCSignUp1 = () => {
  const navigate = useNavigate("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlePhoneCreation = (e) => {
    setPhone(e.target.value);
  };
  const handleEmailCreation = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordCreation = (e) => {
    setPassword(e.target.value);
  };

  const setPhoneEmailAndPassword = () => {
    // צריך לבדוק אם המייל / הטלפון קיים לפני שמעבירים למסך הבא
    navigate("/signup2");
  };
  return (
    <>
      <form onSubmit={setPhoneEmailAndPassword}>
        <img src={logo} className="logoSM" />
        <h1>הרשמה</h1>
        <p className="signup-p">אפשר לקבל את הטלפון שלך?</p>
        <FCCustomPhoneInp
          ph={"מס' טלפון"}
          onChange={handlePhoneCreation}
          required
        />
        <p className="signup-p">אפשר לקבל את המייל שלך?</p>
        <FCCustomMailInp
          ph={"דוא''ל"}
          onChange={handleEmailCreation}
          required
        />
        <p className="signup-p">סיסמה</p>
        <FCCustomPasswordInp
          ph={"סיסמא"}
          onChange={handlePasswordCreation}
          required
        />
        <FCCustomBtn type="submit" title={"הבא"} />
      </form>
    </>
  );
};

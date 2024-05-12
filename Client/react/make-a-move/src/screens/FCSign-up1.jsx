import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCCustomMailInp from "../components/FCCustomMailInp";
import FCCustomPasswordInp from "../components/FCCustomPasswordInp";
import { Margin } from "@mui/icons-material";

export default function FCSignUp1() {
  const navigate = useNavigate("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmailCreation = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordCreation = (e) => {
    setPassword(e.target.value);
  };

  const setEmailAndPassword = () => {
    // צריך לבדוק אם המייל / הטלפון קיים לפני שמעבירים למסך הבא
    navigate("/signup2");
  };
  return (
    <>
      <img src={logo} className="logoSM" />
      <h1>הרשמה</h1>
      <p className="signup-p">אפשר לקבל את המייל שלך?</p>
      <FCCustomMailInp ph={"דוא''ל"} onChange={handleEmailCreation} />
      <p className="signup-p">אפשר לקבל את הטלפון שלך?</p>
      <FCCustomPasswordInp ph={"סיסמא"} onChange={handlePasswordCreation} />
      <FCCustomBtn title={"הבא"} onClick={setEmailAndPassword} />
    </>
  );
}

import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCCustomMailInp from "../components/FCCustomMailInp";
import FCCustomPasswordInp from "../components/FCCustomPasswordInp";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import FCCustomDd from "../components/FCCustomDd";
import FCCustomDateInp from "../components/FCCustomDateInp";
import FCCustomNumberInp from "../components/FCCustomNumberInp";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Height } from "@mui/icons-material";

export default function FCSignUp3() {
  const navigate = useNavigate("");
  const [PersonalInterestsIds, setPersonalInterestsIds] = useState();
  const [Description, setDescription] = useState();

  const handlePersonalInterestsIdsCreation = (e) => {
    setPersonalInterestsIds(e.target.value);
  };
  const handleDescriptionCreation = (e) => {
    setDescription(e.target.value);
  };

  const setCreateUser = () => {
    // כאן בודקים את הנתונים שהמשתמש הכניס וקוראים לפונקציה שרושמת אותו בשרת
    navigate("/setImages");
  };
  return (
    <>
      <h1>פרופיל</h1>
      <p className="signup2-p">מה את/ה אוהב/ת לעשות בזמנך הפנוי?</p>
      <FCCustomDd />
      <p className="signup2-p">
        ספר/י לנו קצת על עצמך:
        <span style={{ fontWeight: "200" }}>
          <br /> מה את/ה אוהב/ת לשתות?
          <br />
          איפה את/ה אוהב/ת לבלות?
          <br /> מעשנ/ת?
          <br /> אוהב/ת בע’’ח?
          <br /> וכל דבר נוסף...
        </span>
      </p>
      <FCCustomTxtInp className="description-inp" ph="כאן מספרים..." />

      <FCCustomBtn title={"סיום"} onClick={setCreateUser} />
    </>
  );
}

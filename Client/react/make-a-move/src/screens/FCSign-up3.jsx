import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { useNavigate } from "react-router-dom";

import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { FCMultiSelect } from "../components/MultiSelect/FCMultiSelect";
import { PERSONAL_INTERESTS } from "../constants";

export default function FCSignUp3() {
  const navigate = useNavigate("");
  const [PersonalInterestsIds, setPersonalInterestsIds] = useState([]);
  const [Description, setDescription] = useState();

  const handleDescriptionCreation = (e) => {
    setDescription(e.target.value);
  };

  const handlePersonalInterestsIdsChange = (event) => {
    const {
      target: { value },
    } = event || {};
    setPersonalInterestsIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const setCreateUser = () => {
    // כאן בודקים את הנתונים שהמשתמש הכניס וקוראים לפונקציה שרושמת אותו בשרת
    navigate("/setImages");
  };
  return (
    <>
      <form onSubmit={setCreateUser}>
        <h1>פרופיל</h1>
        <p className="signup2-p">מה את/ה אוהב/ת לעשות בזמנך הפנוי?</p>
        <FCMultiSelect
          label="תחומי עיניין"
          options={PERSONAL_INTERESTS}
          onChange={handlePersonalInterestsIdsChange}
          value={PersonalInterestsIds}
        />
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
        <FCCustomTxtInp
          className="description-inp"
          ph="כאן מספרים..."
          onChange={handleDescriptionCreation}
          required
        />

        <FCCustomBtn type="submit" title={"סיום"} />
      </form>
    </>
  );
}

import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { useNavigate } from "react-router-dom";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import FCCustomDateInp from "../components/FCCustomDateInp";
import FCCustomNumberInp from "../components/FCCustomNumberInp";
import { FCMultiSelect } from "../components/MultiSelect/FCMultiSelect";
import { FCSelect } from "../components";

export default function FCSignUp2() {
  const navigate = useNavigate("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [height, setHeight] = useState();
  const [birthday, setBirthday] = useState();
  const [city, setCity] = useState();

  const handleFirstNameCreation = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameCreation = (e) => {
    setLastName(e.target.value);
  };

  const handleGenderCreation = (e) => {
    setGender(e.target.value);
  };
  const handleHeightCreation = (e) => {
    setHeight(e.target.value);
  };

  const handleBirthdayCreation = (e) => {
    setBirthday(e.target.value);
  };
  const handleCityCreation = (e) => {
    setCity(e.target.value);
  };

  const setSignUp2 = () => {
    // צריך לבדוק נתונים לפני שמעבירים למסך הבא
    navigate("/signup3");
  };
  return (
    <>
      <form onSubmit={setSignUp2}>
        <h1>פרופיל</h1>
        <p className="signup2-p">שם פרטי:</p>
        <FCCustomTxtInp
          ph="שם פרטי"
          onChange={handleFirstNameCreation}
          required
        />
        <p className="signup2-p">שם משפחה:</p>
        <FCCustomTxtInp
          ph="שם משפחה"
          onChange={handleLastNameCreation}
          required
        />
        <div className="gender-inp">
          <span>
            <input
              id="male"
              type="radio"
              name="gender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="male">גבר</label>
          </span>
          <span>
            <input
              id="female"
              type="radio"
              name="gender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="female">אישה</label>
          </span>
          <span>
            <input
              id="other"
              type="radio"
              name="gender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="other">אחר</label>
          </span>
        </div>
        <p className="signup2-p">מאיפה אתה?</p>
        <FCSelect
          onChange={handleCityCreation}
          value={city}
          options={["חדרה"]}
          required
        />
        <p className="signup2-p">תאריך לידה:</p>
        <FCCustomDateInp
          ph="dd/mm/yyyy"
          onChange={handleBirthdayCreation}
          required
        />
        <p className="signup2-p">גובה (ס''מ):</p>
        <FCCustomNumberInp
          ph="ס''מ"
          min={0}
          onChange={handleHeightCreation}
          required
        />
        <FCCustomBtn type="submit" title={"הבא"} />
      </form>
    </>
  );
}

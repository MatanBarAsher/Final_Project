import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import FCCustomDateInp from "../../../components/FCCustomDateInp";
import FCCustomNumberInp from "../../../components/FCCustomNumberInp";
import { FCSelect } from "../../../components/Select/FCSelect";
import FCCustomBtn from "../../../components/FCCustomBtn";

export const FCSignUp2 = ({ setCurrentStep, currentStep, length }) => {
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
  return (
    <>
      <form onSubmit={() => setCurrentStep((prev) => prev + 1)}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            width: "25rem",
          }}
        >
          <FCCustomBtn
            style={{ width: "10rem", color: "black" }}
            onClick={() => setCurrentStep((prev) => prev + 1)}
            title={currentStep === length - 1 ? "סיום" : "הבא"}
            type="submit"
          />
          {currentStep !== 0 && (
            <FCCustomBtn
              style={{ width: "10rem", color: "black" }}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              title={"הקודם"}
            />
          )}
        </div>
      </form>
    </>
  );
};

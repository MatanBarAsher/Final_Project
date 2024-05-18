import React, { useState } from "react";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import FCCustomDateInp from "../../../components/FCCustomDateInp";
import FCCustomNumberInp from "../../../components/FCCustomNumberInp";
import { FCSelect } from "../../../components/Select/FCSelect";
import FCCustomBtn from "../../../components/FCCustomBtn";
import { useSignUpContext } from "../SignUpContext";

export const FCSignUp2 = ({ setCurrentStep, currentStep, length }) => {
  const { signUpData, updateSignUpData } = useSignUpContext();

  const handleFirstNameCreation = (e) => {
    updateSignUpData("firstName", e.target.value);
  };
  const handleLastNameCreation = (e) => {
    updateSignUpData("lastName", e.target.value);
  };

  var genders = [
    { label: "גבר", id: 0 },
    { label: "אישה", id: 1 },
    { label: "אחר", id: 2 },
  ];
  const [gender, setGender] = useState(null);
  const handleGenderCreation = (id) => {
    setGender(id);
    updateSignUpData("gender", id);
  };
  const handleHeightCreation = (e) => {
    updateSignUpData("height", e.target.value);
  };

  const handleBirthdayCreation = (e) => {
    updateSignUpData("birthday", e.target.value);
  };
  const handleCityCreation = (e) => {
    updateSignUpData("city", e.target.value);
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
          value={signUpData["firstName"]}
        />
        <p className="signup2-p">שם משפחה:</p>
        <FCCustomTxtInp
          ph="שם משפחה"
          onChange={handleLastNameCreation}
          required
          value={signUpData["lastName"]}
        />
        <div className="gender-inp">
          {genders.map((g) => (
            <span key={g.id}>
              <input
                checked={gender === g.id}
                id={"gender_" + g.id}
                type="radio"
                value={g.id}
                onClick={() => handleGenderCreation(g.id)}
              />
              <label htmlFor={"gender_" + g.id}>{g.label}</label>
            </span>
          ))}
        </div>
        <p className="signup2-p">מאיפה אתה?</p>
        <FCSelect
          onChange={handleCityCreation}
          value={signUpData["city"]}
          options={["חדרה"]}
          required
        />
        <p className="signup2-p">תאריך לידה:</p>
        <FCCustomDateInp
          ph="dd/mm/yyyy"
          onChange={handleBirthdayCreation}
          value={signUpData["birthday"]}
          required
        />
        <p className="signup2-p">גובה (ס''מ):</p>
        <FCCustomNumberInp
          value={signUpData["height"]}
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

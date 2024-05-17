import React from "react";
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

  const handleGenderCreation = (e) => {
    updateSignUpData("gender", e.target.id);
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
          <span>
            <input
            checked={signUpData["gender"] === "male"}
              id="male"
              type="radio"
              name="gender"
              value={true}
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="male">גבר</label>
          </span>
          <span>
            <input
              checked={signUpData["gender"] === "female"}
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
            checked={signUpData["gender"] === "other"}
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

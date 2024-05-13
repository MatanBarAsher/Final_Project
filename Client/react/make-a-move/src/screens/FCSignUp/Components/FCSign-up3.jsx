import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import { PERSONAL_INTERESTS } from "../../../constants";
import { FCMultiSelect } from "../../../components/MultiSelect";
import FCCustomBtn from "../../../components/FCCustomBtn";

export const FCSignUp3 = ({ setCurrentStep, currentStep, length }) => {
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
  return (
    <>
      <form onSubmit={() => navigate("/setImages")}>
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
            onClick={() => navigate("/setImages")}
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

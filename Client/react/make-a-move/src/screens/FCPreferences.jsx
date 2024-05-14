import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FCCustomNumberInp from "../components/FCCustomNumberInp";
import { FCMultiSelect } from "../components/MultiSelect";
import { PERSONAL_INTERESTS } from "../constants";
import FCCustomBtn from "../components/FCCustomBtn";
import { Slider } from "@mui/material";

export const FCPrecerences = () => {
  const navigate = useNavigate("");
  const [gender, setGender] = useState();
  const [distance, setDistance] = useState();
  const [interests, setInterests] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [heightRange, setHeightRange] = useState([120, 250]);

  const handleGenderCreation = (e) => {
    setGender(e.target.value);
  };
  const handleDistanceCreation = (e) => {
    setDistance(e.target.value);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };
  const handleHeightRangeChange = (event, newValue) => {
    setHeightRange(newValue);
  };

  const handleInterestsCreation = (event) => {
    const {
      target: { value },
    } = event || {};
    setInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
      <form onSubmit={() => navigate("/profile")}>
        <h1 className="pref-h1">העדפות</h1>
        <p className="signup2-p">אני מחפשת:</p>
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
            <label htmlFor="other">פתוח להצעות</label>
          </span>
        </div>

        <p className="signup2-p">מרחק מקסימלי (מאיפה שאני גר)</p>
        <FCCustomNumberInp
          ph="ס''מ"
          min={0}
          onChange={handleDistanceCreation}
          required
        />
        <span className="range">
          <p className="preference-p">בגיל:</p>

          <Slider
            getAriaLabel={() => "Temperature range"}
            value={ageRange}
            onChange={handleAgeRangeChange}
            valueLabelDisplay="on"
            className="slider"
          />
        </span>
        <span className="range">
          <p className="preference-p">בגובה:</p>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={heightRange}
            onChange={handleHeightRangeChange}
            valueLabelDisplay="on"
            className="slider"
          />
        </span>
        <p className="signup2-p">
          שאוהבת
          <br />
          (במידה ולא יוגדר נחפש התאמות לפרופילים עם תחומי עניין דומים לשלך)
        </p>

        <FCMultiSelect
          label="תחומי עיניין"
          options={PERSONAL_INTERESTS}
          onChange={handleInterestsCreation}
          value={interests}
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
            style={{ width: "15rem", color: "black", top: "30px" }}
            title={"סיום"}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

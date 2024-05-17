import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FCCustomNumberInp from "../components/FCCustomNumberInp";
import { FCMultiSelect } from "../components/MultiSelect";
import { PERSONAL_INTERESTS } from "../constants";
import FCCustomBtn from "../components/FCCustomBtn";
import { Slider } from "@mui/material";
import { makeAmoveUserServer } from "../services";

export const FCPrecerences = () => {
  const navigate = useNavigate("");

  const [precerencesData, setPrecerencesData] = useState({
    gender: "",
    distance: 0,
    interests: [],
    ageRange: [18, 80],
    heightRange: [120, 250],
  });
  console.log(precerencesData);

  const handleGenderCreation = (e) => {
    setPrecerencesData((prev) => ({ ...prev, ["gender"]: e.target.id }));
  };
  const handleDistanceCreation = (e) => {
    setPrecerencesData((prev) => ({ ...prev, ["distance"]: e.target.value }));
  };

  const handleAgeRangeChange = (event, newValue) => {
    setPrecerencesData((prev) => ({ ...prev, ["ageRange"]: newValue }));
  };
  const handleHeightRangeChange = (event, newValue) => {
    setPrecerencesData((prev) => ({ ...prev, ["heightRange"]: newValue }));
  };

  const handleInterestsCreation = (event) => {
    const {
      target: { value },
    } = event || {};
    setPrecerencesData((prev) => ({
      ...prev,
      ["interests"]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = () => {
    //go to server with precerencesData as prop
    makeAmoveUserServer.setPreferences(precerencesData).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        saveCurrentUserToLocalStorage(loginData["email"]);
        navigate("/profile");
      } else {
        console.log("failure");
      }
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="pref-h1">העדפות</h1>
        <p className="signup2-p">אני מחפשת:</p>
        <div className="gender-inp">
          <span>
            <input
              checked={precerencesData["gender"] === "male"}
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
              checked={precerencesData["gender"] === "female"}
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
              checked={precerencesData["gender"] === "other"}
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
            value={precerencesData["ageRange"]}
            onChange={handleAgeRangeChange}
            valueLabelDisplay="on"
            className="slider"
            min={18}
            max={80}
          />
        </span>
        <span className="range">
          <p className="preference-p">בגובה:</p>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={precerencesData["heightRange"]}
            onChange={handleHeightRangeChange}
            valueLabelDisplay="on"
            className="slider"
            min={120}
            max={250}
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
          value={precerencesData["interests"]}
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

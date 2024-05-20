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
    preferedGender: 0,
    maxDistance: 0,
    preferedInterests: [],
    ageRange: [18, 80],
    minHeight: 0,
  });
  console.log(precerencesData);

  const handleGenderCreation = (e) => {
    setPrecerencesData((prev) => ({
      ...prev,
      ["preferedGender"]: e.target.id,
    }));
  };
  const handleDistanceCreation = (e) => {
    setPrecerencesData((prev) => ({
      ...prev,
      ["maxDistance"]: e.target.value,
    }));
  };

  const handleAgeRangeChange = (event, newValue) => {
    setPrecerencesData((prev) => ({ ...prev, ["ageRange"]: newValue }));
  };
  const handleHeightRangeChange = (event, newValue) => {
    setPrecerencesData((prev) => ({ ...prev, ["minHeight"]: newValue }));
  };

  const handleInterestsCreation = (event) => {
    const {
      target: { value },
    } = event || {};
    setPrecerencesData((prev) => ({
      ...prev,
      ["preferedInterests"]:
        typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //go to server with precerencesData as prop
    makeAmoveUserServer.setPrecerencesData(precerencesData).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
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
              onChecked={precerencesData["preferedGender"] === "male"}
              id="1"
              type="radio"
              name="preferedGender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="male">גבר</label>
          </span>
          <span>
            <input
              onChecked={precerencesData["preferedGender"] === "female"}
              id="2"
              type="radio"
              name="preferedGender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="female">אישה</label>
          </span>
          <span>
            <input
              onChecked={precerencesData["preferedGender"] === "other"}
              id="3"
              type="radio"
              name="preferedGender"
              onChange={handleGenderCreation}
              required
            />
            <label htmlFor="other">פתוח להצעות</label>
          </span>
        </div>

        <p className="signup2-p">מרחק מקסימלי (מאיפה שאני גר)</p>
        <FCCustomNumberInp
          ph="ק''מ"
          min={0}
          onChange={handleDistanceCreation}
          required
        />
        <p className="preference-p">בגיל:</p>
        <span className="range">
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
        <p className="signup2-p">בגובה: (מינ')</p>
        <span className="range">
          {/* <Slider
            getAriaLabel={() => "Temperature range"}
            value={precerencesData["minHeight"]}
            onChange={handleHeightRangeChange}
            valueLabelDisplay="on"
            className="slider"
            min={120}
          /> */}
          <Slider
            defaultValue={0}
            value={precerencesData["minHeight"]}
            valueLabelDisplay="on"
            className="slider"
            aria-label="Default"
            min={0}
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
          value={precerencesData["preferedInterests"]}
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

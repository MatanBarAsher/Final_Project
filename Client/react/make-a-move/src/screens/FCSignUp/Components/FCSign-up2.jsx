import React, { useState, useEffect } from "react";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import FCCustomDateInp from "../../../components/FCCustomDateInp";
import FCCustomNumberInp from "../../../components/FCCustomNumberInp";
import { FCSelect } from "../../../components/Select/FCSelect";
import FCCustomBtn from "../../../components/FCCustomBtn";
import { useSignUpContext } from "../SignUpContext";
import axios from "axios";

export const FCSignUp2 = ({ setCurrentStep, currentStep, length }) => {
  const { signUpData, updateSignUpData } = useSignUpContext();
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleFirstNameCreation = (e) => {
    updateSignUpData("firstName", e.target.value);
  };
  const handleLastNameCreation = (e) => {
    updateSignUpData("lastName", e.target.value);
  };

  var genders = [
    { label: "גבר", id: 1 },
    { label: "אישה", id: 2 },
    { label: "אחר", id: 3 },
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
    // updateSignUpData("city", e.target.value);
    updateSignUpData("city", "5000");
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=b282b438-0066-47c6-b11f-8277b3f5a0dc&limit=2000"
      );
      const citiesData = response.data.result.records.map(
        (city) => city["תיאור ישוב"]
      );
      setCities(citiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const filterCities = (e) => {
    const query = e.target.value;
    if (query.length > 1) {
      const filtered = cities.filter((city) => city.includes(query));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
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
        {/* <FCSelect
          onChange={handleCityCreation}
          value={signUpData["city"]}
          options={["חדרה"]}
          required
        /> */}
        <div class="dropdown">
          <div id="myDropdown" class="dropdown-content show">
            <input type="text" placeholder="חפש..." onChange={filterCities} />
            {filteredCities.length > 0 && (
              <div id="myDropdown" className="dropdown-content show">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleCityCreation(city)}
                    className="dropdown-item"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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

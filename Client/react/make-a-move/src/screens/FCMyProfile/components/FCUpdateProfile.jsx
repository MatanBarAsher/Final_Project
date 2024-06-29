import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FCCustomX from "../../../components/FCCustomX";
import FCCustomPhoneInp from "../../../components/FCCustomPhoneInp";
import FCCustomMailInp from "../../../components/FCCustomMailInp";
import FCCustomPasswordInp from "../../../components/FCCustomPasswordInp";
import FCCustomBtn from "../../../components/FCCustomBtn";
import FCCustomNumberInp from "../../../components/FCCustomNumberInp";
import FCCustomDateInp from "../../../components/FCCustomDateInp";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import axios from "axios";
import { FCMultiSelect } from "../../../components";
import { PERSONAL_INTERESTS, SIGNUP_INIT_DATA } from "../../../constants";
import { useAsync } from "../../../hooks";
import { makeAmoveUserServer } from "../../../services";
import { LogoDev } from "@mui/icons-material";

export const FCUpdateProfile = () => {
  const Navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [changedKey, setChangedKey] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [cityOptions, setCityOptions] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityMap, setCityMap] = useState({});

  const userEmail = JSON.parse(localStorage.getItem("current-email"));
  console.log(userEmail);

  const getUserFunc = useCallback(async () =>
    makeAmoveUserServer
      .getUserByEmail(userEmail)
      .then((res) => {
        console.log(res);
        setUpdatedUserData(res);
      })
      .catch((res) => console.log(res))
  );

  useEffect(() => {
    getUserFunc();
  }, []);

  // makeAmoveUserServer
  //       .getUserByEmail(userEmail)
  //       .then((res) => {
  //         console.log(res);
  //         setUpdatedUserData(res);
  //       })
  //       .catch((res) => console.log(res));

  const changeUpdatedUserData = (key, value) =>
    setUpdatedUserData((prev) => ({ ...prev, [key]: value }));

  // const userData = useAsync(
  //   getUserFunc, // to select user data
  //   []
  // );
  // console.log(userData);

  // useEffect(() => setUpdateUserData(userData), [userData]); // to set user data

  //   useEffect(() => {
  //     if (changedKey) {
  //       setErrors(errors.filter((error) => error !== changedKey));
  //       makeAmoveUserServer
  //         .checkExist({ key: changedKey, value: updateUserData[changedKey] })
  //         .then((res) => {
  //           if (res) setErrors((prev) => [...prev, changedKey]);
  //           setChangedKey(null);
  //         });
  //     }
  //   }, [updateUserData, changedKey]);

  const handlePhoneCreation = (e) => {
    changeUpdatedUserData("phoneNumber", e.target.value);
    setChangedKey("phoneNumber");
  };

  const handleEmailCreation = (e) => {
    changeUpdatedUserData("email", e.target.value);
    setChangedKey("email");
  };

  const handlePasswordCreation = (e) => {
    changeUpdatedUserData("password", e.target.value);
    setChangedKey("password");
  };

  const handleFirstNameCreation = (e) => {
    changeUpdatedUserData("firstName", e.target.value);
  };
  const handleLastNameCreation = (e) => {
    changeUpdatedUserData("lastName", e.target.value);
  };

  var genders = [
    { label: "אישה", id: 1 },
    { label: "גבר", id: 2 },
    { label: "אחר", id: 3 },
  ];
  const [gender, setGender] = useState(null);
  const handleGenderCreation = (id) => {
    setGender(id);
    changeUpdatedUserData("gender", id);
  };
  const handleHeightCreation = (e) => {
    changeUpdatedUserData("height", e.target.value);
  };

  const handleBirthdayCreation = (e) => {
    changeUpdatedUserData("birthday", e.target.value);
  };

  const handleCityCreation = (citySymbol, cityName) => {
    changeUpdatedUserData("city", `${citySymbol}`);
    console.log(citySymbol);
    document.getElementById("cityName").value = cityName;
    document.getElementById("myDropdown").classList.toggle("show");
  };
  const handleDescriptionCreation = (e) => {
    changeUpdatedUserData("description", e.target.value);
  };

  //   const handlePersonalInterestsIdsChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event || {};
  //     setUpdateUserData(
  //       "personalInterestsIds",
  //       typeof value === "string" ? value.split(",") : value
  //     );
  //   };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=b282b438-0066-47c6-b11f-8277b3f5a0dc&limit=2000"
      );
      const citiesData = response.data.result.records;
      const cityMap = {};
      citiesData.forEach((city) => {
        cityMap[city["תיאור ישוב"]] = city["סמל ישוב"];
      });
      setCityMap(cityMap);
      setCityOptions(Object.keys(cityMap));
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
      const filtered = cityOptions.filter((city) => city.includes(query));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    // Validate phone number
    const phoneNumber = updatedUserData["phoneNumber"];
    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.push("phoneNumber");
    }

    // Validate password
    const password = updatedUserData["password"];
    if (password.length < 8) {
      newErrors.push("password");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (validateForm()) {
    //   setCurrentStep((prev) => prev + 1);
    // }
  };

  return (
    <div>
      <div onClick={() => Navigate("/myProfile")}>
        <FCCustomX color="white" />
        <h1>עריכת פרופיל</h1>
      </div>
      <form>
        <p className="update-p">דוא"ל:</p>
        <FCCustomMailInp
          ph={"דוא''ל"}
          value={updatedUserData["email"]}
          error={!!errors.find((error) => error === "email")}
          onChange={handleEmailCreation}
          required
          disabled
        />
        <p className="update-p">טלפון:</p>
        <FCCustomPhoneInp
          value={updatedUserData["phoneNumber"]}
          ph={"מס' טלפון"}
          onChange={handlePhoneCreation}
          error={!!errors.find((error) => error === "phoneNumber")}
          required
          readOnly
        />
        {errors.includes("phoneNumber") && (
          <p className="error-message">
            * מספר הטלפון חייב להיות באורך 10 ספרות
          </p>
        )}

        <p className="update-p">סיסמה:</p>
        <FCCustomPasswordInp
          ph={"סיסמה"}
          value={updatedUserData["password"]}
          error={!!errors.find((error) => error === "password")}
          onChange={handlePasswordCreation}
          required
        />
        {errors.includes("password") && (
          <p className="error-message">
            * הסיסמה חייבת להיות באורך של לפחות 8 תווים
          </p>
        )}
        <p className="update-p">שם פרטי:</p>
        <FCCustomTxtInp
          ph="שם פרטי"
          onChange={handleFirstNameCreation}
          required
          value={updatedUserData["firstName"]}
        />
        <p className="update-p">שם משפחה:</p>
        <FCCustomTxtInp
          ph="שם משפחה"
          onChange={handleLastNameCreation}
          required
          value={updatedUserData["lastName"]}
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
        <p className="update-p">מאיפה אתה?</p>
        <div className="dropdown">
          <input
            type="text"
            id="cityName"
            className="text-inp"
            placeholder="חפש..."
            onChange={filterCities}
          />
          {filteredCities.length > 0 && (
            <div id="myDropdown" className="dropdown-content show">
              {filteredCities.map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleCityCreation(cityMap[city], city)}
                  className="dropdown-item"
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="update-p">תאריך לידה:</p>
        <FCCustomDateInp
          ph="dd/mm/yyyy"
          onChange={handleBirthdayCreation}
          value={updatedUserData["birthday"]}
          required
        />
        <p className="update-p">גובה (ס''מ):</p>
        <FCCustomNumberInp
          value={updatedUserData["height"]}
          ph="ס''מ"
          min={0}
          onChange={handleHeightCreation}
          required
        />
        <p className="update-p">מה את/ה אוהב/ת לעשות בזמנך הפנוי?</p>
        {/* <FCMultiSelect
          label="תחומי עיניין"
          options={PERSONAL_INTERESTS}
          onChange={handlePersonalInterestsIdsChange}
          //   value={updateUserData["personalInterestsIds"]}
        /> */}
        <p className="update-p">
          ספר/י על עצמך:
          <span style={{ fontWeight: "200" }}></span>
        </p>
        <FCCustomTxtInp
          className="description-inp"
          ph="כאן מספרים..."
          onChange={handleDescriptionCreation}
          required
          value={updatedUserData["description"]}
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
            style={{ width: "15rem", color: "black" }}
            title={"סיום"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

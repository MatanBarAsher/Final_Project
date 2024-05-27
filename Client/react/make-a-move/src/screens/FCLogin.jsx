import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomTxtInp from "../components/FCCustomTxtInp";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";

const FCLogin = () => {
  const navigate = useNavigate("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [image, setImage] = useState();
  const [height, setHeight] = useState();
  const [birthday, setBirthday] = useState();
  const [city, setCity] = useState();

  const handleFirstNameCreation = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameCreation = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailCreation = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordCreation = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneCreation = (e) => {
    setPhone(e.target.value);
  };
  const handleGenderCreation = (e) => {
    setGender(e.target.value);
  };

  const handleImageCreation = (e) => {
    setImage(e.target.value);
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
  const createUser = (e) => {
    console.log("user requested to login");
    makeAmoveUserServer
      .createUser({
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        image,
        height,
        birthday,
        city,
        isActive,
        PersonalInterestsIds,
        PreferencesIds,
      })
      .then((response) => {
        if (response === true) {
          console.log("success");
          navigate("/location");
        } else {
          console.log("failure");
        }
      });
  };

  return (
    <span>
      <img src={"." + logo} className="logoSM" />
      <h1>הרשמה</h1>
      <FCCustomTxtInp ph={"שם פרטי"} onChange={handleFirstNameCreation} />
      <FCCustomTxtInp ph={"שם משפחה"} onChange={handleLastNameCreation} />
      <FCCustomTxtInp ph={"דוא''ל"} onChange={handleEmailCreation} />
      <FCCustomTxtInp ph={"סיסמא"} onChange={handlePasswordCreation} />
      <FCCustomTxtInp ph={"מס' טלפון"} onChange={handlePhoneCreation} />
      <FCCustomTxtInp ph={"מגדר"} onChange={handleGenderCreation} />
      <FCCustomTxtInp ph={"תמונה"} onChange={handleImageCreation} />
      <FCCustomTxtInp ph={"גובה"} onChange={handleHeightCreation} />
      <FCCustomTxtInp ph={"תאריך לידה"} onChange={handleBirthdayCreation} />
      <FCCustomTxtInp ph={"עיר"} onChange={handleCityCreation} />

      <FCCustomBtn title={"הרשמה"} onClick={createUser} />
    </span>
  );
};

export default FCLogin;

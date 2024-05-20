import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCHamburger from "../components/FCHamburger";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import { Place } from "@mui/icons-material";

export default function FCLocation() {
  const [value, setValue] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("current-email"));
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setValue(e.value.description);
    console.log(e.value.description);
  };

  const handleSubmit = () => {
    console.log(userEmail);
    console.log(value);
    //go to server with locationValue as prop
    makeAmoveUserServer.setLocationValue(value, userEmail).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        localStorage.setItem(
          "current-place",
          JSON.stringify({
            placeCode: response.data.currentPlace,
            placeName: value,
          })
        );
        navigate("/map");
      } else {
        console.log("failure");
      }
    });
  };

  return (
    <>
      <FCHamburger />
      <img src={logo} className="logoSM" />
      <h1>אישור מיקום:</h1>
      <div>
        <GooglePlacesAutocomplete
          selectProps={{
            onChange: handleLocationChange,
          }}
          apiKey={"AIzaSyDfO7S5c0OcZki3aQEBN1xMrDj4qD9v8Uk"}
          debounce={300}
        />
      </div>
      <FCCustomBtn
        title="אישור"
        mt={"130px"}
        onClick={() => handleSubmit(value)}
      />
    </>
  );
}

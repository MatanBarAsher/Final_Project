import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCHamburger from "../components/FCHamburger";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { makeAmoveUserServer } from "../services";

export default function FCLocation() {
  const [value, setValue] = useState(null);

  const handleLocationChange = (e) => {
    setValue(e.value);
    console.log(e.value);
  };

  const handleSubmit = () => {
    //go to server with locationValue as prop
    makeAmoveUserServer.setLocationValue(value).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        // navigate("/profile");
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

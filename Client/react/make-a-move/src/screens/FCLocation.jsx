import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCHamburger from "../components/FCHamburger";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { useNavigate } from "react-router-dom";

export default function FCLocation() {
  // const navigate = useNavigate("");
  const [locationValue, setLocationValue] = useState("");

  // const handleLocationChange = (e) => {
  //   // setLocationValue((prev) => ({ ...prev, ["currentLocation"]: e }));
  //   setLocationValue("currentLocation", e);
  // };

  const handleSubmit = () => {
    //go to server with locationValue as prop
    makeAmoveUserServer.setLocationValue(locationValue).then((response) => {
      if (response) {
        console.log("success");
        console.log(response);
        // navigate("/profile");
      } else {
        console.log("failure");
      }
    });
    return (
      <>
        <FCHamburger />
        <img src={logo} className="logoSM" />
        <h1>אישור מיקום:</h1>
        <div>
          <GooglePlacesAutocomplete
            selectProps={{
              value,
              onChange: setValue,
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
  };
}

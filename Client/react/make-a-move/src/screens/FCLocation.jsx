import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCHamburger from "../components/FCHamburger";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function FCLocation() {
  const [value, setValue] = useState(null);
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
      <FCCustomBtn title="אישור" mt={"130px"} />
    </>
  );
}

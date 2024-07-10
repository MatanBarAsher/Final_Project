import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCHamburger from "../components/FCHamburger";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import { FCLoad } from "../loading/FCLoad";

const FCLocation = () => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = JSON.parse(localStorage.getItem("current-email"));
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setValue(e.value.description);
    console.log(e.value.description);
  };

  const handleSubmit = async (e) => {
    console.log(userEmail);
    console.log(value);
    setIsLoading(true); // Set loading to true before making the API call
    try {
      //go to server with locationValue as prop
      const response = await makeAmoveUserServer.setLocationValue(
        value,
        userEmail
      );
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
        navigate("/home");
      } else {
        console.log("failure");
      }
      // } catch (error) {
      //   console.error("Error logging in:", error);
      //   setShowErrorModal(true);
    } finally {
      setIsLoading(false); // Set loading to false after the API call completes
    }
  };

  return (
    <span>
      {isLoading && <FCLoad />}

      {!isLoading && ( // Render the form and other content only if isLoading is false
        <>
          <FCHamburger />
          <img src={"." + logo} className="logoSM" />
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
      )}
    </span>
  );
};
export default FCLocation;

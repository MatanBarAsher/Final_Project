import React from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import logo from "../assets/images/Logo.png";
import FCCustomDd from "../components/FCCustomDd";
import FCHamburger from "../components/FCHamburger";

export default function FCLocation() {
  return (
    <>
      <FCHamburger />
      <img src={logo} className="logoSM" />
      <h1>אישור מיקום:</h1>
      <FCCustomDd name={"mxka"} id={"alskcm"} />
      <FCCustomBtn title="אישור" mt={"130px"} />
    </>
  );
}

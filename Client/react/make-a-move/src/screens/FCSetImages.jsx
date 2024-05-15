import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCImageInp from "../components/FCImageInp";

export default function FCSetImages() {
  return (
    <>
      <h1>תמונות</h1>
      <div className="images-inp-container">
        <FCImageInp />
        <FCImageInp />
        <FCImageInp />
        <FCImageInp />
        <FCImageInp />
        <FCImageInp />
      </div>
      <FCCustomBtn title="סיום" onClick={() => navigate("/preferences")} />
    </>
  );
}

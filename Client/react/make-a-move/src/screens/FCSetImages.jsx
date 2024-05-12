import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";

export default function FCSetImages() {
  return (
    <input
      type="file"
      placeholder="Image"
      name="image"
      onChange={handleChange}
      value={data.image}
      className="input"
      accept=".jpg, .jpeg"
      required
    />
  );
}

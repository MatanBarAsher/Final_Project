import { Opacity } from "@mui/icons-material";
import { border, borderRadius } from "@mui/system";
import React from "react";

export default function FCImageInp({ name }) {
  const inpStyle = {
    width: "150px",
    height: "100px",
    flex: "40%",
    border: "2px dashed #989898",
    borderRadius: "10px",
  };
  return (
    <input
      style={inpStyle}
      type="file"
      placeholder="+"
      name={name}
      accept=".jpg, .jpeg .png"
    />
  );
}

import React from "react";
import Button from "@mui/material/Button";

const FCCustomBtn = ({ onClick, type, title, mt, ...other }) => {
  return (
    <Button
      type={type}
      onSubmitCapture={type === "submit" && onClick}
      className="main-btn"
      onClick={type !== "submit" && onClick}
      style={{ marginTop: mt, color: "black" }}
      {...other}
    >
      {title}
    </Button>
  );
};

export default FCCustomBtn;

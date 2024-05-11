import React from "react";
import Button from "@mui/material/Button";

const FCCustomBtn = ({ title, mt, ...other }) => {
  return (
    <button className="main-btn" style={{ marginTop: mt }} {...other}>
      {title}
    </button>
  );
};

export default FCCustomBtn;

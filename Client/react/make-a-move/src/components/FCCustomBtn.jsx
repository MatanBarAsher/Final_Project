import React from "react";
import Button from "@mui/material/Button";

const FCCustomBtn = ({ title, mt }) => {
  return (
    <>
      <button className="main-btn" style={{ marginTop: mt }}>
        {title}
      </button>
    </>
  );
};

export default FCCustomBtn;

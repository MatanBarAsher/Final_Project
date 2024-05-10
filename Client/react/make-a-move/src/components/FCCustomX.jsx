import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function FCCustomX(color) {
  return (
    <button
      className="x-btn"
      style={{ background: "none", color: color, height: 30, width: 30 }}
    >
      <CloseIcon />
    </button>
  );
}

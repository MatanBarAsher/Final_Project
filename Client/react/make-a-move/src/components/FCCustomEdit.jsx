import React from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function FCCustomEdit(color) {
  return (
    <button
      
      className="x-btn"
      style={{
        background: "none",
        color: "white",
        height: 30,
        width: 30,
        position: "absolute",
        top: 15,
        left: 45,
        text: "עריכה",
      }}
    >
      <EditIcon />
      <h3 className="editProf">עריכה</h3>
    </button>
  );
}

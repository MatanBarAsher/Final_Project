import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function FCHamburger() {
  return (
    <button
      className="hamburger"
      style={{ position: "fixed", top: "10px", left: "10px" }}
    >
      <MenuIcon color="#3C0753" style={{ width: "32px", height: "32px" }} />
    </button>
  );
}

import React from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import FCCustomX from "../components/FCCustomX";
import CloseIcon from "@mui/icons-material/Close";

export default function FCMatchModal() {
  return (
    <dialog open className="match-modal">
      <CloseIcon className="match-modal-x" />
      <h2>יש לנו MATCH!</h2>
      <img
        src="https://proj.ruppin.ac.il/cgroup52/test2/tar1/images/Matan.jpg"
        alt=""
      />
      <FCCustomBtn title={"צפייה בפרופיל"} />
      <div>MAKE a MOVE!</div>
    </dialog>
  );
}

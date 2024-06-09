import React from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";

export default function FCMatchList() {
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate("/sideMenu")} className="match-list">
      <FCCustomX color="white" />
      <h1>התאמות</h1>
    </div>
  );
}

import React from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";

export const FCRecommendations = () => {
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate("/sideMenu")}>
      <FCCustomX onclick="" color="white" />
      <h1>המלצות כלליות</h1>
      <h3 className="recommend-h">מקומות בילוי פופולארים באזורך:</h3>
      <h3 className="recommend-h">ימים פופולארים:</h3>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";
import background from "../assets/images/Matan.jpg";
import { makeAmoveMatchServer, makeAmoveUserServer } from "../services";

export default function FCMatchList() {
  const Navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);

  const currentEmail = JSON.parse(localStorage.getItem("current-email"));

  useEffect(() => {
    getMatches();
  }, []);

  const getMatches = () => {
    makeAmoveMatchServer
      .getMatchesByEmail(currentEmail)
      .then((res) => setMatchedUsers(res));

    matchedUsers.forEach((user) =>
      makeAmoveUserServer
        .GetUserNoPasswordByEmail(user.firstemail)
        .then((res) => console.log(res))
    );
  };

  const temp = {
    name: "Yael",
    matchID: 2,
  };

  const handleMatchClick = (clickedUser) => {
    localStorage.setItem("matched-user", JSON.stringify(clickedUser));
    Navigate("/feedback");
  };

  return (
    <div className="matches-container">
      <h1>התאמות</h1>
      <FCCustomX color="white" />
      {matchedUsers.length > 0 ? (
        matchedUsers.map((u) => (
          <div onClick={(u) => handleMatchClick} className="match-list">
            <div className="match">
              <div
                className="profile-image"
                style={{
                  backgroundImage: `url(.${background})`,
                  height: 60,
                  width: 60,
                  border: "4px solid white",
                  borderRadius: "50%",
                  float: "left",
                }}
              ></div>
              <p>{u.firstemail}</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

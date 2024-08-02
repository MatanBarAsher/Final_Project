import React, { useEffect, useState } from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";
import background from "../assets/images/Matan.jpg";
import { makeAmoveMatchServer, makeAmoveUserServer } from "../services";
import FCMatchedUser from "../components/FCMatchedUser";

export default function FCMatchList() {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [matchedUsersDetails, setMatchedUsersDetails] = useState([]);

  const currentEmail = JSON.parse(localStorage.getItem("current-email"));

  useEffect(() => {
    getMatches();
  }, []);

  useEffect(() => {
    if (matchedUsers.length > 0) {
      GetMatchedUsersDetails();
    }
  }, [matchedUsers]);

  const getMatches = async () => {
    try {
      const res = await makeAmoveMatchServer.getMatchesByEmail(currentEmail);
      setMatchedUsers(res);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const GetMatchedUsersDetails = async () => {
    try {
      const userDetailPromises = matchedUsers.map((u) =>
        makeAmoveUserServer.GetUserNoPasswordByEmail(u.secondemail)
      );
      const usersDetails = await Promise.all(userDetailPromises);
      setMatchedUsersDetails(usersDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleMatchClick = (clickedUser) => {
    localStorage.setItem("matched-user", JSON.stringify(clickedUser));
    navigate("/feedback");
  };

  return (
    <div className="matches-container">
      <h1 style={{ flex: "100%" }}>התאמות</h1>
      <FCCustomX color="white" />
      {matchedUsersDetails.map((u, index) => (
        <FCMatchedUser
          key={index}
          user={u}
          func={handleMatchClick}
          image={u.image[0]}
          currentEmail={currentEmail}
        />
      ))}
    </div>
  );
}

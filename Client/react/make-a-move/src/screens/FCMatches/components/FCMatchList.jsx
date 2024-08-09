import React, { useEffect, useState } from "react";
import FCCustomX from "../../../components/FCCustomX";
import { useNavigate } from "react-router";

import {
  makeAmoveMatchServer,
  makeAmoveUserServer,
  makeAmoveFeedbackServer,
} from "../../../services";
import FCMatchedUser from "../../../components/FCMatchedUser";
import { ProfileDelete } from "../../FCMyProfile/components/DialogsProfiles/profileDelete";

export default function FCMatchList() {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [matchedUsersDetails, setMatchedUsersDetails] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const currentEmail = JSON.parse(localStorage.getItem("current-email"));

  useEffect(() => {
    getMatches();
    // getFeedbacks();
  }, []);

  useEffect(() => {
    console.log(matchedUsers);
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

  const getFeedbacks = async () => {
    try {
      const res = await makeAmoveFeedbackServer.getFeedbacks();
      console.log(res);
      setMatchedUsers(res);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const GetMatchedUsersDetails = async () => {
    try {
      // Create an array of promises to fetch user details
      const userDetailPromises = matchedUsers.map(async (u) => {
        const email =
          u.secondemail === currentEmail ? u.firstemail : u.secondemail;
        const userDetails = await makeAmoveUserServer.GetUserNoPasswordByEmail(
          email
        );
        return { ...userDetails, matchNum: u.matchNum }; // Combine user details with matchNum
      });

      // Wait for all promises to resolve
      const usersDetails = await Promise.all(userDetailPromises);

      // Update state with the combined user details
      setMatchedUsersDetails(usersDetails);

      // Log the combined user details
      console.log(usersDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleMatchClick = (clickedUser) => {
    console.log(clickedUser);

    if (clickedUser.matchNum > 0) {
      localStorage.setItem("matched-user", JSON.stringify(clickedUser));
      navigate("/feedback");
    } else {
      // להוסיף מודאל שאומר למשתמש ההוא כבר נתן משוב למשתמש הזה
      setShowMatchModal(true);
    }
  };

  return (
    <>
      <ProfileDelete
        open={showMatchModal}
        setClose={() => {
          setShowMatchModal(false);
        }}
      />
      <span onClick={() => navigate("/sideMenu")}>
        <FCCustomX color="white" />
      </span>
      <div className="matches-container">
        <h1 style={{ flex: "100%" }}>התאמות</h1>
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
    </>
  );
}

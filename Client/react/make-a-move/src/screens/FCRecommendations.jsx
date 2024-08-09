import React, { useEffect, useState } from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";
import { makeAmoveUserServer } from "../services";
import { FCLoad } from "../loading/FCLoad";

export const FCRecommendations = () => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      let userEmail = JSON.parse(localStorage.getItem("current-email"));
      setIsLoading(true);
      if (userEmail) {
        try {
          const recommend = await makeAmoveUserServer.getAnalysis(userEmail);
          // const userDetails = await Promise.all(
          //   Object.keys(userEmails).map(async (email) => {
          //     const user = await makeAmoveUserServer.GetUserNoPasswordByEmail(
          //       email
          //     );

          // }) 
          // );
          // console.log(userDetails);
          console.log(recommend);

          // setUsers(renderIconsByGender(userDetails));
        } catch (error) {
          console.error("Error retrieving user details:", error);
        } finally {
          setIsLoading(false); // Set loading to false after the API call completes
        }
      } else {
        console.error("User email not found in localStorage");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <span>
      {isLoading && <FCLoad />}

      {!isLoading && (
        <>
          <div onClick={() => Navigate("/sideMenu")}>
            <FCCustomX onclick="" color="white" />
            <h1>המלצות כלליות</h1>
            <h3 className="recommend-h">מקומות בילוי פופולארים באזורך:</h3>
            <h3 className="recommend-h">ימים פופולארים:</h3>
          </div>
        </>
      )}
    </span>
  );
};

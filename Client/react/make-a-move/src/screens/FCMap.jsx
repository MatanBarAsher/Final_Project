import React, { useEffect, useState } from "react";
import FCHamburger from "../components/FCHamburger";
import locationPin from "../assets/images/locationPin1.png";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import WcIcon from "@mui/icons-material/Wc";
import FCCarousel from "./FCCarousel";
import { useNavigate } from "react-router-dom";
import { makeAmoveUserServer } from "../services";
import { border } from "@mui/system";
import { FCLoad } from "../loading/FCLoad";

export default function FCMap({ location }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentPlace = JSON.parse(localStorage.getItem("current-place"));
  localStorage.setItem("origin", JSON.stringify("Map"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      let userEmail = JSON.parse(localStorage.getItem("current-email"));
      setIsLoading(true);
      if (userEmail) {
        try {
          const userEmails = await makeAmoveUserServer.readUsersByPreference(
            userEmail
          );
          const userDetails = await Promise.all(
            Object.keys(userEmails).map(async (email) => {
              const user = await makeAmoveUserServer.GetUserNoPasswordByEmail(
                email
              );
              let percentage = userEmails[email]["item1"];
              return { ...user, percentage };
            })
          );
          console.log(userDetails);
          console.log(userEmails);

          setUsers(renderIconsByGender(userDetails));
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

  const renderIconsByGender = (users) => {
    console.log(users);
    return <FCCarousel users={users} />;
  };

  const showUserDetails = (user) => {
    console.log("User details:", user);
    localStorage.setItem("user-to-show", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <span>
      {isLoading && <FCLoad />}

      {!isLoading && (
        <>
          <div className="map-container">
            <FCHamburger />
            <div className="icon-container">{users}</div>
          </div>
        </>
      )}
    </span>
  );
}

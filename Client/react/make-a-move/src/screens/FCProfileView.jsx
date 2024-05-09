import React, { useState } from "react";
import FCHamburger from "../components/FCHamburger";
import FCMatchScore from "../components/FCMatchScore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import background from "../assets/images/Matan.jpg";
import { makeAmoveUserServer } from "../services";
import { useAsync } from "../hooks";

export default function FCProfileView({
  name,
  age,
  height,
  city,
  interests,
  aboutMe,
}) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // need to use useAsync to cut the async await circular and to get the value from the async function. also have error and loading
  const { value: user } = useAsync(makeAmoveUserServer.getAllUsers, []);
  console.log({ user });
  const { value: updatedUser } = useAsync(
    () =>
      makeAmoveUserServer.updateUser(
        user ? user[0].email : undefined,
        user ? user[0] : undefined
      ),
    [user]
  );
  console.log({ updatedUser });

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="profile-container">
      <div
        className="pBackground"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <FCHamburger />
      </div>
      <div className="bottomP">
        <FCMatchScore score={89} />
        <h2>{name}</h2>
        <p>
          <b>גיל:</b>
          {age}
        </p>
        <p>
          <b>גובה:</b>
          {height}
        </p>
        <p>
          <b>מאיפה:</b>
          {city}
        </p>
        <p>
          <b>תחומי ענייו:</b>
          {interests}
        </p>
        <p>
          <b>על עצמי:</b>
          <br />
          {aboutMe}
        </p>
        <FavoriteBorderIcon
          fontSize="large"
          sx={{ color: "#ffffff", display: "" }}
        />
        <FavoriteIcon
          fontSize="large"
          sx={{ color: "#ffffff", display: "none" }}
        />
        {/* when viewed user is liked -> change display to "block" */}
      </div>
    </div>
  );
}

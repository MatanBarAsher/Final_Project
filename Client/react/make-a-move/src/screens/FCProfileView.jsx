import React from "react";
import FCHamburger from "../components/FCHamburger";
import FCMatchScore from "../components/FCMatchScore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import background from "../assets/images/Matan.jpg";
import { makeAmoveUserServer } from "../services";
import { useAsync } from "../hooks";
import FCBackArrow from "../components/FCBackArrow";
import { useRecoilValue } from "recoil";
import { myDetailsState } from "../recoil/selectors";
import { Percent } from "@mui/icons-material";

export default function FCProfileView(userToShow) {
  console.log(userToShow);
  // const myDetails = useRecoilValue(myDetailsState);
  const myDetails = userToShow.userToShow;
  const { name, age, height, image, city, interests, aboutMe, percentage } =
    myDetails;

  const nextImage = () => {};

  console.log(myDetails);
  return (
    <div className="overlay">
      <div className="profile-container">
        <div
          className="pBackground"
          style={{
            // backgroundImage: `url(.${background})`,
            backgroundImage: `url(${import.meta.env.VITE_SERVER_IMAGE_SRC_URL}${
              myDetails.image[0]
            })`,
          }}
          onClick={nextImage}
        >
          <FCHamburger />
        </div>
        <div className="bottomP">
          {/* <FCBackArrow color="white" /> */}
          <FCMatchScore score={percentage} />
          <h2>{name}</h2>
          <p>
            <b>גיל: </b>
            {age}
          </p>
          <p>
            <b>גובה: </b>
            {height}
          </p>
          <p>
            <b>מאיפה: </b>
            {city}
          </p>
          <p>
            <b>תחומי עניין: </b>
            {interests}
            <br />
            <br />
          </p>
          <p>
            <b>על עצמי: </b>
            <br />
            {aboutMe}
          </p>
          <FavoriteBorderIcon
            fontSize="large"
            sx={{ color: "#ffffff", display: "", margin: 5 }}
          />
          <FavoriteIcon
            fontSize="large"
            sx={{ color: "#ffffff", display: "none" }}
          />
          {/* when viewed user is liked -> change display to "block" */}
        </div>
      </div>
    </div>
  );
}

import { React, useState, useEffect } from "react";
import background from "../../../assets/images/Matan.jpg";
import FCCustomX from "../../../components/FCCustomX";
import FCCustomEdit from "../../../components/FCCustomEdit";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import { makeAmoveUserServer } from "../../../services";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import axios from "axios";

export default function FCMyProfile() {
  const [UserData, setUserData] = useState({});
  const userEmail = JSON.parse(localStorage.getItem("current-email"));
  const [cityMap, setCityMap] = useState({});
  const [tempCity, setTempCity] = useState("");
  const [firstImage, setFirstImage] = useState("");
  localStorage.setItem("origin", JSON.stringify("myProfile"));

  useEffect(() => {
    makeAmoveUserServer
      .getUserByEmail(userEmail)
      .then((res) => {
        console.log(res);
        setUserData(res);
      })
      .catch((res) => console.log(res));
    console.log(UserData);
  }, []);

  useEffect(() => {
    if (UserData.image) {
      console.log(UserData.image[0]);
      setFirstImage(UserData.image[0]);
      console.log(firstImage);
    }
    fetchCities();
  }, [UserData]);

  const Navigate = useNavigate();

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(UserData.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge();

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=b282b438-0066-47c6-b11f-8277b3f5a0dc&limit=2000"
      );
      const citiesData = response.data.result.records;
      const cityMap = {};
      citiesData.forEach((city) => {
        cityMap[city["תיאור ישוב"]] = city["סמל ישוב"];
      });
      setCityMap(cityMap);
      console.log(cityMap);
      setTempCity(
        Object.entries(cityMap).find(
          ([key, val]) => val === parseInt(UserData.city)
        )?.[0]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div className="side-menu">
        <div onClick={() => Navigate("/updateProfile")}>
          <FCCustomEdit color="white" />
        </div>
        <div className="upper-side-prof">
          <div onClick={() => Navigate("/sideMenu")}>
            <FCCustomX color="white" />
          </div>

          <div
            className="profile-image"
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_SERVER_IMAGE_SRC_URL
              }${firstImage})`,
              height: 100,
              width: 100,
              border: "4px solid white",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <div className="setImg" onClick={() => Navigate("/setImages")}>
              <AddIcon />
            </div>
          </div>

          <div className="myName">
            <h1>{UserData.firstName}</h1>
          </div>
        </div>

        <div className="lower-side-prof">
          {/* <h3>שם: </h3> */}
          <h3>גיל: {age}</h3>
          <h3>גר/ה ב: {tempCity}</h3>
          <h3>קצת על עצמי: {UserData.persoalText}</h3>
        </div>
        <div className="footer-side-menu">
          <a className="side-menu-option">
            <WavingHandOutlinedIcon color="white" />
            <p>התנתקות</p>
          </a>
        </div>
      </div>
    </>
  );
}

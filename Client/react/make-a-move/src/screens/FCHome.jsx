import { Navigate, useNavigate } from "react-router";
import FCHamburger from "../components/FCHamburger";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FCCustomBtn from "../components/FCCustomBtn";

export const FCHome = () => {
  const Navigate = useNavigate();
  localStorage.setItem("origin", JSON.stringify("Home"));
  return (
    <>
      <FCHamburger />
      <h2>שנצא לבלות?</h2>
      <h3>יש לבצע אימות למיקומך, שנוכל להתאים לך אפשרויות התאמה </h3>
      <div className="location-home">
        <a onClick={() => Navigate("/location")}>
          <FCCustomBtn />
          <p>אימות מיקום</p>
          <LocationOnOutlinedIcon />
        </a>
      </div>
    </>
  );
};

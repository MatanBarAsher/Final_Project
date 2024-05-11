import "./App.css";
import FCLocation from "./screens/FCLocation";
import FCMap from "./screens/FCMap";
import FCProfileView from "./screens/FCProfileView";
import FCSideMenu from "./screens/FCSideMenu";
import FCSignIn from "./screens/FCSign-in";
import FCWellcome from "./screens/FCWellcome";
import FCLogin from "./screens/FCLogin";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FCWellcome />} />
        <Route path="/signin" element={<FCSignIn />} />
        <Route path="/login" element={<FCLogin />} />
        <Route
          path="/profile"
          element={
            <FCProfileView
              name={"מתן בר אשר"}
              age={26}
              city={"חרב לאת"}
              height={180}
              interests={"אופנועים, קפה, כדורגל"}
              aboutMe={"jdnvksdjnv;pdsjnv;k"}
            />
          }
        />
        <Route path="/location" element={<FCLocation />} />
      </Routes>
    </Router>
  );
}

export default App;

{
  /* <FCLocation /> */
}
{
  /* <FCMap /> */
}
{
  /*  */
}
{
  /* <FCSideMenu name="מתן בר אשר" /> */
}

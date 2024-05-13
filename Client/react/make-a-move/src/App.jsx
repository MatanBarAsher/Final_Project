import "./App.css";
import FCLocation from "./screens/FCLocation";
import FCProfileView from "./screens/FCProfileView";
import FCSignIn from "./screens/FCSign-in";
import FCWellcome from "./screens/FCWellcome";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FCSignUp1 from "./screens/FCSign-up1";
import FCSignUp2 from "./screens/FCSign-up2";
import FCSignUp3 from "./screens/FCSign-up3";
import FCSetImages from "./screens/FCSetImages";
import { FCSignUp } from "./screens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FCWellcome />} />
        <Route path="/signin" element={<FCSignIn />} />
        <Route path="/signup" element={<FCSignUp />} />
        {/* <Route path="/signup1" element={<FCSignUp1 />} />
        <Route path="/signup2" element={<FCSignUp2 />} />
        <Route path="/signup3" element={<FCSignUp3 />} /> */}
        <Route path="/setImages" element={<FCSetImages />} />
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

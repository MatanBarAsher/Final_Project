import "./App.css";
import FCLocation from "./screens/FCLocation";
import FCMap from "./screens/FCMap";
import FCProfileView from "./screens/FCProfileView";
import FCSignIn from "./screens/FCSign-in";
import FCWellcome from "./screens/FCWellcome";

function App() {
  return (
    <>
      {/* <FCWellcome /> */}
      {/* <FCSignIn /> */}
      {/* <FCLocation /> */}
      {/* <FCMap /> */}
      <FCProfileView
        name={"מתן בר אשר"}
        age={26}
        city={"חרב לאת"}
        height={180}
        interests={"אופנועים, קפה, כדורגל"}
        aboutMe={"jdnvksdjnv;pdsjnv;k"}
      />
    </>
  );
}

export default App;

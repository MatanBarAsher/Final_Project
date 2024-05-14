import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ROUTER } from "./Routs";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {ROUTER.map(({ path, Element }) => (
            <Route path={path} element={<Element />} />
          ))}
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;

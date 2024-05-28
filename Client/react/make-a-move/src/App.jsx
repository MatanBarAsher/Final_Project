import "./App.css";
import {
  HashRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ROUTER } from "./Routs";

function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          {ROUTER.map(({ path, Element }) => (
            <Route path={path} element={<Element />} key={path} />
          ))}
        </Routes>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;

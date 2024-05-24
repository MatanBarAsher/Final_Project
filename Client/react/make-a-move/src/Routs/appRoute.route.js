import { FCSignUp } from "../screens";
import FCLocation from "../screens/FCLocation";
import FCMap from "../screens/FCMap";
import { FCPrecerences } from "../screens/FCPreferences";
import FCProfileView from "../screens/FCProfileView";
import FCSetImages from "../screens/FCSetImages";
import FCSignIn from "../screens/SignIn/FCSign-in";
import FCWellcome from "../screens/FCWellcome";
import FCSideMenu from "../screens/FCSideMenu";

export const ROUTER = [
  { path: "/", Element: FCWellcome },
  { path: "/signin", Element: FCSignIn },
  { path: "/signup", Element: FCSignUp },
  { path: "/setImages", Element: FCSetImages },
  { path: "/preferences", Element: FCPrecerences },
  { path: "/profile", Element: FCProfileView },
  { path: "/location", Element: FCLocation },
  { path: "/map", Element: FCMap },
  { path: "/sideMenu", Element: FCSideMenu },
];

import { createContext, useContext, useState } from "react";
import { SIGNUP_INIT_DATA } from "./constants/signup.constants";

const SignUpContext = createContext();

export const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState(SIGNUP_INIT_DATA);

  const updateSignUpData = (key, value) =>
    setSignUpData((prev) => ({ ...prev, [key]: value }));

  return (
    <SignUpContext.Provider value={{ signUpData, updateSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};

import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/Logo.png"; //"../../../../assets/images/Logo.png";
import FCCustomPhoneInp from "../../../components/FCCustomPhoneInp";
import FCCustomMailInp from "../../../components/FCCustomMailInp";
import FCCustomPasswordInp from "../../../components/FCCustomPasswordInp";
import { makeAmoveUserServer } from "../../../services";
import FCCustomBtn from "../../../components/FCCustomBtn";
import { useSignUpContext } from "../SignUpContext";

export const FCSignUp1 = ({ setCurrentStep, currentStep, length }) => {
  const { signUpData, updateSignUpData } = useSignUpContext();

  const [errors, setErrors] = useState([]);
  const [changedKey, setChangedKey] = useState(null);

  useEffect(() => {
    setErrors(errors?.filter((error) => error !== changedKey));
    changedKey &&
      makeAmoveUserServer
        .checkExist({ key: changedKey, value: signUpData[changedKey] })
        .then((res) => {
          !!res ? setErrors((prev) => [...prev, changedKey]) : null;
          setChangedKey(null);
        });
  }, [signUpData]);

  const handlePhoneCreation = (e) => {
    updateSignUpData("phoneNumber", e.target.value);
    setChangedKey("phoneNumber");
  };
  const handleEmailCreation = (e) => {
    updateSignUpData("email", e.target.value);
    setChangedKey("email");
  };
  const handlePasswordCreation = (e) => {
    updateSignUpData("password", e.target.value);
    setChangedKey("password");
  };

  return (
    <>
      <form onSubmit={() => setCurrentStep((prev) => prev + 1)}>
        <img src={logo} className="logoSM" />
        <h1>הרשמה</h1>
        <p className="signup-p">אפשר לקבל את הטלפון שלך?</p>
        <FCCustomPhoneInp
          value={signUpData["phoneNumber"]}
          ph={"מס' טלפון"}
          onChange={handlePhoneCreation}
          error={!!errors.find((error) => error === "phone")}
          required
        />
        <p className="signup-p">אפשר לקבל את המייל שלך?</p>
        <FCCustomMailInp
          ph={"דוא''ל"}
          value={signUpData["email"]}
          error={!!errors.find((error) => error === "email")}
          onChange={handleEmailCreation}
          required
        />
        <p className="signup-p">סיסמה</p>
        <FCCustomPasswordInp
          ph={"סיסמא"}
          value={signUpData["password"]}
          error={!!errors.find((error) => error === "password")}
          onChange={handlePasswordCreation}
          required
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            width: "25rem",
          }}
        >
          <FCCustomBtn
            style={{ width: "10rem", color: "black" }}
            onClick={() => setCurrentStep((prev) => prev + 1)}
            title={currentStep === length - 1 ? "סיום" : "הבא"}
            type="submit"
          />
          {currentStep !== 0 ? (
            <FCCustomBtn
              style={{ width: "10rem", color: "black" }}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              title={"הקודם"}
            />
          ) : (
            <span />
          )}
        </div>
      </form>
    </>
  );
};

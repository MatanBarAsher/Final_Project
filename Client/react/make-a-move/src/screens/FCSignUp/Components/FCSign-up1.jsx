import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/Logo.png"; //"../../../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import FCCustomPhoneInp from "../../../components/FCCustomPhoneInp";
import FCCustomMailInp from "../../../components/FCCustomMailInp";
import FCCustomPasswordInp from "../../../components/FCCustomPasswordInp";
import { makeAmoveUserServer } from "../../../services";
import FCCustomBtn from "../../../components/FCCustomBtn";

export const FCSignUp1 = ({ setCurrentStep, currentStep, length }) => {
  const navigate = useNavigate("");

  const [errors, setErrors] = useState([]);
  const [changedKey, setChangedKey] = useState(null);
  const [userDetails, setUserDetails] = useState({
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrors(errors?.filter((error) => error !== changedKey));
    changedKey &&
      makeAmoveUserServer
        .checkExist({ key: changedKey, value: userDetails[changedKey] })
        .then((res) => {
          !!res ? setErrors((prev) => [...prev, changedKey]) : null;
          setChangedKey(null);
        });
  }, [userDetails]);

  const handlePhoneCreation = (e) => {
    setUserDetails((prev) => ({ ...prev, ["phone"]: e.target.value }));
    setChangedKey("phone");
  };
  const handleEmailCreation = (e) => {
    setUserDetails((prev) => ({ ...prev, ["email"]: e.target.value }));
    setChangedKey("email");
  };
  const handlePasswordCreation = (e) => {
    setUserDetails((prev) => ({ ...prev, ["password"]: e.target.value }));
    setChangedKey("password");
  };

  return (
    <>
      <form onSubmit={() => setCurrentStep((prev) => prev + 1)}>
        <img src={logo} className="logoSM" />
        <h1>הרשמה</h1>
        <p className="signup-p">אפשר לקבל את הטלפון שלך?</p>
        <FCCustomPhoneInp
          ph={"מס' טלפון"}
          onChange={handlePhoneCreation}
          error={!!errors.find((error) => error === "phone")}
          required
        />
        <p className="signup-p">אפשר לקבל את המייל שלך?</p>
        <FCCustomMailInp
          ph={"דוא''ל"}
          error={!!errors.find((error) => error === "email")}
          onChange={handleEmailCreation}
          required
        />
        <p className="signup-p">סיסמה</p>
        <FCCustomPasswordInp
          ph={"סיסמא"}
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
          {currentStep !== 0 && (
            <FCCustomBtn
              style={{ width: "10rem", color: "black" }}
              onClick={() => setCurrentStep((prev) => prev - 1)}
              title={"הקודם"}
            />
          )}
        </div>
      </form>
    </>
  );
};

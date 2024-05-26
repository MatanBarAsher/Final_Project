import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import { PERSONAL_INTERESTS } from "../../../constants";
import { FCMultiSelect } from "../../../components/MultiSelect";
import FCCustomBtn from "../../../components/FCCustomBtn";
import { makeAmoveUserServer } from "../../../services";
import { ErrorDialog, SuccessDialog } from "../Components";
import { useSignUpContext } from "../SignUpContext";

export const FCSignUp3 = ({ setCurrentStep, currentStep, length }) => {
  const navigate = useNavigate("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to manage modal visibility
  const [showErrorModal, setShowErrorModal] = useState(false); // State to manage modal visibility

  const { signUpData, updateSignUpData } = useSignUpContext();
  console.log(signUpData);

  const handleDescriptionCreation = (e) => {
    updateSignUpData("description", e.target.value);
  };

  const handlePersonalInterestsIdsChange = (event) => {
    const {
      target: { value },
    } = event || {};
    updateSignUpData(
      "personalInterestsIds",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = () => {
    makeAmoveUserServer.createUser(signUpData).then((response) => {
      console.log(response);
      if (response) {
        localStorage.setItem("current-email", JSON.stringify(signUpData.email));
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
      }
      // navigate("/setImages");
    });
  };
  return (
    <span>
      <SuccessDialog
        open={showSuccessModal}
        setClose={() => {
          setShowSuccessModal(false);
          navigate("/setImages");
        }}
      />
      <ErrorDialog
        open={showErrorModal}
        setClose={() => {
          setShowErrorModal(false);
        }}
      />

      <form>
        <h1>פרופיל</h1>
        <p className="signup2-p">מה את/ה אוהב/ת לעשות בזמנך הפנוי?</p>
        <FCMultiSelect
          label="תחומי עיניין"
          options={PERSONAL_INTERESTS}
          onChange={handlePersonalInterestsIdsChange}
          value={signUpData["personalInterestsIds"]}
        />
        <p className="signup2-p">
          ספר/י לנו קצת על עצמך:
          <span style={{ fontWeight: "200" }}>
            <br /> מה את/ה אוהב/ת לשתות?
            <br />
            איפה את/ה אוהב/ת לבלות?
            <br /> מעשנ/ת?
            <br /> אוהב/ת בע’’ח?
            <br /> וכל דבר נוסף...
          </span>
        </p>
        <FCCustomTxtInp
          className="description-inp"
          ph="כאן מספרים..."
          onChange={handleDescriptionCreation}
          required
          value={signUpData["description"]}
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
            onClick={handleSubmit}
            title={currentStep === length - 1 ? "סיום" : "הבא"}
            // type="submit"
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
    </span>
  );
};

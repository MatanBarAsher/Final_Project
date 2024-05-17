import React, { useState } from "react";

import { FCSignUp1, FCSignUp2, FCSignUp3 } from "./Components";
import { Step, StepLabel, Stepper } from "@mui/material";
import { SignUpProvider } from "./SignUpContext";

export const FCSignUp = () => (
  <SignUpProvider>
    <FCSignUpFlow />
  </SignUpProvider>
);

const FCSignUpFlow = () => {
  const screens = [FCSignUp1, FCSignUp2, FCSignUp3];
  const [currentStep, setCurrentStep] = useState(0);

  const Component = screens[currentStep];

  return (
    <>
      <Stepper activeStep={currentStep} alternativeLabel>
        {screens.map((_, index) => (
          <Step key={index}>
            <StepLabel>{index}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {
        <Component
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          length={screens.length}
        />
      }
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          width: "25rem",
        }}
      >
        {/* <FCCustomBtn
          style={{ width: "10rem", color: "black" }}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          title={currentStep === screens.length - 1 ? "סיום" : "הבא"}
          type="submit"
        />
        {currentStep !== 0 && (
          <FCCustomBtn
            style={{ width: "10rem", color: "black" }}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            title={"הקודם"}
          />
        )} */}
      </div>
    </>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { makeAmoveUserServer } from "../services";
import { FCMultiSelect } from "../../../components";
import FCCustomBtn from "../../../components/FCCustomBtn";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import { FCLoad } from "../../../loading/FCLoad";
import { SuccessDialog } from "./Dialog/FeedbackSuccessDialog";

export const FCFeedbackContinue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  var options5 = [
    { label: "כן", id: 1 },
    { label: "לא", id: 2 },
  ];

  const [option5, setOption5] = useState(null);
  const handleOption5Creation = (id) => {
    setOption5(id);
    // updateFeedbackData("Q1", id);
  };

  var options6 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
  ];

  const [option6, setOption6] = useState(null);
  const handleOption6Creation = (id) => {
    setOption6(id);
    // updateFeedbackData("Q1", id);
  };

  var options7 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
  ];

  const [option7, setOption7] = useState(null);
  const handleOption7Creation = (id) => {
    setOption7(id);
    // updateFeedbackData("Q1", id);
  };

  const handleSubmit = (e) => {
    // setIsLoading(true);
    setShowSuccessModal(true);
    //   e.preventDefault();

    //   //go to server with precerencesData as prop
    // //   makeAmoveUserServer.setPreferences(precerencesData).then((response) => {
    // //     if (response) {
    // //       console.log("success");
    // //       console.log(response);
    // //       navigate("/profile");
    // //     } else {
    // //       console.log("failure");
    // //       navigate("/map");
    // //     }
    // //   });
  };
  return (
    <span>
      {isLoading && <FCLoad />}

      {!isLoading && (
        <>
          <SuccessDialog
            open={showSuccessModal}
            setClose={() => {
              setShowSuccessModal(false);
              // navigate("/");
            }}
          />
          <form onSubmit={() => navigate("/feedback2")}>
            <h1 className="pref-h1">משוב</h1>
            <h3>דרג/י את מידת ההסכמה שלך:</h3>

            <p className="feedback-p">1. אני ו__ נפגשנו שוב:</p>
            <div className="gender-inp">
              {options5.map((o5) => (
                <span key={o5.id}>
                  <input
                    checked={option5 === o5.id}
                    id={"option5_" + o5.id}
                    type="radio"
                    value={o5.id}
                    onClick={() => handleOption5Creation(o5.id)}
                  />
                  <label htmlFor={"option5_" + o5.id}>{o5.label}</label>
                </span>
              ))}
            </div>
            <p className="feedback-p">2. אני מאמין/ה שנקבע להיפגש שוב:</p>
            <div className="gender-inp">
              {options6.map((o6) => (
                <span key={o6.id}>
                  <input
                    checked={option6 === o6.id}
                    id={"option6_" + o6.id}
                    type="radio"
                    value={o6.id}
                    onClick={() => handleOption6Creation(o6.id)}
                  />
                  <label htmlFor={"option6_" + o6.id}>{o6.label}</label>
                </span>
              ))}
            </div>
            <p className="feedback-p">
              3. אני חושב/ת שההתאמה הייתה נכונה עבורי:
            </p>
            <div className="gender-inp">
              {options7.map((o7) => (
                <span key={o7.id}>
                  <input
                    checked={option7 === o7.id}
                    id={"option7_" + o7.id}
                    type="radio"
                    value={o7.id}
                    onClick={() => handleOption7Creation(o7.id)}
                  />
                  <label htmlFor={"option7_" + o7.id}>{o7.label}</label>
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "center",
                width: "25rem",
              }}
            >
              <FCCustomBtn
                style={{ width: "15rem", color: "black", margin: "30px 0" }}
                title={"סיום"}
                // type="submit"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </>
      )}
    </span>
  );
};

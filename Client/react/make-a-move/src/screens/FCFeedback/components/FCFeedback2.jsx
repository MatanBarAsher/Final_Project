import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { makeAmoveUserServer } from "../services";
import { FCMultiSelect } from "../../../components";
import FCCustomBtn from "../../../components/FCCustomBtn";
import { FCLoad } from "../../../loading/FCLoad";
import { SuccessDialog } from "../components/Dialog/FeedbackSuccessDialog";

export const FCFeedback2 = () => {
  const navigate = useNavigate("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  var options1 = [
    { label: "כן", id: 1 },
    { label: "לא", id: 2 },
  ];

  const [option1, setOption1] = useState(null);
  const handleOption1Creation = (id) => {
    setOption1(id);
    // updateFeedbackData("Q1", id);
  };

  var options2 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
  ];

  const [option2, setOption2] = useState(null);
  const handleOption2Creation = (id) => {
    setOption2(id);
    // updateFeedbackData("Q1", id);
  };

  var options3 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
  ];

  const [option3, setOption3] = useState(null);
  const handleOption3Creation = (id) => {
    setOption3(id);
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
          <form>
            <h1 className="pref-h1">משוב - המשך</h1>
            <h3>דרג/י את מידת ההסכמה שלך:</h3>
            <p className="feedback-p">1. אני ו__ נפגשנו שוב:</p>
            <div className="gender-inp">
              {options1.map((o1) => (
                <span key={o1.id}>
                  <input
                    checked={option1 === o1.id}
                    id={"option1_" + o1.id}
                    type="radio"
                    value={o1.id}
                    onClick={() => handleOption1Creation(o1.id)}
                  />
                  <label htmlFor={"option1_" + o1.id}>{o1.label}</label>
                </span>
              ))}
            </div>
            <p className="feedback-p">2. אני מאמין/ה שנקבע להיפגש שוב:</p>
            <div className="gender-inp">
              {options2.map((o2) => (
                <span key={o2.id}>
                  <input
                    checked={option2 === o2.id}
                    id={"option2_" + o2.id}
                    type="radio"
                    value={o2.id}
                    onClick={() => handleOption2Creation(o2.id)}
                  />
                  <label htmlFor={"option2_" + o2.id}>{o2.label}</label>
                </span>
              ))}
            </div>
            <p className="feedback-p">
              3. אני חושב/ת שההתאמה הייתה נכונה עבורי:
            </p>
            <div className="gender-inp">
              {options3.map((o3) => (
                <span key={o3.id}>
                  <input
                    checked={option3 === o3.id}
                    id={"option3_" + o3.id}
                    type="radio"
                    value={o3.id}
                    onClick={() => handleOption3Creation(o3.id)}
                  />
                  <label htmlFor={"option3_" + o3.id}>{o3.label}</label>
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

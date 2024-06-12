import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { makeAmoveUserServer } from "../services";
import { FCMultiSelect } from "../../../components";
import FCCustomBtn from "../../../components/FCCustomBtn";
import FCCustomTxtInp from "../../../components/FCCustomTxtInp";
import { FCLoad } from "../../../loading/FCLoad";
import { SuccessDialog } from "./Dialog/FeedbackSuccessDialog";
import background from "../../../assets/images/Matan.jpg";

export const FCFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  var options1 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
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

  var options4 = [
    { label: "1", id: 1 },
    { label: "2", id: 2 },
    { label: "3", id: 3 },
    { label: "4", id: 4 },
    { label: "5", id: 5 },
  ];

  const [option4, setOption4] = useState(null);
  const handleOption4Creation = (id) => {
    setOption4(id);
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

            <div className="match">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(.${background})`,
            height: 60,
            width: 60,
            marginRight: 210,
            border: "4px solid white",
            borderRadius: "50%",
          }}
        ></div>
      </div>
            <h3>דרג/י את מידת ההסכמה שלך:</h3>
            <p className="feedback-p">
              1. __בעל מאפיינים דומים למה שאני מחפש/ת:
            </p>
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
            <p className="feedback-p">2. התמונות של __ תואמות למציאות:</p>
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
              3. תחומי העניין ששיתפ/ת עזרו לי לפתח איתו/ה שיחה:
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

            <p className="feedback-p">4. הייתי רוצה להיפגש איתו/ה שוב:</p>
            <div className="gender-inp">
              {options4.map((o4) => (
                <span key={o4.id}>
                  <input
                    checked={option4 === o4.id}
                    id={"option4_" + o4.id}
                    type="radio"
                    value={o4.id}
                    onClick={() => handleOption4Creation(o4.id)}
                  />
                  <label htmlFor={"option4_" + o4.id}>{o4.label}</label>
                </span>
              ))}
            </div>
            <p className="feedback-p">5. עם מי בילית היום?</p>

            <FCCustomTxtInp />

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

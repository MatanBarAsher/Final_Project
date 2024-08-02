import React, { useEffect, useState } from "react";
import { makeAmoveUserServer } from "../services";

export default function FCMatchedUser({ user, func, image, currentEmail }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(currentEmail);
    console.log(user.email);
    if (currentEmail !== user.email) {
      {
        makeAmoveUserServer
          .getMatchScoreByEmails(currentEmail, user.email)
          .then((res) => setScore(Math.round(res)));
      }
    }
  }, []);

  return (
    <div onClick={(user) => func} className="match">
      <div style={{ position: "relative", width: 80 }}>
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(${
              import.meta.env.VITE_SERVER_IMAGE_SRC_URL
            }${image})`,
            height: 60,
            width: 60,
            border: "4px solid white",
            borderRadius: "50%",
          }}
        >
          <div className="match-score-matchList">{score}%</div>
        </div>
      </div>
      <p>{user.firstName}</p>
    </div>
  );
}

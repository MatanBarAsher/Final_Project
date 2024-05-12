import React from "react";

export default function FCMatchedUser({ matchList }) {
  matchList.array.forEach((user) => {
    return (
      <>
        <div className="matched-user">
          <div></div>
          <h3>{user.name}</h3>
        </div>
      </>
    );
  });
  return (
    <div className="matched-user">
      <div></div>
      <h3>{}</h3>
    </div>
  );
}

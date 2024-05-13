import React from "react";
import FCCustomOpt from "../components/FCCustomOpt";

export default function FCCustomDd({ name, id, list }) {
  // list.forEach((element) => {
  //   // לעבור על כל הפריטים ברשימה וליצור option לכל אחד
  // });
  return (
    <>
      <select name={name} id={id} className="select">
        <FCCustomOpt value="בחר..." />
      </select>
    </>
  );
}

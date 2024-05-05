import React from "react";
import FCCustomOpt from "../components/FCCustomOpt";

export default function FCCustomDd({ name, id }) {
  return (
    <>
      <select name={name} id={id} className="select">
        <FCCustomOpt value="בחר..." />
      </select>
    </>
  );
}

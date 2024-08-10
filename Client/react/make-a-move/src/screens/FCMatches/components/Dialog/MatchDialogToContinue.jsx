import React from "react";
import { AlertDialog } from "../../../../components";

export const MatchDialogToContinue = ({ open, setClose , setCloseCancel }) => {
  return (
    <AlertDialog
      // className="match-modal"
      // sx={{ backgroundColor: "none", textAline: "center" }}
      open={open}
      confirmButtonAction={setClose}
      confirmButtonText={" המשך"}
      cancelButtonAction={setCloseCancel}
      cancelButtonText={"בטל"}
      title={"!משוב ראשון כבר מלא"}
      content={"עברו כמה ימים אם תרצה/י למלא משוב שני על ההתאמה לחץ/י המשך"}
    />
  );
};

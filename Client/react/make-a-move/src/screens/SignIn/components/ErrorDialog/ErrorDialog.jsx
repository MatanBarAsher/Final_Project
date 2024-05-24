import React from "react";
import { AlertDialog } from "../../../../components";

export const ErrorDialog = ({ open, setClose }) => {
  return (
    <AlertDialog
      open={open}
      confirmButtonAction={setClose}
      confirmButtonText={"התחברות מחדש"}
      title={"התחברת נכשלה"}
      content={"לא קיים משתמש עם נתונים אלו"}
    />
  );
};

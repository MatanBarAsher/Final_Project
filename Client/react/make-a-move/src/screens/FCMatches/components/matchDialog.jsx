import React from "react";
import { AlertDialog } from "../../../../components";

export const matchDialog = ({ open, setClose }) => {
  return (
    <AlertDialog
      className="match-modal"
      sx={{ backgroundColor: "none", textAline: "center" }}
      open={open}
      confirmButtonAction={setClose}
      confirmButtonText={" סגור"}
      title={"הכניסה למשוב כשלה!"}
      content={"כבר קיים משוב עבור התאמה זו"}
    />
  );
};

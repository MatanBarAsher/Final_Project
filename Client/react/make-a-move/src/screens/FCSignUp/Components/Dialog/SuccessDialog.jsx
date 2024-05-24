import React from "react";
import { AlertDialog } from "../../../../components";

export const SuccessDialog = ({ open, setClose }) => {
  return (
    <AlertDialog
      open={open}
      confirmButtonAction={setClose}
      confirmButtonText={"יאללה בואו נתחיל"}
      title={"ההרשמה נקלטה בהצלחה"}
      content={"הגיע הזמן למצוא את ההתאמות עבורך"}
    />
  );
};

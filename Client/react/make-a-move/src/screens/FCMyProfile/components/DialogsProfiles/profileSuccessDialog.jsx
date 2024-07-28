import React from "react";
import { AlertDialog } from "../../../../components";

export const ProfileSuccessDialog = ({ open, setClose }) => {
  return (
    <AlertDialog
      open={open}
      confirmButtonAction={setClose}
      confirmButtonText={" סגור"}
      title={"העדכון בוצע בהצלחה"}
      content={"כעת הפרטים שלך מעודכנים"}
    />
  );
};

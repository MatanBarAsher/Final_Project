import React from "react";
import { AlertDialog } from "../../../../components";
import FCCustomBtn from "../../../../components/FCCustomBtn";
import { Padding } from "@mui/icons-material";

export const SuccessDialog = ({ open, setClose }) => {
  return (
    <AlertDialog
      open={open}
      confirmButtonAction={setClose}
      title={"תודה על המשוב!"}
      content={"נשמח להיות איתך בהקשר בעתיד על מנת לבדוק אם זה ה - Match!"}
      confirmButtonText={<FCCustomBtn title={"סגור"} />}
    />
  );
};

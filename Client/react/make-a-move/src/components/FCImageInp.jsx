import { Opacity } from "@mui/icons-material";
import { border, borderRadius } from "@mui/system";
import React from "react";

export default function FCImageInp({ name }) {
  return (
    <div class="custom-file-input">
      <label for={name} className="custom-file-label">
        +
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="input-file"
        accept=".jpg, .jpeg .png"
      />
    </div>
  );
}

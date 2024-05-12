import React from "react";

export default function FCImageInp() {
  return (
    <input
      type="file"
      placeholder="Image"
      name="image"
      onChange={handleChange}
      value={data.image}
      className="input"
      accept=".jpg, .jpeg"
      required
    />
  );
}

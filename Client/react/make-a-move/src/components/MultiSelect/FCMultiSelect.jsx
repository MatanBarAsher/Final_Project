import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export const FCMultiSelect = ({ options, setValue, value, label }) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event || {};
    setValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Select
      id="multiple-checkbox"
      className="select"
      required
      multiple
      value={value}
      onChange={handleChange}
      input={<OutlinedInput label={label} />}
      renderValue={(selected) => selected.join(", ")}
      //   MenuProps={MenuProps}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={value.indexOf(option) > -1} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
};

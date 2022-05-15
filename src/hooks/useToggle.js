import { useState } from "react";

export const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = (value) => {
    setValue((prevValue) => (typeof value == "boolean" ? value : !prevValue));
  };
  return [value, toggleValue];
};

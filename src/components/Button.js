import React from "react";

export default function Button({ text, handleClick, style }) {
  return (
    <button onClick={handleClick} className={style}>
      {text}
    </button>
  );
}

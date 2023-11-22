import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

export function Button({ classname, text, handleSubmit }) {
  return (
    <ReuseButton className={classname} onClick={handleSubmit}>
      {text}
    </ReuseButton>
  );
}

export function Label({ classname, text }) {
  return (
    <label htmlFor="email" className="block mb-1">
      {text}
    </label>
  );
}

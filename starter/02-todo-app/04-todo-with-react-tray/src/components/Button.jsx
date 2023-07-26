import React from "react";
import general from "../styles/general";

export default function Button({
  type,
  onClick,
  children,
  customClass,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${general.button} ${customClass}`}
    >
      {children}
    </button>
  );
}

import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={[classes.button, classes[props.type]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;

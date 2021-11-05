import React from "react";

import styles from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={[styles.button, styles[props.type]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
//test
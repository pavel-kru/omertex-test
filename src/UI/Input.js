import React from "react";
import styles from "./Input.module.scss";

const Input = (props) => {
  return (
    <div className={`${styles.Input} ${props.className}`}>
      <input onChange={props.onChange} onBlur={props.onBlur} {...props} />
      <label htmlFor={props.id}>{props.label}{props.required && <span> *</span>}</label>
    </div>
  );
};

export default React.memo(Input);

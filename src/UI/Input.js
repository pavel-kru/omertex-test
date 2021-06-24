import React from "react";
import styles from "./Input.module.scss";

const Input = (props) => {
  let inputStyle = `${styles.Input} ${props.className} ${
    props.error ? styles.errorInput : null
  }`;

  let required = props.required && <span> *</span>;

  let input = (
    <>
      <input onChange={props.onChange} onBlur={props.onBlur} {...props} />
      <label htmlFor={props.id}>
        {props.label}
        {required}
      </label>
    </>
  );

  if (props.type === "select") {
    input = (
      <>
        <p>{props.label}</p>
        {required}
        <select></select>
      </>
    );
  }
  return (
    <div className={inputStyle}>
      {input}
      {props.error && <span className={styles.error}>{props.error}</span>}
    </div>
  );
};

export default React.memo(Input);

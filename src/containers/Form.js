import React, { useReducer, useCallback } from "react";

import Fieldset from "../components/Fieldset";
import Button from "../UI/Button";
import styles from "./Form.module.scss";

const formInitialState = {
  Ethernet: {
    ip: {
      auto: true,
      adress: "",
      subnetMask: "",
      defaultGateway: "",
    },
    dns: {
      auto: true,
      preferedServer: "",
      alternativeServer: "",
    },
  },
  Wireless: {
    enable: false,
    networkName: "",
    enableKey: false,
    securityKey: "",
    ip: {
      auto: true,
      adress: "",
      subnetMask: "",
      defaultGateway: "",
    },
    dns: {
      auto: true,
      preferedServer: "",
      alternativeServer: "",
    },
  },
};

const formReducer = (state, action) => {
  const { name, type, value } = action;

  if (type=== 'SUBMIT' || type=== 'CANCEL') {
    return formInitialState
  }


  const updatePath = name && name.split(".");

  if (updatePath.length === 2 && (type === "checkbox" || type === "radio")) {
    const [path, key] = updatePath;
    return {
      ...state,
      [path]: {
        ...state[path],
        [key]: !state[path][key],
      },
    };
  }
  if (updatePath.length === 3 && (type === "checkbox" || type === "radio")) {
    const [path, subPath, key] = updatePath;
    return {
      ...state,
      [path]: {
        ...state[path],
        [subPath]: {
          ...state[path][subPath],
          [key]: !state[path][subPath][key],
        },
      },
    };
  }
  if (updatePath.length === 2) {
    const [path, key] = updatePath;
    return {
      ...state,
      [path]: {
        ...state[path],
        [key]: value,
      },
    };
  }
  if (updatePath.length === 3) {
    const [path, subPath, key] = updatePath;
    return {
      ...state,
      [path]: {
        ...state[path],
        [subPath]: {
          ...state[path][subPath],
          [key]: value,
        },
      },
    };
  }

  return state;
};

function Form() {
  const [form, dispatchForm] = useReducer(formReducer, formInitialState);

  const inputChangeHandler = useCallback(
    ({ target }) => {
      dispatchForm({
        name: target.getAttribute("idx"),
        type: target.type,
        value: target.value,
      });
    },
    []
  );
  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatchForm({type: 'SUBMIT'})
  };
  
  const formCancelHandler = () => {
    dispatchForm({type: 'CANCEL'})
  };



  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <div className={styles["fieldset-container"]}>
        <Fieldset name="Ethernet" onChange={inputChangeHandler} form={form} />
        <Fieldset name="Wireless" onChange={inputChangeHandler} form={form} />
      </div>
      <div className={styles.buttons}>
        <Button type="submit">Save</Button>
        <Button type="cancel" onClick={formCancelHandler}>Cancel</Button>
      </div>
    </form>
  );
}

export default React.memo(Form);

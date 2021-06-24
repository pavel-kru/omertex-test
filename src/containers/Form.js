import React, { useReducer, useCallback } from "react";

import Fieldset from "../components/Fieldset";
import Button from "../UI/Button";
import { ipValidation } from "../utils/check-validity";
import styles from "./Form.module.scss";

const formInitialState = {
  Ethernet: {
    ip: {
      auto: true,
      address: "",
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
      address: "",
      subnetMask: "",
      defaultGateway: "",
    },
    dns: {
      auto: true,
      preferedServer: "",
      alternativeServer: "",
    },
  },
  errors: {
    Ethernet: { dns: {}, ip: {} },
    Wireless: { dns: {}, ip: {} },
  },
};

const formReducer = (state, action) => {
  const { name, type, value } = action;

  if (type === "SUBMIT") {
    console.log(
      JSON.stringify({
        Ethernet: { ...state.Ethernet },
        Wireless: { ...state.Wireless },
      })
    );
    return { ...formInitialState };
  }
  if (type === "CANCEL") {
    return { ...formInitialState };
  }

  const updatePath = name && name.split(".");

  if (updatePath.length === 2 && (type === "checkbox" || type === "radio")) {
    const [path, key] = updatePath;
    if (key === "enable" && state.Wireless.enable) {
      return {
        ...state,
        Wireless: {
          ...formInitialState.Wireless,
        },
        errors: {
          ...state.errors,
          Wireless: formInitialState.errors.Wireless,
        },
      };
    }

    if (key === "enableKey" && state.Wireless.enableKey) {
      return {
        ...state,
        Wireless: {
          ...state.Wireless,
          enableKey: false,
          securityKey: formInitialState.Wireless.securityKey,
        },
      };
    }
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
    if (!state[path][subPath][key]) {
      return {
        ...state,
        [path]: {
          ...state[path],
          [subPath]: {
            ...formInitialState[path][subPath],
          },
        },
        errors: {
          ...state.errors,
          [path]: {
            ...state.errors[path],
            [subPath]: {},
          },
        },
      };
    }

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
      errors: {
        ...state.errors,
        [path]: {
          ...state.errors[path],
          [subPath]: {
            ...state.errors[path][subPath],
            [key]: ipValidation(value, key),
          },
        },
      },
    };
  }
  return formInitialState;
};

function Form() {
  const [form, dispatchForm] = useReducer(formReducer, formInitialState);

  const inputChangeHandler = useCallback(({ target }) => {
    dispatchForm({
      name: target.getAttribute("idx"),
      type: target.type,
      value: target.value,
    });
  }, []);

  let formIsValid = true;

  const formCheckValidityHandler = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        formIsValid = false;
      }
      if (typeof obj[key] === "object") formCheckValidityHandler(obj[key]);
    }
  };
  formCheckValidityHandler(form.errors);
  
  const formSubmitHandler = (event) => {
    event.preventDefault();
    // if (!formIsValid) return;
    dispatchForm({ type: "SUBMIT" });
  };

  const formCancelHandler = (event) => {
    event.preventDefault();
    dispatchForm({ type: "CANCEL" });
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <div className={styles["fieldset-container"]}>
        <Fieldset name="Ethernet" onChange={inputChangeHandler} form={form} />
        <Fieldset name="Wireless" onChange={inputChangeHandler} form={form} />
      </div>
      <div className={styles.buttons}>
        <Button
          type="submit"
          disabled={!formIsValid}
        >
          Save
        </Button>
        <Button type="cancel" onClick={formCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default React.memo(Form);

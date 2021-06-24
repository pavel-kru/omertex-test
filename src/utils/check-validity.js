export const ipValidation = (value, param) => {
  const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  let testIsValid = ipPattern.test(value);
  let ipArray = value.split(".");
  let key =
    param === "address"
      ? " IP address"
      : param === "subnetMask"
      ? "Subnet Mask"
      : param === "preferedServer"
      ? "DNS server"
      : param === "alternativeServer"
      ? "DNS server"
      : null;
  if (value.trim() === "")
    return `Please, enter a${param === "address" ? "n" : null} ${key}.`;
  if (!testIsValid) {
    return `Invalid ${key}. Please, try again.`;
  }
  if (value === "0.0.0.0" || value === "255.255.255.255") {
    return `This is a special ${key} and couldn't be used`;
  } else {
    for (let i = 0; i < 4; i++) {
      if (ipArray[i] > 255 || ipArray[i] < 0) {
        return `Invalid ${key}. Please, try again.`;
      }
    }
  }
};

export const updateErrors = (errors, group, subgroup, ...rest) => {
  if (group === "Wireless") {
    switch (true) {
      case !subgroup.checked:
        return {
          ...errors,
          Wirelessipaddress: null,
          WirelessipsubnetMask: null,
          WirelessdnsalternativeServer: null,
          WirelessdnspreferedServer: "",
        };
      case "ip":
        return {
          ...errors,
          Wirelessipaddress: null,
          WirelessipsubnetMask: null,
        };
      case "dns":
        return {
          ...errors,
          WirelessdnsalternativeServer: "",
          WirelessdnspreferedServer: "",
        };

      default:
        break;
    }
    return {
      ...errors,
    };
  }
};

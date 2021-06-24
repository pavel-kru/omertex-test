import Input from "../UI/Input";
import styles from "./Fieldset.module.scss";
import Button from "../UI/Button";

const Fieldset = ({ name, form, onChange }) => {
  let enableWifi = null;
  let wirelessSpecialSettings = null;
  let wirelessDisabled = name === "Wireless" && !form.Wireless.enable;
  let disabledStyle = wirelessDisabled ? styles.disabledOpacity : null;
  let fieldsetIpDisabledStyle = form[name].ip.auto
    ? styles.disabledOpacity
    : null;
  let fieldsetDnsDisabledStyle = form[name].dns.auto
    ? styles.disabledOpacity
    : null;

  if (name === "Wireless") {
    enableWifi = (
      <Input
        label="Enable wifi:"
        path={name}
        idx={name + ".enable"}
        id={`${name}-enable`}
        type="checkbox"
        className={styles.enableWifi}
        onChange={onChange}
        checked={form.Wireless.enable}
      />
    );

    wirelessSpecialSettings = (
      <>
        <div className={`${styles.select} ${disabledStyle}`}>
          <Input
            label="Wireless Network Name:"
            idx={name + ".networkName"}
            name="networkName"
            type="select"
            placeholder="Please select"
            value={form.Wireless.networkName}
            onChange={onChange}
            required
          />
          <Button
            type="refresh"
            disabled={!form.Wireless.enable}
            onClick={(event) => event.preventDefault()}
          />
        </div>
        <Input
          label="Enable Wireless Security:"
          idx={name + ".enableKey"}
          id={`${name}-security-enable`}
          className={`${styles.inputText} ${disabledStyle}`}
          type="checkbox"
          onChange={onChange}
          checked={form.Wireless.enableKey}
        />
        <Input
          label="Security Key:"
          idx={name + ".securityKey"}
          type="text"
          disabled={!form.Wireless.enableKey}
          className={`${styles.inputText} ${
            !form.Wireless.enableKey ? styles.disabledOpacity : null
          }`}
          value={form.Wireless.securityKey}
          onChange={onChange}
          required
        />
      </>
    );
  }

  return (
    <fieldset disabled={wirelessDisabled} className={styles.fieldset}>
      <legend>
        {name} Settings:
        {enableWifi}
      </legend>
      {wirelessSpecialSettings}
      <Input
        label="Obtain an IP address automatically (DHCP/BootP)"
        idx={name + ".ip.auto"}
        id={`${name}-ip-auto`}
        type="radio"
        className={disabledStyle}
        name={`${name}-ip`}
        checked={form[name].ip.auto}
        onChange={onChange}
      />
      <Input
        label="Use the following IP address:"
        idx={name + ".ip.auto"}
        id={`${name}-ip-manually`}
        className={disabledStyle}
        type="radio"
        name={`${name}-ip`}
        checked={!form[name].ip.auto}
        onChange={onChange}
      />
      <fieldset
        disabled={form[name].ip.auto}
        className={fieldsetIpDisabledStyle}
      >
        <Input
          label="IP address:"
          idx={name + ".ip.address"}
          id={`${name}-ip-value`}
          type="text"
          className={styles.inputText}
          value={form[name].ip.address}
          error={form.errors[name].ip.address}
          onChange={onChange}
          required
        />
        <Input
          label="Subnet Mask:"
          idx={name + ".ip.subnetMask"}
          id={`${name}-subnet`}
          type="text"
          className={styles.inputText}
          value={form[name].ip.subnetMask}
          error={form.errors[name].ip.subnetMask}
          onChange={onChange}
          required
        />
        <Input
          label="Deafault Gateway:"
          idx={name + ".ip.defaultGateway"}
          id={`${name}-defaultGateway`}
          type="text"
          className={styles.inputText}
          value={form[name].ip.defaultGateway}
          onChange={onChange}
        />
      </fieldset>
      <Input
        label="Obtain DNS service address automatically"
        idx={name + ".dns.auto"}
        id={`${name}-dns-address-auto`}
        className={disabledStyle}
        type="radio"
        name={`${name}-dns-address`}
        checked={form[name].dns.auto}
        onChange={onChange}
      />
      <Input
        label="Use the following DNS server address:"
        idx={name + ".dns.auto"}
        id={`${name}-dns-address-manually`}
        className={disabledStyle}
        checked={!form[name].dns.auto}
        type="radio"
        name={`${name}-dns-address`}
        onChange={onChange}
      />
      <fieldset
        disabled={form[name].dns.auto}
        className={fieldsetDnsDisabledStyle}
      >
        <Input
          label="Prefered DNS server:"
          idx={name + ".dns.preferedServer"}
          type="text"
          className={styles.inputText}
          value={form[name].dns.preferedServer}
          error={form.errors[name].dns.preferedServer}
          onChange={onChange}
          required
        />
        <Input
          label="Alternative DNS server:"
          idx={name + ".dns.alternativeServer"}
          type="text"
          className={styles.inputText}
          onChange={onChange}
          value={form[name].dns.alternativeServer}
          error={form.errors[name].dns.alternativeServer}
        />
      </fieldset>
    </fieldset>
  );
};

export default Fieldset;

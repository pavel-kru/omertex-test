import Input from "../UI/Input";
import styles from "./Fieldset.module.scss";
import Button from "../UI/Button";

const Fieldset = ({ name, form, onChange }) => {
  let enableWifi = null;
  let wirelessSpecialSettings = null;

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
        <div className={styles.select}>
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
          type="checkbox"
          onChange={onChange}
          checked={form.Wireless.enableKey}
        />
        <Input
          label="Security Key:"
          idx={name + ".securityKey"}
          type="text"
          disabled={!form.Wireless.enableKey}
          className={styles.inputText}
          value={form.Wireless.securityKey}
          onChange={onChange}
          required
        />
      </>
    );
  }
  return (
    <fieldset
      className={styles.fieldset}
      disabled={name === "Wireless" && !form.Wireless.enable}
    >
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
        name={`${name}-ip`}
        checked={form[name].ip.auto}
        onChange={onChange}
      />
      <Input
        label="Use the following IP address:"
        idx={name + ".ip.auto"}
        id={`${name}-ip-manually`}
        type="radio"
        name={`${name}-ip`}
        checked={!form[name].ip.auto}
        onChange={onChange}
      />
      <fieldset disabled={form[name].ip.auto}>
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
        type="radio"
        name={`${name}-dns-address`}
        checked={form[name].dns.auto}
        onChange={onChange}
      />
      <Input
        label="Use the following DNS server address:"
        idx={name + ".dns.auto"}
        id={`${name}-dns-address-manually`}
        type="radio"
        name={`${name}-dns-address`}
        onChange={onChange}
      />
      <fieldset disabled={form[name].dns.auto}>
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

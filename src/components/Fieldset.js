
import Input from "../UI/Input";
import styles from "./Fieldset.module.scss";


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
      />
    );

    wirelessSpecialSettings = (
      <>
        <Input
          label="Wireless Network Name:"
          idx={name + ".networkName"}
          name="networkName"
          className={styles.inputText}
          required
          placeholder="Please select"
          onChange={onChange}
        />
        <Input
          label="Enable Wireless Security:"
          idx={name + ".enableKey"}
          id={`${name}-security-enable`}
          type="checkbox"
          onChange={onChange}
        />
        <Input
          label="Security Key:"
          idx={name + ".securityKey"}
          type="text"
          disabled={!form.Wireless.enableKey}
          className={styles.inputText}
          required
          onChange={onChange}
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
        path={name}
        idx={name + ".ip.auto"}
        id={`${name}-ip-auto`}
        type="radio"
        name={`${name}-ip`}
        checked={form[name].ip.auto}
        onChange={onChange}
      />
      <Input
        idx={name + ".ip.auto"}
        label="Use the following IP address:"
        id={`${name}-ip-manually`}
        type="radio"
        name={`${name}-ip`}
        onChange={onChange}
      />
      <fieldset disabled={form[name].ip.auto}>
        <Input
          label="IP adress:"
          idx={name + ".ip.adress"}
          id={`${name}-ip-value`}
          type="text"
          className={styles.inputText}
          required
          value={form[name].ip.adress}
          onChange={onChange}
        />
        <Input
          label="Subnet Mask:"
          idx={name + ".ip.subnetMask"}
          id={`${name}-subnet`}
          type="text"
          className={styles.inputText}
          required
          onChange={onChange}
          value={form[name].ip.subnetMask}
        />
        <Input
          label="Deafault Gateway:"
          path={name}
          idx={name + ".ip.defaultGateway"}
          id={`${name}-defaultGateway`}
          type="text"
          className={styles.inputText}
          onChange={onChange}
          value={form[name].ip.defaultGateway}
        />
      </fieldset>
      <Input
        label="Obtain DNS service address automatically"
        idx={name + ".dns.auto"}
        id={`${name}-dns-adress-auto`}
        type="radio"
        name={`${name}-dns-adress`}
        checked={form[name].dns.auto}
        onChange={onChange}
      />
      <Input
        label="Use the following DNS server address:"
        idx={name + ".dns.auto"}
        id={`${name}-dns-adress-manually`}
        type="radio"
        name={`${name}-dns-adress`}
        onChange={onChange}
      />
      <fieldset disabled={form[name].dns.auto}>
        <Input
          label="Prefered DNS server:"
          idx={name + ".dns.preferedServer"}
          type="text"
          className={styles.inputText}
          required
          onChange={onChange}
          value={form[name].dns.preferedServer}
        />
        <Input
          label="Alternative DNS server:"
          idx={name + ".dns.alternativeServer"}
          type="text"
          className={styles.inputText}
          onChange={onChange}
          value={form[name].dns.alternativeServer}
        />
      </fieldset>
    </fieldset>
  );
};

export default Fieldset;

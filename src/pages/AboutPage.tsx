import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ fontSize: "12px" }}>
      <p>{t("about.header")}</p>
      <ul>
        <li>
          <b>{t("about.tools.ryzenadj")}</b>
        </li>
        <li>
          <b>{t("about.tools.steamDeck")}</b>
        </li>
      </ul>
      <p>{t("about.supportHeader")}</p>
      <ul>
        <li>
          <b>{t("about.supporters.pososaku")}</b>
        </li>
        <li>
          <b>{t("about.supporters.deadwenk")}</b>
        </li>
        <li>
          <b>{t("about.supporters.foxn")}</b>
        </li>
        <li>
          <b>{t("about.supporters.robert")}</b>
        </li>
        <li>
          <b>{t("about.supporters.ngnius")}</b>
        </li>
        <li>
          <b>{t("about.supporters.notBullseye")}</b>
        </li>
        <li>
          <b>{t("about.supporters.community")}</b>
        </li>
      </ul>
      <div style={{ textAlign: "center" }}>
        <p>{t("about.footer.thankYou")}</p>
        <div>{t("about.footer.madeBy")}</div>
      </div>
    </div>
  );
};

export default AboutPage;

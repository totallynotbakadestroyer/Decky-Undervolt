import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation("about");

  return (
    <div style={{ fontSize: "12px" }}>
      <p>{t("aboutPage.header")}</p>
      <ul>
        <li>
          <b>{t("aboutPage.tools.ryzenadj")}</b>
        </li>
        <li>
          <b>{t("aboutPage.tools.steamDeck")}</b>
        </li>
      </ul>
      <p>{t("aboutPage.supportHeader")}</p>
      <ul>
        <li>
          <b>{t("aboutPage.supporters.pososaku")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.deadwenk")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.foxn")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.robert")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.ngnius")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.notBullseye")}</b>
        </li>
        <li>
          <b>{t("aboutPage.supporters.community")}</b>
        </li>
      </ul>
      <div style={{ textAlign: "center" }}>
        <p>{t("aboutPage.footer.thankYou")}</p>
        <div>{t("aboutPage.footer.madeBy")}</div>
      </div>
    </div>
  );
};

export default AboutPage;

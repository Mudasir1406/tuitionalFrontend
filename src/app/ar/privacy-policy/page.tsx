"use client";
import { useI18n } from "@/context/language-context";
import HtmlWrapper from "@/components/html-wrapper";
import { leagueSpartan } from "../../fonts";

function PrivacyPolicy() {
  const { t, isRTL } = useI18n();

  return (
    <HtmlWrapper className={leagueSpartan.variable}>
      <head>
        <title>{t("privacy.title")}</title>
        <meta name="description" content={t("privacy.description")} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
                font-family: 'Noto Sans Arabic', Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                max-width: 800px;
                margin: 20px auto;
                background: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: right;
            }
            h1, h2 {
                color: #2c3e50;
            }
            a {
                color: #3498db;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        `,
          }}
        />
        <div className="container">
          <h1>{t("privacy.heading")}</h1>
          <p>
            <strong>{t("privacy.effective_date")}</strong>
          </p>
          <p>{t("privacy.intro")}</p>
          <h2>{t("privacy.info_collect")}</h2>
          <h3>{t("privacy.personal_info")}</h3>
          <p>{t("privacy.personal_desc")}</p>
          <ul>
            <li>
              <strong>{t("privacy.name")}</strong>
            </li>
            <li>
              <strong>{t("privacy.email")}</strong>
            </li>
            <li>
              <strong>{t("privacy.google_account")}</strong>
            </li>
          </ul>
          <h3>{t("privacy.usage_data")}</h3>
          <p>{t("privacy.usage_desc")}</p>
          <ul>
            <li>{t("privacy.meeting_timestamps")}</li>
            <li>{t("privacy.participation")}</li>
            <li>{t("privacy.session_analytics")}</li>
          </ul>
          <h2>{t("privacy.how_use")}</h2>
          <ul>
            <li>
              <strong>{t("privacy.class_links")}</strong>
            </li>
            <li>
              <strong>{t("privacy.data_analytics")}</strong>
            </li>
            <li>
              <strong>{t("privacy.communication")}</strong>
            </li>
          </ul>
          <h2>{t("privacy.sharing")}</h2>
          <p>{t("privacy.sharing_desc")}</p>
          <ul>
            <li>
              <strong>{t("privacy.service_providers")}</strong>
            </li>
            <li>
              <strong>{t("privacy.legal_requirements")}</strong>
            </li>
          </ul>
          <h2>{t("privacy.security")}</h2>
          <p>{t("privacy.security_desc")}</p>
          <ul>
            <li>{t("privacy.encrypted_transfer")}</li>
            <li>{t("privacy.secure_storage")}</li>
            <li>{t("privacy.access_control")}</li>
          </ul>
          <h2>{t("privacy.consent")}</h2>
          <p>{t("privacy.consent_desc")}</p>
          <h2>{t("privacy.rights")}</h2>
          <p>{t("privacy.rights_desc")}</p>
          <ul>
            <li>
              <strong>{t("privacy.access")}</strong>
            </li>
            <li>
              <strong>{t("privacy.correction")}</strong>
            </li>
            <li>
              <strong>{t("privacy.deletion")}</strong>
            </li>
          </ul>
          <p>{t("privacy.exercise_rights")}</p>
          <ul>
            <li>
              <strong>البريد الإلكتروني:</strong> {t("privacy.contact_email")}
            </li>
            <li>
              <strong>الهاتف:</strong> {t("privacy.contact_phone")}
            </li>
          </ul>
          <h2>{t("privacy.third_party")}</h2>
          <p>{t("privacy.third_party_desc")}</p>
          <p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("privacy.google_privacy")}
            </a>
          </p>
          <h2>{t("privacy.changes")}</h2>
          <p>{t("privacy.changes_desc")}</p>
          <h2>{t("privacy.contact")}</h2>
          <p>{t("privacy.contact_desc")}</p>
          <ul>
            <li>
              <strong>البريد الإلكتروني:</strong> {t("privacy.contact_email")}
            </li>
            <li>
              <strong>الهاتف:</strong> {t("privacy.contact_phone")}
            </li>
          </ul>
        </div>
      </body>
    </HtmlWrapper>
  );
}

export default PrivacyPolicy;
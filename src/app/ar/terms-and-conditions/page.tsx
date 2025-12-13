"use client";
import React from "react";
import { useI18n } from "@/context/language-context";
import HtmlWrapper from "@/components/html-wrapper";
import { leagueSpartan } from "../../fonts";

function Page() {
  const { t, isRTL } = useI18n();
  
  return (
    <HtmlWrapper className={leagueSpartan.variable}>
      <head>
        <title>{t('terms.title')}</title>
        <meta name="description" content={t('terms.title')} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
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
        <h1>{t('terms.heading')}</h1>
        <p>
          <strong>{t('terms.effective_date')}</strong>
        </p>
        <p>
          {t('terms.intro')}
        </p>
        <h2>{t('terms.use_services')}</h2>
        <p>
          {t('terms.use_services_desc')}
        </p>
        <h2>{t('terms.account_resp')}</h2>
        <ul>
          <li>
            {t('terms.account_confidentiality')}
          </li>
          <li>
            {t('terms.notify_unauthorized')}
          </li>
        </ul>
        <h2>{t('terms.prohibited')}</h2>
        <p>{t('terms.prohibited_desc')}</p>
        <ul>
          <li>
            {t('terms.disrupt_platform')}
          </li>
          <li>
            {t('terms.misuse_services')}
          </li>
          <li>{t('terms.infringe_ip')}</li>
        </ul>
        <h2>{t('terms.ip')}</h2>
        <p>
          {t('terms.ip_desc')}
        </p>
        <h2>{t('terms.modifications')}</h2>
        <p>
          {t('terms.modifications_desc')}
        </p>
        <h2>{t('terms.liability')}</h2>
        <p>
          {t('terms.liability_desc')}
        </p>
        <h2>{t('terms.termination')}</h2>
        <p>
          {t('terms.termination_desc')}
        </p>
        <h2>{t('terms.governing')}</h2>
        <p>
          {t('terms.governing_desc')}
        </p>
        <h2>{t('terms.changes')}</h2>
        <p>
          {t('terms.changes_desc')}
        </p>
        <h2>{t('terms.contact')}</h2>
        <p>{t('terms.contact_desc')}</p>
        <ul>
          <li>
            <strong>البريد الإلكتروني:</strong> {t('terms.contact_email')}
          </li>
          <li>
            <strong>الهاتف:</strong> {t('terms.contact_phone')}
          </li>
        </ul>
      </div>
      </body>
    </HtmlWrapper>
  );
}

export default Page;
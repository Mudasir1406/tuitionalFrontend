import React from "react";

function page() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Terms of Service - Tuitional Education</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n            color: #333;\n        }\n        .container {\n            max-width: 800px;\n            margin: 20px auto;\n            background: #fff;\n            padding: 20px;\n            border-radius: 5px;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        }\n        h1, h2 {\n            color: #2c3e50;\n        }\n        a {\n            color: #3498db;\n            text-decoration: none;\n        }\n        a:hover {\n            text-decoration: underline;\n        }\n    ",
        }}
      />
      <div className="container">
        <h1>Terms of Service for Tuitional Education</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Effective Date]
        </p>
        <p>
          Welcome to Tuitional Education ("we," "our," or "us"). By accessing or
          using our services, you agree to comply with and be bound by the
          following Terms of Service ("Terms"). If you do not agree with these
          Terms, please do not use our services.
        </p>
        <h2>1. Use of Services</h2>
        <p>
          Our services, including the integration with Google Meet for
          generating class meeting links, are intended solely for educational
          purposes. You agree to use our platform responsibly and in compliance
          with all applicable laws and regulations.
        </p>
        <h2>2. Account Responsibilities</h2>
        <ul>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials and ensuring the security of your account.
          </li>
          <li>
            You agree to notify us immediately of any unauthorized use of your
            account or breach of security.
          </li>
        </ul>
        <h2>3. Prohibited Activities</h2>
        <p>When using our services, you agree not to:</p>
        <ul>
          <li>
            Engage in any activity that disrupts or interferes with the
            functionality of our platform.
          </li>
          <li>
            Misuse our services for unauthorized purposes, including but not
            limited to spamming, hacking, or distributing harmful content.
          </li>
          <li>Infringe on the intellectual property rights of others.</li>
        </ul>
        <h2>4. Intellectual Property</h2>
        <p>
          All content, trademarks, logos, and intellectual property associated
          with Tuitional Education are the property of Tuitional Education or
          its licensors. You may not use, reproduce, or distribute our content
          without prior written consent.
        </p>
        <h2>5. Service Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of
          our services at any time without prior notice. We are not liable for
          any inconvenience or loss caused by such changes.
        </p>
        <h2>6. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Tuitional Education is not
          liable for any direct, indirect, incidental, or consequential damages
          resulting from your use of our services.
        </p>
        <h2>7. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account at our sole
          discretion if you violate these Terms or engage in activities harmful
          to our platform or users.
        </p>
        <h2>8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of [Insert Jurisdiction]. Any
          disputes arising from these Terms will be subject to the exclusive
          jurisdiction of the courts in [Insert Jurisdiction].
        </p>
        <h2>9. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. We will notify you of
          significant changes through our platform or via email. Your continued
          use of our services constitutes acceptance of the updated Terms.
        </p>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>
            <strong>Email:</strong> hello@tuitionaledu.com
          </li>
          <li>
            <strong>Phone:</strong> +971 564900376
          </li>
        </ul>
      </div>
    </>
  );
}

export default page;

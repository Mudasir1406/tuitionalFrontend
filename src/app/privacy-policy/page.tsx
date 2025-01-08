import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Tuitional Education",
  description: "Privacy policy for Tuitional Education platform.",
};

function PrivacyPolicy() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
                font-family: Arial, sans-serif;
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
          <h1>Privacy Policy for Tuitional Education</h1>
          <p>
            <strong>Effective Date:</strong>1/1/2025
          </p>
          <p>
            Tuitional Education (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;) is committed to protecting your privacy. This
            Privacy Policy describes how we collect, use, and safeguard the
            information you provide to us when you use our services. This
            document is specifically tailored to comply with the requirements
            for Google OAuth Consent Screen.
          </p>
          <h2>Information We Collect</h2>
          <h3>1. Personal Information:</h3>
          <p>
            When you use our platform, we may collect the following personal
            information:
          </p>
          <ul>
            <li>
              <strong>Name</strong>
            </li>
            <li>
              <strong>Email Address</strong>
            </li>
            <li>
              <strong>Google Account Information</strong> (accessed via Google
              OAuth, as authorized by you).
            </li>
          </ul>
          <h3>2. Usage Data:</h3>
          <p>
            We collect analytics data related to the scheduling and usage of
            class meeting links, including:
          </p>
          <ul>
            <li>Meeting creation timestamps.</li>
            <li>Teacher and student participation data.</li>
            <li>Session duration and attendance analytics.</li>
          </ul>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>
              <strong>Class Meeting Links:</strong> We use Google Meet
              integration to generate class meeting links for teachers and
              students automatically.
            </li>
            <li>
              <strong>Data Analytics:</strong> Meeting analytics (such as
              attendance and duration) are stored in our database to provide
              insights and improve the educational experience.
            </li>
            <li>
              <strong>Communication:</strong> To send important updates,
              notifications, or reminders related to your classes.
            </li>
          </ul>
          <h2>Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information in the following
            situations:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Third-party tools and services
              (e.g., Google Meet) used to facilitate our operations.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to
              comply with legal processes.
            </li>
          </ul>
          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            information, including:
          </p>
          <ul>
            <li>Encrypted data transfer (HTTPS).</li>
            <li>Secure database storage.</li>
            <li>Access control policies.</li>
          </ul>
          <h2>Your Consent</h2>
          <p>
            By using our services and authorizing Google OAuth, you consent to
            the collection and use of your information as described in this
            Privacy Policy.
          </p>
          <h2>Your Rights</h2>
          <p>You have the following rights regarding your data:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of your personal data.
            </li>
            <li>
              <strong>Correction:</strong> Request corrections to inaccuracies
              in your data.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your data, subject
              to legal or operational requirements.
            </li>
          </ul>
          <p>To exercise these rights, contact us at:</p>
          <ul>
            <li>
              <strong>Email:</strong> hello@tuitionaledu.com
            </li>
            <li>
              <strong>Phone:</strong> +971 564900376
            </li>
          </ul>
          <h2>Third-Party Services</h2>
          <p>
            Our integration with Google Meet is governed by Google&#39;s Privacy
            Policy. We recommend reviewing Google&#39;s policies to understand
            how they handle your information.
          </p>
          <p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            Changes will be communicated through our platform or via email.
            Continued use of our services after any changes constitutes
            acceptance of the updated Privacy Policy.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> hello@tuitionaledu.com
            </li>
            <li>
              <strong>Phone:</strong> +971 564900376
            </li>
          </ul>
        </div>
      </body>
    </html>
  );
}

export default PrivacyPolicy;

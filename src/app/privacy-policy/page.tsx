import React from "react";

function page() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Privacy Policy - Tuitional Education</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n            color: #333;\n        }\n        .container {\n            max-width: 800px;\n            margin: 20px auto;\n            background: #fff;\n            padding: 20px;\n            border-radius: 5px;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        }\n        h1, h2 {\n            color: #2c3e50;\n        }\n        a {\n            color: #3498db;\n            text-decoration: none;\n        }\n        a:hover {\n            text-decoration: underline;\n        }\n    ",
        }}
      />
      <div className="container">
        <h1>Privacy Policy for Tuitional Education</h1>
        <p>
          <strong>Effective Date:</strong> [Insert Effective Date]
        </p>
        <p>
          Tuitional Education ("we," "our," or "us") is committed to protecting
          your privacy. This Privacy Policy describes how we collect, use, and
          safeguard the information you provide to us when you use our services.
          This document is specifically tailored to comply with the requirements
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
          We collect analytics data related to the scheduling and usage of class
          meeting links, including:
        </p>
        <ul>
          <li>Meeting creation timestamps.</li>
          <li>Teacher and student participation data.</li>
          <li>Session duration and attendance analytics.</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>
            <strong>Class Meeting Links:</strong> We use Google Meet integration
            to generate class meeting links for teachers and students
            automatically.
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
          By using our services and authorizing Google OAuth, you consent to the
          collection and use of your information as described in this Privacy
          Policy.
        </p>
        <h2>Your Rights</h2>
        <p>You have the following rights regarding your data:</p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of your personal data.
          </li>
          <li>
            <strong>Correction:</strong> Request corrections to inaccuracies in
            your data.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your data, subject to
            legal or operational requirements.
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
          Our integration with Google Meet is governed by Google's Privacy
          Policy. We recommend reviewing Google's policies to understand how
          they handle your information.
        </p>
        <p>
          <a href="https://policies.google.com/privacy" target="_blank">
            Google Privacy Policy
          </a>
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time.
          Changes will be communicated through our platform or via email.
          Continued use of our services after any changes constitutes acceptance
          of the updated Privacy Policy.
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
    </>
  );
}

export default page;

import {
  CareersFormType,
  ContactFormType,
  FormType,
} from "@/components/home/form-dialouge";

export const createCareerTemplate = (formData: CareersFormType) => `
  <html>
    <body>
      <h2>Career Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">First Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.FirstName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Last Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.LastName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Email:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.EmailAddress}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Phone:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.PhoneNumber}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Country:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Country}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Position Applied For:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Position}</td>
        </tr> <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">IP:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.IP}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">browser:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Browser}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Source Page URL:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.SourcePageURL}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Message:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Message}</td>
        </tr>
       
      </table>
    </body>
  </html>
`;

export const createContactTemplate = (formData: ContactFormType) => `
  <html>
    <body>
      <h2>Contact Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">First Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.FirstName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Last Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.LastName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Email:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.EmailAddress}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Phone:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.PhoneNumber}</td>
        </tr>
          <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Country:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Country}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">IP:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.IP}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">browser:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Browser}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Source Page URL:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.SourcePageURL}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Message:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Message}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Date:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Date}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Time:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Time}</td>
        </tr>
      </table>
    </body>
  </html>
`;

export const createEmailTemplate = (formData: FormType) => `
  <html>
    <body>
      <h2>Lead Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.FirstName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Email:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.EmailAddress}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Phone:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.PhoneNumber}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Grade:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Grade}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Curriculum:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Curriculum}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Subjects:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Subject}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Country:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Country}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">IP:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.IP}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">browser:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Browser}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Source Page URL:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.SourcePageURL}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Message:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Message}</td>
        </tr>
         <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Date:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Date}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Time:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.Time}</td>
        </tr>
      </table>
    </body>
  </html>
`;

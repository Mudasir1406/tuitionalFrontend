import { CareersFormType, FormType } from "@/components/home/form-dialouge";

export const createCareerTemplate = (formData: CareersFormType) => `
  <html>
    <body>
      <h2>Contact Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">First Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.firstName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Last Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.lastName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Email:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Phone:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Country:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.country}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Position Applied For:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.position}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Message:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.message}</td>
        </tr>
       
      </table>
    </body>
  </html>
`;

export const createEmailTemplate = (formData: FormType) => `
  <html>
    <body>
      <h2>Contact Form Submission</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Name:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Email:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Phone:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Grade:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.grade}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Curriculum:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.curriculum}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Subjects:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.subjects}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd; padding: 8px;">Message:</td>
          <td style="border: 1px solid #dddddd; padding: 8px;">${formData.message}</td>
        </tr>
      </table>
    </body>
  </html>
`;

import { FormType } from "@/components/home/form-dialouge";
import { sendEmail } from "../email-service/email-service";
import { createEmailTemplate } from "../email-service/template";
import { HELLOTUITIONALEDU } from "@/utils/env";

export const sendForm = async (formData: FormType) => {
  const formDataObject = new FormData();

  Object.entries(formData).map((value) =>
    formDataObject.append(value[0], value[1])
  );

  const keyValuePairs: string[] = [];
  for (const [key, value] of Array.from(formDataObject.entries())) {
    keyValuePairs.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    );
  }

  const formDataString = keyValuePairs.join("&");

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbyk90z7rMyxOY4kvD6oytsxr4Q-L9k1YX1o_c7yZ44Krga3uYtoTXcjdwORVHmYiulhvw/exec",
    {
      redirect: "follow",
      method: "POST",
      mode: "no-cors", // Bypass CORS

      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  await sendEmail({
    recipientEmail: HELLOTUITIONALEDU,
    subject: "Get Started",
    text: "",
    html: createEmailTemplate(formData),
  });
};

export const sendFormV2 = async (formData: FormType) => {
  const formDataObject = new FormData();

  Object.entries(formData).map((value) =>
    formDataObject.append(value[0], value[1])
  );

  const keyValuePairs: string[] = [];
  for (const [key, value] of Array.from(formDataObject.entries())) {
    keyValuePairs.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    );
  }

  const formDataString = keyValuePairs.join("&");

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwpmewqTU1gGcy7HVBPWxRALRAqqVN7Gwb2N3BCf6Uy7icVMEAU-01urxAG7giWKoQLTQ/exec",
    {
      redirect: "follow",
      method: "POST",
      mode: "no-cors", // Bypass CORS

      body: formDataString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  await sendEmail({
    recipientEmail: HELLOTUITIONALEDU,
    subject: "Get Started",
    text: "",
    html: createEmailTemplate(formData),
  });
};

import axiosInstance from "@/axios/axios-config";

export const sendEmail = async (
  data: Send_Email
): Promise<{ message: string }> => {
  try {
    // Await the axios request to resolve the promise
    const response = await axiosInstance.post("/api/utils/send-email", data);

    // Return the data as Grade_Type[]
    return response.data as { message: string };
  } catch (error) {
    // Handle the error case and return an empty array
    return { message: "Somthing went wrong." } as { message: string };
  }
};

export type Send_Email = {
  recipientEmail: string;
  cc?: string;
  subject: string;
  text: string;
  html: string;
};

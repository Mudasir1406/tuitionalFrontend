import React from "react";
import { Header } from "../../components";

import Footer from "../../components/footer-wrapper";
import LearnTogeather from "../../components/contact/learn-togeather";
import GetInTouch from "../../components/contact/get-in-touch/GetInTouch";
import Info from "../../components/contact/info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "Contact Tuitional Support for your enquiries",
  description: `Contact Tuitional to gain academic support and get answers to all your queries. Don't hesitate, we're just a click away.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const Contact: React.FC = () => {
  return (
    <>
      <Header heroClassName="h-[80px] sm:h-[90px] md:h-[100px] lg:h-[110px] bg-[#D7F0FF]" />
      <div className="bg-[#D7F0FF]">
        <div className="mx-auto px-4 pt-[100px] sm:px-6 sm:pt-[110px] md:pt-[120px] lg:max-w-[1450px] lg:px-12 lg:pt-[130px]">
          <LearnTogeather />
        </div>
      </div>
      <GetInTouch />
      <div className="mx-auto mb-[3vh] mt-[5vh] px-4 sm:px-6 lg:max-w-[1450px] lg:px-12">
        <Info />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

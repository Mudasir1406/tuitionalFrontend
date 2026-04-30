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
      <Header heroClassName="h-[100px] sm:h-[100px] md:h-[200px] lg:h-[200px] bg-[#D7F0FF]" />
      <div className="bg-[#D7F0FF]">
        <div className="mx-auto pt-[120px] sm:pt-[150px] md:pt-[200px] lg:max-w-[1450px] lg:pt-[210px]">
          <LearnTogeather />
        </div>
      </div>
      <GetInTouch />
      <div className="mx-auto mb-[3vh] mt-[5vh] lg:max-w-[1450px]">
        <Info />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

import React from "react";
import { getFooterData } from "@/services/footer/footer";
import Footer from "./footer";

const ArServerFooter: React.FC = async () => {
  const footerData = await getFooterData("ar");

  return (
    <div dir="rtl">
      <Footer footerData={footerData} />
    </div>
  );
};

export default ArServerFooter;

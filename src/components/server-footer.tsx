import React from "react";
import { getFooterData } from "@/services/footer/footer";
import Footer from "./footer";

const ServerFooter: React.FC = async () => {
  // Fetch footer data server-side for English
  const footerData = await getFooterData('en');
  
  return <Footer footerData={footerData} />;
};

export default ServerFooter;
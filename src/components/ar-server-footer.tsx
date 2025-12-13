import React from "react";
import { getFooterData } from "@/services/footer/footer";
import ArFooter from "./ar-footer";

const ArServerFooter: React.FC = async () => {
  // Fetch footer data server-side for Arabic
  const footerData = await getFooterData('ar');
  
  return <ArFooter footerData={footerData} />;
};

export default ArServerFooter;
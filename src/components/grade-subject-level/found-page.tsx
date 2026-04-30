import React from "react";
import Image from "next/image";
import Footer from "../footer-wrapper";
import Logo from "../../../public/assets/images/static/logo.png";

const FoundPage = () => (
  <>
    <div>
      <div className="px-[9vh] py-[3vh]">
        <Image src={Logo} alt="" />
      </div>
      <p className="flex h-[85vh] items-center justify-center text-[9vh] font-semibold text-brand-500 font-heading">
        Page Not Found
      </p>
    </div>
    <Footer />
  </>
);

export default FoundPage;

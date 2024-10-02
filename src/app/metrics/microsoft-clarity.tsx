"use client";

import Script from "next/script";

const MicrosoftClarity = () => {
  return (
    <Script id="microsoft-clarity-init" strategy="beforeInteractive">
      {`(function(c,l,a,r,i,t,y){       
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};        
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";       
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);    })(window, document, "clarity", "script", "ocbqo6wdbh");`}
    </Script>
  );
};

export default MicrosoftClarity;

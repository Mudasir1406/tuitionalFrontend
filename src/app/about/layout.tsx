import Script from "next/script";
import Head from "next/head";

export default function AboutLayout({ children, schema }: any) {
  return (
    // <Head>
    //   <Script
    //     // id="WebPage"
    //     type="application/ld+json"
    //     dangerouslySetInnerHTML={{
    //       __html: JSON.stringify(schema),
    //     }}
    //   />
    //   {children}
    // </Head>

    <>
      <Head>
        {schema && (
          <Script
            id="https://tuitionaledu.com/about/#webpage"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>
      <main>{children}</main>
    </>
  );
}

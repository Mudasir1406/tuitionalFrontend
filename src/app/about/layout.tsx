import Script from "next/script";
import Head from "next/head";

export default function AboutLayout({
  children,
  schema,
}: Readonly<{
  children: React.ReactNode;
  schema: any;
}>) {
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
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>
      <main>{children}</main>
    </>
  );
}

import React from "react";
import NextSeo from "next-seo";

export default ({ seoConfig = {} }) => {
  const seo = {
    title: seoConfig.title || "Hirvitek blog",
    description: seoConfig.description || "The hub of brilliant ideas",
    url: seoConfig.url || ""
  };

  return (
    <NextSeo
      config={{
        title: seo.title,
        description: seo.description,
        canonical: "https://www.blog.hirvitek.com/",
        openGraph: {
          url: `https://www.blog.hirvitek.com/${seo.url}`,
          title: seo.title,
          description: seo.description,
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt"
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second"
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" }
          ],
          site_name: "Hirvitek"
        },
        twitter: {
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image"
        }
      }}
    />
  );
};

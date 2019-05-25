import React from "react";
import NextSeo from "next-seo";

export default ({ seoConfig = {} }) => {
  const seo = {
    title: seoConfig.title || "Hirvitek blog",
    description: seoConfig.description || "The hub of brilliant ideas",
    url: seoConfig.url || "",
    imageUrl: seoConfig.imageUrl || "https://blog.hirvitek.com/static/images/icons/icon-512x512.png"
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
              url: seo.imageUrl,
              width: 800,
              height: 600,
              alt: "Og Image Alt"
            }
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

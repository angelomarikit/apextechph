import type { Metadata } from "next";

import { siteConfig } from "@/lib/config/site";

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string | { url: string; alt?: string };
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: PageMetaOptions): Metadata {
  const canonical = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const image =
    typeof ogImage === "string"
      ? { url: ogImage, alt: title }
      : ogImage ?? { url: "/opengraph-image", alt: siteConfig.name };

  return {
    title,
    description,
    keywords: [...siteConfig.seoKeywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_PH",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [typeof image.url === "string" ? image.url : "/opengraph-image"],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

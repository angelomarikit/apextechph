import { siteConfig } from "@/lib/config/site";
import { absoluteUrl } from "@/lib/utils";

const ORG_ID = `${absoluteUrl("/")}#organization`;

export function organizationSchema(options: { email: string; phone?: string }) {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: "APEXTECHPH",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl("/brand/hero-banner.jpg"),
    email: options.email,
    ...(options.phone ? { telephone: options.phone } : {}),
    areaServed: [
      { "@type": "Country", name: "Philippines" },
      { "@type": "Place", name: "International" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Metro Manila",
      addressRegion: "NCR",
      addressCountry: "PH",
    },
    knowsAbout: [
      "Website development",
      "E-commerce development",
      "Custom web applications",
      "Business management systems",
      "Mobile applications",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    alternateName: "APEXTECHPH",
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en-PH",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graphSchema(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

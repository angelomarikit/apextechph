export const siteConfig = {
  name: "Apex Technology",
  legalName: "Apex Technology",
  tagline: "We Build Technology That Moves Businesses Forward.",
  supporting:
    "From your first website to your next enterprise platform, Apex Technology transforms business ideas into powerful digital experiences.",
  description:
    "Apex Technology is a Philippine software development company designing and building websites, e-commerce stores, web applications, and custom business systems for teams in Metro Manila and abroad.",
  seoKeywords: [
    "software development Philippines",
    "web development company Philippines",
    "custom software Manila",
    "website development Philippines",
    "e-commerce development Philippines",
    "business system development",
    "APEXTECHPH",
    "Apex Technology",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Published in the previous Apex Technology site configuration.
   * Update through admin settings or this file before launch if the address changes.
   */
  email: "hello@apextechnology.ph",
  supportEmail: "hello@apextechnology.ph",
  /** Override with NEXT_PUBLIC_CONTACT_PHONE in .env.local if needed. */
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? "",
  inquiryNotifyEmail: process.env.INQUIRY_NOTIFY_EMAIL?.trim() || "marikitangelo@gmail.com",
  location: "Metro Manila, Philippines",
  region: "Philippines",
  social: [] as { label: string; href: string }[],
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Our Process" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Intake categories for quotations. These are not a published price list.
 * Edit the labels here, or override them from site settings once Supabase is connected.
 */
export const budgetOptions = [
  { value: "not-sure", label: "Not sure yet — help us scope it" },
  { value: "focused-website", label: "A focused website or landing page" },
  { value: "business-website", label: "A larger business website or online store" },
  { value: "custom-system", label: "A custom system, portal, or application" },
  { value: "discuss", label: "Let's discuss the approach before talking budget" },
] as const;

export const serviceOptions = [
  "Website Development",
  "E-Commerce Website",
  "Custom Web Application",
  "Business Management System",
  "Mobile Application",
  "UI/UX Design",
  "Automation / Integration",
  "Digital Marketing",
  "Not Sure Yet",
] as const;

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "either", label: "Whichever is easiest" },
] as const;

export const inquiryStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;

export type InquiryStatus = (typeof inquiryStatuses)[number];

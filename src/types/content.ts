export type ProjectImage = {
  src: string;
  alt: string;
  kind: "homepage" | "dashboard" | "mobile" | "interface";
};

export type SolutionType =
  | "Corporate Website"
  | "E-Commerce"
  | "Business System"
  | "Booking Platform"
  | "Community Platform"
  | "Custom Application";

export type Project = {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  solution: SolutionType;
  summary: string;
  overview: string;
  requirements: string[];
  features: string[];
  deliverables: string[];
  images: ProjectImage[];
  websiteUrl: string | null;
  featured: boolean;
  homepageOrder: number | null;
  presentation: "browser" | "phone" | "dashboard";
  published: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  title: string;
  navLabel: string;
  summary: string;
  description: string;
  problem: string;
  offerings: string[];
  benefits: string[];
  approach: { title: string; detail: string }[];
  faqs: Faq[];
  relatedProjects: string[];
  icon: string;
  displayOrder: number;
  published: boolean;
};

export type InquiryRecord = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  estimated_budget: string;
  project_description: string;
  preferred_contact_method: string;
  consent: boolean;
  status: string;
  created_at: string;
};

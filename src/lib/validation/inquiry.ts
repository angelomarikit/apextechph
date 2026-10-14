import { z } from "zod";

import { budgetOptions, contactMethods, serviceOptions } from "@/lib/config/site";

const serviceValues = serviceOptions;
const budgetValues = budgetOptions.map((option) => option.value) as [
  (typeof budgetOptions)[number]["value"],
  ...(typeof budgetOptions)[number]["value"][],
];
const methodValues = contactMethods.map((option) => option.value) as [
  (typeof contactMethods)[number]["value"],
  ...(typeof contactMethods)[number]["value"][],
];

export const inquirySchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "Name is too long."),
    email: z.string().trim().email("Enter a valid email address.").max(180),
    phone: z.string().trim().max(40, "Phone number is too long."),
    company: z.string().trim().max(160, "Company name is too long."),
    service: z.enum(serviceValues, { error: "Choose a service." }),
    estimatedBudget: z.enum(budgetValues, { error: "Choose a budget range." }),
    projectDescription: z
      .string()
      .trim()
      .min(20, "Tell us a little more — at least a sentence or two.")
      .max(4000, "Please keep the description under 4,000 characters."),
    preferredContact: z.enum(methodValues, {
      error: "Choose how you would like us to reply.",
    }),
    consent: z.boolean().refine((value) => value, {
      message: "Consent is required before we can store your inquiry.",
    }),
    honeypot: z.string().max(0).optional().or(z.literal("")),
  })
  .superRefine((value, ctx) => {
    const needsPhone =
      value.preferredContact === "phone" || value.preferredContact === "whatsapp";
    if (needsPhone && value.phone.replace(/\D/g, "").length < 7) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Add a phone number so we can reach you that way.",
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;

export const inquiryStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
]);

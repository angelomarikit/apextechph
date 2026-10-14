import type { InquiryInput } from "@/lib/validation/inquiry";

const DEFAULT_NOTIFY = "marikitangelo@gmail.com";

export type InquiryEmailPayload = InquiryInput & {
  budgetLabel: string;
};

function formatBody(data: InquiryEmailPayload) {
  return [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    `Budget: ${data.budgetLabel}`,
    `Preferred contact: ${data.preferredContact}`,
    "",
    "Project description:",
    data.projectDescription,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendViaResend(data: InquiryEmailPayload, to: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const, reason: "no_resend_key" };

  const from =
    process.env.EMAIL_FROM ?? "Apex Technology Website <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New project inquiry — ${data.fullName}`,
      text: formatBody(data),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { ok: false as const, reason: `resend_${response.status}:${detail.slice(0, 200)}` };
  }

  return { ok: true as const };
}

async function sendViaFormSubmit(data: InquiryEmailPayload, to: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `New project inquiry — ${data.fullName}`,
      _template: "table",
      _captcha: "false",
      name: data.fullName,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      service: data.service,
      budget: data.budgetLabel,
      preferred_contact: data.preferredContact,
      message: data.projectDescription,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: `formsubmit_${response.status}` };
  }

  const json = (await response.json().catch(() => null)) as { success?: string } | null;
  if (json?.success !== "true") {
    return { ok: false as const, reason: "formsubmit_rejected" };
  }

  return { ok: true as const };
}

export async function sendInquiryNotification(data: InquiryEmailPayload) {
  const to = process.env.INQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  const resend = await sendViaResend(data, to);
  if (resend.ok) return { ok: true as const, channel: "resend" as const };

  const formsubmit = await sendViaFormSubmit(data, to);
  if (formsubmit.ok) return { ok: true as const, channel: "formsubmit" as const };

  return {
    ok: false as const,
    reason: formsubmit.reason ?? resend.reason ?? "unknown",
  };
}

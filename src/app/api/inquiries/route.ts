import { NextResponse } from "next/server";

import { sendInquiryNotification } from "@/lib/email/send-inquiry";
import { budgetOptions, siteConfig } from "@/lib/config/site";
import { isRecentDuplicate, rateLimit, rememberSubmission } from "@/lib/security/rate-limit";
import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/public";
import { inquirySchema } from "@/lib/validation/inquiry";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`inquiry:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The form could not be read." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Check the form and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const fingerprint = `${parsed.data.email.toLowerCase()}|${parsed.data.service}|${parsed.data.projectDescription.slice(0, 120)}`;
  if (isRecentDuplicate(fingerprint)) {
    return NextResponse.json(
      { ok: false, error: "This inquiry was just submitted. Give us a little time to read it." },
      { status: 409 },
    );
  }

  const budget =
    budgetOptions.find((option) => option.value === parsed.data.estimatedBudget)?.label ??
    parsed.data.estimatedBudget;

  let savedToDatabase = false;

  if (isSupabaseConfigured()) {
    const client = createPublicClient();
    if (client) {
      const { error } = await client.from("inquiries").insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        service: parsed.data.service,
        estimated_budget: budget,
        project_description: parsed.data.projectDescription,
        preferred_contact_method: parsed.data.preferredContact,
        consent: true,
        status: "New",
      });
      savedToDatabase = !error;
    }
  }

  const emailed = await sendInquiryNotification({
    ...parsed.data,
    budgetLabel: budget,
  });

  if (!emailed.ok && !savedToDatabase) {
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't deliver your inquiry right now. Please email ${siteConfig.inquiryNotifyEmail} directly.`,
      },
      { status: 503 },
    );
  }

  rememberSubmission(fingerprint);
  return NextResponse.json({ ok: true });
}

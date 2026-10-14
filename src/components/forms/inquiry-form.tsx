"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { budgetOptions, contactMethods, serviceOptions, siteConfig } from "@/lib/config/site";
import { inquirySchema, type InquiryInput } from "@/lib/validation/inquiry";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-[var(--border-color)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--brand-accent)]";

export function InquiryForm({ intent = "contact" }: { intent?: "contact" | "quote" }) {
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "Not Sure Yet",
      estimatedBudget: "not-sure",
      projectDescription: "",
      preferredContact: "email",
      consent: false,
      honeypot: "",
    },
  });

  async function onSubmit(values: InquiryInput) {
    setServerError("");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !payload.ok) {
      setServerError(
        payload.error ??
          `We couldn't save that inquiry. Email ${siteConfig.email} and we will take it from there.`,
      );
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-[var(--border-color)] bg-white p-8" role="status">
        <p className="eyebrow">Received</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Thank you. We have your inquiry.</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          We&apos;ll follow up using the contact method you chose. If you need to add something,
          email {siteConfig.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[var(--border-color)] bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Full name
          <input className={fieldClass} autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
          {errors.fullName ? <span className="mt-1 block text-xs text-red-700">{errors.fullName.message}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Email address
          <input className={fieldClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          {errors.email ? <span className="mt-1 block text-xs text-red-700">{errors.email.message}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Phone number
          <input className={fieldClass} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...register("phone")} />
          {errors.phone ? <span className="mt-1 block text-xs text-red-700">{errors.phone.message}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Company / business name
          <input className={fieldClass} autoComplete="organization" {...register("company")} />
          {errors.company ? <span className="mt-1 block text-xs text-red-700">{errors.company.message}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Service interested in
          <select className={fieldClass} aria-invalid={Boolean(errors.service)} {...register("service")}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.service ? <span className="mt-1 block text-xs text-red-700">{errors.service.message}</span> : null}
        </label>
        <label className="block text-sm font-medium">
          Estimated budget
          <select className={fieldClass} aria-invalid={Boolean(errors.estimatedBudget)} {...register("estimatedBudget")}>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-[var(--text-secondary)]">
            These are intake categories, not a price list.
          </span>
          {errors.estimatedBudget ? <span className="mt-1 block text-xs text-red-700">{errors.estimatedBudget.message}</span> : null}
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium">
        Project description
        <textarea
          className={`${fieldClass} min-h-36`}
          aria-invalid={Boolean(errors.projectDescription)}
          placeholder={intent === "quote" ? "What should the first version do, and when do you hope to launch?" : "Tell us what you want to build."}
          {...register("projectDescription")}
        />
        {errors.projectDescription ? <span className="mt-1 block text-xs text-red-700">{errors.projectDescription.message}</span> : null}
      </label>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Preferred contact method</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {contactMethods.map((method) => (
            <label key={method.value} className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm">
              <input type="radio" value={method.value} {...register("preferredContact")} />
              {method.label}
            </label>
          ))}
        </div>
        {errors.preferredContact ? <span className="mt-1 block text-xs text-red-700">{errors.preferredContact.message}</span> : null}
      </fieldset>
      <label className="mt-5 flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1" {...register("consent")} />
        <span>
          I agree that Apex Technology may store this inquiry so the team can respond. Read the{" "}
          <a href="/privacy" className="font-semibold text-[var(--brand-secondary)]">privacy policy</a>.
        </span>
      </label>
      {errors.consent ? <span className="mt-1 block text-xs text-red-700">{errors.consent.message}</span> : null}
      <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </label>
      {serverError ? (
        <p className="mt-4 text-sm text-red-700" role="alert">{serverError}</p>
      ) : null}
      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : intent === "quote" ? "Request a quote" : "Send inquiry"}
      </Button>
    </form>
  );
}

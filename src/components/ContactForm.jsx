"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot (basic bot check)
    if (data.company) return;

    try {
      setStatus("sending");
      // TODO: send data to your API / email service here
      await new Promise((r) => setTimeout(r, 800)); // simulate network
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Hidden honeypot */}
      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Full name</label>
          <input
            name="name"
            required
            placeholder="Your name"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Subject</label>
        <input
          name="subject"
          required
          placeholder="How can we help?"
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Message</label>
        <textarea
          name="message"
          required
          placeholder="Tell us a bit about your request…"
          className={`${inputCls} min-h-[140px]`}
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <label className="inline-flex items-center gap-2 text-xs">
          <input type="checkbox" required className="accent-indigo-600" />I
          agree to the terms & privacy policy.
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition
                     hover:-translate-y-0.5 disabled:opacity-60
                     text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      {/* status line */}
      {status === "sent" && (
        <p className="text-xs text-green-600 mt-1">
          Thanks! We’ve received your message.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-600 mt-1">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

import SubmitButton from "./SubmitButton";
import { sendContact } from "../app/contact/actions";

export default function ContactFormServer() {
  const inputCls =
    "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40";

  return (
    <form action={sendContact} className="space-y-4">
      {/* Hidden honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Full name</label>
          <input name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input type="email" name="email" required placeholder="you@example.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Subject</label>
        <input name="subject" required placeholder="How can we help?" className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Message</label>
        <textarea name="message" required placeholder="Tell us a bit about your request…" className={`${inputCls} min-h-[140px]`} />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <label className="inline-flex items-center gap-2 text-xs">
          <input type="checkbox" required className="accent-indigo-600" />
          I agree to the terms & privacy policy.
        </label>
        <SubmitButton>Send message</SubmitButton>
      </div>
    </form>
  );
}

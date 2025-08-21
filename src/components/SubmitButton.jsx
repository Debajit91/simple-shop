"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition
                 hover:-translate-y-0.5 disabled:opacity-60
                 text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}

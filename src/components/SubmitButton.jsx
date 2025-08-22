"use client";

import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";

export default function SubmitButton({ children, pendingText = "Submitting...", className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold shadow-sm
                  text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]
                  disabled:opacity-60 ${className}`}
    >
      {pending && <Spinner />}
      <span>{pending ? pendingText : children}</span>
    </button>
  );
}

"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="p-8">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-sm opacity-80">{String(error?.message || "Unknown error")}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded-md text-sm font-semibold border"
        >
          Try again
        </button>
      </body>
    </html>
  );
}

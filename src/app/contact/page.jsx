import ContactFormServer from "@/components/ContactFormServer";


export const metadata = {
  title: "Contact — Simple Shop",
  description: "Get in touch with Simple Shop",
};

export default function ContactPage({ searchParams }) {
  const sent = searchParams?.sent === "1";
  const mailSkippedOrFailed = searchParams?.mail === "0";
  const error = searchParams?.error;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">Contact us</h1>
          <p className="mt-2 text-[var(--foreground)]/80">
            Questions about products, orders, or returns? We’re here to help. Expect a response within one business day.
          </p>
        </header>

        {/* alerts */}
        <div className="space-y-3 mb-6">
          {sent && (
            <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
              Thanks—your message was received. {mailSkippedOrFailed ? "We saved it, but email delivery is currently unavailable." : "We’ll reply soon."}
            </div>
          )}
          {error === "missing" && (
            <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
              Please fill in all required fields.
            </div>
          )}
          {error === "email" && (
            <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
              Please enter a valid email address.
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <aside className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-5">
            <div>
              <h2 className="text-sm font-semibold">Email</h2>
              <a href="mailto:support@simpleshop.example" className="text-sm underline hover:no-underline">
                support@simpleshop.example
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Phone</h2>
              <a href="tel:+8801000000000" className="text-sm">+880 10 0000 0000</a>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Business hours</h2>
              <p className="text-sm text-[var(--foreground)]/75">Sun–Thu: 10:00–18:00 (BST) <br /> Fri–Sat: Closed</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Address</h2>
              <p className="text-sm text-[var(--foreground)]/75">123 Market Road, Dhaka</p>
            </div>
          </aside>

          <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <ContactFormServer />
          </div>
        </div>
      </div>
    </section>
  );
}

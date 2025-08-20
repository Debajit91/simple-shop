const faqs = [
  {
    q: "How fast is shipping?",
    a: "Most orders ship within 48 hours. You’ll see an ETA at checkout."
  },
  {
    q: "Do you offer warranty?",
    a: "Yes—minimum 12 months on electronics. Details vary by product."
  },
  {
    q: "Can I manage products after login?",
    a: "Yes. You’ll get access to a protected /manage page to add items."
  },
  {
    q: "Which payment methods are supported?",
    a: "Cards, mobile wallets, and cash-on-delivery in select regions."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="grid gap-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border p-4 sm:p-5 open:shadow-sm transition"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <summary className="cursor-pointer text-base font-semibold list-none">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-[color:var(--foreground)]/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

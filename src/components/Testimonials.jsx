export default function Testimonials() {
  const items = [
    {
      name: "Ayaan",
      role: "Content Creator",
      quote:
        "SimpleShop feels fast and clean. Dark mode looks great and the product cards are super tidy.",
      stars: 5,
      photo: "https://i.ibb.co.com/N25TKcWN/premium-photo-1689568126014-06fea9d5d341.jpg"
    },
    {
      name: "Maya",
      role: "Student",
      quote:
        "Browsing on mobile is smooth. The product highlights helped me decide quickly.",
      stars: 5,
      photo: "https://i.ibb.co.com/ym06wtWm/Sarah-Johnson.jpg"
    },
    {
      name: "Rafi",
      role: "Photographer",
      quote:
        "Loved the camera picks. The UI keeps focus on the product images without distractions.",
      stars: 4,
      photo: "https://i.ibb.co.com/F4NYN4nL/David-Wilson.jpg"
    },
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">What Customers Say</h2>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border p-5 bg-[var(--card)] hover:-translate-y-0.5 hover:shadow-sm transition"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                
                <img
                    src={t.photo || "/avatars/placeholder.jpg"}
                    alt={`${t.name} photo`}
                    className="h-12 w-12 rounded-full object-cover bg-[var(--card)]"
                    loading="lazy"
                    decoding="async"
                  />
                <figcaption>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[color:var(--foreground)]/70">
                    {t.role}
                  </div>
                </figcaption>
              </div>

              <blockquote className="text-sm text-[color:var(--foreground)]/80">
                “{t.quote}”
              </blockquote>

              <div className="mt-3 flex items-center gap-1" aria-label={`${t.stars} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg
                    key={n}
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 ${n <= t.stars ? "text-amber-500" : "text-[color:var(--border)]"}`}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

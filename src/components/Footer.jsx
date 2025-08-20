export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t" style={{ borderColor: "var(--border)" }}>
      {/* thin gradient strip */}
      <div
        className="h-1 w-full"
        style={{ backgroundImage: "var(--brand-gradient)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              >
                Simple
              </span>
              <span>Shop</span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--foreground)]/70">
              Clean, fast, theme-aware shopping experience.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="/products">
                  All products
                </a>
              </li>
              <li>
                <a
                  className="hover:underline"
                  href="/products?category=smartwatch"
                >
                  Smart Watch
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/products?category=laptop">
                  Laptop
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/products?category=camera">
                  Cameras
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#hero">
                  About
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#categories">
                  Categories
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#testimonials">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/login">
                  Account
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[color:var(--foreground)]/60"
          style={{ borderColor: "var(--border)" }}
        >
          <p>© {year} SimpleShop. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter/X" className="hover:opacity-80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4 4h4l4 6 6-6h2l-6.5 7L21 20h-4l-5-7-7 7H3l7.5-8L4 4z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="hover:opacity-80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-1.7c-3 .7-3.6-1.4-3.6-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3 .8.1-.7.4-1.1.7-1.4-2.4-.3-5-1.2-5-5.5 0-1.1.4-2 1-2.8 0-.3-.4-1.4.1-3 0 0 .9-.3 2.9 1a10 10 0 0 1 5.3 0c2-1.3 2.9-1 2.9-1 .5 1.6.1 2.7.1 3 .6.8 1 1.7 1 2.8 0 4.3-2.6 5.2-5 5.5.4.3.8.9.8 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:opacity-80">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M23 7s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.2-.9C17.7 3.7 12 3.7 12 3.7h0s-5.7 0-8 .2c-.6.1-1.5.1-2.2.9C1.2 5.5 1 7 1 7S.8 8.7.8 10.3v1.4C.8 13.3 1 15 1 15s.2 1.5.8 2.2c.8.8 1.8.8 2.3.9 1.7.2 7.9.2 7.9.2s5.7 0 8-.2c.6-.1 1.5-.1 2.3-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.3v-1.4C23.2 8.7 23 7 23 7zM9.8 13.6V8.4l5.4 2.6-5.4 2.6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

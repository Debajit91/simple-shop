import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* পরের সেকশনগুলো এখানে আসবে: highlights ইত্যাদি */}
      <section id="highlights" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Product highlights
          </h2>
          <p className="text-[color:var(--foreground)]/75">
            (এখানে আমরা পরের ধাপে কার্ড/বুলেট যোগ করব)
          </p>
        </div>
      </section>
    </>
  );
}

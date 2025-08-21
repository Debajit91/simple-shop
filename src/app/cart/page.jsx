import CartView from "../../components/CartView";

export const metadata = { title: "Your cart — Simple Shop" };

export default function CartPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6">Your cart</h1>
        <CartView />
      </div>
    </section>
  );
}

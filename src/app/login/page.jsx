import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "../login/LoginForm";
import LoginLottie from "@/components/LoginLottie";

export const metadata = { title: "Log in — SimpleShop" };

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/products");

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 items-stretch">
        {/* Left: form */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center py-5">Log In To Your Account</h2>
          <p className="mt-2 text-center text-base text-[var(--foreground)]/75">
            Enter your email and password to continue.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>

        {/* Right: optimized image */}
        <div className="relative rounded-xl overflow-hidden border border-[var(--border)] min-h-[260px] sm:min-h-[360px] hidden lg:block">
          <LoginLottie/>
        </div>
      </div>
    </section>
  );
}

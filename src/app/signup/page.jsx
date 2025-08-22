import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignUpLottie from "@/components/SignUpLottie";
import SignUpForm from "./SignUpForm";
import { authOptions } from "lib/authOptions";

export const metadata = { title: "Sign up — SimpleShop" };

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/products");

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 items-stretch">
        {/* Left: form */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Create your account</h2>
          <p className="mt-2 text-sm text-[var(--foreground)]/75 text-center">
            Fill in your details to get started.
          </p>
          <div className="mt-6">
            <SignUpForm />
          </div>
        </div>

        {/* Right: optimized image */}
        <div className="relative rounded-xl overflow-hidden border border-[var(--border)] min-h-[260px] sm:min-h-[360px] lg:min-h-[420px] hidden lg:block">
          <SignUpLottie/>
        </div>
      </div>
    </section>
  );
}

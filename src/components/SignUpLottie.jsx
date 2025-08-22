"use client";

import { useMemo } from "react";
import Lottie from "lottie-react";
// সরাসরি ইমপোর্ট (সবচেয়ে সহজ): ফাইলটা src/ এর মধ্যে থাকলে
import animationData from "../assets/lottie/SignUp.json";

export default function LoginLottie() {
  // Reduce Motion সম্মান করা (উইন্ডো প্রেফারেন্স অনুযায়ী)
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[var(--card)]">
      <Lottie
        animationData={animationData}
        loop={!prefersReducedMotion}
        autoplay={!prefersReducedMotion}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        className="h-full w-full"
      />
    </div>
  );
}

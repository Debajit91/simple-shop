"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const router = useRouter();

  const inputCls =
    "w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40";

  async function onSubmit(e) {
    e.preventDefault();

    // খুব বেসিক ভ্যালিডেশন
    if (!name.trim()) {
      return Swal.fire({ icon: "warning", title: "Name required" });
    }
    if (password.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Password must be at least 6 characters",
      });
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, imageUrl }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return Swal.fire({
        icon: "error",
        title: data.error || "Sign up failed",
      });
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/products",
    });
    // ⚠️ এখন কোনো রিয়েল DB কল করছি না — শুধু ডেমো সফল মেসেজ + /login এ পাঠাচ্ছি
    await Swal.fire({
      icon: "success",
      title: "Account Created Successfully ",
      text: "Now sign in with your email & password.",
      timer: 1400,
      showConfirmButton: false,
      toast: true,
      position: "top-center",
    });

    router.push("/login");
  }

  function openFilePicker() {
    fileRef.current?.click();
  }

  async function handleFilePicked(ev) {
    const file = ev.target.files?.[0];
    if (!file) return;
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) {
      Swal.fire({
        icon: "error",
        title: "Missing imgbb key",
        text: "Set NEXT_PUBLIC_IMGBB_KEY in .env.local",
      });
      return;
    }

    try {
      setUploading(true);

      const base64 = await fileToBase64(file); // data:URI
      const payload = base64.split(",")[1];

      const form = new FormData();
      form.append("image", payload);
      form.append("name", file.name);

      const resp = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok || !data?.data?.url)
        throw new Error(data?.error?.message || "Upload failed");

      setImageUrl(data.data.url);
      await Swal.fire({
        icon: "success",
        title: "Image uploaded",
        timer: 1200,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: String(err?.message || err),
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium mb-1">Full name</label>
          <input
            className={inputCls}
            placeholder="Your full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input
            type="email"
            required
            className={inputCls}
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Image URL + Upload */}
        <div>
          <label className="block text-xs font-medium mb-1">
            Profile image
          </label>
          <div className="flex items-center gap-2">
            <input
              className={`${inputCls} flex-1`}
              placeholder="https://… (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={openFilePicker}
              disabled={uploading}
              className="px-3 py-2 rounded-md text-sm font-semibold border border-[var(--border)] hover:bg-[var(--card)] transition disabled:opacity-60"
              title="Upload from file (imgbb)"
            >
              {uploading ? "Uploading…" : "Upload"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFilePicked}
            />
          </div>
          {imageUrl ? (
            <div className="mt-2 text-xs text-[var(--foreground)]/70 break-all">
              Saved URL: <span className="font-mono">{imageUrl}</span>
            </div>
          ) : null}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium mb-1">Password</label>
          <input
            type="password"
            required
            className={inputCls}
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer px-4 py-2 rounded-md text-sm mb-5 font-semibold
             text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)] bg-[length:200%_200%] bg-[position:0%_50%]
             hover:bg-[position:100%_50%]
             transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
             active:translate-y-0 active:brightness-95
             disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Create account
        </button>
      </form>

      <p className="text-sm text-[var(--foreground)]/70 text-center">
        Already have an account?{" "}
        <Link href="/login">
          <span className="underline hover:no-underline text-blue-500">
            Log in
          </span>
        </Link>
        .
      </p>
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result || ""));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

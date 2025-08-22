"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createProduct } from "./action"; // ←
import Swal from "sweetalert2";

const initialState = { error: null };

const CATEGORIES = [
  { value: "SMART_WATCH", label: "Smart Watch" },
  { value: "LAPTOP", label: "Laptop" },
  { value: "AIRPOD", label: "AirPods" },
  { value: "IPAD", label: "iPad" },
  { value: "CAMERA", label: "Camera" },
  { value: "VIDEO_CAMERA", label: "Video Camera" },
];

export default function ManageForm() {
  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState
  );
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.ok) {
      Swal.fire({
        icon: "success",
        title: "Product added",
        timer: 1200,
        showConfirmButton: false,
        toast: true,
        position: "middle-center",
      });
      reset(); // ফর্ম ক্লিয়ার
      // প্রয়োজনে ইমেজ প্রিভিউ state ক্লিয়ার করো
    }
  }, [state?.ok]);

  const inputCls =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] " +
    "px-3 py-2 text-sm outline-none transition " +
    "hover:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/40";

  async function handleUpload(file) {
    if (!file) return;
    const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
    if (!key) {
      Swal.fire({
        icon: "error",
        title: "Missing imgbb key",
        text: "Set NEXT_PUBLIC_IMGBB_KEY in .env",
      });
      return;
    }
    try {
      setUploading(true);
      const base64 = await fileToBase64(file); // data:URI
      const payload = base64.split(",")[1]; // কেবল বডি
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
      Swal.fire({
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
      if (formRef.current) formRef.current.value = "";
    }
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }
  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <form
      action={formAction}
      className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]/70 backdrop-blur p-6 sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold">
            Add New Product
          </h3>
          <p className="text-sm text-[var(--foreground)]/70">
            Fill the details. For best results, use 1200×800px+ images.
          </p>
        </div>
      </div>

      {/* 2-col grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium mb-1">Name</label>
          <input
            name="name"
            required
            placeholder="Product name"
            className={inputCls}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium mb-1">Category</label>
          <select
            name="category"
            required
            defaultValue="LAPTOP"
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price with ৳ icon */}
        <div>
          <label className="block text-xs font-medium mb-1">Price</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-[var(--foreground)]/60">
              $
            </span>
            <input
              name="price"
              required
              type="number"
              min="1"
              step="1"
              placeholder="Price"
              className={`${inputCls} pl-7`}
            />
          </div>
          <p className="text-xs text-[var(--foreground)]/60 mt-1">Price in $</p>
        </div>

        {/* Image URL + actions + preview */}
        <div>
          <label className="block text-xs font-medium mb-1">Image</label>

          {/* URL input + Upload button */}
          <div className="flex items-center gap-2">
            <input
              name="image"
              placeholder="https://…"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`${inputCls} flex-1`}
            />

            <button
              type="button"
              onClick={() => formRef.current?.click()}
              disabled={pending}
              className="px-3 py-2 rounded-md text-sm font-semibold border border-[var(--border)] hover:bg-[var(--background)] transition disabled:opacity-60"
            >
              {pending ? "Saving" : "Add Product"}
            </button>

            <input
              ref={formRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleUpload(e.target.files?.[0])}
            />
          </div>

          {/* Drag & drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="mt-3 rounded-lg border border-dashed border-[var(--border)] p-4 text-xs text-[var(--foreground)]/70 text-center"
          >
            Drag & drop an image here, or click{" "}
            <span className="font-medium">Upload</span>.
          </div>

          {/* Preview card */}
          {imageUrl ? (
            <div className="mt-3 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)]">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full aspect-[16/10] object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ) : null}
        </div>

        {/* Description (span 2 cols) */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Optional details…"
            className={`${inputCls} min-h-[140px]`}
          />
        </div>

        {/* Error */}
        {state?.error ? (
          <div className="md:col-span-2 text-sm text-red-600">
            {state.error}
          </div>
        ) : null}

        {/* Actions */}
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <button
            type="reset"
            className="px-4 py-2 rounded-md text-sm font-medium border border-[var(--border)] hover:bg-[var(--background)] transition"
            onClick={() => setImageUrl("")}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-sm font-semibold shadow-sm
                       text-[var(--accent-contrast)] bg-[image:var(--brand-gradient)]
                       transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 active:translate-y-0"
          >
            Add product
          </button>
        </div>
      </div>
    </form>
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

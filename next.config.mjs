/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // যেসব এক্সটার্নাল হোস্ট থেকে ছবি আসবে
    domains: [
        "images.unsplash.com",
      "lh3.googleusercontent.com", // Google avatar
      "images.unsplash.com", // (যদি Unsplash ব্যবহার করেন)
      "i.ibb.co", // imgbb short domain
      "res.cloudinary.com", // Cloudinary (ভবিষ্যতে লাগতে পারে)
      "picsum.photos",
    ],
  },
};

export default nextConfig;

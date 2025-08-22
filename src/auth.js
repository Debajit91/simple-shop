import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// নোট: Google প্রোভাইডার env থেকে clientId/secret ইনফার করতেও পারে (AUTH_GOOGLE_ID/SECRET)
// এখানে স্পষ্ট করে দিলাম যাতে পরিষ্কার থাকে।
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login", // আমাদের কাস্টম পেজ
  },
  providers: [
    // Google OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // Credentials (ডেমো): ইমেইল + পাসওয়ার্ড
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email?.toLowerCase();
        const pass = creds?.password;

        // ডেমো ইউজার (প্রোডাকশনে অবশ্যই DB + hashed password ব্যবহার করবেন)
        if (email === "demo@simpleshop.dev" && pass === "123456") {
          return { id: "demo-1", name: "Demo User", email };
        }
        return null; // invalid → সাইনইন ফেল হবে
      },
    }),
  ],
  // রিডিরেক্ট কলব্যাক রাখতে পারেন; আমরা বাটন থেকেই callbackUrl দেবো, তবু সেফ ডিফল্ট:
  callbacks: {
    async redirect({ url, baseUrl }) {
      // সবসময় প্রোডাক্টসে পাঠাতে চাইলে:
      if (url.startsWith(baseUrl) || url.startsWith("/")) return "/products";
      return baseUrl;
    },
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

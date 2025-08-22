import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // Credentials (demo only — production এ অবশ্যই DB + hashed password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = creds?.email?.toLowerCase();
        const pass = creds?.password || "";

        // DB থেকে ইউজার আনো
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) return null;

        const ok = await bcrypt.compare(pass, user.password);
        if (!ok) return null;

        // authorize এ যা রিটার্ন দেবে, সেটাই session.user এ যাবে
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) session.user.id = token.uid;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl) || url.startsWith("/")) return "/products";
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

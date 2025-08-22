import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login", // custom login page
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
        const pass = creds?.password;
        if (email === "demo@simpleshop.dev" && pass === "123456") {
          return { id: "demo-1", name: "Demo User", email };
        }
        return null; // invalid → sign-in fail
      },
    }),
  ],

  callbacks: {
    // successful login হলে কোথায় যাবে — সবসময় /products এ
    async redirect({ url, baseUrl }) {
      if (url?.startsWith(baseUrl) || url?.startsWith("/")) return "/products";
      return baseUrl;
    },
    async session({ session, token }) {
      if (token?.sub) session.user.id = token.sub;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

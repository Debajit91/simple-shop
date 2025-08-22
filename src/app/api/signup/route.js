import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { prisma } from "lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    const { name, email, password, imageUrl } = await req.json();
    const emailNorm = String(email || "").toLowerCase().trim();

    if (!emailNorm || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (exists) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: name?.trim() || null,
        email: emailNorm,
        image: imageUrl || null,
        password: hash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("signup error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

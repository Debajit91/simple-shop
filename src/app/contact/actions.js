import { Resend } from "resend";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { saveMessage } from "../../../lib/message";


function escapeHtml(s = "") {
  return s.toString().replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

export async function sendContact(formData) {
  "use server";

  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const subject = (formData.get("subject") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();
  const honeypot = (formData.get("company") || "").toString().trim(); // hidden field

  // basic validations
  if (honeypot) redirect("/contact"); // bot
  if (!name || !email || !subject || !message) redirect("/contact?error=missing");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect("/contact?error=email");

  // request context
  const h = headers();
  const ip = h.get("x-forwarded-for") || h.get("x-real-ip") || "";
  const ua = h.get("user-agent") || "";

  // persist first (even if email fails, we keep the message)
  await saveMessage({ name, email, subject, message, ip, ua });

  // email
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM || "no-reply@simpleshop.local";
    const to = process.env.CONTACT_TO;

    if (apiKey && from && to) {
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from,
        to,
        reply_to: email,
        subject: `Contact: ${subject}`,
        text:
`New contact message

Name: ${name}
Email: ${email}
Subject: ${subject}

${message}

IP: ${ip}
UA: ${ua}`,
        html:
`<h2>New contact message</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br/>
<strong>Email:</strong> ${escapeHtml(email)}<br/>
<strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
<p><small>IP: ${escapeHtml(ip)}<br/>UA: ${escapeHtml(ua)}</small></p>`
      });

      redirect("/contact?sent=1"); // success
    } else {
      console.warn("Email not sent: missing RESEND_API_KEY/CONTACT_FROM/CONTACT_TO");
      redirect("/contact?sent=1&mail=0"); // saved, but mail skipped
    }
  } catch (err) {
    console.error("Email send failed", err);
    redirect("/contact?sent=1&mail=0"); // saved, but mail failed
  }
}

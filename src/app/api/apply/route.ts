import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const ApplicationSchema = z.object({
  email: z.email("Please enter a valid email address"),
  linkedin: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(5000).optional().or(z.literal("")),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(fields: { email: string; linkedin?: string; notes?: string }): string {
  const rows = [
    ["Email", fields.email],
    ["LinkedIn", fields.linkedin || "—"],
    ["Notes", fields.notes || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#666;vertical-align:top;font-family:system-ui,sans-serif;font-size:13px;">${label}</td><td style="padding:8px 0;font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;padding:32px;background:#fafafa;"><div style="max-width:560px;margin:0 auto;background:white;padding:32px;border:1px solid #eee;"><h1 style="margin:0 0 24px;font-family:system-ui,sans-serif;font-size:18px;">New Founders Hub application</h1><table style="border-collapse:collapse;width:100%;">${rows}</table></div></body></html>`;
}

function buildText(fields: { email: string; linkedin?: string; notes?: string }): string {
  return [
    "New Founders Hub application",
    "",
    `Email: ${fields.email}`,
    `LinkedIn: ${fields.linkedin || "—"}`,
    `Notes: ${fields.notes || "—"}`,
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientsRaw = process.env.APPLICATION_RECIPIENTS;
  const fromEmail = process.env.APPLICATION_FROM_EMAIL;

  if (!apiKey || !recipientsRaw || !fromEmail) {
    console.error("Missing required env vars for /api/apply");
    return NextResponse.json({ error: "Email is not configured. Try again later." }, { status: 503 });
  }

  const recipients = recipientsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    console.error("APPLICATION_RECIPIENTS resolved to empty list");
    return NextResponse.json({ error: "Email is not configured. Try again later." }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid input";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { email, linkedin, notes } = parsed.data;
  const fields = {
    email,
    linkedin: linkedin || undefined,
    notes: notes || undefined,
  };

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: email,
      subject: `[Founders Hub] New application from ${email}`,
      html: buildHtml(fields),
      text: buildText(fields),
    });

    if (error) {
      console.error("Resend rejected the send", error);
      return NextResponse.json({ error: "Email provider rejected the send." }, { status: 502 });
    }
  } catch (err) {
    console.error("Unexpected error sending application email", err);
    return NextResponse.json({ error: "Something went wrong. Try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

const MAX_BODY_BYTES = 16_000;
const MAX_EMAIL_LENGTH = 320;
const MAX_SHORT_TEXT = 200;
const MAX_MESSAGE_LENGTH = 5_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimString(value) {
  return typeof value === "string" ? value.trim() : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: "Contact form not configured yet" });
  }

  let body = req.body;
  if (typeof body === "string") {
    if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
      return res.status(400).json({ error: "Request body too large" });
    }
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Request body must be valid JSON" });
    }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > MAX_BODY_BYTES) {
    return res.status(400).json({ error: "Request body too large" });
  }

  const name = trimString(body.name);
  const email = trimString(body.email);
  const message = trimString(body.message);
  const company = trimString(body.company);

  if (!name || name.length > MAX_SHORT_TEXT) {
    return res.status(400).json({ error: "Name is required and must be 1-200 characters" });
  }
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Email is required and must be valid" });
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: "Message is required and must be 1-5000 characters" });
  }
  if (company && company.length > MAX_SHORT_TEXT) {
    return res.status(400).json({ error: "Company must be 200 characters or fewer" });
  }

  const text = `Name: ${name}
Email: ${email}
Company: ${company || "(not provided)"}

Message:
${message}`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ["jake@attentio.ai", "jbesonen@attentio.ai"],
        // The sender domain must be verified in Resend; use onboarding@resend.dev during setup if needed.
        from: "Attentio Website <contact@attentio.ai>",
        reply_to: email,
        subject: `Website inquiry from ${name.replace(/[\r\n]+/g, " ")}`,
        text,
      }),
    });
    if (!resendResponse.ok) {
      console.error("Resend delivery failed:", await resendResponse.text());
      return res.status(502).json({ error: "Delivery failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend delivery failed:", error instanceof Error ? error.message : error);
    return res.status(502).json({ error: "Delivery failed" });
  }
}

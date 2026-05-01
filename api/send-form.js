/**
 * Split Transfers — e-mail formi (odvojeno od EmailJS / drugih projekata).
 * Vercel → Environment: WEB3FORMS_ACCESS_KEY
 * https://web3forms.com — primatelj: splittransfers.eu@gmail.com (postavi isti ključ u Vercel WEB3FORMS_ACCESS_KEY)
 */

function buildMessage(body) {
  const skip = new Set(["access_key", "to_email"]);
  const preferred = [
    "form_type",
    "from_name",
    "name",
    "from_email",
    "email",
    "phone",
    "subject",
    "pickup",
    "dropoff",
    "date",
    "return_date",
    "returnDate",
    "passengers",
    "luggage",
    "transferType",
    "vehiclePreference",
    "additionalInfo",
    "message",
    "reply_to",
  ];
  const lines = [];
  const seen = new Set();
  for (const k of preferred) {
    if (body[k] != null && body[k] !== "") {
      lines.push(`${k}: ${body[k]}`);
      seen.add(k);
    }
  }
  for (const [k, v] of Object.entries(body)) {
    if (skip.has(k) || seen.has(k) || v == null || v === "") continue;
    if (typeof v === "object") continue;
    lines.push(`${k}: ${v}`);
  }
  return lines.join("\n");
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body || "{}");
      } catch {
        return null;
      }
    }
    if (typeof req.body === "object") return req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) {
    console.error("WEB3FORMS_ACCESS_KEY missing");
    return res.status(503).json({ ok: false, message: "Email service not configured" });
  }

  let body = await readJsonBody(req);
  if (body === null) {
    return res.status(400).json({ ok: false, message: "Invalid JSON" });
  }
  if (!body || typeof body !== "object") body = {};

  const customerEmail = String(body.from_email || body.email || body.reply_to || "").trim();
  const customerName = String(body.from_name || body.name || "Website visitor").trim();
  const subject = String(body.subject || "Split Transfers — upit s weba").trim();

  if (!customerEmail) {
    return res.status(400).json({ ok: false, message: "Email is required" });
  }

  const payload = {
    access_key: key,
    subject,
    from_name: customerName,
    name: customerName,
    email: customerEmail,
    message: buildMessage(body),
    replyto: customerEmail,
  };

  try {
    /* Web3Forms često provjerava Origin/domenu; poziv s Vercela nema preglednik, pa šaljemo eksplicitno. */
    const siteUrl = String(process.env.SITE_URL || "https://www.split-transfers.eu").replace(
      /\/$/,
      ""
    );
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/`,
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || data.success !== true) {
      console.error("Web3Forms error", r.status, data);
      const detail =
        (data && typeof data.message === "string" && data.message) ||
        (data && typeof data.error === "string" && data.error) ||
        (Array.isArray(data && data.errors) && data.errors.filter(Boolean).join("; ")) ||
        "";
      return res.status(502).json({
        ok: false,
        message: detail || `Web3Forms rejected the request (HTTP ${r.status}). Check WEB3FORMS_ACCESS_KEY and web3forms.com form settings.`,
      });
    }
    return res.status(200).json({ ok: true, message: data.message || "sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};

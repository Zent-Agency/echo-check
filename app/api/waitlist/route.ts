// La waitlist se guarda en la BDD de la hackathon (Supabase `hackathon_signups`),
// que además dispara la confirmación al usuario y la notificación interna.
// Server-to-server, así no exponemos la API de la hackathon a CORS.
const PRESIGNUP_URL =
  process.env.HACKATHON_PRESIGNUP_URL ?? 'https://hackathon.zent-agency.com/api/presignup';

const PROJECT = 'Echo Check';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown; locale?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  // honeypot: bot llena el campo oculto → éxito falso
  if (body.website) return Response.json({ ok: true });

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }

  try {
    const res = await fetch(PRESIGNUP_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        project: PROJECT,
        language: body.locale === 'es' ? 'es' : 'en',
        referrer: req.headers.get('referer'),
        utm_source: 'echo-check-landing'
      })
    });
    if (!res.ok) {
      console.error('[waitlist] presignup responded', res.status, await res.text());
      return Response.json({ error: 'storage_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[waitlist] presignup unreachable:', err);
    return Response.json({ error: 'storage_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}

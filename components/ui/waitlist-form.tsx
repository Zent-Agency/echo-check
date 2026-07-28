'use client';

import { useState } from 'react';

const copy = {
  en: {
    eyebrow: 'Early access',
    title: 'Stop the attack your own agents already approved.',
    body: 'An attack that clears two approvals never looks like one. EchoCheck checks the source behind every approval before the action runs. Leave your work email and we will hold you a slot in the first group.',
    emailLabel: 'Work email',
    placeholder: 'name@company.com',
    cta: 'Get my slot',
    thanksTitle: 'You are on the list.',
    thanksBody: 'We will write to you when a slot opens. Nothing else lands in your inbox.',
  },
  es: {
    eyebrow: 'Acceso anticipado',
    title: 'Frená el ataque que tus propios agentes ya aprobaron.',
    body: 'Un ataque que pasa dos aprobaciones nunca parece un ataque. EchoCheck chequea la fuente detrás de cada aprobación antes de que la acción se ejecute. Dejá tu email de trabajo y te guardamos un lugar en el primer grupo.',
    emailLabel: 'Email de trabajo',
    placeholder: 'nombre@empresa.com',
    cta: 'Quiero mi lugar',
    thanksTitle: 'Ya estás en la lista.',
    thanksBody: 'Te escribimos cuando se libere un lugar. No te llega nada más.',
  },
} as const;

export function WaitlistForm({ locale }: { locale: 'en' | 'es' }) {
  const t = copy[locale];
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ponytail: client-side only, no backend yet. The email is not stored anywhere.
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    const { default: confetti } = await import('canvas-confetti');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }

  if (submitted) {
    return (
      <div className="waitlist waitlist-done" aria-live="polite">
        <h2>{t.thanksTitle}</h2>
        <p>{t.thanksBody}</p>
      </div>
    );
  }

  return (
    <div className="waitlist">
      <div className="waitlist-copy">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-lead">{t.body}</p>
      </div>
      <form className="waitlist-form" onSubmit={handleSubmit}>
        <label htmlFor="waitlist-email">{t.emailLabel}</label>
        <div className="waitlist-field">
          <input
            id="waitlist-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.placeholder}
          />
          <button className="button button-primary" type="submit">{t.cta}</button>
        </div>
      </form>
    </div>
  );
}

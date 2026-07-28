'use client';

import { useState } from 'react';

const copy = {
  en: {
    label: 'Try it',
    title: 'Change what the review agent reads.',
    question: 'The review agent gets its facts from',
    options: [
      ['ticket', 'The same ticket'],
      ['record', 'The payment record'],
    ],
    buildAgent: 'Build agent',
    reviewAgent: 'Review agent',
    reads: 'reads',
    approved: 'Approved',
    sources: {
      ticket: 'Ticket #4471',
      record: 'Payment record',
    },
    originCount: (n: number) => `${n} distinct ${n === 1 ? 'origin' : 'origins'} behind 2 approvals`,
    verdicts: {
      reject: ['REJECT', 'Both approvals trace back to the ticket. The release is held.'],
      pass: ['PASS', 'The second approval reached a source the first agent did not write. The release runs.'],
    },
  },
  es: {
    label: 'Probalo',
    title: 'Cambiá qué lee el agente revisor.',
    question: 'El agente revisor saca los datos de',
    options: [
      ['ticket', 'El mismo ticket'],
      ['record', 'El registro de pagos'],
    ],
    buildAgent: 'Agente constructor',
    reviewAgent: 'Agente revisor',
    reads: 'lee',
    approved: 'Aprobado',
    sources: {
      ticket: 'Ticket #4471',
      record: 'Registro de pagos',
    },
    originCount: (n: number) => `${n} ${n === 1 ? 'origen distinto' : 'orígenes distintos'} detrás de 2 aprobaciones`,
    verdicts: {
      reject: ['REJECT', 'Las dos aprobaciones vuelven al ticket. La publicación queda retenida.'],
      pass: ['PASS', 'La segunda aprobación llegó a una fuente que el primer agente no escribió. La publicación corre.'],
    },
  },
} as const;

export function LineageDemo({ locale }: { locale: 'en' | 'es' }) {
  const t = copy[locale];
  const [reviewSource, setReviewSource] = useState<'ticket' | 'record'>('ticket');
  const convergent = reviewSource === 'ticket';
  const [verdict, verdictBody] = convergent ? t.verdicts.reject : t.verdicts.pass;

  return (
    <div className={`lineage-demo${convergent ? ' is-convergent' : ''}`}>
      <div className="demo-controls">
        <p className="eyebrow">{t.label}</p>
        <h3>{t.title}</h3>
        <fieldset>
          <legend>{t.question}</legend>
          {t.options.map(([value, optionLabel]) => (
            <label key={value} className={reviewSource === value ? 'is-active' : undefined}>
              <input
                type="radio"
                name="review-source"
                value={value}
                checked={reviewSource === value}
                onChange={() => setReviewSource(value as 'ticket' | 'record')}
              />
              {optionLabel}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="demo-graph">
        <div className="demo-path">
          <span className="demo-source is-ticket">{t.sources.ticket}</span>
          <span className="demo-arrow" aria-hidden="true" />
          <span className="demo-agent">{t.buildAgent}<b>{t.approved}</b></span>
        </div>
        <div className="demo-path">
          <span className={`demo-source is-${reviewSource}`}>{t.sources[reviewSource]}</span>
          <span className="demo-arrow" aria-hidden="true" />
          <span className="demo-agent">{t.reviewAgent}<b>{t.approved}</b></span>
        </div>
        <p className="demo-count" aria-live="polite">{t.originCount(convergent ? 1 : 2)}</p>
        <div className="demo-verdict" aria-live="polite">
          <strong>{verdict}</strong>
          <p>{verdictBody}</p>
        </div>
      </div>
    </div>
  );
}

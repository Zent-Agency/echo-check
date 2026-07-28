import Link from 'next/link';

import { WaitlistForm } from '@/components/ui/waitlist-form';

import { HeroLineage } from './hero-lineage';
import { LineageDemo } from './lineage-demo';

type Locale = 'en' | 'es';

const copy = {
  en: {
    homeLabel: 'EchoCheck home',
    nav: 'The solution',
    localeLabel: 'ES',
    localeHref: '/es',
    replay: 'Replay the incident',
    heroKicker: 'Provenance control for agent pipelines',
    heroLine1: 'Approved the fraud.',
    heroLine2: 'Twice.',
    heroBody: 'EchoCheck traces every answer to its source and stops releases built on one disputed input.',
    incidentLabel: 'Incident 0413',
    incidentTitle: 'Nothing unusual happened.',
    incidentIntro: 'A ticket was filed late on Friday. Every step after it was legitimate.',
    timeline: [
      ['16:42', 'A ticket asks to change the account that receives customer payments.'],
      ['16:44', 'The build agent follows the ticket. The code is valid and the tests pass.'],
      ['16:51', 'The review agent reads the diff, the ticket, and the generated summary. It approves.'],
      ['16:52', 'The pipeline records two approvals and releases the change.'],
    ],
    incidentLesson: 'The second agent reviewed the first agent’s work, but learned everything from the same ticket.',
    blastLabel: 'If the release continues',
    blastItems: [
      'Customer payments go to the attacker',
      'Every affected payment must be reversed',
      'The release and later changes must be unwound',
    ],
    auditTitle: 'Every existing control returned OK.',
    auditIntro: 'Nothing was bypassed. The malicious request looked compatible with the controls already in the pipeline.',
    controls: [
      ['Authentication', 'Who sent the request', 'OK'],
      ['Authorization', 'Who may make the change', 'OK'],
      ['Approval policy', 'How many agents agreed', 'OK'],
      ['Audit log', 'What happened', 'OK'],
    ],
    missingControl: ['Provenance', 'Where each answer came from', 'NOT ASKED'],
    auditLesson: 'A third reviewer adds another answer. It does not add another source.',
    controlLabel: 'The missing control',
    controlTitle: 'EchoCheck rebuilds the lineage before anything irreversible runs.',
    controlBody: 'It sits between your agents and the pipeline. Your agents keep working as they do today.',
    steps: [
      ['Intercept', 'Capture the inputs and outputs at the agent boundary.'],
      ['Trace', 'Map every output back to the sources that informed it.'],
      ['Evaluate', 'Check whether required approvals have independent origins.'],
      ['Gate', 'Block execution when the independence rule fails.'],
    ],
    facts: ['No agent rewrite', 'One required gate', 'Decision before execution'],
    recordTitle: 'It decides first. It tells you after, with the proof.',
    recordBody: 'The money and the systems stay where they belong because the action was stopped, not flagged. Every operation then reaches you as an auditable receipt explaining why it was allowed, held, or rejected.',
    receiptLabel: 'Example evaluation receipt',
    receiptRows: [
      ['EVALUATION', 'ec_demo_0413'],
      ['TARGET', 'release_pr_8492'],
      ['REQUIRED SOURCES', '2'],
      ['FOUND SOURCES', '1'],
    ],
    verdict: 'VERDICT',
    outcomes: [
      ['PASS', 'Independent sources confirm the action.'],
      ['UNPROVEN', 'Some inputs cannot be traced.'],
      ['REJECT', 'All approvals converge on one source.'],
    ],
    scopeTitle: 'It runs wherever agents approve agents.',
    scopeLead: 'In all of these, the action only runs after a second agent signs off. EchoCheck checks that the sign-off reached a source the first agent did not produce.',
    scopeItems: [
      ['CI/CD pipelines', 'The approval must reach the ticket system, not the build agent’s summary of it.'],
      ['Automated code review', 'The reviewer must read the original issue and the test results, not the author agent’s description.'],
      ['Financial approvals', 'The second approval must come from the payment record, not from the request asking for the change.'],
      ['Compliance reviews', 'The verdict must cite the signed policy, not another agent’s reading of it.'],
    ],
    waitlistLabel: 'Waitlist',
    footer: 'Provenance control for agent pipelines',
  },
  es: {
    homeLabel: 'Inicio de EchoCheck',
    nav: 'La solución',
    localeLabel: 'EN',
    localeHref: '/',
    replay: 'Reproducir el incidente',
    heroKicker: 'Control de procedencia para pipelines de agentes',
    heroLine1: 'Aprobaron el fraude.',
    heroLine2: 'Dos veces.',
    heroBody: 'EchoCheck rastrea cada respuesta hasta su fuente y frena releases basados en un único input en disputa.',
    incidentLabel: 'Incidente 0413',
    incidentTitle: 'Nada pareció fuera de lo normal.',
    incidentIntro: 'Una tarea fue creada al final del viernes. Todo lo que ocurrió después fue legítimo.',
    timeline: [
      ['16:42', 'Una tarea pide cambiar la cuenta que recibe los pagos de clientes.'],
      ['16:44', 'El agente de código sigue la tarea. El código es válido y los tests pasan.'],
      ['16:51', 'El agente revisor lee el cambio, la tarea y el resumen generado. Lo aprueba.'],
      ['16:52', 'El pipeline registra dos aprobaciones y publica el cambio.'],
    ],
    incidentLesson: 'El segundo agente revisó el trabajo del primero, pero aprendió todo de la misma tarea.',
    blastLabel: 'Si el release continúa',
    blastItems: [
      'Los pagos de clientes llegan al atacante',
      'Cada pago afectado debe revertirse',
      'El release y los cambios posteriores deben deshacerse',
    ],
    auditTitle: 'Todos los controles actuales respondieron OK.',
    auditIntro: 'Nadie evitó una regla. La orden maliciosa parecía compatible con los controles que ya estaban en el pipeline.',
    controls: [
      ['Autenticación', 'Quién envió la orden', 'OK'],
      ['Autorización', 'Quién puede hacer el cambio', 'OK'],
      ['Política de aprobación', 'Cuántos agentes aceptaron', 'OK'],
      ['Registro de auditoría', 'Qué ocurrió', 'OK'],
    ],
    missingControl: ['Procedencia', 'De dónde salió cada respuesta', 'NO PREGUNTADO'],
    auditLesson: 'Un tercer revisor agrega otra respuesta. No agrega otra fuente.',
    controlLabel: 'El control que falta',
    controlTitle: 'EchoCheck reconstruye el origen antes de ejecutar algo irreversible.',
    controlBody: 'Se ubica entre tus agentes y el pipeline. Tus agentes siguen trabajando como lo hacen hoy.',
    steps: [
      ['Intercepta', 'Captura las entradas y salidas en el límite de cada agente.'],
      ['Rastrea', 'Conecta cada respuesta con las fuentes que la informaron.'],
      ['Evalúa', 'Comprueba si las aprobaciones tienen orígenes independientes.'],
      ['Bloquea', 'Impide la ejecución cuando no se cumple la independencia.'],
    ],
    facts: ['Sin reescribir agentes', 'Una compuerta obligatoria', 'Decisión antes de ejecutar'],
    recordTitle: 'Decide primero. Te avisa después, con la constancia.',
    recordBody: 'Tu plata y tus sistemas quedan donde tienen que quedar porque la acción se frenó, no porque se marcó. Después cada operación te llega como un recibo auditable que explica por qué se permitió, retuvo o rechazó.',
    receiptLabel: 'Recibo de evaluación de ejemplo',
    receiptRows: [
      ['EVALUACIÓN', 'ec_demo_0413'],
      ['OBJETIVO', 'release_pr_8492'],
      ['FUENTES REQUERIDAS', '2'],
      ['FUENTES ENCONTRADAS', '1'],
    ],
    verdict: 'VEREDICTO',
    outcomes: [
      ['PASS', 'Fuentes independientes confirman la acción.'],
      ['UNPROVEN', 'Algunas entradas no se pueden rastrear.'],
      ['REJECT', 'Todas las aprobaciones vuelven a una fuente.'],
    ],
    scopeTitle: 'Funciona en cada lugar donde agentes aprueban agentes.',
    scopeLead: 'En todos estos casos la acción sólo se ejecuta cuando un segundo agente la aprueba. EchoCheck verifica que esa aprobación haya llegado a una fuente que el primer agente no escribió.',
    scopeItems: [
      ['Pipelines de CI/CD', 'La aprobación tiene que llegar al sistema de tickets, no al resumen que hizo el agente que construyó.'],
      ['Revisión automática de código', 'El revisor tiene que leer el issue original y el resultado de los tests, no la descripción del agente autor.'],
      ['Aprobaciones financieras', 'La segunda aprobación tiene que salir del registro de pagos, no del pedido que solicitó el cambio.'],
      ['Revisiones de cumplimiento', 'El veredicto tiene que citar la política firmada, no la lectura que hizo otro agente.'],
    ],
    waitlistLabel: 'Lista de espera',
    footer: 'Control de procedencia para pipelines de agentes',
  },
} as const;

export function MarketingLanding({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale];
  const homeHref = locale === 'es' ? '/es' : '/';

  return (
    <div className="site-shell" lang={locale}>
      <header className="site-header">
        <Link className="wordmark" href={homeHref} aria-label={t.homeLabel}>
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /></span>
          EchoCheck
        </Link>
        <nav className="header-actions" aria-label="Primary navigation">
          <a className="header-link" href="#how-it-works">{t.nav}</a>
          <Link className="locale-link" href={t.localeHref} hrefLang={locale === 'es' ? 'en' : 'es'}>
            {t.localeLabel}
          </Link>
          <Link className="header-cta" href="#incident">{t.replay}</Link>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroKicker}</p>
            <h1 id="hero-title">
              <span>{t.heroLine1}</span>
              <span>{t.heroLine2}</span>
            </h1>
            <p className="hero-body">{t.heroBody}</p>
            <Link className="button button-primary" href="#incident">{t.replay}<span aria-hidden="true">↓</span></Link>
          </div>

          <HeroLineage locale={locale} />
        </section>

        <section className="incident-section" id="incident" aria-labelledby="incident-title">
          <div className="narrow-column">
            <p className="eyebrow">{t.incidentLabel}</p>
            <h2 id="incident-title">{t.incidentTitle}</h2>
            <p className="section-lead">{t.incidentIntro}</p>
            <ol className="incident-timeline">
              {t.timeline.map(([time, event]) => (
                <li key={time}><time>{time}</time><p>{event}</p></li>
              ))}
            </ol>
            <p className="incident-lesson">{t.incidentLesson}</p>
            <aside className="blast-radius">
              <strong>{t.blastLabel}</strong>
              <div>{t.blastItems.map((item) => <span key={item}>{item}</span>)}</div>
            </aside>
          </div>
        </section>

        <section className="audit-section" aria-labelledby="audit-title">
          <div className="narrow-column">
            <h2 id="audit-title">{t.auditTitle}</h2>
            <p className="section-lead">{t.auditIntro}</p>
            <div className="audit-table">
              {t.controls.map(([control, question, status]) => (
                <div className="audit-row" key={control}>
                  <strong>{control}</strong><span>{question}</span><b>{status}</b>
                </div>
              ))}
              <div className="audit-row audit-missing">
                <strong>{t.missingControl[0]}</strong>
                <span>{t.missingControl[1]}</span>
                <b>{t.missingControl[2]}</b>
              </div>
            </div>
            <p className="audit-lesson">{t.auditLesson}</p>
          </div>
        </section>

        <section className="control-section" id="how-it-works" aria-labelledby="control-title">
          <div className="section-heading">
            <p className="eyebrow">{t.controlLabel}</p>
            <h2 id="control-title">{t.controlTitle}</h2>
            <p className="section-lead">{t.controlBody}</p>
          </div>
          <div className="control-steps">
            {t.steps.map(([title, detail]) => (
              <article key={title}><strong>{title}</strong><p>{detail}</p></article>
            ))}
          </div>
          <div className="control-facts">{t.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <LineageDemo locale={locale} />
        </section>

        <section className="record-section" aria-labelledby="record-title">
          <div className="section-heading">
            <h2 id="record-title">{t.recordTitle}</h2>
            <p className="section-lead">{t.recordBody}</p>
          </div>
          <div className="record-layout">
            <div className="receipt">
              <span className="receipt-label">{t.receiptLabel}</span>
              {t.receiptRows.map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
              <div className="receipt-verdict"><span>{t.verdict}</span><strong>REJECT</strong></div>
            </div>
            <div className="outcome-list">
              {t.outcomes.map(([status, detail]) => (
                <article className={`outcome outcome-${status.toLowerCase()}`} key={status}>
                  <strong>{status}</strong><p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scope-section" aria-labelledby="scope-title">
          <h2 id="scope-title">{t.scopeTitle}</h2>
          <div>
            <p className="section-lead">{t.scopeLead}</p>
            <ul className="scope-content">
              {t.scopeItems.map(([place, source]) => (
                <li key={place}><strong>{place}</strong><p>{source}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="waitlist-section" aria-label={t.waitlistLabel}>
          <WaitlistForm locale={locale} />
        </section>
      </main>

      <footer><span>EchoCheck</span><span>{t.footer}</span><span>2026</span></footer>
    </div>
  );
}

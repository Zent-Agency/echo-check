import Image from 'next/image';
import Link from 'next/link';

type Locale = 'en' | 'es';

const copy = {
  en: {
    homeLabel: 'EchoCheck home',
    protocolNav: 'How it works',
    localeLabel: 'ES',
    localeHref: '/es',
    heroKicker: 'Independent evidence for agent actions',
    heroLine1: 'Two agents agreed.',
    heroLine2: 'It was still one witness.',
    summary: 'EchoCheck blocks high-risk agent actions when every confirmation traces back to the same disputed source.',
    runAttack: 'Run the attack',
    howItWorks: 'How it works',
    visualAlt: 'Two distinct blue forms casting shadows from one shared source.',
    confirmations: 'confirmations',
    originalSource: 'original source',
    independentEvidence: 'independent evidence',
    verdict: 'Verdict',
    reject: 'Reject',
    problemTitle: 'Authentication is not corroboration.',
    problemBody: 'A message can be authentic, the agents authorized, and the action allowed. If every claim comes from one disputed origin, the verification is still empty.',
    problemCallout: 'Valid credentials prove who spoke. They do not prove who they learned it from.',
    attackTitle: 'One issue. Four trusted hops. Zero new evidence.',
    issue: 'Malicious issue',
    releaseAgent: 'Release agent',
    artifacts: 'Artifacts',
    securityReviewer: 'Security reviewer',
    deployAgent: 'Deploy agent',
    attackCaption: 'Every step looks legitimate in isolation. Provenance exposes the loop.',
    gateTitle: 'EchoCheck sits below the agents.',
    gateBody: 'A control layer that turns agent approval into an evidence decision before high-risk actions execute.',
    protocol: [
      ['Observe I/O', 'Capture what each agent reads, writes, and cites.'],
      ['Build provenance', 'Resolve every confirmation to its true origin.'],
      ['Require independence', 'Separate new evidence from repeated claims.'],
      ['Issue a receipt', 'Allow, hold, or block with an auditable reason.'],
    ],
    statesTitle: 'Not every check should pass.',
    statesIntro: 'EchoCheck gives every high-risk action a clear evidence state.',
    statusRows: [
      ['PASS', 'Independent evidence exists.', 'Allow'],
      ['UNPROVEN', 'Independence cannot be established.', 'Hold'],
      ['REJECT', 'Every claim resolves to one disputed source.', 'Block'],
    ],
    closingLine1: 'Your agents checked twice.',
    closingLine2: 'Did it count?',
    footer: 'Evidence provenance for agent systems',
  },
  es: {
    homeLabel: 'Inicio de EchoCheck',
    protocolNav: 'Cómo funciona',
    localeLabel: 'EN',
    localeHref: '/',
    heroKicker: 'Evidencia independiente para acciones de agentes',
    heroLine1: 'Dos agentes coincidieron.',
    heroLine2: 'Seguía siendo un solo testigo.',
    summary: 'EchoCheck bloquea acciones de alto riesgo cuando todas las confirmaciones se remontan a la misma fuente cuestionada.',
    runAttack: 'Ejecutar el ataque',
    howItWorks: 'Cómo funciona',
    visualAlt: 'Dos formas azules distintas proyectan sombras desde una sola fuente compartida.',
    confirmations: 'confirmaciones',
    originalSource: 'fuente original',
    independentEvidence: 'evidencia independiente',
    verdict: 'Veredicto',
    reject: 'Rechazar',
    problemTitle: 'Autenticar no es corroborar.',
    problemBody: 'Un mensaje puede ser auténtico, los agentes estar autorizados y la acción permitida. Si toda afirmación proviene de un origen cuestionado, la verificación sigue vacía.',
    problemCallout: 'Las credenciales prueban quién habló. No prueban de quién obtuvo la información.',
    attackTitle: 'Un issue. Cuatro saltos confiables. Cero evidencia nueva.',
    issue: 'Issue malicioso',
    releaseAgent: 'Agente de release',
    artifacts: 'Artefactos',
    securityReviewer: 'Revisor de seguridad',
    deployAgent: 'Agente de deploy',
    attackCaption: 'Cada paso parece legítimo por separado. La procedencia expone el circuito.',
    gateTitle: 'EchoCheck opera por debajo de los agentes.',
    gateBody: 'Una capa de control que convierte la aprobación de agentes en una decisión de evidencia antes de ejecutar acciones de alto riesgo.',
    protocol: [
      ['Observar I/O', 'Captura lo que cada agente lee, escribe y cita.'],
      ['Trazar procedencia', 'Resuelve cada confirmación hasta su origen real.'],
      ['Exigir independencia', 'Separa evidencia nueva de afirmaciones repetidas.'],
      ['Emitir un recibo', 'Permite, retiene o bloquea con una razón auditable.'],
    ],
    statesTitle: 'No toda revisión debería pasar.',
    statesIntro: 'EchoCheck asigna un estado de evidencia claro a cada acción de alto riesgo.',
    statusRows: [
      ['PASS', 'Existe evidencia independiente.', 'Permitir'],
      ['UNPROVEN', 'No se puede establecer independencia.', 'Retener'],
      ['REJECT', 'Toda afirmación remite a una fuente cuestionada.', 'Bloquear'],
    ],
    closingLine1: 'Tus agentes revisaron dos veces.',
    closingLine2: '¿Contó?',
    footer: 'Procedencia de evidencia para sistemas de agentes',
  },
} as const;

export function MarketingLanding({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale];
  const homeHref = locale === 'es' ? '/es' : '/';

  return (
    <div className="site-shell" lang={locale}>
      <header className="site-header">
        <Link className="wordmark" href={homeHref} aria-label={t.homeLabel}>
          <span className="wordmark-symbol" aria-hidden="true">
            <i />
            <i />
          </span>
          EchoCheck
        </Link>
        <nav className="header-actions" aria-label="Primary navigation">
          <a className="header-link" href="#how-it-works">{t.protocolNav}</a>
          <Link className="locale-link" href={t.localeHref} hrefLang={locale === 'es' ? 'en' : 'es'}>
            {t.localeLabel}
          </Link>
          <Link className="header-cta" href="/demo">{t.runAttack}</Link>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">{t.heroKicker}</p>
            <h1 id="hero-title">
              <span>{t.heroLine1}</span>
              <span>{t.heroLine2}</span>
            </h1>
            <p className="hero-summary">{t.summary}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/demo">
                {t.runAttack}<span aria-hidden="true">↗</span>
              </Link>
              <a className="button button-secondary" href="#how-it-works">
                {t.howItWorks}<span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className="hero-visual">
            <Image
              src="/echocheck-two-one.png"
              alt={t.visualAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <figcaption className="evidence-summary">
              <div><strong>2</strong><span>{t.confirmations}</span></div>
              <div><strong>1</strong><span>{t.originalSource}</span></div>
              <div><strong>0</strong><span>{t.independentEvidence}</span></div>
              <div className="evidence-verdict"><span>{t.verdict}</span><strong>{t.reject}</strong></div>
            </figcaption>
          </figure>
        </section>

        <section className="problem-section" aria-labelledby="problem-title">
          <h2 id="problem-title">{t.problemTitle}</h2>
          <div className="problem-copy">
            <p>{t.problemBody}</p>
            <blockquote>{t.problemCallout}</blockquote>
          </div>
        </section>

        <section className="attack-section" aria-labelledby="attack-title">
          <div className="section-heading">
            <h2 id="attack-title">{t.attackTitle}</h2>
            <p>{t.attackCaption}</p>
          </div>
          <div className="attack-flow" role="img" aria-label={t.attackTitle}>
            <div className="flow-origin"><span>{t.issue}</span><b>1 source</b></div>
            <div className="flow-hop"><span>{t.releaseAgent}</span></div>
            <div className="flow-hop"><span>{t.artifacts}</span></div>
            <div className="flow-hop"><span>{t.securityReviewer}</span></div>
            <div className="flow-hop flow-final"><span>{t.deployAgent}</span><b>{t.reject}</b></div>
          </div>
        </section>

        <section className="protocol-section" id="how-it-works" aria-labelledby="protocol-title">
          <div className="protocol-intro">
            <h2 id="protocol-title">{t.gateTitle}</h2>
            <p>{t.gateBody}</p>
          </div>
          <div className="protocol-grid">
            {t.protocol.map(([title, detail], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="states-section" aria-labelledby="states-title">
          <div className="states-heading">
            <h2 id="states-title">{t.statesTitle}</h2>
            <p>{t.statesIntro}</p>
          </div>
          <div className="states-list">
            {t.statusRows.map(([status, detail, action]) => (
              <article className={`state state-${status.toLowerCase()}`} key={status}>
                <strong>{status}</strong>
                <p>{detail}</p>
                <span>{action}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <h2>
            <span>{t.closingLine1}</span>
            <span>{t.closingLine2}</span>
          </h2>
          <Link className="button button-inverse" href="/demo">
            {t.runAttack}<span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer>
        <span>EchoCheck</span>
        <span>{t.footer}</span>
        <span>2026</span>
      </footer>
    </div>
  );
}

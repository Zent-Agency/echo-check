import Link from 'next/link';

type Locale = 'en' | 'es';
type Status = 'PASS' | 'UNPROVEN' | 'REJECT';

const copy = {
  en: {
    homeLabel: 'EchoCheck home',
    headerStatus: 'evidence gate / active',
    protocolNav: 'Protocol',
    localeLabel: 'ES',
    localeHref: '/es',
    eyebrow: 'Independent evidence gate',
    heroLine1: 'Two agents agreed.',
    heroLine2: 'It was still one witness.',
    summary: 'EchoCheck blocks high-risk agent actions when every confirmation traces back to the same disputed source.',
    runAttack: 'Run the attack',
    howItWorks: 'How it works',
    wedgeStrong: 'DEPLOYMENT APPROVALS',
    wedgeRest: 'between coding agents',
    problemIndex: '02 / THE PROBLEM',
    problemTitle: 'Authentication is not corroboration.',
    problemBody: 'Every message can be genuine. Every agent can be authorized. The approval can still be based on circular evidence.',
    attackIndex: '03 / ATTACK TRACE',
    attackTitle: 'The echo-chamber attack',
    attackBody: 'One poisoned issue travels through an otherwise legitimate deployment workflow.',
    attackAria: 'Malicious issue leads through a release agent, artifacts, security reviewer and deploy agent, all tracing to one disputed source.',
    issue: 'Issue',
    untrustedInstruction: 'untrusted instruction',
    releaseAgent: 'Release Agent',
    buildsArtifacts: 'builds artifacts',
    artifacts: 'ARTIFACTS',
    securityReviewer: 'Security Reviewer',
    confirmsArtifacts: 'confirms artifacts',
    deployAgent: 'Deploy Agent',
    receivesApproval: 'receives approval',
    oneOrigin: 'ONE ORIGIN',
    reject: 'REJECT',
    attackCaption: 'The agents verified. The verification was empty.',
    gateIndex: '04 / THE GATE',
    gateTitle: 'EchoCheck sits below the agents.',
    gateBody: 'It observes what agents read and write, builds provenance automatically, then turns deployment approval into an evidence decision.',
    protocol: [
      ['Observe I/O', 'Capture the artifacts and messages an agent relies on.'],
      ['Build provenance', 'Resolve every claimed confirmation back to its origin.'],
      ['Require independence', 'Detect when witnesses are only echoes of the same input.'],
      ['Issue a receipt', 'Allow, hold, or block the action with an auditable verdict.'],
    ],
    statesIndex: '05 / DECISION STATES',
    statesTitle: 'Evidence has a status.',
    statesAria: 'EchoCheck decision states',
    statusRows: [
      ['PASS', 'Independent', 'A distinct origin corroborates the claim.'],
      ['UNPROVEN', 'Insufficient', 'Evidence exists, but independence is unknown.'],
      ['REJECT', 'Echo detected', 'Every confirmation resolves to one disputed source.'],
    ],
    ready: 'ECHOCHECK / READY',
    closingLine1: 'Your agents checked twice.',
    closingLine2: 'Did it count?',
    footer: 'INDEPENDENT EVIDENCE FOR AGENTS',
    receiptAria: 'EchoCheck evidence receipt: two confirmations, one original source, zero independent evidence, verdict reject.',
    receipt: 'ECHOCHECK / RECEIPT',
    liveTrace: 'LIVE TRACE',
    confirmations: 'confirmations',
    originalSource: 'original source',
    independentEvidence: 'independent evidence',
    origin: 'ORIGIN',
    untrusted: 'untrusted',
    confirms: 'confirms',
    provenanceResolved: 'PROVENANCE RESOLVED',
    claimsOrigin: '2 claims → 1 origin',
    independenceFailure: 'INDEPENDENCE FAILURE',
    verdict: 'VERDICT',
    deploymentBlocked: 'deployment blocked',
  },
  es: {
    homeLabel: 'Inicio de EchoCheck',
    headerStatus: 'compuerta de evidencia / activa',
    protocolNav: 'Protocolo',
    localeLabel: 'EN',
    localeHref: '/',
    eyebrow: 'Compuerta de evidencia independiente',
    heroLine1: 'Dos agentes coincidieron.',
    heroLine2: 'Seguía siendo un solo testigo.',
    summary: 'EchoCheck bloquea acciones de alto riesgo cuando todas las confirmaciones se remontan a la misma fuente cuestionada.',
    runAttack: 'Ejecutar el ataque',
    howItWorks: 'Cómo funciona',
    wedgeStrong: 'APROBACIONES DE DEPLOY',
    wedgeRest: 'entre agentes de código',
    problemIndex: '02 / EL PROBLEMA',
    problemTitle: 'Autenticar no es corroborar.',
    problemBody: 'Cada mensaje puede ser genuino. Cada agente puede estar autorizado. La aprobación aun así puede basarse en evidencia circular.',
    attackIndex: '03 / TRAZA DEL ATAQUE',
    attackTitle: 'El ataque de cámara de eco',
    attackBody: 'Un issue envenenado atraviesa un flujo de deploy que, por lo demás, es legítimo.',
    attackAria: 'Un issue malicioso pasa por un agente de release, artefactos, un revisor de seguridad y un agente de deploy; todo se remonta a una sola fuente cuestionada.',
    issue: 'Issue',
    untrustedInstruction: 'instrucción no confiable',
    releaseAgent: 'Agente de release',
    buildsArtifacts: 'genera artefactos',
    artifacts: 'ARTEFACTOS',
    securityReviewer: 'Revisor de seguridad',
    confirmsArtifacts: 'confirma artefactos',
    deployAgent: 'Agente de deploy',
    receivesApproval: 'recibe aprobación',
    oneOrigin: 'UN ORIGEN',
    reject: 'RECHAZAR',
    attackCaption: 'Los agentes verificaron. La verificación estaba vacía.',
    gateIndex: '04 / LA COMPUERTA',
    gateTitle: 'EchoCheck opera por debajo de los agentes.',
    gateBody: 'Observa lo que los agentes leen y escriben, construye procedencia automáticamente y convierte la aprobación del deploy en una decisión basada en evidencia.',
    protocol: [
      ['Observar I/O', 'Captura los artefactos y mensajes en los que se apoya un agente.'],
      ['Construir procedencia', 'Resuelve cada confirmación hasta llegar a su origen.'],
      ['Exigir independencia', 'Detecta cuándo los testigos sólo repiten la misma entrada.'],
      ['Emitir un recibo', 'Permite, retiene o bloquea la acción con un veredicto auditable.'],
    ],
    statesIndex: '05 / ESTADOS DE DECISIÓN',
    statesTitle: 'La evidencia tiene un estado.',
    statesAria: 'Estados de decisión de EchoCheck',
    statusRows: [
      ['APROBAR', 'Independiente', 'Un origen distinto corrobora la afirmación.'],
      ['NO PROBADO', 'Insuficiente', 'Existe evidencia, pero se desconoce su independencia.'],
      ['RECHAZAR', 'Eco detectado', 'Todas las confirmaciones remiten a una misma fuente cuestionada.'],
    ],
    ready: 'ECHOCHECK / LISTO',
    closingLine1: 'Tus agentes revisaron dos veces.',
    closingLine2: '¿Contó?',
    footer: 'EVIDENCIA INDEPENDIENTE PARA AGENTES',
    receiptAria: 'Recibo de evidencia de EchoCheck: dos confirmaciones, una fuente original, cero evidencia independiente, veredicto rechazar.',
    receipt: 'ECHOCHECK / RECIBO',
    liveTrace: 'TRAZA EN VIVO',
    confirmations: 'confirmaciones',
    originalSource: 'fuente original',
    independentEvidence: 'evidencia independiente',
    origin: 'ORIGEN',
    untrusted: 'no confiable',
    confirms: 'confirma',
    provenanceResolved: 'PROCEDENCIA RESUELTA',
    claimsOrigin: '2 afirmaciones → 1 origen',
    independenceFailure: 'FALLA DE INDEPENDENCIA',
    verdict: 'VEREDICTO',
    deploymentBlocked: 'deploy bloqueado',
  },
} as const;

export function MarketingLanding({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <div className="site-shell" lang={locale}>
      <header className="site-header">
        <Link className="wordmark" href={locale === 'es' ? '/es' : '/'} aria-label={t.homeLabel}>
          <span className="wordmark-mark" aria-hidden="true">E</span>
          EchoCheck
        </Link>
        <div className="header-status"><span className="pulse-dot" /> {t.headerStatus}</div>
        <div className="header-actions">
          <a className="header-link" href="#how-it-works">{t.protocolNav}</a>
          <Link className="locale-link" href={t.localeHref} hrefLang={locale === 'es' ? 'en' : 'es'}>{t.localeLabel}</Link>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> {t.eyebrow}</p>
            <h1 id="hero-title">{t.heroLine1}<br /><em>{t.heroLine2}</em></h1>
            <p className="hero-summary">{t.summary}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/demo">{t.runAttack} <span aria-hidden="true">↗</span></Link>
              <a className="button button-quiet" href="#how-it-works">{t.howItWorks} <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-footnote"><span>{t.wedgeStrong}</span> {t.wedgeRest}</p>
          </div>
          <EvidenceConsole locale={locale} />
        </section>

        <section className="statement-section" aria-labelledby="statement-title">
          <p className="section-index">{t.problemIndex}</p>
          <div><h2 id="statement-title">{t.problemTitle}</h2><p>{t.problemBody}</p></div>
        </section>

        <section className="attack-section" aria-labelledby="attack-title">
          <div className="section-heading">
            <p className="section-index">{t.attackIndex}</p>
            <h2 id="attack-title">{t.attackTitle}</h2>
            <p>{t.attackBody}</p>
          </div>
          <div className="attack-trace" role="img" aria-label={t.attackAria}>
            <div className="trace-origin"><span className="trace-node-number">01</span><strong>{t.issue}</strong><small>{t.untrustedInstruction}</small></div>
            <div className="trace-line trace-line-red" />
            <div className="trace-agent"><span className="trace-node-number">02</span><strong>{t.releaseAgent}</strong><small>{t.buildsArtifacts}</small></div>
            <div className="trace-line" />
            <div className="trace-artifact"><span>{t.artifacts}</span><code>release-manifest.json</code><code>ci-output.log</code></div>
            <div className="trace-line" />
            <div className="trace-agent"><span className="trace-node-number">03</span><strong>{t.securityReviewer}</strong><small>{t.confirmsArtifacts}</small></div>
            <div className="trace-line trace-line-red" />
            <div className="trace-agent"><span className="trace-node-number">04</span><strong>{t.deployAgent}</strong><small>{t.receivesApproval}</small></div>
            <div className="trace-verdict">{t.oneOrigin}<br /><b>→ {t.reject}</b></div>
          </div>
          <p className="attack-caption">{t.attackCaption}</p>
        </section>

        <section className="protocol-section" id="how-it-works" aria-labelledby="protocol-title">
          <div className="protocol-intro">
            <p className="section-index">{t.gateIndex}</p>
            <h2 id="protocol-title">{t.gateTitle}</h2>
            <p>{t.gateBody}</p>
          </div>
          <ol className="protocol-list">
            {t.protocol.map(([title, detail], index) => (
              <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{detail}</p></div></li>
            ))}
          </ol>
        </section>

        <section className="verdict-section" aria-labelledby="verdict-title">
          <div className="verdict-heading"><p className="section-index">{t.statesIndex}</p><h2 id="verdict-title">{t.statesTitle}</h2></div>
          <div className="status-table" role="table" aria-label={t.statesAria}>
            {t.statusRows.map(([displayStatus, label, detail], index) => {
              const status = (['PASS', 'UNPROVEN', 'REJECT'] as Status[])[index];
              return (
                <div className={`status-row status-${status.toLowerCase()}`} role="row" key={status}>
                  <span className="status-label" role="cell">{displayStatus}</span>
                  <strong role="cell">{label}</strong>
                  <p role="cell">{detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="closing-section">
          <p className="section-index">{t.ready}</p>
          <h2>{t.closingLine1}<br />{t.closingLine2}</h2>
          <Link className="button button-primary" href="/demo">{t.runAttack} <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <footer><span>ECHOCHECK</span><span>{t.footer}</span><span>2026</span></footer>
    </div>
  );
}

function EvidenceConsole({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="evidence-console" role="img" aria-label={t.receiptAria}>
      <div className="console-top"><span>{t.receipt}</span><span className="console-live"><i /> {t.liveTrace}</span></div>
      <div className="console-metrics">
        <Metric value="2" label={t.confirmations} />
        <Metric value="1" label={t.originalSource} alert />
        <Metric value="0" label={t.independentEvidence} alert />
      </div>
      <div className="provenance-map">
        <div className="source-block"><span>{t.origin}</span><code>ISSUE-4481</code><small>{t.untrusted}</small></div>
        <div className="map-branches" aria-hidden="true"><i /><i /></div>
        <div className="confirmation-stack"><div><b>✓</b><code>RELEASE_AGENT</code><small>{t.confirms}</small></div><div><b>✓</b><code>SECURITY_REVIEWER</code><small>{t.confirms}</small></div></div>
      </div>
      <div className="console-log"><span>{t.provenanceResolved}</span><span>{t.claimsOrigin}</span><span className="log-alert">{t.independenceFailure}</span></div>
      <div className="verdict-bar"><span>{t.verdict}</span><strong>{t.reject}</strong><span>{t.deploymentBlocked}</span></div>
    </div>
  );
}

function Metric({ value, label, alert = false }: { value: string; label: string; alert?: boolean }) {
  return <div className={`metric${alert ? ' metric-alert' : ''}`}><strong>{value}</strong><span>{label}</span></div>;
}

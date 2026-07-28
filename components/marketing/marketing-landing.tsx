import Link from 'next/link';

type Status = 'PASS' | 'UNPROVEN' | 'REJECT';

const statusRows: { status: Status; label: string; detail: string }[] = [
  { status: 'PASS', label: 'Independent', detail: 'A distinct origin corroborates the claim.' },
  { status: 'UNPROVEN', label: 'Insufficient', detail: 'Evidence exists, but independence is unknown.' },
  { status: 'REJECT', label: 'Echo detected', detail: 'Every confirmation resolves to one disputed source.' },
];

export function MarketingLanding() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="EchoCheck home">
          <span className="wordmark-mark" aria-hidden="true">E</span>
          EchoCheck
        </Link>
        <div className="header-status"><span className="pulse-dot" /> evidence gate / active</div>
        <a className="header-link" href="#how-it-works">Protocol</a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> Independent evidence gate</p>
            <h1 id="hero-title">Two agents agreed.<br /><em>It was still one witness.</em></h1>
            <p className="hero-summary">EchoCheck blocks high-risk agent actions when every confirmation traces back to the same disputed source.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/demo">Run the attack <span aria-hidden="true">↗</span></Link>
              <a className="button button-quiet" href="#how-it-works">How it works <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-footnote"><span>DEPLOYMENT APPROVALS</span> between coding agents</p>
          </div>
          <EvidenceConsole />
        </section>

        <section className="statement-section" aria-labelledby="statement-title">
          <p className="section-index">02 / THE PROBLEM</p>
          <div>
            <h2 id="statement-title">Authentication is not corroboration.</h2>
            <p>Every message can be genuine. Every agent can be authorized. The approval can still be based on circular evidence.</p>
          </div>
        </section>

        <section className="attack-section" aria-labelledby="attack-title">
          <div className="section-heading">
            <p className="section-index">03 / ATTACK TRACE</p>
            <h2 id="attack-title">The echo-chamber attack</h2>
            <p>One poisoned issue travels through an otherwise legitimate deployment workflow.</p>
          </div>
          <div className="attack-trace" role="img" aria-label="Malicious issue leads through a release agent, artifacts, security reviewer and deploy agent, all tracing to one disputed source.">
            <div className="trace-origin"><span className="trace-node-number">01</span><strong>Issue</strong><small>untrusted instruction</small></div>
            <div className="trace-line trace-line-red" />
            <div className="trace-agent"><span className="trace-node-number">02</span><strong>Release Agent</strong><small>builds artifacts</small></div>
            <div className="trace-line" />
            <div className="trace-artifact"><span>ARTIFACTS</span><code>release-manifest.json</code><code>ci-output.log</code></div>
            <div className="trace-line" />
            <div className="trace-agent"><span className="trace-node-number">03</span><strong>Security Reviewer</strong><small>confirms artifacts</small></div>
            <div className="trace-line trace-line-red" />
            <div className="trace-agent"><span className="trace-node-number">04</span><strong>Deploy Agent</strong><small>receives approval</small></div>
            <div className="trace-verdict">ONE ORIGIN<br /><b>→ REJECT</b></div>
          </div>
          <p className="attack-caption">The agents verified. The verification was empty.</p>
        </section>

        <section className="protocol-section" id="how-it-works" aria-labelledby="protocol-title">
          <div className="protocol-intro">
            <p className="section-index">04 / THE GATE</p>
            <h2 id="protocol-title">EchoCheck sits below the agents.</h2>
            <p>It observes what agents read and write, builds provenance automatically, then turns deployment approval into an evidence decision.</p>
          </div>
          <ol className="protocol-list">
            <li><span>01</span><div><strong>Observe I/O</strong><p>Capture the artifacts and messages an agent relies on.</p></div></li>
            <li><span>02</span><div><strong>Build provenance</strong><p>Resolve every claimed confirmation back to its origin.</p></div></li>
            <li><span>03</span><div><strong>Require independence</strong><p>Detect when witnesses are only echoes of the same input.</p></div></li>
            <li><span>04</span><div><strong>Issue a receipt</strong><p>Allow, hold, or block the action with an auditable verdict.</p></div></li>
          </ol>
        </section>

        <section className="verdict-section" aria-labelledby="verdict-title">
          <div className="verdict-heading"><p className="section-index">05 / DECISION STATES</p><h2 id="verdict-title">Evidence has a status.</h2></div>
          <div className="status-table" role="table" aria-label="EchoCheck decision states">
            {statusRows.map(({ status, label, detail }) => (
              <div className={`status-row status-${status.toLowerCase()}`} role="row" key={status}>
                <span className="status-label" role="cell">{status}</span>
                <strong role="cell">{label}</strong>
                <p role="cell">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <p className="section-index">ECHOCHECK / READY</p>
          <h2>Your agents checked twice.<br />Did it count?</h2>
          <Link className="button button-primary" href="/demo">Run the attack <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <footer><span>ECHOCHECK</span><span>INDEPENDENT EVIDENCE FOR AGENTS</span><span>2026</span></footer>
    </div>
  );
}

function EvidenceConsole() {
  return (
    <div className="evidence-console" role="img" aria-label="EchoCheck evidence receipt: two confirmations, one original source, zero independent evidence, verdict reject.">
      <div className="console-top"><span>ECHOCHECK / RECEIPT</span><span className="console-live"><i /> LIVE TRACE</span></div>
      <div className="console-metrics">
        <Metric value="2" label="confirmations" />
        <Metric value="1" label="original source" alert />
        <Metric value="0" label="independent evidence" alert />
      </div>
      <div className="provenance-map">
        <div className="source-block"><span>ORIGIN</span><code>ISSUE-4481</code><small>untrusted</small></div>
        <div className="map-branches" aria-hidden="true"><i /><i /></div>
        <div className="confirmation-stack"><div><b>✓</b><code>RELEASE_AGENT</code><small>confirms</small></div><div><b>✓</b><code>SECURITY_REVIEWER</code><small>confirms</small></div></div>
      </div>
      <div className="console-log"><span>PROVENANCE RESOLVED</span><span>2 claims → 1 origin</span><span className="log-alert">INDEPENDENCE FAILURE</span></div>
      <div className="verdict-bar"><span>VERDICT</span><strong>REJECT</strong><span>deployment blocked</span></div>
    </div>
  );
}

function Metric({ value, label, alert = false }: { value: string; label: string; alert?: boolean }) {
  return <div className={`metric${alert ? ' metric-alert' : ''}`}><strong>{value}</strong><span>{label}</span></div>;
}

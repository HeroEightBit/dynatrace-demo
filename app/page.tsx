
import Link from "next/link";

export default function Home() {
  const options = [
    { href: "/rum", title: "RUM (Real User Monitoring)", desc: "Test Real User Monitoring integration and data collection." },
    { href: "/dtrum", title: "DTRUM API", desc: "Trigger and observe DTRUM API custom actions and events." },
    { href: "/api-demo", title: "Dynatrace API", desc: "Experiment with Dynatrace API endpoints and data." },
    { href: "/extensions", title: "Extensions", desc: "Test Dynatrace Extensions integration and data." },
    { href: "/synthetics", title: "Synthetics", desc: "Create flows for synthetic monitoring and alerting." },
  ];
  return (
    <main>
      <h1>Dynatrace Feature Testing Site</h1>
      <p style={{ marginBottom: 32 }}>Select a feature to test:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {options.map(opt => (
          <Link key={opt.href} href={opt.href} style={{ textDecoration: 'none', flex: '1 1 260px', maxWidth: 320 }}>
            <div className="feature-card">
              <h2 style={{ margin: '0 0 8px 0', fontSize: '1.18rem' }}>{opt.title}</h2>
              <p style={{ margin: 0, fontSize: '1rem', color: '#4b5563' }}>{opt.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

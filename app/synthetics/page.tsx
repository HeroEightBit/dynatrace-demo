"use client";
import React, { useRef, useState, useEffect } from "react";

function ShadowDomDemo() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowReady, setShadowReady] = useState(false);

  // Attach shadow DOM on mount
  useEffect(() => {
    if (hostRef.current && !shadowReady) {
      const shadow = hostRef.current.attachShadow({ mode: "open" });
      const inner = document.createElement("div");
      inner.innerHTML = `<button id='shadow-btn' style='padding:8px 16px;border-radius:6px;background:#e0e7ff;color:#1d4ed8;border:1.5px solid #2563eb;'>Shadow DOM Button</button>`;
      shadow.appendChild(inner);
      setShadowReady(true);
    }
  }, [shadowReady]);

  return (
    <div>
      <div ref={hostRef} style={{ border: "1.5px dashed #64748b", borderRadius: 8, padding: 12, marginTop: 8 }} />
      <div style={{ color: "#64748b", fontSize: "0.97rem", marginTop: 4 }}>
        This button is inside a native Shadow DOM. Dynatrace Browser Monitor should be able to interact with it.
      </div>
    </div>
  );
}

export default function SyntheticsPage() {
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [loginResult, setLoginResult] = useState<string | null>(null);
  const [formVal, setFormVal] = useState("");
  const [formResult, setFormResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (login.user === "demo" && login.pass === "demo") {
      setLoginResult("Login successful!");
    } else {
      setLoginResult("Login failed. Try 'demo'/'demo'.");
    }
  }

  function handleForm(e: React.FormEvent) {
    e.preventDefault();
    setFormResult(`Submitted: ${formVal}`);
  }

  function triggerError() {
    setError("A synthetic error was triggered!");
    // Optionally throw for RUM
    // throw new Error("Synthetic test error");
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1>Dynatrace Synthetics Test Page</h1>
      <p style={{ color: '#64748b' }}>
        This page is designed to test Dynatrace Browser Monitor and synthetic monitoring. It includes login, form, error, iframe, and shadow DOM scenarios.
      </p>

      {/* Login Form */}
      <section style={{ border: '2px solid #38bdf8', borderRadius: 12, background: '#f0f9ff', padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#0369a1', margin: 0 }}>Login Flow</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          <input
            type="text"
            placeholder="Username"
            value={login.user}
            onChange={e => setLogin(l => ({ ...l, user: e.target.value }))}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem" }}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={login.pass}
            onChange={e => setLogin(l => ({ ...l, pass: e.target.value }))}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem" }}
            autoComplete="current-password"
          />
          <button type="submit" style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}>
            Login
          </button>
        </form>
        {loginResult && <div style={{ marginTop: 8, color: loginResult.includes("success") ? '#16a34a' : '#b91c1c' }}>{loginResult}</div>}
      </section>

      {/* Form Submission */}
      <section style={{ border: '2px solid #a5b4fc', borderRadius: 12, background: '#f1f5ff', padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#6366f1', margin: 0 }}>Form Submission</h2>
        <form onSubmit={handleForm} style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 10 }}>
          <input
            type="text"
            placeholder="Type something..."
            value={formVal}
            onChange={e => setFormVal(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem" }}
          />
          <button type="submit" style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #a5b4fc", background: "#f1f5ff", color: "#3730a3", cursor: "pointer" }}>
            Submit
          </button>
        </form>
        {formResult && <div style={{ marginTop: 8, color: '#6366f1' }}>{formResult}</div>}
      </section>

      {/* Error Trigger */}
      <section style={{ border: '2px solid #f59e42', borderRadius: 12, background: '#fff7ed', padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#b45309', margin: 0 }}>Error Scenario</h2>
        <button onClick={triggerError} style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #f59e42", background: "#fff7ed", color: "#b45309", cursor: "pointer" }}>
          Trigger Error
        </button>
        {error && <div style={{ marginTop: 8, color: '#b91c1c' }}>{error}</div>}
      </section>

      {/* Iframe Demo */}
      <section style={{ border: '2px solid #16a34a', borderRadius: 12, background: '#f0fdf4', padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#166534', margin: 0 }}>Iframe Scenario</h2>
        <iframe
          src="https://www.example.com"
          title="Example Iframe"
          width="100%"
          height="120"
          style={{ border: "1.5px solid #a3a3a3", borderRadius: 8, marginTop: 8 }}
        />
        <div style={{ color: '#64748b', fontSize: '0.97rem', marginTop: 4 }}>
          This iframe loads an external site. Dynatrace Browser Monitor should be able to detect iframe presence and navigation.
        </div>
      </section>

      {/* Shadow DOM Demo */}
      <section style={{ border: '2px solid #a3a3a3', borderRadius: 12, background: '#f3f4f6', padding: 20, marginBottom: 24 }}>
        <h2 style={{ color: '#334155', margin: 0 }}>Shadow DOM Scenario</h2>
        <ShadowDomDemo />
      </section>
    </main>
  );
}

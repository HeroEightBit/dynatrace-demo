"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// Extend the Window interface to include dtrum for TypeScript
declare global {
  interface Window {
    dtrum?: {
      setUserTag?: (key: string, value: string) => void;
      [key: string]: any;
    };
  }
}

export default function Navbar() {
  const [demOpen, setDemOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(inputValue);
    setSubmitted(true);
    // DTRUM API: set user tag
    if (typeof window !== 'undefined' && window.dtrum && typeof window.dtrum.setUserTag === 'function') {
      window.dtrum.setUserTag("username", inputValue);
    }
  };

  // Allow editing after submit
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (submitted) setSubmitted(false);
  };

  // Update DTRUM user tag if username changes (after submit)
  useEffect(() => {
    if (username && typeof window !== 'undefined' && window.dtrum && typeof window.dtrum.setUserTag === 'function') {
      window.dtrum.setUserTag("username", username);
    }
  }, [username]);

  return (
    <nav className="navbar" style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-start' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, paddingTop: 8 }}>
        <label htmlFor="navbar-username" style={{ fontWeight: 500, color: '#2563eb', marginBottom: 0, whiteSpace: 'nowrap' }}>
          Username:{' '}
          {username && (
            <span style={{ fontWeight: 600, color: '#22292f', marginLeft: 4 }}>{username}</span>
          )}
        </label>
        <input
          id="navbar-username"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter username"
          style={{ padding: "6px 10px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", minWidth: 120 }}
          autoComplete="off"
        />
        <button
          type="submit"
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
            opacity: !inputValue.trim() ? 0.6 : 1,
            marginTop: 2
          }}
          disabled={!inputValue.trim()}
        >
          {username ? 'Update' : 'Submit'}
        </button>
      </form>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Link href="/">Home</Link>
        <div style={{ margin: "8px 0" }}>
          <button
            onClick={() => setDemOpen(o => !o)}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
            aria-expanded={demOpen}
            aria-controls="dem-section"
          >
            <span style={{ marginRight: 6 }}>{demOpen ? "▼" : "►"}</span>DEM
          </button>
          {demOpen && (
            <div id="dem-section" style={{ marginLeft: 18, display: "flex", flexDirection: "column", gap: 2 }}>
              <Link href="/rum" style={{ fontWeight: 400 }}>RUM</Link>
              <Link href="/dtrum" style={{ fontWeight: 400 }}>DTRUM API</Link>
              <Link href="/synthetics" style={{ fontWeight: 400 }}>Synthetics</Link>
            </div>
          )}
        </div>
        <Link href="/api-demo">API</Link>
        <Link href="/extensions">Extensions</Link>
      </div>
    </nav>
  );
}

"use client";
import { useState } from "react";

import Link from "next/link";

export default function Navbar() {
  const [demOpen, setDemOpen] = useState(false);
  return (
    <nav className="navbar">
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
    </nav>
  );
}

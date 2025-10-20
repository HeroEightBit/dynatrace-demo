"use client";
import { useState } from "react";
import Link from "next/link";

export default function RUMPage() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  function throwError() {
    try {
      // Simulate an error
      throw new Error("Simulated error for RUM");
    } catch (e) {
      setError("A simulated error occurred! Check Dynatrace for error capture.");
    }
  }

  return (
    <main>
      <h1>Dynatrace RUM Test Page</h1>
      <p>This page is for testing Dynatrace Real User Monitoring (RUM) integration.</p>


      <section style={{ margin: "32px 0", display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        {/* Grouped Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#f8fafc', borderRadius: 10, padding: 16, border: '1px solid #e5e7eb' }}>
          <div style={{ marginBottom: 4 }}>
            <button
              onClick={() => setCount((c) => c + 1)}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #a5b4fc", background: "#f1f5ff", cursor: "pointer", marginRight: 12 }}
            >
              Click Me
            </button>
            <span>Button pressed: <b>{count}</b> times</span>
            <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Increments a counter to test click events.</div>
          </div>
          <div style={{ marginBottom: 4 }}>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #fca5a5", background: "#fef2f2", color: "#b91c1c", cursor: "pointer" }}
            >
              Refresh Page
            </button>
            <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Reloads the page to test navigation and reload events.</div>
          </div>
          <div style={{ marginBottom: 4 }}>
            <button
              onClick={() => setShowModal(true)}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}
            >
              Open Modal
            </button>
            <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Opens a modal dialog for RUM event testing.</div>
          </div>
          <div style={{ marginBottom: 4 }}>
            <button
              onClick={throwError}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #f59e42", background: "#fff7ed", color: "#b45309", cursor: "pointer" }}
            >
              Simulate Error
            </button>
            {error && <span style={{ color: "#b91c1c", marginLeft: 12 }}>{error}</span>}
            <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Throws a JavaScript error to test error capture in Dynatrace.</div>
          </div>
        </div>

        <div>
          <label htmlFor="rum-input" style={{ fontWeight: 500, marginRight: 8 }}>Type something:</label>
          <input
            id="rum-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem" }}
            placeholder="Type here..."
          />
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Typing here generates input/change events for RUM.</div>
        </div>

        <div>
          <label style={{ fontWeight: 500, marginRight: 8 }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Check me
          </label>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Toggling this checkbox generates change events for RUM.</div>
        </div>

        <div>
          <label htmlFor="rum-dropdown" style={{ fontWeight: 500, marginRight: 8 }}>Choose an option:</label>
          <select
            id="rum-dropdown"
            value={dropdown}
            onChange={e => setDropdown(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem" }}
          >
            <option value="">Select...</option>
            <option value="one">Option One</option>
            <option value="two">Option Two</option>
            <option value="three">Option Three</option>
          </select>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Selecting an option generates select/change events for RUM.</div>
        </div>


        {/* Modal Dialog (only render once) */}
        {showModal && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 32, minWidth: 280, boxShadow: "0 4px 24px 0 rgba(30,64,175,0.13)" }}>
              <h2 style={{ marginTop: 0 }}>Modal Dialog</h2>
              <p>This is a modal. Interact and close to test RUM.</p>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "8px 16px", borderRadius: 6, border: "1.5px solid #a5b4fc", background: "#f1f5ff", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div>
          <label style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>Scrollable Box:</label>
          <div
            style={{
              border: '1.5px solid #e5e7eb',
              borderRadius: 8,
              height: 120,
              overflowY: 'auto',
              background: '#f9fafb',
              padding: 16,
              fontSize: '0.98rem',
              marginBottom: 8,
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div key={i}>Scrollable content line {i + 1}</div>
            ))}
          </div>
          <span style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Try scrolling inside this box to generate scroll events for RUM.
          </span>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 2 }}>Scrolling here generates scroll events for RUM.</div>
        </div>

        <div>
          <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>Go back to Home</Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useRef } from "react";

// Helper to check dtrum (must be outside the component and not inside JSX)
function getDtrum() {
  if (typeof window !== "undefined" && (window as any).dtrum) {
    return (window as any).dtrum;
  }
  return null;
}

export default function DTRUMPage() {
  // State for various API calls
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionName, setActionName] = useState("Custom Action");
  const [eventMsg, setEventMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorCode, setErrorCode] = useState(2);
  const [userId, setUserId] = useState("");
  const [valueName, setValueName] = useState("");
  const [valueVal, setValueVal] = useState("");
  const [sessionProps, setSessionProps] = useState("");
  const [userActionProps, setUserActionProps] = useState("");
  const [info, setInfo] = useState("");

  // Listener state/refs
  const [loadEndEvents, setLoadEndEvents] = useState<string[]>([]);
  const [beforeUnloadEvents, setBeforeUnloadEvents] = useState<string[]>([]);
  const [customActionEvents, setCustomActionEvents] = useState<string[]>([]);
  const loadEndListenerId = useRef<any>(null);
  const beforeUnloadListenerId = useRef<any>(null);
  const customActionListenerId = useRef<any>(null);

  // Listener registration (must be inside component to access setInfo)
  function addOnLoadEndListener() {
    const dtrum = getDtrum();
    if (dtrum && !loadEndListenerId.current) {
      loadEndListenerId.current = dtrum.addOnLoadEndListener(() => {
        setLoadEndEvents(evts => [...evts, `onLoadEnd: ${new Date().toLocaleTimeString()}`]);
      });
      setInfo("onLoadEnd listener registered.");
    } else {
      setInfo("Listener already registered or dtrum not available.");
    }
  }
  function removeOnLoadEndListener() {
    const dtrum = getDtrum();
    if (dtrum && loadEndListenerId.current) {
      dtrum.removeListener(loadEndListenerId.current);
      loadEndListenerId.current = null;
      setInfo("onLoadEnd listener removed.");
    } else {
      setInfo("No listener to remove or dtrum not available.");
    }
  }
  function addOnBeforeUnloadListener() {
    const dtrum = getDtrum();
    if (dtrum && !beforeUnloadListenerId.current) {
      beforeUnloadListenerId.current = dtrum.addOnBeforeUnloadListener(() => {
        setBeforeUnloadEvents(evts => [...evts, `onBeforeUnload: ${new Date().toLocaleTimeString()}`]);
      });
      setInfo("onBeforeUnload listener registered.");
    } else {
      setInfo("Listener already registered or dtrum not available.");
    }
  }
  function removeOnBeforeUnloadListener() {
    const dtrum = getDtrum();
    if (dtrum && beforeUnloadListenerId.current) {
      dtrum.removeListener(beforeUnloadListenerId.current);
      beforeUnloadListenerId.current = null;
      setInfo("onBeforeUnload listener removed.");
    } else {
      setInfo("No listener to remove or dtrum not available.");
    }
  }
  function addOnCustomActionListener() {
    const dtrum = getDtrum();
    if (dtrum && !customActionListenerId.current) {
      customActionListenerId.current = dtrum.addOnCustomActionListener((actionName: string) => {
        setCustomActionEvents(evts => [...evts, `onCustomAction: ${actionName} at ${new Date().toLocaleTimeString()}`]);
      });
      setInfo("onCustomAction listener registered.");
    } else {
      setInfo("Listener already registered or dtrum not available.");
    }
  }
  function removeOnCustomActionListener() {
    const dtrum = getDtrum();
    if (dtrum && customActionListenerId.current) {
      dtrum.removeListener(customActionListenerId.current);
      customActionListenerId.current = null;
      setInfo("onCustomAction listener removed.");
    } else {
      setInfo("No listener to remove or dtrum not available.");
    }
  }

  // DTRUM API wrappers
  function enterAction() {
    const dtrum = getDtrum();
    if (dtrum) {
      const id = dtrum.enterAction(actionName || "Custom Action");
      setActionId(id);
      setInfo("Action started. You can now leave the action.");
    } else {
      setInfo("dtrum not available. Make sure Dynatrace agent is injected.");
    }
  }
  function leaveAction() {
    const dtrum = getDtrum();
    if (dtrum && actionId) {
      dtrum.leaveAction(actionId);
      setInfo("Action left. Check Dynatrace for the action trace.");
      setActionId(null);
    } else {
      setInfo("No action to leave or dtrum not available.");
    }
  }
  function identifyUser() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.identifyUser(userId);
      setInfo("User identified: " + userId);
    } else {
      setInfo("dtrum not available.");
    }
  }
  function setUserActionProperties() {
    const dtrum = getDtrum();
    if (dtrum && actionId) {
      try {
        const props = JSON.parse(userActionProps || "{}")
        dtrum.setUserActionProperties(actionId, props);
        setInfo("User action properties set.");
      } catch {
        setInfo("Invalid JSON for user action properties.");
      }
    } else {
      setInfo("No action or dtrum not available.");
    }
  }
  function addActionProperties() {
    const dtrum = getDtrum();
    if (dtrum && actionId) {
      try {
        const props = JSON.parse(userActionProps || "{}")
        dtrum.addActionProperties(actionId, props);
        setInfo("Action properties added.");
      } catch {
        setInfo("Invalid JSON for action properties.");
      }
    } else {
      setInfo("No action or dtrum not available.");
    }
  }
  function reportError() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.reportError(errorMsg || "Test Error", errorCode);
      setInfo("Error reported.");
    } else {
      setInfo("dtrum not available.");
    }
  }
  function reportEvent() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.reportEvent(eventMsg || "Test Event");
      setInfo("Event reported.");
    } else {
      setInfo("dtrum not available.");
    }
  }
  function reportValue() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.reportValue(valueName, valueVal);
      setInfo("Value reported.");
    } else {
      setInfo("dtrum not available.");
    }
  }
  function reportSessionProperties() {
    const dtrum = getDtrum();
    if (dtrum) {
      try {
        const props = JSON.parse(sessionProps || "{}")
        dtrum.reportSessionProperties(props);
        setInfo("Session properties reported.");
      } catch {
        setInfo("Invalid JSON for session properties.");
      }
    } else {
      setInfo("dtrum not available.");
    }
  }
  function endSession() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.endSession();
      setInfo("Session ended.");
    } else {
      setInfo("dtrum not available.");
    }
  }
  function signalOnLoadEnd() {
    const dtrum = getDtrum();
    if (dtrum) {
      dtrum.signalOnLoadEnd();
      setInfo("signalOnLoadEnd called.");
    } else {
      setInfo("dtrum not available.");
    }
  }

  // Add more DTRUM API methods as needed

  return (
    <main>
      <section style={{ margin: "32px 0", display: "flex", flexDirection: "column", gap: 36, maxWidth: 700 }}>
        {/* Custom Action Controls */}
        <div style={{ border: '2px solid #2563eb', borderRadius: 12, background: '#f0f7ff', padding: 20, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: '1.18rem', color: '#1d4ed8' }}>Custom Actions</h2>
          <a
            href="https://www.dynatrace.com/support/doc/javascriptapi/doc/interfaces/dtrum-types.DtrumApi.html#enterAction"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.97rem', color: '#2563eb', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}
          >
            DTRUM API: enterAction / leaveAction
          </a>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <input
              type="text"
              value={actionName}
              onChange={e => setActionName(e.target.value)}
              placeholder="Action name"
              style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10 }}
            />
            <button
              onClick={enterAction}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #2563eb", background: "#e0e7ff", color: "#1d4ed8", cursor: "pointer", marginRight: 8 }}
              disabled={!!actionId}
            >
              Start Action
            </button>
            <button
              onClick={leaveAction}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #2563eb", background: "#e0e7ff", color: "#1d4ed8", cursor: "pointer" }}
              disabled={!actionId}
            >
              Leave Action
            </button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 8 }}>
            <b>enterAction/leaveAction:</b> Start and end a custom user action.
          </div>
          <div style={{ marginBottom: 12 }}>
            <textarea
              value={userActionProps}
              onChange={e => setUserActionProps(e.target.value)}
              placeholder='User action properties (JSON, e.g. {"foo":"bar"})'
              style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", width: 220, height: 40, marginRight: 10 }}
            />
            <button
              onClick={setUserActionProperties}
              style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #a5b4fc", background: "#f1f5ff", cursor: "pointer", marginRight: 8 }}
              disabled={!actionId}
            >
              Set User Action Properties
            </button>
            <button
              onClick={addActionProperties}
              style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #a5b4fc", background: "#f1f5ff", cursor: "pointer" }}
              disabled={!actionId}
            >
              Add Action Properties
            </button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 4 }}>
            <b>setUserActionProperties/addActionProperties:</b> Set or add properties to the current user action (JSON object).
          </div>
        </div>

        {/* Listener/Event Hook Controls */}
        <div style={{ border: '2px solid #16a34a', borderRadius: 12, background: '#f0fdf4', padding: 20, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: '1.18rem', color: '#166534' }}>Event Listeners & Hooks</h2>
          <a
            href="https://www.dynatrace.com/support/doc/javascriptapi/doc/interfaces/dtrum-types.DtrumApi.html#addOnLoadEndListener"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.97rem', color: '#2563eb', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}
          >
            DTRUM API: addOnLoadEndListener / addOnBeforeUnloadListener / addOnCustomActionListener / removeListener
          </a>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <button onClick={addOnLoadEndListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#dcfce7", color: "#166534", marginRight: 8 }}>Add onLoadEnd</button>
            <button onClick={removeOnLoadEndListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#f0fdf4", color: "#166534", marginRight: 8 }}>Remove onLoadEnd</button>
            <button onClick={addOnBeforeUnloadListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#dcfce7", color: "#166534", marginRight: 8 }}>Add onBeforeUnload</button>
            <button onClick={removeOnBeforeUnloadListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#f0fdf4", color: "#166534", marginRight: 8 }}>Remove onBeforeUnload</button>
            <button onClick={addOnCustomActionListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#dcfce7", color: "#166534", marginRight: 8 }}>Add onCustomAction</button>
            <button onClick={removeOnCustomActionListener} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid #16a34a", background: "#f0fdf4", color: "#166534" }}>Remove onCustomAction</button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 8 }}>
            <b>Listener events:</b>
            <div style={{ marginTop: 4 }}>
              <b>onLoadEnd:</b> {loadEndEvents.length ? loadEndEvents.map((e, i) => <span key={i} style={{ marginRight: 8 }}>{e}</span>) : <span style={{ color: '#94a3b8' }}>No events</span>}
            </div>
            <div style={{ marginTop: 4 }}>
              <b>onBeforeUnload:</b> {beforeUnloadEvents.length ? beforeUnloadEvents.map((e, i) => <span key={i} style={{ marginRight: 8 }}>{e}</span>) : <span style={{ color: '#94a3b8' }}>No events</span>}
            </div>
            <div style={{ marginTop: 4 }}>
              <b>onCustomAction:</b> {customActionEvents.length ? customActionEvents.map((e, i) => <span key={i} style={{ marginRight: 8 }}>{e}</span>) : <span style={{ color: '#94a3b8' }}>No events</span>}
            </div>
          </div>
        </div>

        {/* Session/User Controls */}
        <div style={{ border: '2px solid #16a34a', borderRadius: 12, background: '#f0fdf4', padding: 20, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: '1.18rem', color: '#166534' }}>Session & User</h2>
          <a
            href="https://www.dynatrace.com/support/doc/javascriptapi/doc/interfaces/dtrum-types.DtrumApi.html#identifyUser"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.97rem', color: '#2563eb', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}
          >
            DTRUM API: identifyUser / reportSessionProperties / endSession / signalOnLoadEnd
          </a>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="User ID"
              style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10 }}
            />
            <button
              onClick={identifyUser}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}
            >
              Identify User
            </button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.97rem', marginBottom: 8 }}>
            <b>identifyUser:</b> Set the user ID for the current session.
          </div>
          <div style={{ marginBottom: 12 }}>
            <textarea
              value={sessionProps}
              onChange={e => setSessionProps(e.target.value)}
              placeholder='Session properties (JSON, e.g. {"foo":"bar"})'
              style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", width: 220, height: 40, marginRight: 10 }}
            />
            <button
              onClick={reportSessionProperties}
              style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #a5b4fc", background: "#f1f5ff", cursor: "pointer" }}
            >
              Report Session Properties
            </button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 4 }}>
            <b>reportSessionProperties:</b> Set custom properties for the current session (JSON object).
          </div>
          <div style={{ marginTop: 16 }}>
            <button
              onClick={endSession}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #f59e42", background: "#fff7ed", color: "#b45309", cursor: "pointer", marginRight: 12 }}
            >
              End Session
            </button>
            <button
              onClick={signalOnLoadEnd}
              style={{ padding: "10px 18px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}
            >
              Signal OnLoadEnd
            </button>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.95rem', marginTop: 6 }}>
            <b>endSession:</b> End the current session. <b>signalOnLoadEnd:</b> Mark the end of page load for SPA.
          </div>
        </div>

        {/* Event, Error, Value Controls */}
        <div style={{ border: '2px solid #f59e42', borderRadius: 12, background: '#fff7ed', padding: 20, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: '1.18rem', color: '#b45309' }}>Events, Errors & Values</h2>
          <a
            href="https://www.dynatrace.com/support/doc/javascriptapi/doc/interfaces/dtrum-types.DtrumApi.html#reportEvent"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.97rem', color: '#2563eb', textDecoration: 'underline', marginBottom: 8, display: 'inline-block' }}
          >
            DTRUM API: reportEvent / reportError / reportValue
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 10 }}>
            <div>
              <input
                type="text"
                value={eventMsg}
                onChange={e => setEventMsg(e.target.value)}
                placeholder="Event message"
                style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10, marginBottom: 6 }}
              />
              <button
                onClick={reportEvent}
                style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}
              >
                Report Event
              </button>
            </div>
            <div>
              <input
                type="text"
                value={errorMsg}
                onChange={e => setErrorMsg(e.target.value)}
                placeholder="Error message"
                style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10, marginBottom: 6 }}
              />
              <input
                type="number"
                value={errorCode}
                onChange={e => setErrorCode(Number(e.target.value))}
                placeholder="Error code"
                style={{ width: 80, padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10, marginBottom: 6 }}
              />
              <button
                onClick={reportError}
                style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #f59e42", background: "#fff7ed", color: "#b45309", cursor: "pointer" }}
              >
                Report Error
              </button>
            </div>
            <div>
              <input
                type="text"
                value={valueName}
                onChange={e => setValueName(e.target.value)}
                placeholder="Value name"
                style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10, marginBottom: 6 }}
              />
              <input
                type="text"
                value={valueVal}
                onChange={e => setValueVal(e.target.value)}
                placeholder="Value"
                style={{ padding: "8px 12px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: "1rem", marginRight: 10, marginBottom: 6 }}
              />
              <button
                onClick={reportValue}
                style={{ padding: "8px 14px", fontSize: "1rem", borderRadius: 8, border: "1.5px solid #38bdf8", background: "#e0f2fe", color: "#0369a1", cursor: "pointer" }}
              >
                Report Value
              </button>
            </div>
          </div>
          <div style={{ color: '#b45309', fontSize: '0.97rem', marginTop: 4 }}>
            <b>reportEvent/reportError/reportValue:</b> Report custom events, errors, or values to Dynatrace.
          </div>
        </div>

        {/* Info output */}
        {info && (
          <div style={{ color: '#2563eb', fontWeight: 500, fontSize: '1.05rem', marginTop: 8 }}>{info}</div>
        )}
      </section>
      <div style={{ marginTop: 32, color: '#64748b', fontSize: '0.95rem' }}>
        <b>Note:</b> Not all DTRUM API methods are demoed here (e.g., advanced event hooks, deprecated methods). See <a href="https://www.dynatrace.com/support/doc/javascriptapi/doc/interfaces/dtrum-types.DtrumApi.html" target="_blank" rel="noopener noreferrer">DtrumApi docs</a> for full reference.
      </div>
    </main>
  );
}

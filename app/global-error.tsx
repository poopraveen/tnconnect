"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 400, padding: "0 16px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>{error.message}</p>
            <button
              onClick={reset}
              style={{ padding: "8px 16px", background: "#2563eb", color: "white", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600 }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

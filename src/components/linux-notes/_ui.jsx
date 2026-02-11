export function Section({ title, children }) {
  return (
    <section className="ln-section">
      <h2 className="ln-h2">{title}</h2>
      {children}
    </section>
  );
}

export function Callout({ title, tone = "info", children }) {
  return (
    <div className={`ln-callout ln-${tone}`}>
      <div className="ln-callout-title">{title}</div>
      <div className="ln-callout-body">{children}</div>
    </div>
  );
}

export function CodeBlock({ code }) {
  return (
    <pre className="ln-code">
      <code>{code}</code>
    </pre>
  );
}

export function SimpleTable({ headers, rows }) {
  return (
    <div className="ln-table-wrap">
      <table className="ln-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              {r.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RiskCard({ level, items }) {
  const tone = level === "High" ? "danger" : level === "Medium" ? "warn" : "ok";
  return (
    <div className={`ln-risk ln-${tone}`}>
      <div className="ln-risk-head">
        <span className="ln-risk-badge">{level}</span>
      </div>
      <ul className="ln-ul">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

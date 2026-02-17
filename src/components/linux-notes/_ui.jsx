import React from "react";

/**
 * _ui.jsx
 * 放在: src/components/linux-notes/_ui.jsx
 * 用途: Linux notes 共用 UI 元件
 *
 * 重點改動:
 * - SimpleTable 改成「像你示範圖」的 grid 對齊表格（非 <table>）
 * - 字體大小不變：沿用 ln-* class（大小由 CSS 決定）
 */

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

/**
 * ✅ SimpleTable（改成你想要的格式）
 * - headers: string[]
 * - rows: (string | ReactNode)[][]
 * - 第一欄較寬，其餘平均
 */
export function SimpleTable({ headers, rows }) {
  const colCount = Math.max(headers?.length ?? 0, rows?.[0]?.length ?? 0);

  const template = getTemplateColumns(colCount);
  const border = "1px solid rgba(148, 163, 184, 0.18)";
  const softLine = "1px solid rgba(148, 163, 184, 0.10)";

  return (
    <div className="ln-table-wrap">
      <div
        style={{
          marginTop: 12,
          border,
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(2, 6, 23, 0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: template,
            padding: "12px 16px",
            borderBottom: border,
            background: "rgba(15, 23, 42, 0.45)",
            fontWeight: 600, // 只讓表頭更清楚，不改字級
          }}
        >
          {headers.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((r, idx) => (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: template,
              padding: "12px 16px",
              borderBottom: idx === rows.length - 1 ? "none" : softLine,
            }}
          >
            {normalizeRow(r, colCount).map((cell, j) => (
              <div key={j}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
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

/* ---------------- helpers ---------------- */

function normalizeRow(row, colCount) {
  const r = Array.isArray(row) ? row : [];
  if (r.length === colCount) return r;
  // 補齊缺的欄位，避免 grid 欄數不一致
  return [...r, ...Array(Math.max(0, colCount - r.length)).fill("")];
}

/**
 * 欄寬策略（第一欄寬一點，符合你圖的視覺）
 * - 2欄：55 / 45
 * - 3欄：44 / 32 / 24（你示範圖的感覺）
 * - 4+欄：第一欄 34%，其餘平均分剩下 66%
 */
function getTemplateColumns(n) {
  if (n <= 1) return "1fr";
  if (n === 2) return "55% 45%";
  if (n === 3) return "44% 32% 24%";
  const first = 34;
  const rest = (100 - first) / (n - 1);
  return `${first}% ${Array.from({ length: n - 1 })
    .map(() => `${rest}%`)
    .join(" ")}`;
}

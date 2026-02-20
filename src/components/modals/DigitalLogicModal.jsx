import { useMemo, useState } from "react";
import "./LinuxNotesModal.css"; // 沿用同一套 Modal 外觀（overlay / sidebar / content）

/**
 * DigitalLogicModal.jsx
 * - 放在: src/components/DigitalLogicModal.jsx
 * - 目的: 用 LinuxNotes 的筆記 UI（ln-note / ln-section / ln-table...）呈現數位邏輯作品文案
 * - 改動: 所有 BOM 表格改成「三欄對齊規格表」(div grid)，字體大小不變，只改格式
 */

export default function DigitalLogicModal({ isOpen, onClose }) {
  const sections = useMemo(
    () => [
      { key: "counter", title: "① 多位數十進位計數整合", Comp: ProjectCounterDisplay },
      { key: "jk", title: "② JK Flip-Flop 時序設計", Comp: ProjectJKFF },
      { key: "modular", title: "③ 模組化組合邏輯", Comp: ProjectModularLogic },
    ],
    []
  );

  const [currentKey, setCurrentKey] = useState(sections[0].key);
  const current = sections.find((s) => s.key === currentKey) ?? sections[0];
  const CurrentComp = current.Comp;

  if (!isOpen) return null;

  return (
    <div className="lnm-overlay" onMouseDown={onClose}>
      <div className="lnm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="lnm-topbar">
          <div>
            <div className="lnm-title">Digital Logic Notes</div>
            <div className="lnm-sub">數位邏輯作品整理（工程技術文檔風）</div>
          </div>
          <button className="lnm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="lnm-body">
          <aside className="lnm-sidebar">
            {sections.map((s) => (
              <button
                key={s.key}
                className={`lnm-item ${currentKey === s.key ? "active" : ""}`}
                onClick={() => setCurrentKey(s.key)}
              >
                {s.title}
              </button>
            ))}
          </aside>

          <main className="lnm-content">
            <CurrentComp />
          </main>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Page ①：多位數十進位計數與七段顯示整合
   ========================= */

function ProjectCounterDisplay() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>多位數十進位計數與七段顯示整合</h1>
        <p className="ln-subtitle">
          多顆計數器串接與顯示解碼整合，包含時脈與清除控制，屬於「完整系統級」整合實作。
        </p>
      </header>

      <Callout title="模組定位" tone="info">
        此作品重點在於<strong>多級計數器串接（Carry Propagation）</strong>與
        <strong>BCD→七段顯示解碼</strong>的系統整合；不是單一元件驗證，而是完整鏈路的功能驗證。
      </Callout>

      <Section title="使用元件（BOM）">
        <SpecTable
          headers={["元件 / 模組", "用途", "備註"]}
          rows={[
            ["7490 十進位計數器 × 多顆", "多位數計數與進位串接", "Carry 需要正確傳遞"],
            ["7447 BCD→七段顯示解碼器", "驅動七段顯示", "搭配顯示器端規格"],
            ["組合邏輯（AND / NOT）", "控制與條件判斷", "用於 reset / 進位條件"],
            ["自訂模組化方塊（.bsf）", "階層式設計 / 重用", "提升可讀性"],
          ]}
        />
      </Section>

      <Section title="架構類型">
        <Callout title="分類" tone="ok">
          <strong>時序邏輯系統（多階段串接計數器）</strong>：以 clock 驅動狀態變化，並透過進位信號串接多位數。
        </Callout>
      </Section>

      <Section title="功能說明">
        <ul className="ln-ul">
          <li>實作多位數十進位計數</li>
          <li>設計進位串接（Carry Propagation）確保位數正確遞增</li>
          <li>將 BCD 輸出轉換為七段顯示（7447 解碼）</li>
          <li>整合 Clock 與 Reset 控制（可控啟動 / 歸零）</li>
        </ul>
      </Section>

      <Section title="技術重點">
        <RiskCard
          level="High"
          items={[
            "多級串接的進位時序一致性（carry chain correctness）",
            "Reset/清除訊號對各級計數器的同步/非同步影響",
          ]}
        />
        <RiskCard
          level="Medium"
          items={[
            "BCD→七段顯示解碼的接線一致性與顯示器規格匹配",
            "分層式設計：上層整合與子模組界面定義",
          ]}
        />
        <RiskCard level="Low" items={["基本邏輯閘條件控制與線路整理"]} />
      </Section>

      <Section title="檔案">
        <CodeBlock code={`1227-1.bdf`} />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Digital Logic • Counter + Display Integration</small>
      </footer>
    </div>
  );
}

/* =========================
   Page ②：JK Flip-Flop 時序邏輯設計
   ========================= */

function ProjectJKFF() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>JK Flip-Flop 時序邏輯系統設計</h1>
        <p className="ln-subtitle">
          以 JK Flip-Flop 為核心進行狀態轉換設計，搭配組合邏輯產生輸出並可延伸至顯示系統。
        </p>
      </header>

      <Callout title="為什麼選它？" tone="info">
        重點在於<strong>狀態轉換（state transition）</strong>與<strong>輸出對應</strong>，
        屬於時序電路層級的設計能力展示。
      </Callout>

      <Section title="使用元件（BOM）">
        <SpecTable
          headers={["元件 / 模組", "用途", "備註"]}
          rows={[
            ["7476 JK Flip-Flop", "狀態暫存與時脈觸發轉換", "核心時序元件"],
            ["AND / OR / NOT 組合邏輯", "輸入 / 輸出邏輯產生", "對應狀態表"],
            ["7447 顯示解碼器（可選）", "狀態可視化呈現", "視需求整合"],
          ]}
        />
      </Section>

      <Section title="架構類型">
        <Callout title="分類" tone="ok">
          <strong>時序邏輯（State-Based Design）</strong>：以 FF 儲存狀態，使用組合邏輯決定下一狀態與輸出。
        </Callout>
      </Section>

      <Section title="功能說明">
        <ul className="ln-ul">
          <li>透過時脈觸發實現狀態轉換</li>
          <li>設計狀態對應之輸出邏輯</li>
          <li>結合顯示系統進行結果呈現（可選整合）</li>
        </ul>
      </Section>

      <Section title="技術重點">
        <RiskCard
          level="High"
          items={[
            "FF 行為理解：J/K 組合對 Q 的影響與時序關係",
            "狀態邏輯設計：state diagram / state table 正確性",
          ]}
        />
        <RiskCard
          level="Medium"
          items={[
            "輸出邏輯化簡（Boolean simplification）",
            "時序控制與同步概念實作",
          ]}
        />
        <RiskCard level="Low" items={["顯示解碼整合與輸出對應整理"]} />
      </Section>

      <Section title="檔案">
        <CodeBlock code={`1227-3.bdf`} />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Digital Logic • JK FF Sequencing</small>
      </footer>
    </div>
  );
}

/* =========================
   Page ③：模組化組合邏輯設計（自訂 Symbol）
   ========================= */

function ProjectModularLogic() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>模組化組合邏輯設計（自訂 Symbol）</h1>
        <p className="ln-subtitle">
          以階層式設計拆分布林邏輯並封裝成可重用模組（.bsf），強調可讀性與可維護性。
        </p>
      </header>

      <Callout title="為什麼選它？" tone="info">
        此作品展示<strong>抽象化（Abstraction）</strong>與<strong>重用（Reusability）</strong>，
        代表你不只會接線，還會做「工程化結構整理」。
      </Callout>

      <Section title="使用元件（BOM）">
        <SpecTable
          headers={["元件 / 模組", "用途", "備註"]}
          rows={[
            ["AND / OR / XOR / NAND 等邏輯閘", "實作布林邏輯", "依設計需求組合"],
            ["自訂 Symbol 模組（.bsf）", "封裝子模組供上層使用", "可讀性 / 維護性提升"],
          ]}
        />
      </Section>

      <Section title="架構類型">
        <Callout title="分類" tone="ok">
          <strong>階層式組合邏輯設計（Hierarchical Design）</strong>：將複雜邏輯拆分成子模組，於上層整合。
        </Callout>
      </Section>

      <Section title="功能說明">
        <ul className="ln-ul">
          <li>將布林邏輯拆解為可重複使用模組</li>
          <li>建立子模組並於上層電路整合</li>
          <li>提升電路可讀性與可維護性</li>
        </ul>
      </Section>

      <Section title="技術重點">
        <RiskCard
          level="High"
          items={[
            "模組抽象化（interface 清楚、子模組邊界明確）",
            "分層架構規劃（hierarchy correctness）",
          ]}
        />
        <RiskCard
          level="Medium"
          items={[
            "元件重用（子模組一致性 / 可替換性）",
            "邏輯結構整理（命名、分群、可讀性）",
          ]}
        />
        <RiskCard level="Low" items={["基本邏輯閘功能驗證與接線整理"]} />
      </Section>

      <Section title="檔案">
        <CodeBlock code={`1101-2.bdf\n1101-2.bsf`} />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Digital Logic • Modular Combinational Design</small>
      </footer>
    </div>
  );
}

/* =========================================================
   SpecTable：你要的「三欄對齊格式」(像你貼的圖片)
   - 字級不動，只做排列與分隔線
   ========================================================= */

function SpecTable({ headers, rows }) {
  const border = "1px solid rgba(148, 163, 184, 0.18)";
  const softLine = "1px solid rgba(148, 163, 184, 0.10)";

  return (
    <div
      style={{
        marginTop: 12,
        border,
        borderRadius: 14,
        overflow: "hidden",
        background: "rgba(2, 6, 23, 0.15)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44% 32% 24%",
          padding: "12px 16px",
          borderBottom: border,
          background: "rgba(15, 23, 42, 0.45)",
          fontWeight: 600, // 只讓表頭略清楚，不改字級
        }}
      >
        {headers.map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>

      {rows.map((r, idx) => (
        <div
          key={idx}
          style={{
            display: "grid",
            gridTemplateColumns: "44% 32% 24%",
            padding: "12px 16px",
            borderBottom: idx === rows.length - 1 ? "none" : softLine,
          }}
        >
          <div>{r[0]}</div>
          <div>{r[1]}</div>
          <div>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Small UI primitives (no dependencies) ---------- */

function Section({ title, children }) {
  return (
    <section className="ln-section">
      <h2 className="ln-h2">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ title, tone = "info", children }) {
  return (
    <div className={`ln-callout ln-${tone}`}>
      <div className="ln-callout-title">{title}</div>
      <div className="ln-callout-body">{children}</div>
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="ln-code">
      <code>{code}</code>
    </pre>
  );
}

function RiskCard({ level, items }) {
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

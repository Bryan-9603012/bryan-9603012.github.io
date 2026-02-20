import { useTerminal } from "./useTerminal";

export default function HeroSection({ onOpenLinux, onOpenPico, onOpenDigitalLogic }) {
  const {
    terminalOutput,
    terminalInput,
    setTerminalInput,
    terminalRef,
    inputRef,
    currentPathRef,
    processTerminalCommand,
  } = useTerminal();

  return (
    <section className="hero-section">
      <div className="hero-text">
        <p className="hero-eyebrow">PORTFOLIO • 2025</p>
        <h1 className="hero-title">資安 CTF + React 前端，實戰技能全展示</h1>
        <p className="hero-subtitle">
          我是 <strong>劉興源</strong>，目前把重心放在 Linux 系統能力與 CTF
          解題思路，同時用 React 把內容整理成可讀、可展示的形式。
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn">
            看我的學習主舞台
          </a>
          <button type="button" className="ghost btn" onClick={onOpenLinux}>
            開啟 Linux Notes
          </button>
          <button type="button" className="ghost btn" onClick={onOpenPico}>
            開啟 picoCTF Writeups
          </button>
          <button type="button" className="ghost btn" onClick={onOpenDigitalLogic}>
            開啟 Digital Logic
          </button>
        </div>

        <p className="hero-note">
          目前沒有「產品型專案」在進行，但我有持續產出可驗證的學習成果（筆記、題解、整理）。
        </p>
      </div>

      {/* ===== Terminal ===== */}
      <div className="hero-card card">
        <h3 className="hero-card-title">即時面板 · Terminal</h3>

        <div
          ref={terminalRef}
          style={{
            height: "340px",
            background: "#000",
            color: "#00ff41",
            padding: "20px",
            borderRadius: "12px",
            fontFamily: "monospace",
            fontSize: "14px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            lineHeight: "1.4",
            boxShadow: "inset 0 0 20px rgba(0,255,65,0.1)",
          }}
        >
          {terminalOutput.map((line, i) => (
            <div key={i} style={{ marginBottom: "4px" }}>
              {line}
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
            <span
              style={{
                color: "#00ffff",
                marginRight: "8px",
                fontWeight: 600,
                minWidth: "140px",
              }}
            >
              bryan@portfolio:{currentPathRef.current}$
            </span>

            <input
              ref={inputRef}
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && terminalInput.trim()) {
                  processTerminalCommand(terminalInput.trim());
                }
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#00ff41",
                outline: "none",
                flex: 1,
              }}
              placeholder="試試 ls 或 help..."
            />
          </div>
        </div>

        <div className="hint" style={{ fontSize: "13px", marginTop: "8px" }}>
          ← 試試：ls / help / cd linux / cd notebook / pwd / clear
        </div>
      </div>
    </section>
  );
}
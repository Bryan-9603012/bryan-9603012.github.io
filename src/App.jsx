import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import PicoCTFModal from "./components/PicoCTFModal";
import LinuxNotesModal from "./components/LinuxNotesModal";
import DigitalLogicModal from "./components/DigitalLogicModal";
import BadgeSvg from "./components/BadgeSvg";
import "./App.css";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);
  const [showLinuxNotes, setShowLinuxNotes] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);

  // ===== Terminal 狀態 =====
  const [terminalOutput, setTerminalOutput] = useState([
    "歡迎來到 Bryan 的 Linux 學習終端！",
    "輸入 ls 查看教學內容，help 查看所有指令",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalRef = useRef(null);
  const currentPathRef = useRef("root");
  const inputRef = useRef(null);

  const processTerminalCommand = useCallback((cmd) => {
    const fullCmd = `bryan@portfolio:${currentPathRef.current}$ ${cmd}`;
    setTerminalOutput((prev) => [...prev, fullCmd]);

    const parts = cmd.trim().toLowerCase().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case "ls": {
        const items =
          currentPathRef.current === "root"
            ? "📁 linux"
            : currentPathRef.current === "linux"
            ? "📓 notebook"
            : "ch1 ch2 ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 ch11 ch15 ch16 ch17 ch18 ch19 ch22 ch23 ch24 ch25 ch26 ch29 ch30";
        setTerminalOutput((prev) => [...prev, items]);
        break;
      }

      case "help":
        setTerminalOutput((prev) => [
          ...prev,
          "📁 檔案系統: ls cd pwd",
          "💻 系統資訊: whoami role status",
          "🧹 其他: clear help",
          "✅ 流程: cd linux → cd notebook → ls",
          "",
        ]);
        break;

      case "whoami":
        setTerminalOutput((prev) => [...prev, "劉興源 (Bryan)"]);
        break;

      case "role":
        setTerminalOutput((prev) => [...prev, "資安學生 / React 開發者"]);
        break;

      case "status":
        setTerminalOutput((prev) => [
          ...prev,
          "Learning: Linux Roadmap + picoCTF Writeups + React UI",
        ]);
        break;

      case "clear":
      case "清除":
        setTerminalOutput(["畫面已清除！"]);
        break;

      case "cd":
        if (!args[0]) {
          currentPathRef.current = "root";
          setTerminalOutput((prev) => [...prev, "回到根目錄"]);
          break;
        }

        if (args[0] === "linux" && currentPathRef.current === "root") {
          currentPathRef.current = "linux";
          setTerminalOutput((prev) => [...prev, "進入 linux 目錄"]);
          break;
        }

        if (args[0] === "notebook" && currentPathRef.current === "linux") {
          currentPathRef.current = "notebook";
          setTerminalOutput((prev) => [...prev, "進入 notebook"]);
          break;
        }

        if (args[0] === ".." && currentPathRef.current !== "root") {
          currentPathRef.current =
            currentPathRef.current === "notebook" ? "linux" : "root";
          setTerminalOutput((prev) => [...prev, "回到上一層目錄"]);
          break;
        }

        setTerminalOutput((prev) => [
          ...prev,
          `cd: ${args[0]}: No such directory`,
        ]);
        break;

      case "pwd":
        setTerminalOutput((prev) => [...prev, `/${currentPathRef.current}`]);
        break;

      default:
        setTerminalOutput((prev) => [
          ...prev,
          `bash: ${command}: command not found`,
        ]);
    }

    setTerminalInput("");
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [terminalOutput]);

  // ===== 只放「目前真的有的成果」(不補滿、不生成假徽章) =====
  const achievements = useMemo(
    () => ({
      linux: [
        { label: "Permissions（權限）", status: "done" },
        { label: "Users / Groups（使用者）", status: "doing" },
      ],
      ctf: [
        { label: "picoCTF Writeups（整理中）", status: "doing" },
        { label: "Web 類題型", status: "doing" },
        { label: "General Skills", status: "done" },
      ],
      tools: [
        { label: "Linux CLI", status: "doing" },
        { label: "React 基礎", status: "doing" },
      ],
    }),
    []
  );

  return (
    <>
      {/* 背景 */}
      <div className="glow-bg" />
      <div className="hero-gradient" aria-hidden="true" />

      {/* ===== Header ===== */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">
            <div className="brand-logo">劉</div>
            <div className="brand-text">
              <div className="brand-name">Bryan Liu</div>
              <div className="brand-tagline">Student • Cyber & Web Dev</div>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#services">服務內容</a>
            <a href="#projects">學習主舞台</a>
            <a href="#learning">成果徽章</a>
            <a href="#contact">聯絡我</a>
          </nav>
        </div>
      </header>

      {/* ===== Main ===== */}
      <main className="page-main">
        {/* ===== Hero ===== */}
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
              <button
                type="button"
                className="ghost btn"
                onClick={() => setShowLinuxNotes(true)}
              >
                開啟 Linux Notes
              </button>
              <button
                type="button"
                className="ghost btn"
                onClick={() => setShowPicoPage(true)}
              >
                開啟 picoCTF Writeups
              </button>
              <button
                type="button"
                className="ghost btn"
                onClick={() => setShowDigitalLogic(true)}
              >
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

        {/* ===== Services ===== */}
        <section id="services" className="section-card">
          <h2>我現在在做什麼？</h2>
          <p className="section-desc">
            以前端為主，搭配資安與 Linux 系統實作，培養能實戰、能解釋的工程能力。
          </p>

          <div className="services-grid">
            <div className="service-item">
              <h3>前端介面與互動</h3>
              <p>HTML、Modern CSS、RWD 與互動效果實作。</p>
            </div>

            <div className="service-item">
              <h3>React 應用開發</h3>
              <p>Component 設計、Modal、狀態管理與模組化。</p>
            </div>

            <div className="service-item">
              <h3>Linux 與資安實務</h3>
              <p>權限、使用者、服務與 CTF 常見觀念整理。</p>
            </div>
          </div>
        </section>

        {/* ===== 學習主舞台（Linux / picoCTF / DigitalLogic 並排） ===== */}
        <section id="projects" className="section-card">
          <h2>學習主舞台</h2>
          <p className="section-desc">
            目前主力是三條線：Linux 打地基、picoCTF 練實戰、Digital Logic 展示硬體/系統整合能力。
          </p>

          <div className="learning-grid three-col">
            {/* Linux Notes */}
            <div className="learning-item">
              <div className="learning-head">
                <h3>Linux / CLI 筆記</h3>
                <span className="mini-pill">System Learning</span>
              </div>
              <p>
                以資安視角整理 Linux 的權限、使用者、服務與系統管理概念，強調「為什麼要這樣設計」。
              </p>
              <ul className="learning-points">
                <li>最小權限原則（Least Privilege）</li>
                <li>使用者 / 群組 / sudo 觀念</li>
                <li>服務管理與日誌追蹤</li>
              </ul>
              <div className="learning-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowLinuxNotes(true)}
                >
                  開啟 Linux Notes
                </button>
                <a className="ghost btn" href="#learning">
                  看成果徽章
                </a>
              </div>
            </div>

            {/* picoCTF */}
            <div className="learning-item">
              <div className="learning-head">
                <h3>picoCTF 解題紀錄</h3>
                <span className="mini-pill">Practical CTF</span>
              </div>
              <p>
                將題目依類型整理，記錄解題思路、踩過的坑與修正方式，讓「怎麼想」比「答案」更清楚。
              </p>
              <ul className="learning-points">
                <li>Web / Crypto / General Skills</li>
                <li>解題流程（輸入 → 觀察 → 推理 → 驗證）</li>
                <li>常見陷阱：編碼、權限、路徑、條件繞過</li>
              </ul>
              <div className="learning-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowPicoPage(true)}
                >
                  開啟 Writeups
                </button>
                <a className="ghost btn" href="#learning">
                  看成果徽章
                </a>
              </div>
            </div>

            {/* Digital Logic */}
            <div className="learning-item">
              <div className="learning-head">
                <h3>Digital Logic</h3>
                <span className="mini-pill">Hardware / System</span>
              </div>
              <p>
                數位邏輯作品文檔整理：多位數計數與顯示整合、JK FF 時序設計、模組化組合邏輯。
              </p>
              <ul className="learning-points">
                <li>多級計數器串接（Carry Propagation）</li>
                <li>State-Based Design（JK Flip-Flop）</li>
                <li>階層式設計（自訂 Symbol / 可重用）</li>
              </ul>
              <div className="learning-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowDigitalLogic(true)}
                >
                  開啟 Digital Logic
                </button>
                <a className="ghost btn" href="#learning">
                  看成果徽章
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 成果徽章：只渲染目前有的，不補滿 ===== */}
        <section id="learning" className="section-card">
          <h2>成果徽章</h2>
          <p className="section-desc">
            只呈現目前「真的有進度」的內容：完成 / 進行中。讓成果可追蹤、可驗證，不用填滿牆。
          </p>

          <div className="badge-panels">
            {/* Linux */}
            <div className="badge-panel">
              <div className="badge-panel-title">
                <h3>Linux Roadmap</h3>
                <p>以系統管理＋資安視角為主</p>
              </div>

              <div className="badge-row">
                {achievements.linux.map((b) => (
                  <div key={b.label} className="badge-svg-item">
                    <BadgeSvg
                      status={b.status}
                      title="Linux Roadmap"
                      subtitle="System + Security"
                      size={160}
                      showLock={true}
                    />
                    <div className="badge-svg-caption">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* picoCTF */}
            <div className="badge-panel">
              <div className="badge-panel-title">
                <h3>picoCTF Progress</h3>
                <p>以題型分類累積解題思路</p>
              </div>

              <div className="badge-row">
                {achievements.ctf.map((b) => (
                  <div key={b.label} className="badge-svg-item">
                    <BadgeSvg
                      status={b.status}
                      title="picoCTF"
                      subtitle="Writeups + Thinking"
                      size={160}
                      showLock={false}
                    />
                    <div className="badge-svg-caption">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tooling */}
            <div className="badge-panel">
              <div className="badge-panel-title">
                <h3>Tooling</h3>
                <p>日常使用與熟悉度</p>
              </div>

              <div className="badge-row">
                {achievements.tools.map((b) => (
                  <div key={b.label} className="badge-svg-item">
                    <BadgeSvg
                      status={b.status}
                      title="Tooling"
                      subtitle="Daily Practice"
                      size={160}
                      showLock={false}
                    />
                    <div className="badge-svg-caption">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="section-card contact-section">
          <div className="contact-text">
            <h2>一起做點有趣的東西？</h2>
            <p className="section-desc">
              如果你對 Linux / CTF / 學習交流有興趣，歡迎寄信給我一起討論。
            </p>
          </div>
          <div className="contact-actions">
            <a className="btn" href="mailto:bryanhuang710910@gmail.com">
              寄信給我
            </a>
            <a className="ghost btn" href="#projects">
              回到學習主舞台
            </a>
          </div>
        </section>
      </main>

      {/* ===== Modals ===== */}
      <PicoCTFModal
        isOpen={showPicoPage}
        onClose={() => setShowPicoPage(false)}
      />
      <LinuxNotesModal
        isOpen={showLinuxNotes}
        onClose={() => setShowLinuxNotes(false)}
      />
      <DigitalLogicModal
        isOpen={showDigitalLogic}
        onClose={() => setShowDigitalLogic(false)}
      />
    </>
  );
}

export default App;

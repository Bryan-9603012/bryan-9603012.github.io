import { useState, useRef, useCallback, useEffect } from "react";
import PicoCTFModal from "./components/PicoCTFModal";
import LinuxNotesModal from "./components/LinuxNotesModal";
import Skills from "./components/Skills";
import "./App.css";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);
  const [showLinuxNotes, setShowLinuxNotes] = useState(false);

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

      case "whoami":
        setTerminalOutput((prev) => [...prev, "劉興源 (Bryan)"]);
        break;

      case "role":
        setTerminalOutput((prev) => [...prev, "資安學生 / React 開發者"]);
        break;

      case "status":
        setTerminalOutput((prev) => [
          ...prev,
          "Online: 127 visits | CTF Rank: 1337 | Learning Linux",
        ]);
        break;

      case "clear":
      case "清除":
        setTerminalOutput(["畫面已清除！"]);
        break;

      case "help":
        setTerminalOutput((prev) => [
          ...prev,
          "📁 檔案系統: ls cd cat pwd",
          "💻 系統資訊: uname whoami role status",
          "🧹 其他: clear help",
          "✅ 流程: cd linux → cd notebook → ls → cat ch1",
          "📚 30章內容: ch1~ch30 每章獨立內容！",
          "",
        ]);
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
        } else if (
          args[0] === "notebook" &&
          currentPathRef.current === "linux"
        ) {
          currentPathRef.current = "notebook";
          setTerminalOutput((prev) => [
            ...prev,
            "進入 notebook (30章 Linux 教學)",
          ]);
        } else if (args[0] === ".." && currentPathRef.current !== "root") {
          currentPathRef.current =
            currentPathRef.current === "notebook" ? "linux" : "root";
          setTerminalOutput((prev) => [...prev, "回到上一層目錄"]);
        } else {
          setTerminalOutput((prev) => [
            ...prev,
            `cd: ${args[0]}: No such directory`,
          ]);
        }
        break;

      case "pwd":
        setTerminalOutput((prev) => [
          ...prev,
          `/${currentPathRef.current}`,
        ]);
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
              <div className="brand-tagline">
                Student • Cyber & Web Dev
              </div>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#services">服務內容</a>
            <a href="#projects">專案</a>
            <a href="#learning">學習記錄</a>
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
            <h1 className="hero-title">
              資安 CTF + React 前端，實戰技能全展示
            </h1>
            <p className="hero-subtitle">
              我是 <strong>劉興源</strong>，目前專注在前端開發、資安
              CTF 與 Linux 環境練習。
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn">
                查看專案
              </a>
              <button
                type="button"
                className="ghost btn"
                onClick={() => setShowPicoPage(true)}
              >
                查看 picoCTF 解析
              </button>
            </div>
          </div>

          {/* ===== Terminal ===== */}
          <div className="hero-card card">
            <h3 className="hero-card-title">
              即時面板 · Terminal
            </h3>
            <div
              ref={terminalRef}
              style={{
                height: "340px",
                background: "#000",
                color: "#00ff41",
                padding: "20px",
                borderRadius: "12px",
                fontFamily:
                  '"Courier New", monospace, Consolas',
                fontSize: "14px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {terminalOutput.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    color: "#00ffff",
                    marginRight: "8px",
                  }}
                >
                  bryan@portfolio:{currentPathRef.current}$
                </span>
                <input
                  ref={inputRef}
                  value={terminalInput}
                  onChange={(e) =>
                    setTerminalInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      terminalInput.trim()
                    ) {
                      processTerminalCommand(
                        terminalInput.trim()
                      );
                    }
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#00ff41",
                    outline: "none",
                    flex: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 學習記錄 ===== */}
        <section id="learning" className="section-card">
          <h2>學習記錄</h2>
          <div className="learning-grid">
            <div className="learning-item">
              <h3>Linux / CLI</h3>
              <p>常用指令與資安視角系統筆記。</p>
              <button
                type="button"
                className="ghost btn"
                style={{ marginTop: "10px" }}
                onClick={() => setShowLinuxNotes(true)}
              >
                開啟 Linux Notes
              </button>
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section
          id="contact"
          className="section-card contact-section"
        >
          <h2>一起做點有趣的東西？</h2>
          <a
            className="btn"
            href="mailto:bryanhuang710910@gmail.com"
          >
            寄信給我
          </a>
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
    </>
  );
}

export default App;

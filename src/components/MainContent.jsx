// src/components/MainContent.jsx
import Terminal from "./Terminal";
import Skills from "./Skills";
import Achievements from "./Achievements";

// 從父層 App 傳進來，用來打開 picoCTF 解題 Modal
export default function MainContent({ onOpenPico }) {
  return (
    <main className="page-main">
      {/* ===== Hero 區：左文右 Terminal，仿 BitShield 第一屏 ===== */}
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-eyebrow">PORTFOLIO • 2025</p>
          <h1 className="hero-title">為專案打造可靠又好看的技術基礎</h1>
          <p className="hero-subtitle">
            我是 <strong>劉興源</strong>，目前專注在前端開發、picoCTF 與 Linux
            環境練習。這裡是我集中作品、練習與學習筆記的地方。
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn">
              查看專案
            </a>
            <button
              type="button"
              className="ghost btn"
              onClick={onOpenPico}
            >
              查看 picoCTF 解析
            </button>
          </div>

          <p className="hero-note">
            目前持續更新 React、CSS 動效與 picoCTF 題解。
          </p>
        </div>

        <div className="hero-card card">
          <h3 className="hero-card-title">即時面板 · Terminal</h3>
          <Terminal />
          <div className="hint">
            ← 可用指令：whoami、role、status、help、clear、問問題
          </div>
        </div>
      </section>

      {/* ===== 服務 / 我現在在做什麼 ===== */}
      <section id="services" className="section-card">
        <h2>我現在在做什麼？</h2>
        <p className="section-desc">
          以前端為主，搭配一點資安與系統操作，慢慢把自己變成
          「能切版、會寫邏輯、懂一點安全」的工程師。
        </p>

        <div className="services-grid">
          <div className="service-item">
            <h3>前端切版與互動</h3>
            <p>HTML、Modern CSS、RWD、基本無障礙與互動效果。</p>
          </div>
          <div className="service-item">
            <h3>React 小專案</h3>
            <p>用 React 做個人面板、作品展示與簡單狀態管理。</p>
          </div>
          <div className="service-item">
            <h3>CTF / 資安入門</h3>
            <p>從 picoCTF 題目學 Web / Crypto / Linux 相關觀念。</p>
          </div>
        </div>

        <div className="skills-row">
          <h3>目前技能</h3>
          <Skills />
        </div>
      </section>

      {/* ===== 專案區 ===== */}
      <section id="projects" className="section-card">
        <h2>專案 / 練習</h2>
        <p className="section-desc">
          這些是目前公開的練習作品，之後會持續增加新的網站與工具。
        </p>

        <div className="proj-list">
          <div className="proj">
            <div>
              <div className="proj-title">個人作品集網站</div>
              <div className="proj-meta">React．CSS．GitHub Pages</div>
            </div>
            <a
              className="btn"
              href="https://bryan-9603012.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              檢視
            </a>
          </div>

          <div className="proj">
            <div>
              <div className="proj-title">CSS 實驗室</div>
              <div className="proj-meta">互動效果與微動畫練習</div>
            </div>
            <a className="ghost btn" href="#">
              程式碼
            </a>
          </div>

          <div className="proj">
            <div>
              <div className="proj-title">picoCTF Writeups</div>
              <div className="proj-meta">Web / Crypto 題目解題整理</div>
            </div>
            <button
              type="button"
              className="ghost btn"
              onClick={onOpenPico}
            >
              查看解析
            </button>
          </div>
        </div>
      </section>

      {/* ===== 學習記錄區 ===== */}
      <section id="learning" className="section-card">
        <h2>學習記錄</h2>
        <p className="section-desc">
          把在課堂、線上資源與 CTF 中學到的內容簡單整理，方便自己回顧。
        </p>

        <div className="learning-grid">
          <div className="learning-item">
            <h3>React 基礎筆記</h3>
            <p>JSX、Component、State、props 等核心觀念整理。</p>
          </div>

          <div className="learning-item">
            <h3>Linux / CLI</h3>
            <p>常用指令、檔案操作與在 CTF / 開發中會用到的工具。</p>
          </div>

          <div className="learning-item">
            <h3>picoCTF 題目分類</h3>
            <p>照類型把題目與常見解法做索引，方便回顧。</p>

            <ul
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "var(--text-muted)",
                paddingLeft: "18px",
              }}
            >
              <li>
                簡單題：
                <span> FANTASY CTF、Log Hunt、Super SSH、Net Cat 系列…</span>
              </li>
              <li>
                一般題：
                <span> Repetitions、Rotation、SansAlpha…</span>
              </li>
              <li>
                進階技巧：
                <span> InterEncDec（多層解碼）、Pie Time（ret2win）</span>
              </li>
              <li style={{ marginTop: "4px" }}>
                更詳細解析 →
                <button
                  type="button"
                  className="ghost btn"
                  style={{
                    marginLeft: "6px",
                    padding: "2px 8px",
                    fontSize: "12px",
                  }}
                  onClick={onOpenPico}
                >
                  開啟 picoCTF 解題區
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 成就＋聯絡區 ===== */}
      <section className="section-card">
        <h2>成就與聯絡</h2>

        <div style={{ marginBottom: "14px" }}>
          <Achievements />
        </div>

        <div id="contact" className="contact-section">
          <div className="contact-text">
            <h3>想一起做點什麼？</h3>
            <p className="section-desc">
              如果你對民宿官網、個人網站或 CTF / 學習交流有興趣，
              歡迎寄信給我，一起討論看看可以做什麼。
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="btn"
              href="mailto:bryanhuang710910@gmail.com"
            >
              寄信給我
            </a>
            <a className="ghost btn" href="#projects">
              先看看專案
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

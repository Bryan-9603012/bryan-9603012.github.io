// App.jsx
import { useState } from "react";
import Terminal from "./components/Terminal";
import PicoCTFModal from "./components/PicoCTFModal";
import "./App.css";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);

  return (
    <>
      {/* 背景光暈 */}
      <div className="glow-bg" />
      <div className="hero-gradient" aria-hidden="true" />

      {/* ===== 頂部導覽列（仿 BitShield） ===== */}
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
            <a href="#projects">專案</a>
            <a href="#learning">學習記錄</a>
            <a href="#contact">聯絡我</a>
          </nav>
        </div>
      </header>

      {/* ===== 主內容區 ===== */}
      <main className="page-main">
        {/* Hero 區：左文右卡片，參考 BitShield 第一屏 */}
        <section className="hero-section">
          <div className="hero-text">
            <p className="hero-eyebrow">PORTFOLIO • 2025</p>
            <h1 className="hero-title">
              為專案打造可靠又好看的技術基礎
            </h1>
            <p className="hero-subtitle">
              我是 <strong>劉興源</strong>，目前專注在前端開發、
              資安 CTF 與 Linux 環境練習。
              這裡是我集中作品、練習與學習筆記的地方。
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
            <p className="hero-note">
              目前持續更新 React、CSS 動效與 picoCTF 題解。
            </p>
          </div>

          <div className="hero-card">
            <h3 className="hero-card-title">即時面板 · Terminal</h3>
            <Terminal />
          </div>
        </section>

        {/* ===== 服務 / 我能做什麼 ===== */}
        <section id="services" className="section-card">
          <h2>我現在在做什麼？</h2>
          <p className="section-desc">
            以前端為主，搭配一點資安與系統操作，慢慢把自己變成
            「能切版、會寫邏輯、懂一點安全」的工程師。
          </p>

          <div className="services-grid">
            <div className="service-item">
              <h3>前端切版與互動</h3>
              <p>HTML、Modern CSS、RWD、基本無障礙與動畫效果。</p>
            </div>
            <div className="service-item">
              <h3>React 練習</h3>
              <p>用 React 做個人面板、作品展示與簡單狀態管理。</p>
            </div>
            <div className="service-item">
              <h3>CTF / 資安入門</h3>
              <p>picoCTF 題目解題與筆記，從 Web / Crypto 慢慢拓展。</p>
            </div>
          </div>

          <div className="skills-row">
            <h3>目前技能</h3>
            <div className="skills">
              <span className="chip">HTML5</span>
              <span className="chip">Modern CSS</span>
              <span className="chip">Responsive</span>
              <span className="chip">React</span>
              <span className="chip">Linux / CLI</span>
              <span className="chip">picoCTF</span>
            </div>
          </div>
        </section>

        {/* ===== 專案區 ===== */}
        <section id="projects" className="section-card">
          <h2>專案 / 練習</h2>
          <p className="section-desc">
            這些是目前公開的練習作品，會持續增加新的網站與工具。
          </p>

          <div className="proj-list">
            <div className="proj">
              <div>
                <div className="proj-title">個人作品集網站</div>
                <div className="proj-meta">
                  React • CSS • GitHub Pages
                </div>
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
                <div className="proj-meta">
                  微動畫、Hover 效果與卡片設計
                </div>
              </div>
              <a className="ghost btn" href="#">
                程式碼
              </a>
            </div>

            <div className="proj">
              <div>
                <div className="proj-title">picoCTF Writeups</div>
                <div className="proj-meta">
                  Web / Crypto 解題整理與心得
                </div>
              </div>
              <button
                type="button"
                className="ghost btn"
                onClick={() => setShowPicoPage(true)}
              >
                查看解析
              </button>
            </div>
          </div>
        </section>

        {/* ===== 學習資料 / Notes 區（預留） ===== */}
        <section id="learning" className="section-card">
          <h2>學習記錄</h2>
          <p className="section-desc">
            把平常在課堂、線上資源與 CTF 中學到的東西整理成簡短筆記。
          </p>

          <div className="learning-grid">
            <div className="learning-item">
              <h3>React 基礎筆記</h3>
              <p>JSX、Component、State 與 props 的重點整理。</p>
            </div>
            <div className="learning-item">
              <h3>Linux / CLI</h3>
              <p>常用指令與在 CTF / 開發中會用到的工具。</p>
            </div>
            <div className="learning-item">
              <h3>picoCTF 題目分類</h3>
              <p>照類型把題目與常見解法做索引，方便回顧。</p>
            </div>
          </div>
        </section>

        {/* ===== 底部聯絡我（仿 BitShield Contact） ===== */}
        <section id="contact" className="section-card contact-section">
          <div className="contact-text">
            <h2>一起做點有趣的東西？</h2>
            <p className="section-desc">
              如果你對民宿官網、個人網站或 CTF / 學習交流有興趣，
              歡迎寄信給我，一起討論看看可以做什麼。
            </p>
          </div>
          <div className="contact-actions">
            <a className="btn" href="mailto:bryanhuang710910@gmail.com">
              寄信給我
            </a>
            <a className="ghost btn" href="#projects">
              先看看專案
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        © 2025 劉興源 · Portfolio · Tech Style
      </footer>

      <PicoCTFModal
        isOpen={showPicoPage}
        onClose={() => setShowPicoPage(false)}
      />
    </>
  );
}

export default App;

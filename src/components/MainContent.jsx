// MainContent.jsx
import Terminal from "./Terminal";
import Skills from "./Skills";
import Achievements from "./Achievements";

export default function MainContent({ onOpenPico }) {
  return (
    <main className="page-main">
      {/* ===== Hero 區：左文右 Terminal，仿 BitShield 第一屏 ===== */}
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-eyebrow">PORTFOLIO • 2025</p>
          <h1 className="hero-title">
            為專案打造可靠又好看的技術基礎
          </h1>
          <p className="hero-subtitle">
            我是 <strong>劉興源</strong>，一位熱愛科技的學生，
            目前專注在前端開發、picoCTF 與 Linux 練習。
            這個頁面是我集中作品與學習記錄的地方。
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
            近期目標：持續完成更多 React 練習與 CTF 題解。
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

      {/* ===== 服務 / 我能做什麼（Skills + 簡短說明） ===== */}
      <section id="services" className="section-card card">
        <h2>我現在在做什麼？</h2>
        <p className="section-desc">
          主要練習前端開發與基礎資安，目標是成為
          「能做漂亮網頁、懂一點安全的工程師」。
        </p>

        <div className="services-grid">
          <div className="service-item">
            <h3>前端切版與互動</h3>
            <p>專注在 HTML、Modern CSS 與 RWD，讓頁面好看又好讀。</p>
          </div>
          <div className="service-item">
            <h3>React 小專案</h3>
            <p>用 React 做個人面板、作品頁與練習工具，熟悉 component 思維。</p>
          </div>
          <div className="service-item">
            <h3>CTF / 資安入門</h3>
            <p>從 picoCTF 題目學 web 與基礎安全觀念，記錄解題心得。</p>
          </div>
        </div>

        <div className="skills-row">
          <h3>目前技能</h3>
          <Skills />
        </div>
      </section>

      {/* ===== 專案區 ===== */}
      <section id="projects" className="section-card card">
        <h2>專案 / 練習</h2>
        <p className="section-desc">
          以下是目前公開的練習作品，未來會持續增加新的網站與工具。
        </p>

        <div className="proj-list">
          <div className="proj">
            <div>
              <div className="proj-title">個人作品集網站</div>
              <div className="proj-meta">
                React．CSS．GitHub Pages
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

      {/* ===== 學習記錄區（之後放資料） ===== */}
      <section id="learning" className="section-card card">
        <h2>學習記錄</h2>
        <p className="section-desc">
          簡單記錄在課堂、線上資源與 CTF 中學到的重點。
        </p>

        <div className="learning-grid">
          <div className="learning-item">
            <h3>React 基礎筆記</h3>
            <p>JSX、Component、State 與 props 的重點整理。</p>
          </div>
          <div className="learning-item">
            <h3>Linux / CLI</h3>
            <p>常用指令與在開發、CTF 會用到的工具。</p>
          </div>
          <div className="learning-item">
            <h3>picoCTF 題目分類</h3>
            <p>依類型整理題目與常見解法，方便回顧。</p>
          </div>
        </div>
      </section>

      {/* ===== 成就與聯絡（可選：把 Achievements+Contact 合併） ===== */}
      <section className="section-card card">
        <h2>成就與聯絡</h2>
        <Achievements />

        <div id="contact" className="contact-section-inner">
          <div className="contact-text">
            <h3>想一起做點什麼？</h3>
            <p className="section-desc">
              歡迎透過電子郵件與我聯絡，討論專案合作或技術交流！
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

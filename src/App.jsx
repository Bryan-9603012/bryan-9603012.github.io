import { useState } from "react";
import "./App.css";

import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";

const focusAreas = [
  ["Cybersecurity", "從 CTF、Linux 與安全工具實作建立可驗證的資安能力。"],
  ["AI Security", "關注 LLM 敏感資訊保護、Prompt Attack 與安全評估。"],
  ["Software Engineering", "以 Python、React 與 Git 將想法落成可維護的工具與介面。"],
];

const skills = ["Python", "Linux", "React", "Vite", "Git", "CTF", "LLM Security", "Security Evaluation"];

function App() {
  const [showLinux, setShowLinux] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);

  return (
    <div className="site-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Bryan Liu home">
          <span className="brand-mark">L</span>
          <span><strong>Bryan Liu</strong><small>Cyber & AI Security</small></span>
        </a>

        <nav className="side-nav" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#notes">Notes</a>
          <a href="#skills">Skills</a>
        </nav>

        <div className="sidebar-foot">
          <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">GitHub ↗</a>
          <span>Based in Taiwan</span>
        </div>
      </aside>

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">STUDENT · CYBERSECURITY · SOFTWARE</p>
            <h1>Hi, I’m <span>Bryan Liu.</span></h1>
            <p className="hero-role">Cybersecurity · AI Security · Software Engineering</p>
            <p className="hero-lead">
              我是劉興源，持續透過安全工具、CTF、Linux 系統學習與 AI Security 實作，
              把學習成果整理成可驗證、可重現的技術作品。
            </p>
            <div className="actions">
              <a className="button primary" href="#work">View my work</a>
              <a className="button secondary" href="#notes">Explore notes</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Current focus">
            <span className="status"><i /> CURRENT FOCUS</span>
            <h2>Building security knowledge through practice.</h2>
            <p>Security tooling, Linux systems, LLM safety evaluation, and technical documentation.</p>
            <div className="hero-metric">
              <div><strong>2</strong><span>Public repositories</span></div>
              <div><strong>12</strong><span>Linux note modules</span></div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading">
            <p className="eyebrow">FOCUS AREAS</p>
            <h2>What I’m building toward</h2>
          </div>
          <div className="focus-grid">
            {focusAreas.map(([title, body], index) => (
              <article className="card focus-card" key={title}>
                <span className="card-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading row">
            <div><p className="eyebrow">SELECTED WORK</p><h2>Public work</h2></div>
            <p className="section-note">只呈現目前適合公開、可直接驗證的作品。</p>
          </div>
          <div className="work-grid">
            <article className="card work-card featured">
              <div className="work-top"><span className="work-type">SECURITY TOOLING</span><span>Python</span></div>
              <h3>picoctf-toolkit</h3>
              <p>以 picoCTF 與資安練習為背景發展的工具集合，將重複性的分析工作整理成可重用工具。</p>
              <a href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">View repository ↗</a>
            </article>
            <article className="card work-card">
              <div className="work-top"><span className="work-type">WRITEUPS</span><span>Documentation</span></div>
              <h3>picoCTF-report</h3>
              <p>獨立維護的 picoCTF 解題紀錄與學習資料庫，整理 challenge writeups、解題流程與相關研究工具。</p>
              <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">View repository ↗</a>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading"><p className="eyebrow">EXPERIENCE & HIGHLIGHTS</p><h2>From learning to public practice</h2></div>
          <div className="timeline">
            <article className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-meta">Taiwan AI Academy · Claude Code</div>
              <h3>Can AI Keep a Secret?</h3>
              <p>
                以大型語言模型敏感資訊保護能力為主題，透過固定 Prompt Attack、洩漏等級評分與跨模型比較，
                評估 LLM 面對敏感資訊時的安全表現；提案入選 Demo Showcase。
              </p>
              <div className="tags"><span>LLM Security</span><span>Prompt Attack</span><span>Security Evaluation</span></div>
            </article>
            <article className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-meta">AIWave · Taiwan Generative AI Applications Hackathon</div>
              <h3>Generative AI Hackathon</h3>
              <p>參與生成式 AI 應用黑客松，以限時實作方式完成團隊開發與展示。</p>
              <div className="tags"><span>Generative AI</span><span>Hackathon</span><span>Team Project</span></div>
            </article>
          </div>
        </section>

        <section className="section" id="notes">
          <div className="section-heading row">
            <div><p className="eyebrow">TECHNICAL NOTES</p><h2>Notes built from practice</h2></div>
            <p className="section-note">保留既有內容，先改善入口與定位。</p>
          </div>
          <div className="notes-grid">
            <article className="card note-card note-main">
              <span className="note-label">SYSTEMS · SECURITY</span>
              <h3>Linux Security Notes</h3>
              <p>權限、使用者、套件、服務、排程、網路、檔案系統、容器化、備份與 Linux Security 等主題。</p>
              <button className="text-button" onClick={() => setShowLinux(true)}>Open Linux Notes →</button>
            </article>
            <article className="card note-card">
              <span className="note-label">HARDWARE · SYSTEMS</span>
              <h3>Digital Logic Notes</h3>
              <p>數位邏輯實作與工程紀錄，以技術文件方式整理硬體與系統整合學習成果。</p>
              <button className="text-button" onClick={() => setShowDigitalLogic(true)}>Open notes →</button>
            </article>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading"><p className="eyebrow">SKILLS</p><h2>Tools & technologies</h2></div>
          <div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <footer>
          <div><strong>Bryan Liu</strong><p>Cybersecurity · AI Security · Software Engineering</p></div>
          <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">GitHub ↗</a>
        </footer>
      </main>

      <LinuxNotesModal isOpen={showLinux} onClose={() => setShowLinux(false)} />
      <DigitalLogicModal isOpen={showDigitalLogic} onClose={() => setShowDigitalLogic(false)} />
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";
import CertificateModal from "./components/modals/CertificateModal";
import Icon from "./components/ui/Icon";

const skills = [
  ["python", "Python", "python"],
  ["javascript", "JavaScript", "javascript"],
  ["terminal", "Linux / WSL", "linux"],
  ["globe", "Web Development", "web"],
  ["shield", "Security", "security"],
  ["git", "Git / GitHub", "git"],
  ["atom", "React", "react"],
  ["terminal", "CLI Tooling", "cli"],
  ["workflow", "Security Automation", "automation"],
  ["network", "Networking", "network"],
  ["flag", "CTF", "ctf"],
  ["bot", "LLM Security", "llm"],
];

const aboutFocus = [
  ["cpu", "AI / LLM Security", "專注於 LLM 安全、AI 安全評估與攻擊行為研究，強調可重現的測試方法與證據。"],
  ["briefcase", "Practical Security Tooling", "將資安需求實作成模組化工具，讓測試流程、結果與報告更容易重複與驗證。"],
  ["notes", "Knowledge & Documentation", "把實作、解題與研究過程整理成技術筆記、Writeups 與可持續維護的文件。"],
];

function App() {
  const [showLinux, setShowLinux] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="top-brand" href="#home" aria-label="Bryan Liu home">
          <span className="top-brand-mark">L.</span>
          <strong>Bryan Liu</strong>
        </a>

        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#notes">Notes</a>
          <a href="#skills">Skills</a>
        </nav>

        <div className="top-actions">
          <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" size={17} />
          </a>
          <a className="top-contact" href="#contact">Get In Touch →</a>
        </div>
      </header>

      <main className="page">
        <section className="hero" id="home">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-kicker">STUDENT · CYBERSECURITY · AI SECURITY · SOFTWARE ENGINEERING</p>
            <h1>你好，我是 <span>劉興源。</span></h1>
            <p className="hero-lead">
              一名專注於資安、AI 安全與實用工具開發的資訊工程學生，<br />
              喜歡透過實作工具與系統化研究來探索更安全的 AI 與網路世界。
            </p>
            <div className="actions">
              <a className="button primary" href="#work">查看我的作品 <Icon name="arrow" size={14} /></a>
              <a className="button secondary" href="#about">關於我</a>
            </div>
          </div>

          <div className="hero-motto">Open Minds<br />Safer Tomorrow.</div>
          <div className="hero-side-note" aria-hidden="true">
            <span>STAY CURIOUS</span>
            <span>BUILD SAFER SYSTEMS</span>
            <span>KEEP LEARNING</span>
            <i />
          </div>
        </section>

        <section className="panel about-panel" id="about">
          <div className="about-copy">
            <div className="section-heading">
              <h2>關於我</h2>
            </div>
            <p>
              我是一名資訊工程系的學生，主要關注資安、AI 安全與實用軟體開發。
            </p>
            <p>
              我喜歡把資安問題轉化為實作工具，從 CTF、系統操作、工具開發到
              LLM 安全評估，並透過整理筆記與 Writeup 記錄自己的學習與研究過程。
            </p>
            <p>
              目前專注於 LLM Security、AI Safety Evaluation、picoCTF 工具開發與
              技術筆記整理，希望透過開源專案與研究，讓更多人能以更安全、更可驗證的方式使用 AI 與網路技術。
            </p>
          </div>

          <div className="about-focus">
            {aboutFocus.map(([icon, title, body], index) => (
              <article className="about-focus-card" key={title}>
                <span className="about-focus-icon"><Icon name={icon} size={21} /></span>
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
                <em>{String(index + 1).padStart(2, "0")}</em>
              </article>
            ))}
          </div>
        </section>

        <div className="content-grid main-grid">
          <section className="panel work-panel" id="work">
            <div className="section-heading section-heading-row">
              <h2>精選專案</h2>
              <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">查看全部 →</a>
            </div>

            <div className="project-grid">
              <article className="project-card">
                <a className="project-image project-image-dark" href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">
                  <img src="/assets/toolkit-preview.svg" alt="picoCTF Modular Toolkit interface preview" />
                </a>
                <div className="project-title-row">
                  <h3>picoCTF Modular Toolkit</h3>
                  <em>Public</em>
                </div>
                <p>針對 picoCTF 的半自動化工具集合，包含 Web 掃描、解碼輔助、鑑識分析與二進位工具。</p>
                <div className="tags"><span>Python</span><span>CLI</span><span>Security</span><span>Automation</span></div>
                <a className="project-link" href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">
                  <Icon name="github" size={14} /> View on GitHub <Icon name="arrow" size={10} />
                </a>
              </article>

              <article className="project-card">
                <a className="project-image" href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">
                  <img src="/assets/report-preview.svg" alt="picoCTF report documentation preview" />
                </a>
                <div className="project-title-row">
                  <h3>picoCTF-report</h3>
                  <em>Public</em>
                </div>
                <p>整理 picoCTF 各類題目的解題紀錄與學習筆記，涵蓋 Web、Crypto、Forensics、Reverse Engineering 等領域。</p>
                <div className="tags"><span>CTF</span><span>Writeups</span><span>Security</span><span>Learning</span></div>
                <a className="project-link" href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">
                  <Icon name="github" size={14} /> View on GitHub <Icon name="arrow" size={10} />
                </a>
              </article>
            </div>
          </section>

          <section className="panel experience-panel" id="experience">
            <div className="section-heading section-heading-row">
              <h2>經歷與亮點</h2>
              <span>Selected public activities</span>
            </div>

            <div className="experience-stack">
              <article className="experience-card">
                <span className="experience-logo experience-logo-dark"><Icon name="sparkles" size={20} /></span>
                <div className="experience-body">
                  <div className="experience-meta">
                    <div>
                      <strong>Taiwan AI Academy × Claude Code</strong>
                      <small>Demo Showcase · Proposal Selected</small>
                    </div>
                    <time>2026.05.18</time>
                  </div>
                  <h3>Can AI Keep a Secret?</h3>
                  <p>以大型語言模型敏感資訊保護為主題，透過 Prompt Attack、洩漏等級評分與跨模型比較，展示 LLM 安全評估方法。</p>
                  <div className="tags"><span>LLM Security</span><span>Prompt Attack</span><span>Security Evaluation</span></div>
                </div>
              </article>

              <article className="experience-card">
                <span className="experience-logo experience-logo-blue"><Icon name="waves" size={20} /></span>
                <div className="experience-body">
                  <div className="experience-meta">
                    <div>
                      <strong>AIWave · Taiwan Generative AI Applications Hackathon</strong>
                      <small>AWS Taiwan × DIGITIMES</small>
                    </div>
                    <time>Aug 1–2</time>
                  </div>
                  <h3>Generative AI Hackathon</h3>
                  <p>參與生成式 AI 應用黑客松，以團隊形式進行限時實作、技術探索與成果展示。</p>
                  <div className="experience-bottom">
                    <div className="tags"><span>Generative AI</span><span>Hackathon</span><span>AWS</span><span>Team Project</span></div>
                    <button onClick={() => setShowCertificate(true)}>View Certificate →</button>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div className="content-grid lower-grid">
          <section className="panel notes-panel" id="notes">
            <div className="section-heading section-heading-row">
              <h2>最新筆記</h2>
              <span>Built from practice</span>
            </div>

            <div className="notes-grid">
              <article className="note-card">
                <span className="note-label">TECH</span>
                <h3>Linux 學習筆記</h3>
                <p>整理常用的 Linux 指令、權限、服務、網路與系統操作技巧。</p>
                <button onClick={() => setShowLinux(true)}>閱讀全文 →</button>
              </article>

              <article className="note-card">
                <span className="note-label">CTF</span>
                <h3>picoCTF 解題紀錄</h3>
                <p>記錄 picoCTF 題目的解題思路與方法，涵蓋多個資安領域。</p>
                <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">閱讀全文 →</a>
              </article>

              <article className="note-card">
                <span className="note-label">SYSTEMS</span>
                <h3>Digital Logic Notes</h3>
                <p>整理數位邏輯、硬體基礎與系統整合的學習內容。</p>
                <button onClick={() => setShowDigitalLogic(true)}>閱讀全文 →</button>
              </article>
            </div>
          </section>

          <section className="panel skills-panel" id="skills">
            <div className="section-heading section-heading-row">
              <h2>技能</h2>
              <span>Tools &amp; technologies</span>
            </div>
            <div className="skills-grid">
              {skills.map(([icon, label, accent]) => (
                <span className={`skill-chip skill-${accent}`} key={label}>
                  <i><Icon name={icon} size={15} /></i>
                  {label}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="contact-panel" id="contact">
          <div className="contact-copy">
            <span className="contact-icon"><Icon name="mail" size={17} /></span>
            <div>
              <h2>聯絡我</h2>
              <p>如果你想交流資安工具、AI 安全、技術研究，或只是聊聊想法，都非常歡迎。</p>
            </div>
          </div>
          <div className="contact-actions">
            <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer"><Icon name="github" size={15} /> GitHub</a>
            <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer"><Icon name="notes" size={15} /> picoCTF Notes</a>
          </div>
          <div className="contact-skyline" aria-hidden="true">╱╲＿╱╲＿＿╱╲＿││＿╱╲</div>
        </section>

        <footer>
          <span>© Bryan Liu</span>
          <span>Cybersecurity · AI Security · Software Engineering</span>
        </footer>
      </main>

      <LinuxNotesModal isOpen={showLinux} onClose={() => setShowLinux(false)} />
      <DigitalLogicModal isOpen={showDigitalLogic} onClose={() => setShowDigitalLogic(false)} />
      <CertificateModal isOpen={showCertificate} onClose={() => setShowCertificate(false)} />
    </div>
  );
}

export default App;

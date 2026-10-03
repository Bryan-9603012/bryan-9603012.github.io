import { useState } from "react";
import "./App.css";
import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";
import CertificateModal from "./components/modals/CertificateModal";
import Icon from "./components/ui/Icon";

const focusAreas = [
  ["shield", "Cybersecurity", "Security research, CTF, Linux, and practical tooling."],
  ["cpu", "AI Security", "LLM security, safety evaluation, and adversarial testing."],
  ["code", "Software Engineering", "Building maintainable tools and web applications."],
  ["book", "Continuous Learning", "Notes, writeups, and sharing what I learn."],
];

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

function App() {
  const [showLinux, setShowLinux] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="site-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Bryan Liu home">
          <span className="brand-symbol" aria-hidden="true">L</span>
          <span className="brand-copy">
            <strong>Bryan Liu</strong>
            <small>Student · Cyber &amp; Web Dev</small>
          </span>
        </a>

        <nav className="side-nav" aria-label="Primary navigation">
          <a className="active" href="#home"><Icon name="home" /><span>Home</span></a>
          <a href="#about"><Icon name="user" /><span>About</span></a>
          <a href="#work"><Icon name="briefcase" /><span>Work</span></a>
          <a href="#experience"><Icon name="trophy" /><span>Experience</span></a>
          <a href="#notes"><Icon name="notes" /><span>Notes</span></a>
          <a href="#skills"><Icon name="blocks" /><span>Skills</span></a>
          <a href="#contact"><Icon name="mail" /><span>Contact</span></a>
        </nav>

        <div className="sidebar-quote" aria-hidden="true">
          <i />
          <span>Better Tools</span>
          <span>Safer Systems</span>
          <span>A More Open Internet</span>
        </div>

        <div className="sidebar-foot">
          <a className="github-link" href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">
            <Icon name="github" size={15} />
            <span>GitHub</span>
            <Icon name="arrow" size={11} />
          </a>
          <span>Based in Taiwan</span>
          <span>© Bryan Liu</span>
        </div>
      </aside>

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-kicker">Hi, I'm</p>
            <h1>Bryan <span>Liu</span></h1>
            <p className="hero-role">Cybersecurity · AI Security · Software Engineering</p>
            <p className="hero-lead">
              Building practical security tools<br />
              and exploring the security of modern AI systems.
            </p>
            <div className="actions">
              <a className="button primary" href="#work">View My Work <Icon name="arrow" size={14} /></a>
              <a className="button secondary" href="#about">About Me</a>
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

        <section className="focus-strip" aria-label="Focus areas">
          {focusAreas.map(([icon, title, body]) => (
            <article className="focus-card" key={title}>
              <span className="focus-icon"><Icon name={icon} size={23} /></span>
              <div><strong>{title}</strong><p>{body}</p></div>
            </article>
          ))}
        </section>

        <div className="dashboard-grid primary-grid">
          <section className="panel about-panel" id="about">
            <div className="panel-heading">
              <h2>About Me</h2>
              <span>Current focus</span>
            </div>
            <div className="about-body">
              <div className="about-copy">
                <p>
                  I'm a computer science and information engineering student focused on
                  cybersecurity, AI security, and practical software development.
                </p>
                <p>
                  I build Python-based security tooling, document hands-on security practice,
                  and prefer reproducible workflows that make results easier to verify.
                </p>
                <p>
                  Currently, I'm focusing on LLM security and AI safety evaluation while
                  continuing to improve my web development and system-security skills.
                </p>

                <div className="highlight-list">
                  <div>
                    <strong>AIA × Claude Code</strong>
                    <span>Demo Showcase · 2026.05.18</span>
                  </div>
                  <div>
                    <strong>AIWave Hackathon</strong>
                    <span>Participant · 2026.08.01–08.02</span>
                    <button onClick={() => setShowCertificate(true)}>Certificate <Icon name="arrow" size={10} /></button>
                  </div>
                </div>
              </div>

              <div className="about-visual" aria-label="Original engineering workspace illustration" />
            </div>
          </section>

          <section className="panel work-panel" id="work">
            <div className="panel-heading">
              <h2>Selected Work</h2>
              <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">View All <Icon name="arrow" size={11} /></a>
            </div>

            <article className="featured-work">
              <a className="work-preview" href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">
                <img src="/assets/toolkit-preview.svg" alt="Original visual representing the picoCTF Modular Toolkit" />
              </a>
              <div className="work-copy">
                <div className="work-title-row"><h3>picoCTF Modular Toolkit</h3><em>Public</em></div>
                <p>A collection of semi-automated tools for picoCTF, including security analysis and helper utilities.</p>
                <div className="tags"><span>CTF</span><span>Python</span><span>CLI</span><span>Automation</span></div>
                <a href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">
                  <Icon name="github" size={13} /> View on GitHub <Icon name="arrow" size={10} />
                </a>
              </div>
            </article>

            <a className="secondary-work" href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">
              <img src="/assets/report-preview.svg" alt="Original visual representing the picoCTF report collection" />
              <span><b>picoCTF-report</b><small>Writeups, learning notes, and tool research.</small></span>
              <strong>Open <Icon name="arrow" size={10} /></strong>
            </a>
          </section>
        </div>

        <section className="panel experience-panel" id="experience">
          <div className="panel-heading">
            <h2>Experience &amp; Highlights</h2>
            <span>Selected public activities</span>
          </div>

          <div className="experience-list">
            <article className="experience-item">
              <div className="experience-brand experience-aia">
                <span className="experience-logo"><Icon name="sparkles" size={18} /></span>
                <div>
                  <strong>Taiwan AI Academy × Claude Code</strong>
                  <small>Demo Showcase · Proposal Selected</small>
                </div>
              </div>
              <time>2026.05.18</time>
              <div className="experience-copy">
                <h3>Can AI Keep a Secret?</h3>
                <p>
                  A public LLM security showcase project focused on sensitive-information
                  protection, prompt attacks, leak-level scoring, and reproducible security evaluation.
                </p>
                <div className="tags">
                  <span>LLM Security</span>
                  <span>Prompt Attack</span>
                  <span>Security Evaluation</span>
                </div>
              </div>
            </article>

            <article className="experience-item">
              <div className="experience-brand experience-aiwave">
                <span className="experience-logo"><Icon name="waves" size={18} /></span>
                <div>
                  <strong>AIWave · Taiwan Generative AI Applications Hackathon</strong>
                  <small>AWS Taiwan × DIGITIMES</small>
                </div>
              </div>
              <time>2026.08.01–08.02</time>
              <div className="experience-copy">
                <h3>Generative AI Hackathon</h3>
                <p>
                  Participated in a two-day generative AI applications hackathon and received
                  a Certificate of Achievement recognizing full participation and project work.
                </p>
                <div className="experience-actions">
                  <div className="tags">
                    <span>Generative AI</span>
                    <span>Hackathon</span>
                    <span>AWS</span>
                    <span>Team Project</span>
                  </div>
                  <button onClick={() => setShowCertificate(true)}>View Certificate <Icon name="arrow" size={10} /></button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="dashboard-grid secondary-grid">
          <section className="panel notes-panel" id="notes">
            <div className="panel-heading">
              <h2>Latest Notes</h2>
              <span>Built from practice</span>
            </div>

            <div className="notes-grid">
              <article className="note-card">
                <div><span className="note-label">CTF</span></div>
                <h3>picoCTF Writeups</h3>
                <p>Challenge writeups covering web, crypto, forensics, binary exploitation, and more.</p>
                <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">Read More <Icon name="arrow" size={10} /></a>
              </article>

              <article className="note-card">
                <div><span className="note-label">TECH</span></div>
                <h3>Linux Security Notes</h3>
                <p>Permissions, users, services, networking, filesystems, containers, and security practice.</p>
                <button onClick={() => setShowLinux(true)}>Read More <Icon name="arrow" size={10} /></button>
              </article>

              <article className="note-card">
                <div><span className="note-label">SYSTEMS</span></div>
                <h3>Digital Logic Notes</h3>
                <p>Digital logic, hardware fundamentals, and system-integration learning records.</p>
                <button onClick={() => setShowDigitalLogic(true)}>Read More <Icon name="arrow" size={10} /></button>
              </article>
            </div>
          </section>

          <section className="panel skills-panel" id="skills">
            <div className="panel-heading">
              <h2>Skills</h2>
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
            <span className="contact-icon"><Icon name="mail" size={16} /></span>
            <div>
              <h2>Get In Touch</h2>
              <p>Want to discuss security tooling, AI security, or practical engineering work?</p>
            </div>
          </div>
          <div className="contact-actions">
            <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer"><Icon name="github" size={14} /> GitHub</a>
            <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer"><Icon name="notes" size={14} /> picoCTF Notes</a>
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

import { useState } from "react";
import "./App.css";
import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";
import CertificateModal from "./components/modals/CertificateModal";

const focusAreas = [
  ["◈", "Cybersecurity", "Security research, CTF, Linux, and practical tooling."],
  ["✦", "AI Security", "LLM security, sensitive-data protection, and safety evaluation."],
  ["</>", "Software Engineering", "Building maintainable tools and web applications."],
];

const skills = [
  ["Py", "Python"], ["JS", "JavaScript"], ["</>", "Web Development"],
  ["Linux", "Linux"], ["SEC", "Security"], ["Git", "Git"],
  ["React", "React"], ["NET", "Networking"], ["CTF", "CTF"],
];

function App() {
  const [showLinux, setShowLinux] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="site-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Bryan Liu home">
          <span className="brand-mark">L.</span>
          <span>
            <strong>Bryan Liu</strong>
            <small>Cybersecurity · AI Security<br />Software Engineering</small>
          </span>
        </a>

        <nav className="side-nav" aria-label="Primary navigation">
          <a className="active" href="#home"><b>⌂</b><span>Home</span></a>
          <a href="#about"><b>♙</b><span>About</span></a>
          <a href="#work"><b>□</b><span>Work</span></a>
          <a href="#experience"><b>♜</b><span>Experience</span></a>
          <a href="#notes"><b>▤</b><span>Notes</span></a>
          <a href="#skills"><b>⌘</b><span>Skills</span></a>
          <a href="#contact"><b>✉</b><span>Contact</span></a>
        </nav>

        <div className="sidebar-foot" id="contact">
          <div className="social-row">
            <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
          </div>
          <span>Based in Taiwan</span>
          <span>© Bryan Liu</span>
        </div>
      </aside>

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-sky" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">STUDENT · CYBERSECURITY · AI SECURITY · SOFTWARE ENGINEERING</p>
            <h1>Hi, I’m <span>Bryan Liu.</span></h1>
            <p className="hero-lead">
              A computer science student passionate about cybersecurity,
              AI security, and building practical tools.
            </p>
            <div className="actions">
              <a className="button primary" href="#work">View My Work →</a>
              <a className="button secondary" href="#about">About Me</a>
            </div>
          </div>

          <div className="focus-panel" id="about">
            {focusAreas.map(([icon, title, body]) => (
              <div className="focus-row" key={title}>
                <span className="focus-icon">{icon}</span>
                <div><strong>{title}</strong><p>{body}</p></div>
              </div>
            ))}
          </div>
          <div className="hero-motto">Open Minds<br />Safer Tomorrow.</div>
        </section>

        <section className="section compact" id="work">
          <div className="section-title">
            <h2>Selected Work</h2>
            <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">View All →</a>
          </div>
          <div className="work-grid">
            <article className="card work-card">
              <a className="project-preview" href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer" aria-label="Open picoctf-toolkit">
                <img src="https://opengraph.githubassets.com/1/Bryan-9603012/picoctf-toolkit" alt="picoctf-toolkit GitHub preview" />
              </a>
              <div className="project-copy">
                <div className="project-title"><h3>picoctf-toolkit</h3><em>Public</em></div>
                <p>A collection of practical security tooling for picoCTF and repeatable analysis workflows.</p>
                <div className="tags"><span>Python</span><span>CLI</span><span>Security</span><span>Automation</span></div>
                <a href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">View on GitHub →</a>
              </div>
            </article>

            <article className="card work-card">
              <a className="project-preview" href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer" aria-label="Open picoCTF-report">
                <img src="https://opengraph.githubassets.com/1/Bryan-9603012/picoCTF-report" alt="picoCTF-report GitHub preview" />
              </a>
              <div className="project-copy">
                <div className="project-title"><h3>picoCTF-report</h3><em>Public</em></div>
                <p>Writeups and learning notes from picoCTF challenges, plus related security-tool research.</p>
                <div className="tags"><span>CTF</span><span>Writeups</span><span>Security</span><span>Learning</span></div>
                <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">View on GitHub →</a>
              </div>
            </article>
          </div>
        </section>

        <section className="section compact" id="experience">
          <div className="section-title">
            <h2>Experience &amp; Highlights</h2>
            <span>Selected activities</span>
          </div>
          <div className="experience-grid">
            <article className="card experience-card">
              <div className="experience-head">
                <div className="brand-lockup aia-lockup">
                  <span className="aia-mark">AI</span>
                  <span><strong>Taiwan AI Academy</strong><small>× Claude Code</small></span>
                </div>
                <time>2026.05.18</time>
              </div>
              <div className="project-title"><h3>Can AI Keep a Secret?</h3><em>Demo Showcase</em></div>
              <p>
                Research on sensitive-information protection in large language models,
                using prompt attacks, leak-level scoring, and cross-model comparison
                to evaluate security behavior.
              </p>
              <div className="tags"><span>LLM Security</span><span>Prompt Attack</span><span>Security Evaluation</span></div>
            </article>

            <article className="card experience-card">
              <div className="experience-head">
                <div className="brand-lockup aiwave-lockup">
                  <span className="aiwave-mark">AI</span>
                  <span><strong>AIWave</strong><small>powered by AWS</small></span>
                </div>
                <time>Aug 1–2</time>
              </div>
              <h3>Taiwan Generative AI Applications Hackathon</h3>
              <p>
                Participated in a generative AI applications hackathon,
                working in a team through time-boxed implementation,
                technical exploration, and project presentation.
              </p>
              <div className="tags"><span>Generative AI</span><span>Hackathon</span><span>AWS</span><span>Team Project</span></div>
              <button className="experience-link" onClick={() => setShowCertificate(true)}>View Certificate →</button>
            </article>
          </div>
        </section>

        <div className="bottom-grid">
          <section className="section compact" id="notes">
            <div className="section-title"><h2>Latest Notes</h2><span>Built from practice</span></div>
            <div className="notes-grid">
              <article className="card note-card">
                <span className="note-label">TECH</span>
                <h3>Linux Security Notes</h3>
                <p>Permissions, users, services, networking, filesystems, containers, and Linux security.</p>
                <button onClick={() => setShowLinux(true)}>Read More →</button>
              </article>
              <article className="card note-card">
                <span className="note-label">CTF</span>
                <h3>picoCTF Writeups</h3>
                <p>Challenge writeups and learning notes across web, crypto, forensics, and more.</p>
                <a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">Read More →</a>
              </article>
              <article className="card note-card">
                <span className="note-label">SYSTEMS</span>
                <h3>Digital Logic Notes</h3>
                <p>Digital logic, hardware fundamentals, and system-integration learning records.</p>
                <button onClick={() => setShowDigitalLogic(true)}>Read More →</button>
              </article>
            </div>
          </section>

          <section className="section compact" id="skills">
            <div className="section-title"><h2>Skills</h2><span>Tools &amp; technologies</span></div>
            <div className="skills-grid">
              {skills.map(([icon, skill]) => (
                <span key={skill}><b>{icon}</b>{skill}</span>
              ))}
            </div>
          </section>
        </div>

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

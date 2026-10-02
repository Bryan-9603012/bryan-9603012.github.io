import { useState } from "react";
import "./App.css";
import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";

const focusAreas = [
  ["◈", "Cybersecurity", "Security research, CTF, Linux, and practical tooling."],
  ["✦", "AI Security", "LLM security, sensitive-data protection, and safety evaluation."],
  ["</>", "Software Engineering", "Building maintainable tools and web applications."],
];
const skills = ["Python", "JavaScript", "Linux", "Web Development", "Security", "Git", "React", "Networking", "CTF"];

function App() {
  const [showLinux, setShowLinux] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);

  return (
    <div className="site-shell">
      <aside className="sidebar">
        <a className="brand" href="#home"><span className="brand-mark">L.</span><span><strong>Bryan Liu</strong><small>Cybersecurity · AI Security<br/>Software Engineering</small></span></a>
        <nav className="side-nav">
          <a className="active" href="#home">⌂ <span>Home</span></a>
          <a href="#about">♙ <span>About</span></a>
          <a href="#work">◇ <span>Work</span></a>
          <a href="#experience">▣ <span>Experience</span></a>
          <a href="#notes">▤ <span>Notes</span></a>
          <a href="#skills">⌘ <span>Skills</span></a>
        </nav>
        <div className="sidebar-foot">
          <a href="https://github.com/Bryan-9603012" target="_blank" rel="noreferrer">GitHub ↗</a>
          <span>© Bryan Liu</span>
        </div>
      </aside>

      <main className="content">
        <section className="hero" id="home">
          <div className="hero-sky" aria-hidden="true">
            <span className="mountain m1"/><span className="mountain m2"/><span className="mountain m3"/>
            <span className="tower tower-a"/><span className="tower tower-b"/>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">STUDENT · CYBERSECURITY · AI SECURITY · SOFTWARE ENGINEERING</p>
            <h1>Hi, I’m <span>Bryan Liu.</span></h1>
            <p className="hero-lead">A computer science student focused on cybersecurity, AI security, and building practical tools.</p>
            <div className="actions">
              <a className="button primary" href="#work">View My Work →</a>
              <a className="button secondary" href="#about">About Me</a>
            </div>
          </div>
          <div className="focus-panel" id="about">
            {focusAreas.map(([icon,title,body]) => (
              <div className="focus-row" key={title}>
                <span className="focus-icon">{icon}</span>
                <div><strong>{title}</strong><p>{body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section compact" id="work">
          <div className="section-title"><h2>Selected Work</h2><span>Public repositories</span></div>
          <div className="work-grid">
            <article className="card work-card">
              <div className="project-visual"><span>CLI</span><b>Security Toolkit</b><i>picoCTF</i></div>
              <div className="project-copy"><div className="project-title"><h3>picoctf-toolkit</h3><em>Public</em></div><p>picoCTF security tooling collection for repeatable analysis and learning workflows.</p><div className="tags"><span>Python</span><span>CLI</span><span>Security</span></div><a href="https://github.com/Bryan-9603012/picoctf-toolkit" target="_blank" rel="noreferrer">View on GitHub →</a></div>
            </article>
            <article className="card work-card">
              <div className="project-visual report"><span>DOCS</span><b>Writeups</b><i>Knowledge Base</i></div>
              <div className="project-copy"><div className="project-title"><h3>picoCTF-report</h3><em>Public</em></div><p>Independent picoCTF writeups, learning notes, challenge records, and related tool research.</p><div className="tags"><span>CTF</span><span>Writeups</span><span>Learning</span></div><a href="https://github.com/Bryan-9603012/picoCTF-report" target="_blank" rel="noreferrer">View on GitHub →</a></div>
            </article>
          </div>
        </section>

        <section className="section compact" id="experience">
          <div className="section-title"><h2>Experience & Highlights</h2><span>Selected activities</span></div>
          <div className="experience-grid">
            <article className="card experience-card">
              <div className="experience-head"><div className="experience-brand"><strong>TAIWAN AI ACADEMY</strong><span>× Claude Code</span></div><time>2026.05.18</time></div>
              <div><div className="project-title"><h3>Can AI Keep a Secret?</h3><em>Demo Showcase</em></div>
                <p>Research on sensitive-information protection in large language models, using prompt attacks, leak-level scoring, and cross-model comparison to evaluate security behavior.</p>
                <div className="tags"><span>LLM Security</span><span>Prompt Attack</span><span>Security Evaluation</span></div>
              </div>
            </article>
            <article className="card experience-card">
              <div className="experience-head"><div className="experience-brand"><strong>AIWAVE</strong><span>powered by AWS</span></div><time>Aug 1–2</time></div>
              <div><h3>Taiwan Generative AI Applications Hackathon</h3>
                <p>Participated in a generative AI applications hackathon, working in a team through time-boxed implementation, technical exploration, and project presentation.</p>
                <div className="tags"><span>Generative AI</span><span>Hackathon</span><span>AWS</span><span>Team Project</span></div>
              </div>
            </article>
          </div>
        </section>

        <div className="bottom-grid">
          <section className="section compact" id="notes">
            <div className="section-title"><h2>Technical Notes</h2><span>Built from practice</span></div>
            <div className="notes-grid">
              <article className="card note-card"><span className="note-label">LINUX</span><h3>Linux Security Notes</h3><p>Practical notes on permissions, users, services, networking, filesystems, containers, and Linux security.</p><button onClick={() => setShowLinux(true)}>Read Notes →</button></article>
              <article className="card note-card"><span className="note-label">SYSTEMS</span><h3>Digital Logic</h3><p>Learning notes covering digital logic, hardware fundamentals, and system integration.</p><button onClick={() => setShowDigitalLogic(true)}>Read Notes →</button></article>
            </div>
          </section>

          <section className="section compact" id="skills">
            <div className="section-title"><h2>Skills</h2><span>Tools & technologies</span></div>
            <div className="skills-grid">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
          </section>
        </div>

        <footer><span>© Bryan Liu</span><span>Cybersecurity · AI Security · Software Engineering</span></footer>
      </main>

      <LinuxNotesModal isOpen={showLinux} onClose={() => setShowLinux(false)} />
      <DigitalLogicModal isOpen={showDigitalLogic} onClose={() => setShowDigitalLogic(false)} />
    </div>
  );
}
export default App;

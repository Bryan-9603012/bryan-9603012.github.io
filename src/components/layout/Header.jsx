export default function Header() {
  return (
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
  );
}
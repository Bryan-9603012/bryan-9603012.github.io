export default function ContactSection() {
  return (
    <section id="contact" className="section-card contact-section">
      <div className="contact-text">
        <h2>一起做點有趣的東西？</h2>
        <p className="section-desc">
          如果你對 Linux / CTF / 學習交流有興趣，歡迎寄信給我一起討論。
        </p>
      </div>
      <div className="contact-actions">
        <a className="btn" href="mailto:bryanhuang710910@gmail.com">
          寄信給我
        </a>
        <a className="ghost btn" href="#projects">
          回到學習主舞台
        </a>
      </div>
    </section>
  );
}
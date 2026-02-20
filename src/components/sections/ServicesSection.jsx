export default function ServicesSection() {
  return (
    <section id="services" className="section-card">
      <h2>我現在在做什麼？</h2>
      <p className="section-desc">
        以前端為主，搭配資安與 Linux 系統實作，培養能實戰、能解釋的工程能力。
      </p>

      <div className="services-grid">
        <div className="service-item">
          <h3>前端介面與互動</h3>
          <p>HTML、Modern CSS、RWD 與互動效果實作。</p>
        </div>

        <div className="service-item">
          <h3>React 應用開發</h3>
          <p>Component 設計、Modal、狀態管理與模組化。</p>
        </div>

        <div className="service-item">
          <h3>Linux 與資安實務</h3>
          <p>權限、使用者、服務與 CTF 常見觀念整理。</p>
        </div>
      </div>
    </section>
  );
}
import BadgeSvg from "../ui/BadgeSvg";

export default function AchievementsSection({ achievements }) {
  return (
    <section id="learning" className="section-card">
      <h2>成果徽章</h2>
      <p className="section-desc">
        只呈現目前「真的有進度」的內容：完成 / 進行中。讓成果可追蹤、可驗證，不用填滿牆。
      </p>

      <div className="badge-panels">
        {/* Linux */}
        <div className="badge-panel">
          <div className="badge-panel-title">
            <h3>Linux Roadmap</h3>
            <p>以系統管理＋資安視角為主</p>
          </div>

          <div className="badge-row">
            {achievements.linux.map((b) => (
              <div key={b.label} className="badge-svg-item">
                <BadgeSvg
                  status={b.status}
                  title="Linux Roadmap"
                  subtitle="System + Security"
                  size={160}
                  showLock={true}
                />
                <div className="badge-svg-caption">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* picoCTF */}
        <div className="badge-panel">
          <div className="badge-panel-title">
            <h3>picoCTF Progress</h3>
            <p>以題型分類累積解題思路</p>
          </div>

          <div className="badge-row">
            {achievements.ctf.map((b) => (
              <div key={b.label} className="badge-svg-item">
                <BadgeSvg
                  status={b.status}
                  title="picoCTF"
                  subtitle="Writeups + Thinking"
                  size={160}
                  showLock={false}
                />
                <div className="badge-svg-caption">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tooling */}
        <div className="badge-panel">
          <div className="badge-panel-title">
            <h3>Tooling</h3>
            <p>日常使用與熟悉度</p>
          </div>

          <div className="badge-row">
            {achievements.tools.map((b) => (
              <div key={b.label} className="badge-svg-item">
                <BadgeSvg
                  status={b.status}
                  title="Tooling"
                  subtitle="Daily Practice"
                  size={160}
                  showLock={false}
                />
                <div className="badge-svg-caption">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
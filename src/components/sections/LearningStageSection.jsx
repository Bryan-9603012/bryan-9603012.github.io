export default function LearningStageSection({ onOpenLinux, onOpenPico, onOpenDigitalLogic }) {
  return (
    <section id="projects" className="section-card">
      <h2>學習主舞台</h2>
      <p className="section-desc">
        目前主力是三條線：Linux 打地基、picoCTF 練實戰、Digital Logic 展示硬體/系統整合能力。
      </p>

      <div className="learning-grid three-col">
        {/* Linux Notes */}
        <div className="learning-item">
          <div className="learning-head">
            <h3>Linux / CLI 筆記</h3>
            <span className="mini-pill">System Learning</span>
          </div>
          <p>
            以資安視角整理 Linux 的權限、使用者、服務與系統管理概念，強調「為什麼要這樣設計」。
          </p>
          <ul className="learning-points">
            <li>最小權限原則（Least Privilege）</li>
            <li>使用者 / 群組 / sudo 觀念</li>
            <li>服務管理與日誌追蹤</li>
          </ul>
          <div className="learning-actions">
            <button type="button" className="btn" onClick={onOpenLinux}>
              開啟 Linux Notes
            </button>
            <a className="ghost btn" href="#learning">
              看成果徽章
            </a>
          </div>
        </div>

        {/* picoCTF */}
        <div className="learning-item">
          <div className="learning-head">
            <h3>picoCTF 解題紀錄</h3>
            <span className="mini-pill">Practical CTF</span>
          </div>
          <p>
            將題目依類型整理，記錄解題思路、踩過的坑與修正方式，讓「怎麼想」比「答案」更清楚。
          </p>
          <ul className="learning-points">
            <li>Web / Crypto / General Skills</li>
            <li>解題流程（輸入 → 觀察 → 推理 → 驗證）</li>
            <li>常見陷阱：編碼、權限、路徑、條件繞過</li>
          </ul>
          <div className="learning-actions">
            <button type="button" className="btn" onClick={onOpenPico}>
              開啟 Writeups
            </button>
            <a className="ghost btn" href="#learning">
              看成果徽章
            </a>
          </div>
        </div>

        {/* Digital Logic */}
        <div className="learning-item">
          <div className="learning-head">
            <h3>Digital Logic</h3>
            <span className="mini-pill">Hardware / System</span>
          </div>
          <p>
            數位邏輯作品文檔整理：多位數計數與顯示整合、JK FF 時序設計、模組化組合邏輯。
          </p>
          <ul className="learning-points">
            <li>多級計數器串接（Carry Propagation）</li>
            <li>State-Based Design（JK Flip-Flop）</li>
            <li>階層式設計（自訂 Symbol / 可重用）</li>
          </ul>
          <div className="learning-actions">
            <button type="button" className="btn" onClick={onOpenDigitalLogic}>
              開啟 Digital Logic
            </button>
            <a className="ghost btn" href="#learning">
              看成果徽章
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
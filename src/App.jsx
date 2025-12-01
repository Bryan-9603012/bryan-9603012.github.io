import Terminal from "./components/Terminal";
import PicoCTFModal from "./components/PicoCTFModal";
import { useState } from "react";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);

  return (
    <>
      <div className="glow-bg"></div>
      <div className="hero-gradient" aria-hidden="true"></div>
      <div className="bottom-gradient" aria-hidden="true"></div>

      <div className="wrap">
        <header>
          <div className="logo">劉</div>
          <div>
            <h1>劉興源</h1>
            <div className="tag">學生 • 科技愛好者</div>
          </div>
        </header>

        {/* 新的左右兩欄容器 */}
        <div className="layout">
          {/* 左側主欄 */}
          <main className="main-column">
            <section className="card about-panel">
              <h2>關於我</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                我是 <strong>劉興源</strong>，一位熱愛科技的學生。這是我用 HTML/CSS 打造的個人網頁，展現了我對科技與程式設計的熱情。
              </p>

              <hr
                style={{
                  margin: "12px 0",
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
              />

              <h3 style={{ color: "var(--neon-emerald)" }}>即時面板</h3>
              <Terminal />

              <hr
                style={{
                  margin: "12px 0",
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
              />

              <h3>技能</h3>
              <div className="skills">
                <span className="chip">HTML5</span>
                <span className="chip">Modern CSS</span>
                <span className="chip">Responsive</span>
                <span className="chip">Accessibility</span>
                <span className="chip">Design Systems</span>
                <span className="chip">Performance</span>
              </div>

              <hr
                style={{
                  margin: "12px 0",
                  border: "none",
                  borderTop: "1px solid rgba(255,255,255,0.03)",
                }}
              />

              <h3 style={{ color: "var(--neon-cyan)", marginBottom: "12px" }}>
                成就與認證
              </h3>
              <div className="achievements">
                <div
                  className="badge"
                  title="點此查看細節"
                  onClick={() =>
                    alert("取得時間：2023，類型：程式設計基礎")
                  }
                >
                  <div className="badge-icon">🎓</div>
                  <div className="badge-title">程式設計基礎</div>
                  <div className="badge-desc">完成基礎課程認證</div>
                </div>
                <div
                  className="badge"
                  title="點此查看細節"
                  onClick={() =>
                    alert("取得時間：2023，類型：網頁開發")
                  }
                >
                  <div className="badge-icon">💻</div>
                  <div className="badge-title">網頁開發</div>
                  <div className="badge-desc">前端技術能力認證</div>
                </div>
                <div className="badge">
                  <div className="badge-icon">🏆</div>
                  <div className="badge-title">專案完成</div>
                  <div className="badge-desc">首個作品集發布</div>
                </div>
                <div className="badge">
                  <div className="badge-icon">🌟</div>
                  <div className="badge-title">創新設計</div>
                  <div className="badge-desc">UI/UX 設計認證</div>
                </div>
              </div>
            </section>

            {/* 如果你未來要把 picoCTF 直接放在主欄（非 Modal），就可以在這裡插入 <PicoPage /> */}
          </main>

          {/* 右側側欄：picoCTF 這裡保持原本邏輯 */}
          <aside className="side-column">
            <div className="card">
              <h3 style={{ color: "var(--neon-magenta)" }}>專案</h3>

              <div className="proj">
                <div>
                  <div style={{ fontWeight: 700 }}>作品集網站</div>
                  <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                    靜態網站 / 設計與部署
                  </div>
                </div>
                <div>
                  <a className="btn" href="#">
                    檢視
                  </a>
                </div>
              </div>

              <div className="proj">
                <div>
                  <div style={{ fontWeight: 700 }}>CSS 實驗室</div>
                  <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                    互動與微動畫
                  </div>
                </div>
                <div>
                  <a className="ghost btn" href="#">
                    程式碼
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "6px",
                }}
              >
                <a className="btn" href="mailto:bryanhuang710910@gmail.com">
                  聯絡我
                </a>
                <a className="ghost btn" href="#">
                  我的作品集
                </a>
              </div>
            </div>

            {/* picoCTF 觸發按鈕：不改邏輯，只是跟其他卡在一起 */}
            <div className="card">
              <h3 style={{ color: "var(--neon-emerald)" }}>picoCTF 解析</h3>
              <div
                className="proj"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPicoPage(true)}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>1 題 writeup</div>
                  <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                    簡單/一般/困難分級
                  </div>
                </div>
                <div>
                  <span className="btn">進入解析區</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 style={{ color: "var(--neon-cyan)" }}>快速資料</h4>
              <div
                style={{
                  marginTop: "8px",
                  color: "var(--muted)",
                  fontSize: "13px",
                }}
              >
                <div>所在：台灣</div>
                <div>開始可用：2025-12</div>
                <div>語言：中文（繁體）、英文</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer>
        © 2025 劉興源。頁面為純 HTML + CSS（單檔）• 科技風格設計。
      </footer>

      <PicoCTFModal
        isOpen={showPicoPage}
        onClose={() => setShowPicoPage(false)}
      />
    </>
  );
}

export default App;

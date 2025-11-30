import Terminal from "./components/Terminal";
import { useState } from "react";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);

  // picoCTF 題目資料（之後都在這裡新增題目）
  const problems = [
    {
      id: "register-game",
      title: "Getting Started / 註冊遊戲指引",
      difficulty: "easy",
      steps: [
        "在終端機輸入：nc verbal-sleep.picoctf.net 50621 進行連線。",
        "出現 Nyx brings up the registration page. 選項 A/B/C 時，輸入 c（Register a single, private account）。",
        "接著出現 Options: A) Play the game / B) Search the Ether for the flag 時，輸入 a 開始遊戲（注意 b 會讓你卡在無限循環）。",
        "之後照提示一路往下讀，只要一直按 Enter，最後就會看到 flag。",
      ],
      note: "這題主要是熟悉 nc 連線與遵守比賽規則（單一帳號、不可共用），技術難度不高，但很重要!!!!",
    },
    // 之後新增題目就加在這裡，複製上面那個物件格式
  ];

  const difficultyLabels = {
    easy: "簡單",
    normal: "一般",
    hard: "困難",
  };

  // picoCTF 內部狀態
  const [picoView, setPicoView] = useState("difficulty");
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [currentProblemId, setCurrentProblemId] = useState(null);

  const handleSelectDifficulty = (diff) => {
    setCurrentDifficulty(diff);
    setPicoView("list");
  };

  const handleOpenProblem = (id) => {
    setCurrentProblemId(id);
    setPicoView("detail");
  };

  const handleBackToList = () => {
    setPicoView("list");
    setCurrentProblemId(null);
  };

  const handleBackToDifficulty = () => {
    setPicoView("difficulty");
    setCurrentDifficulty(null);
    setCurrentProblemId(null);
  };

  const filteredProblems = currentDifficulty
    ? problems.filter((p) => p.difficulty === currentDifficulty)
    : [];

  const currentProblem = problems.find((p) => p.id === currentProblemId);

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

        <main className="card">
          <h2>關於我</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
            我是 <strong>劉興源</strong>，一位熱愛科技的學生。這是我用 HTML/CSS 打造的個人網頁，展現了我對科技與程式設計的熱情。
          </p>

          <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.03)" }} />
          <h3 style={{ color: "var(--neon-emerald)" }}>即時面板</h3>
          <Terminal />

          <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.03)" }} />
          <h3>技能</h3>
          <div className="skills">
            <span className="chip">HTML5</span>
            <span className="chip">Modern CSS</span>
            <span className="chip">Responsive</span>
            <span className="chip">Accessibility</span>
            <span className="chip">Design Systems</span>
            <span className="chip">Performance</span>
          </div>

          <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.03)" }} />
          <h3 style={{ color: "var(--neon-cyan)", marginBottom: "12px" }}>成就與認證</h3>
          <div className="achievements">
            <div className="badge" title="點此查看細節" onClick={() => alert("取得時間：2023，類型：程式設計基礎")}>
              <div className="badge-icon">🎓</div><div className="badge-title">程式設計基礎</div><div className="badge-desc">完成基礎課程認證</div>
            </div>
            <div className="badge" title="點此查看細節" onClick={() => alert("取得時間：2023，類型：網頁開發")}>
              <div className="badge-icon">💻</div><div className="badge-title">網頁開發</div><div className="badge-desc">前端技術能力認證</div>
            </div>
            <div className="badge"><div className="badge-icon">🏆</div><div className="badge-title">專案完成</div><div className="badge-desc">首個作品集發布</div></div>
            <div className="badge"><div className="badge-icon">🌟</div><div className="badge-title">創新設計</div><div className="badge-desc">UI/UX 設計認證</div></div>
          </div>
        </main>

        <aside style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="card">
            <h3 style={{ color: "var(--neon-magenta)" }}>專案</h3>
            <div className="proj">
              <div><div style={{ fontWeight: 700 }}>作品集網站</div><div style={{ color: "var(--muted)", fontSize: "13px" }}>靜態網站 / 設計與部署</div></div>
              <div><a className="btn" href="#">檢視</a></div>
            </div>
            <div className="proj">
              <div><div style={{ fontWeight: 700 }}>CSS 實驗室</div><div style={{ color: "var(--muted)", fontSize: "13px" }}>互動與微動畫</div></div>
              <div><a className="ghost btn" href="#">程式碼</a></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
              <a className="btn" href="mailto:bryanhuang710910@gmail.com">聯絡我</a>
              <a className="ghost btn" href="#">我的作品集</a>
            </div>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--neon-emerald)" }}>picoCTF 解析</h3>
            <div className="proj" style={{ cursor: "pointer" }} onClick={() => setShowPicoPage(true)}>
              <div>
                <div style={{ fontWeight: 700 }}>{problems.length} 題 writeup</div>
                <div style={{ color: "var(--muted)", fontSize: "13px" }}>簡單/一般/困難分級</div>
              </div>
              <div><span className="btn">進入解析區</span></div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ color: "var(--neon-cyan)" }}>快速資料</h4>
            <div style={{ marginTop: "8px", color: "var(--muted)", fontSize: "13px" }}>
              <div>所在：台灣</div><div>開始可用：2025-12</div><div>語言：中文（繁體）、英文</div>
            </div>
          </div>
        </aside>
      </div>

      <footer>© 2025 劉興源。頁面為純 HTML + CSS（單檔）• 科技風格設計。</footer>

      {/* 全頁 picoCTF 解析 Modal */}
      {showPicoPage && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)"
        }}>
          <div className="card" style={{ maxWidth: "1000px", maxHeight: "90vh", width: "95%", height: "90vh", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ color: "var(--neon-magenta)", margin: 0 }}>picoCTF 解題區</h2>
              <button 
                className="ghost btn" 
                onClick={() => setShowPicoPage(false)}
                style={{ fontSize: "18px" }}
              >
                ✕
              </button>
            </div>

            <div style={{ height: "100%", overflowY: "auto" }}>
              {picoView === "difficulty" && (
                <>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "20px" }}>
                    選擇難度後，可以查看該難度下的題目列表，再點進去看每一題的解析。
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button className="btn" onClick={() => handleSelectDifficulty("easy")}>簡單</button>
                    <button className="ghost btn" onClick={() => handleSelectDifficulty("normal")}>一般</button>
                    <button className="ghost btn" onClick={() => handleSelectDifficulty("hard")}>困難</button>
                  </div>
                </>
              )}

              {picoView === "list" && (
                <>
                  <div style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "16px" }}>
                    目前難度：{difficultyLabels[currentDifficulty]} ({filteredProblems.length} 題)
                  </div>
                  {filteredProblems.map((p) => (
                    <div
                      key={p.id}
                      className="proj"
                      style={{ cursor: "pointer", marginBottom: "12px" }}
                      onClick={() => handleOpenProblem(p.id)}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "16px" }}>{p.title}</div>
                        <div style={{ color: "var(--muted)", fontSize: "14px" }}>
                          難度：{difficultyLabels[p.difficulty]}
                        </div>
                      </div>
                      <div><span className="btn">查看解析</span></div>
                    </div>
                  ))}
                  {filteredProblems.length === 0 && (
                    <div style={{ color: "var(--muted)", fontSize: "15px", marginTop: "20px" }}>
                      這個難度還沒新增題目，可以之後再補上。
                    </div>
                  )}
                  <button className="ghost btn" style={{ marginTop: "16px" }} onClick={handleBackToDifficulty}>
                    ← 返回難度選單
                  </button>
                </>
              )}

              {picoView === "detail" && currentProblem && (
                <>
                  <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>
                    難度：{difficultyLabels[currentProblem.difficulty]}
                  </div>
                  <h3 style={{ marginBottom: "16px", fontSize: "20px" }}>{currentProblem.title}</h3>
                  <ol style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, paddingLeft: "24px" }}>
                    {currentProblem.steps.map((step, i) => (
                      <li key={i} style={{ marginBottom: "8px" }}>{step}</li>
                    ))}
                  </ol>
                  <div style={{ color: "var(--muted)", fontSize: "14px", marginTop: "16px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
                    💡 {currentProblem.note}
                  </div>
                  <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                    <button className="btn" onClick={handleBackToList}>← 返回題目列表</button>
                    <button className="ghost btn" onClick={handleBackToDifficulty}>返回難度選單</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

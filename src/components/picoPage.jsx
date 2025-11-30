import { useState } from "react";

const problems = 
[
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
    note: "這題主要是熟悉 nc 連線與遵守比賽規則（單一帳號、不可共用），技術難度不高，但很重要。",
  },
];

const difficultyLabels = {
  easy: "簡單",
  normal: "一般",
  hard: "困難",
};

export default function PicoPage() {
  const [view, setView] = useState("difficulty"); // difficulty | list | detail
  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const [currentProblemId, setCurrentProblemId] = useState(null);

  const handleSelectDifficulty = (diff) => {
    setCurrentDifficulty(diff);
    setView("list");
  };

  const handleOpenProblem = (id) => {
    setCurrentProblemId(id);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setCurrentProblemId(null);
  };

  const handleBackToDifficulty = () => {
    setView("difficulty");
    setCurrentDifficulty(null);
    setCurrentProblemId(null);
  };

  const filteredProblems = currentDifficulty
    ? problems.filter((p) => p.difficulty === currentDifficulty)
    : [];

  const currentProblem = problems.find((p) => p.id === currentProblemId) || null;

  return (
    <section className="card" style={{ marginTop: "20px" }}>
      <h2 style={{ color: "var(--neon-magenta)", marginBottom: "8px" }}>
        picoCTF 解題區
      </h2>

      {view === "difficulty" && (
        <>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "13px",
              lineHeight: 1.7,
              marginBottom: "10px",
            }}
          >
            選擇難度後，可以查看該難度下的題目列表，再點進去看每一題的解析。
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              className="btn"
              onClick={() => handleSelectDifficulty("easy")}
            >
              簡單
            </button>
            <button
              className="ghost btn"
              onClick={() => handleSelectDifficulty("normal")}
            >
              一般
            </button>
            <button
              className="ghost btn"
              onClick={() => handleSelectDifficulty("hard")}
            >
              困難
            </button>
          </div>
        </>
      )}

      {view === "list" && (
        <>
          <div
            style={{
              color: "var(--muted)",
              fontSize: "13px",
              marginBottom: "8px",
              marginTop: "4px",
            }}
          >
            目前難度：{difficultyLabels[currentDifficulty] || "未知"}
          </div>

          {filteredProblems.length === 0 && (
            <div
              style={{
                color: "var(--muted)",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              這個難度還沒新增題目，可以之後再補上。
            </div>
          )}

          {filteredProblems.map((p) => (
            <div
              key={p.id}
              className="proj"
              style={{ cursor: "pointer" }}
              onClick={() => handleOpenProblem(p.id)}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                  難度：{difficultyLabels[p.difficulty]}
                </div>
              </div>
              <div>
                <span className="btn">查看解析</span>
              </div>
            </div>
          ))}

          <button
            className="ghost btn"
            style={{ marginTop: "10px" }}
            onClick={handleBackToDifficulty}
          >
            ← 返回難度選單
          </button>
        </>
      )}

      {view === "detail" && currentProblem && (
        <>
          <div
            style={{
              color: "var(--muted)",
              fontSize: "13px",
              marginBottom: "6px",
            }}
          >
            難度：{difficultyLabels[currentProblem.difficulty]}
          </div>
          <h3 style={{ marginBottom: "6px" }}>{currentProblem.title}</h3>

          <ol
            style={{
              color: "var(--muted)",
              fontSize: "13px",
              lineHeight: 1.7,
              paddingLeft: "18px",
            }}
          >
            {currentProblem.steps.map((s, i) => (
              <li key={i} style={{ marginBottom: "4px" }}>
                {s}
              </li>
            ))}
          </ol>

          <div
            style={{
              color: "var(--muted)",
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            備註：{currentProblem.note}
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button className="btn" onClick={handleBackToList}>
              ← 返回題目列表
            </button>
            <button className="ghost btn" onClick={handleBackToDifficulty}>
              返回難度選單
            </button>
          </div>
        </>
      )}
    </section>
  );
}

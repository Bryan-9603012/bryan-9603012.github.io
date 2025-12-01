import { useState } from "react";

const problems = 
[
  {
    id: "register-game",
    title: "FANTASY CTF",
    difficulty: "easy",
    steps: [
      "在終端機輸入：nc verbal-sleep.picoctf.net 50621 進行連線。(每個人專屬連線資訊請參考 picoCTF 網站上的提示)",
      "出現 Nyx brings up the registration page. 選項 A/B/C 時，輸入 c（Register a single, private account）。",
      "接著出現 Options: A) Play the game / B) Search the Ether for the flag 時，輸入 a 開始遊戲（注意 b 會讓你卡在無限循環）。",
      "之後照提示一路往下讀，只要一直按 Enter，最後就會看到 flag。",
    ],
    note: "這題主要是熟悉 nc 連線與遵守比賽規則（單一帳號、不可共用），技術難度不高，但很重要",
  },
  {
    id:"log-hunt",
    title:"Log Hunt",
    difficulty:"easy",
    steps:
    [
      "步驟一:下載好題目要的檔案後切換到你存放檔案的目錄，且在終端機輸入ls -a查看有沒有隱藏的檔案",
      "步驟二:使用cat <檔名>查看檔案的內容",
            "沒意外的話你會看到一大堆的log檔案",
      "步驟三使用grep尋找flag(grep 的主要功能與用途在檔案中搜尋特定文字)",
      "那我們要的特定文字是FLAG所以我們輸入grep FLAG <檔名>",
      "步驟四:拼出flag就好了","flag的格式為picoCTF{...}"
    ],
    note:"關鍵字選picoCTF的話只會出現picoCTF而已不會出現完整flag所以要選FLAG",
  },
  {
    id:"pie-time",
    title:"Pie Time",
    difficulty:"easy",
    steps:
    [
      "挑戰概述",
      "這題目標是透過 buffer overflow 找到 win 函式的正確地址，讓程式呼叫 win 函式顯示 flag。",
      "提供的 vuln 二進位檔有 main 和 win 兩個函式，透過 offset 計算實現 ret2win。",
      "步驟一：靜態分析",
      "在終端機裡輸入:objdump -d vuln | grep '<main>",
      "11c1:  48 8d 3d 75 01 00 00  lea  0x175(%rip),%rdi  # 133d <main>",
      "main offset: 0x133d",
      "再來輸入:objdump -d vuln | grep <win>",
      "這樣就可以直接取得 win offset。",
      "步驟二:Win 地址計算",
      "使用公式：win_address = main_address - (main_offset - win_offset)。",
      "步驟三:nc 連線",
      "在終端機裡輸入計算出來的 win 地址",
      "這樣就可以得到flag了",
    ],
    note:   "如果出現了Segfault Occurred, incorrect address.那有可能是你算錯了\n如果沒算錯那就是格式打錯了address的格式必須用hex也就是0x.........."
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
    setView("difficulty");yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
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

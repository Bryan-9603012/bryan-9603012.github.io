import { useState } from "react";

const problems = [
  {
    id: "register-game",
    title: "FANTASY CTF",
    difficulty: "easy",
    steps: [
      "使用nc 命令連線到指定的伺服器和埠號 (nc <伺服器IP> <埠號>)",
      "連上後一直按enter直到看到Nyx brings up the registration page.",
      "看到Nyx brings up the registration page.之後輸入c",
      "然後繼續按enter直到",
      "看到Oh interesting, Eibhilin says,It seems like the sanity challenge is an old school interactive fiction game.",
      "然後輸入c",
      "然後再繼續按enter就可以看到flag了",
    ],
    note:
      "在使用nc命令連線的時候如果出現Connection refused的話代表伺服器關閉了，可以等一段時間再試試看",
  },
  {
    id: "log-hunt",
    title: "Log Hunt",
    difficulty: "easy",
    steps: [
      "下載好題目要的檔案後切換到你存放檔案的目錄，且在終端機輸入ls -a查看有沒有隱藏的檔案",
      "使用cat <檔名>查看檔案的內容，沒意外的話你會看到一大堆的log檔案",
      "使用grep尋找flag(grep 的主要功能與用途在檔案中搜尋特定文字)",
      "那我們要的特定文字是FLAG所以我們輸入grep FLAG <檔名>",
      "拼出flag就好了",
      "flag的格式為picoCTF{...}",
    ],
    note:
      "關鍵字選picoCTF的話只會出現picoCTF而已不會出現完整flag所以要選FLAG",
  },
  {
    id: "super-ssh",
    title: "Super SSH",
    difficulty: "easy",
    steps: [
      "使用ssh命令連線到指定的伺服器(ssh <使用者名稱>@<伺服器IP>)",
      "ex: ssh ctf-player@titan.picoctf.net -p 53499",
      "看到Are you sure you want to continue connecting (yes/no/[fingerprint])?輸入yes",
      "接著輸入密碼: 84b12bae",
      "然後你就可以得到flag了",
    ],
  },
  {
    id: "repetitions",
    title: "Repetitions",
    difficulty: "easy",
    steps: [
      "挑戰概述:",
      "要你解讀提供的檔案 enc_flag。這個檔案通常是一個經過多層 Base64 編碼的字串。",
      "先用 cat enc_flag 查看內容，會看到類似亂碼的 Base64 字串",
      "步驟一:在中 端機輸入nano test",
      "然後把程式一貼上去，然後Ctrl+O存檔 Ctrl+X離開:",
      "在終端機上輸入python3 test.py",
      "然後你就會得到 Base64 編碼過的字串",
      "步驟二:在終端機輸入nano test1",
      "然後把程式二貼上去，然後Ctrl+O存檔 Ctrl+X離開:",
      "在終端機上輸入python3 test1.py",
      "然後你就會得到flag了",
    ],
  },
  {
      id: "what's a net cat?",
      title: "What's a Net Cat?",
      difficulty: "easy",
      steps: [
        "挑戰概述:",
        "這題目標是使用 netcat (nc) 工具連接到指定的伺服器和埠號，並從中獲取 flag。",
        "步驟一:打開終端機",
        "步驟二:使用 nc 命令連接到伺服器",
        "在終端機中輸入以下命令: nc <伺服器位子> <埠號>",
        "沒有意外的話你會看到一些數字，這些數字其實是 ASCII 編碼",
        "步驟三:將 ASCII 編碼轉換為文字，獲取 flag",
      ],
  },
  {
      id:"nice netcat...",
      title: "Nice Netcat...",
      difficulty: "easy",
      steps: [
        "挑戰概述:",
        "這題目標是使用 netcat (nc) 工具連接到指定的伺服器和埠號，並從中獲取 flag。",
        "步驟一:打開終端機",
        "步驟二:使用 nc 命令連接到伺服器",
        "在終端機中輸入以下命令: nc <伺服器位子> <埠號>",
        "例如: nc 2019shell1.picoctf.com 54321",
        "步驟三:接收 flag",
      ],
  },
  {
      id:"rotation",
      title: "Rotation",
      difficulty: "normal",
      steps: 
      [
        "挑戰概述:",
        "這題目標是解碼一個經過旋轉加密的字串以獲取 flag。",
        "步驟一:下載檔案後切到存放檔案的目錄",
        "步驟二:使用cat查看檔案內容",
        "步驟三:使用ROT13解碼工具解碼字串，然後就可以得到flag了",
      ],
  note:"picoCTF的flag一定是pico{.....}的格式"
  },
  {
    id: "pie-time",
    title: "Pie Time",
    difficulty: "easy",
    steps: [
      "挑戰概述",
      "這題目標是透過 buffer overflow 找到 win 函式的正確地址，讓程式呼叫 win 函式顯示 flag。",
      "提供的 vuln 二進位檔有 main 和 win 兩個函式，透過 offset 計算實現 ret2win。",
      "步驟一：靜態分析",
      "在終端機裡輸入:objdump -d vuln | grep '<main>'",
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
    note:
      "如果出現了Segfault Occurred, incorrect address.那有可能是你算錯了\n如果沒算錯那就是格式打錯了address的格式必須用hex也就是0x..........",
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
  const [visibleCode, setVisibleCode] = useState(null); // 控制程式碼顯示

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
    setVisibleCode(null);
  };

  const filteredProblems = currentDifficulty
    ? problems.filter((p) => p.difficulty === currentDifficulty)
    : [];

  const currentProblem =
    problems.find((p) => p.id === currentProblemId) || null;

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

            {/* Repetitions 題目額外程式碼按鈕 */}
            {currentProblem.id === "repetitions" && (
              <div style={{ marginTop: "10px" }}>
                <h4
                  style={{
                    color: "var(--neon-magenta)",
                    marginBottom: "6px",
                  }}
                >
                  程式碼範例
                </h4>

                {/* 程式一 */}
                <button
                  className="btn"
                  onClick={() =>
                    setVisibleCode(visibleCode === "code1" ? null : "code1")
                  }
                >
                  程式一
                </button>

                {visibleCode === "code1" && (
                  <div style={{ marginTop: "4px" }}>
                    <pre
                      style={{
                        background: "#111",
                        color: "#0f0",
                        padding: "10px",
                        borderRadius: "5px",
                        overflowX: "auto",
                      }}
                    >
{`import base64

def is_base64(s):
    try:
        if isinstance(s, str):
            s_bytes = s.encode('utf-8')
        else:
            s_bytes = s
        base64.b64decode(s_bytes, validate=True)
        return True
    except Exception:
        return False

def multi_base64_decode(data):
    current_data = data
    while True:
        if not is_base64(current_data):
            break
        decoded_bytes = base64.b64decode(current_data)
        try:
            decoded_str = decoded_bytes.decode('utf-8')
            current_data = decoded_str
        except UnicodeDecodeError:
            current_data = decoded_bytes
            break
    return current_data

with open('enc_flag', 'r') as f:
    encoded_flag = f.read().strip()

flag = multi_base64_decode(encoded_flag)
print("Flag:", flag)`}
                    </pre>

                    <button
                      className="ghost btn"
                      onClick={() =>
                        navigator.clipboard.writeText(`import base64

def is_base64(s):
    try:
        if isinstance(s, str):
            s_bytes = s.encode('utf-8')
        else:
            s_bytes = s
        base64.b64decode(s_bytes, validate=True)
        return True
    except Exception:
        return False

def multi_base64_decode(data):
    current_data = data
    while True:
        if not is_base64(current_data):
            break
        decoded_bytes = base64.b64decode(current_data)
        try:
            decoded_str = decoded_bytes.decode('utf-8')
            current_data = decoded_str
        except UnicodeDecodeError:
            current_data = decoded_bytes
            break
    return current_data

with open('enc_flag', 'r') as f:
    encoded_flag = f.read().strip()

flag = multi_base64_decode(encoded_flag)
print("Flag:", flag)`)
                      }
                    >
                      複製程式一
                    </button>
                  </div>
                )}

                {/* 程式二 */}
                <button
                  className="btn"
                  style={{ marginTop: "8px" }}
                  onClick={() =>
                    setVisibleCode(visibleCode === "code2" ? null : "code2")
                  }
                >
                  程式二
                </button>

                {visibleCode === "code2" && (
                  <div style={{ marginTop: "4px" }}>
                    <pre
                      style={{
                        background: "#111",
                        color: "#0f0",
                        padding: "10px",
                        borderRadius: "5px",
                        overflowX: "auto",
                      }}
                    >
{`import base64

flag = """VmpGU1EyRXlUWGxTYmxKVVYwZFNWbGxyV21GV1JteDBUbFpPYWxKdFVsaFpWVlUxWVZaS1ZWWnVh
RmRXZWtab1dWWmtSMk5yTlZWWApiVVpUVm10d1VWZFdVa2RpYlZaWFZtNVdVZ3BpU0VKeldWUkNk
MlZXVlhoWGJYQk9VbFJXU0ZkcVRuTldaM0JZVWpGS2VWWkdaSGRXCk1sWnpWV3hhVm1KRk5XOVVW
VkpEVGxaYVdFMVhSbFZrTTBKVVZXcE9VazFXV2toT1dHUllDbUY2UWpSWk1GWlhWa2RHZEdWRlZs
aGkKYlRrelZERldUMkpzUWxWTlJYTkxDZz09Cg=="""

flag = flag.replace("\\n", "")

while True:
    try:
        decoded = base64.b64decode(flag).decode('utf-8')
        flag = decoded
    except Exception:
        break

print("Decoded flag:", flag)`}
                    </pre>

                    <button
                      className="ghost btn"
                      onClick={() =>
                        navigator.clipboard.writeText(`import base64

flag = """VmpGU1EyRXlUWGxTYmxKVVYwZFNWbGxyV21GV1JteDBUbFpPYWxKdFVsaFpWVlUxWVZaS1ZWWnVh
RmRXZWtab1dWWmtSMk5yTlZWWApiVVpUVm10d1VWZFdVa2RpYlZaWFZtNVdVZ3BpU0VKeldWUkNk
MlZXVlhoWGJYQk9VbFJXU0ZkcVRuTldaM0JZVWpGS2VWWkdaSGRXCk1sWnpWV3hhVm1KRk5XOVVW
VkpEVGxaYVdFMVhSbFZrTTBKVVZXcE9VazFXV2toT1dHUllDbUY2UWpSWk1GWlhWa2RHZEdWRlZs
aGkKYlRrelZERldUMkpzUWxWTlJYTkxDZz09Cg=="""

flag = flag.replace("\\n", "")

while True:
    try:
        decoded = base64.b64decode(flag).decode('utf-8')
        flag = decoded
    except Exception:
        break

print("Decoded flag:", flag)`)
                      }
                    >
                      複製程式二
                    </button>
                  </div>
                )}
              </div>
            )}
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

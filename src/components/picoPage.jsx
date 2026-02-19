import { useMemo, useState } from "react";
import "./LinuxNotesModal.css";

/**
 * picoPage.jsx
 * - 目的：把 picoCTF 解題內容用 LinuxNotebook 的筆記 UI 呈現
 * - 風格：ln-note / ln-section / ln-table / ln-code / ln-callout
 * - 版面：左 sidebar（難度 + 題目）｜右 content（內容）
 */

const problems = [
  {
    id: "register-game",
    title: "FANTASY CTF",
    difficulty: "easy",
    steps: [
      "使用 nc 連線到指定伺服器與埠號：nc <伺服器IP> <埠號>",
      "連上後一直按 Enter，直到看到：Nyx brings up the registration page.",
      "看到 registration page 後輸入：c",
      "繼續按 Enter，直到看到：Oh interesting, Eibhilin says, It seems like the sanity challenge is an old school interactive fiction game.",
      "輸入：c",
      "繼續按 Enter 即可看到 flag",
    ],
    note:
      "若 nc 出現 Connection refused，代表伺服器關閉或暫停；稍後再試即可。",
  },
  {
    id: "log-hunt",
    title: "Log Hunt",
    difficulty: "easy",
    steps: [
      "下載檔案後切到存放目錄，使用 ls -a 確認是否有隱藏檔",
      "使用 cat <檔名> 查看內容（通常是一堆 log）",
      "用 grep 搜尋關鍵字",
      "輸入：grep FLAG <檔名>",
      "拼出 flag（格式 picoCTF{...}）",
    ],
    note: "用 picoCTF 當關鍵字可能只會出現字樣，不會出現完整 flag；建議用 FLAG。",
  },
  {
    id: "super-ssh",
    title: "Super SSH",
    difficulty: "easy",
    steps: [
      "使用 ssh 連線到指定伺服器：ssh <使用者>@<伺服器IP> -p <port>",
      "例：ssh ctf-player@titan.picoctf.net -p 53499",
      "提示 Are you sure... 輸入 yes",
      "輸入密碼：84b12bae",
      "取得 flag",
    ],
  },
  {
    id: "repetitions",
    title: "Repetitions",
    difficulty: "easy",
    steps: [
      "挑戰概述：解讀提供的 enc_flag（通常是多層 Base64）",
      "先用 cat enc_flag 查看內容",
      "步驟一：建立程式一檔案（nano test.py），貼上程式一後存檔離開",
      "執行：python3 test.py，得到解碼後的字串",
      "步驟二：建立程式二檔案（nano test1.py），貼上程式二後存檔離開",
      "執行：python3 test1.py，取得 flag",
    ],
  },
  {
    id: "what's a net cat?",
    title: "What's a Net Cat?",
    difficulty: "easy",
    steps: [
      "挑戰概述：使用 netcat (nc) 連線到指定 host/port，取得輸出",
      "在終端機輸入：nc <host> <port>",
      "看到一串數字（ASCII），轉換為文字後取得 flag",
    ],
  },
  {
    id: "nice netcat...",
    title: "Nice Netcat...",
    difficulty: "easy",
    steps: [
      "挑戰概述：使用 netcat (nc) 連線到指定 host/port",
      "在終端機輸入：nc <host> <port>",
      "例：nc 2019shell1.picoctf.com 54321",
      "接收輸出取得 flag",
    ],
  },
  {
    id: "rotation",
    title: "Rotation",
    difficulty: "normal",
    steps: [
      "挑戰概述：ROT 類旋轉加密字串解碼",
      "下載檔案後切到存放目錄",
      "使用 cat 查看檔案內容",
      "用 ROT13 / ROTn 工具解碼取得 flag（flag 格式 picoCTF{...}）",
    ],
    note: "picoCTF flag 格式固定 picoCTF{.....}",
  },
  {
    id: "interencdec",
    title: "InterEncDec",
    difficulty: "easy",
    steps: [
      "挑戰概述：多層編碼解碼取得 flag",
      "下載檔案後切到存放目錄",
      "cat 看到 base64 字串 → base64 解碼",
      "再次得到 base64 → 再解碼",
      "最後用 rot7 解碼取得 flag",
    ],
    note: "順序：base64 → base64 → rot7",
  },
  {
    id: "flag hunter",
    title: "Flag Hunter",
    difficulty: "easy",
    steps: ["挑戰概述：", "（你可以之後補上這題的內容）"],
  },
  {
    id: "sansalpha",
    title: "SansAlpha",
    difficulty: "normal",
    steps: [
      "挑戰概述：利用 bash globbing 繞過字母禁令取得 flag",
      "輸入 * 展開當前目錄",
      "輸入 */* 展開子目錄，發現 flag.txt",
      "輸入 /* 匹配根目錄所有項目",
      "輸入 /*/??? 匹配 /bin 下 3 字元命令",
      "輸入 /*/?????? 匹配 6 字元，找到 base64",
      "輸入 /*/????64 */* 精準匹配 base64",
      "輸入 /*/???[!_]64 */* 匹配到 /bin/base64",
      "輸入 /*/???[!_]64 */????.* 取得 base64 編碼，解碼得到 flag",
    ],
  },
  {
    id: "pie-time",
    title: "Pie Time",
    difficulty: "easy",
    steps: [
      "挑戰概述：buffer overflow，目標是讓程式呼叫 win() 顯示 flag",
      "步驟一：靜態分析 main offset",
      "objdump -d vuln | grep '<main>'",
      "取得 main offset（例：0x133d）",
      "步驟二：取得 win offset",
      "objdump -d vuln | grep '<win>'",
      "步驟三：計算 win address",
      "win_address = main_address - (main_offset - win_offset)",
      "步驟四：nc 連線後輸入計算出的 win address（hex 格式 0x...）",
      "取得 flag",
    ],
    note:
      "若出現 Segfault incorrect address：通常是位址算錯或格式不是 0x 開頭 hex。",
  },
];
[
{
  id: "head-dump",
  title: "Head Dump",
  difficulty: "normal",
  steps: 
  [
    "head-dump",
    "類型：Web Exploitation",
    "🧠 解題核心",

    "這題的關鍵是：",

    "找到會產生伺服器記憶體檔案的 API endpoint",
    "下載記憶體快照",
    "從記憶體中搜尋 flag",

    "🔎 Step 1 – 找 API 文件",

    "進入網站後，文章中提到 API Documentation。",

    "嘗試進入：/api-docs",
    "會看到 Swagger / OpenAPI 介面，列出所有 API。",

    "🔎 Step 1 – 找 API 文件",

    "進入網站後，文章中提到 API Documentation。",

    "嘗試進入：/api-docs",
    "會看到 Swagger / OpenAPI 介面，列出所有 API。",

    "👉 這一步的重點是：",
    "利用 API 文件直接列舉端點，而不是亂猜路徑。",

    "🚨 Step 2 – 找可疑端點",

    "在 API 文件中可以看到：",

    "GET /heapdump",
    "這個端點名稱非常可疑。",

    "為什麼？",

    "heap = 記憶體",

    "dump = 傾印",

    "通常只存在於 debug 環境，不應該公開存取",

    "🧪 Step 3 – 驗證是否可下載",

    "使用 curl 測試：",

    "curl -I http://TARGET/heapdump",

    "如果看到：",

    "HTTP/1.1 200 OK",
    "Content-Type: application/octet-stream",


    "代表可以直接下載。",

    "📥 Step 4 – 下載記憶體快照",
    "curl http://TARGET/heapdump -o heapdump",


    "確認下載完整：",

    "ls -lh heapdump",


    "檔案大小應約 10~12MB。",

    "⚠ 如果只有幾百 KB，代表下載未完成。",

    "🔍 Step 5 – 從記憶體中搜尋 flag",

    "Heap snapshot 會包含所有執行時字串。",

    "搜尋 picoCTF 格式：",

    "strings -a heapdump | grep -oE 'picoCTF\{[^}]+\}'",

    "Final Flag"
  ],
},
];

const difficultyLabels = {
  easy: "簡單",
  normal: "一般",
  hard: "困難",
};

const toolRows = [
  ["nc", "連線到服務取得互動/輸出", "nc <host> <port>"],
  ["ssh", "遠端登入", "ssh user@host -p <port>"],
  ["grep", "搜尋關鍵字", "grep FLAG <file>"],
  ["base64", "編碼/解碼", "base64 -d <file>"],
  ["objdump", "反組譯檢視符號/offset", "objdump -d <bin> | grep '<win>'"],
];

export default function PicoPage() {
  const [currentDifficulty, setCurrentDifficulty] = useState("easy"); // 預設 easy
  const [currentProblemId, setCurrentProblemId] = useState(null);
  const [visibleCode, setVisibleCode] = useState(null); // for repetitions

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => p.difficulty === currentDifficulty);
  }, [currentDifficulty]);

  const currentProblem = useMemo(() => {
    return problems.find((p) => p.id === currentProblemId) || null;
  }, [currentProblemId]);

  const setDifficulty = (diff) => {
    setCurrentDifficulty(diff);
    setCurrentProblemId(null);
    setVisibleCode(null);
  };

  return (
    <>
      {/* ===== Sidebar (同 LinuxNotesModal 的 lnm-sidebar 節奏) ===== */}
      <aside className="lnm-sidebar">
        <div style={{ padding: "10px 10px 6px" }}>
          <div style={{ fontWeight: 800, marginBottom: "6px" }}>難度</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              className={`lnm-item ${currentDifficulty === "easy" ? "active" : ""}`}
              onClick={() => setDifficulty("easy")}
              style={{ textAlign: "center" }}
            >
              簡單
            </button>
            <button
              className={`lnm-item ${currentDifficulty === "normal" ? "active" : ""}`}
              onClick={() => setDifficulty("normal")}
              style={{ textAlign: "center" }}
            >
              一般
            </button>
            <button
              className={`lnm-item ${currentDifficulty === "hard" ? "active" : ""}`}
              onClick={() => setDifficulty("hard")}
              style={{ textAlign: "center" }}
            >
              困難
            </button>
          </div>
        </div>

        <div style={{ padding: "8px 10px 6px", color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
          題目（{difficultyLabels[currentDifficulty]}）
        </div>

        {filteredProblems.length === 0 ? (
          <div style={{ padding: "10px", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
            這個難度目前還沒新增題目。
          </div>
        ) : (
          filteredProblems.map((p) => (
            <button
              key={p.id}
              className={`lnm-item ${currentProblemId === p.id ? "active" : ""}`}
              onClick={() => {
                setCurrentProblemId(p.id);
                setVisibleCode(null);
              }}
              title={p.title}
            >
              {p.title}
            </button>
          ))
        )}
      </aside>

      {/* ===== Content ===== */}
      <main className="lnm-content">
        {!currentProblem && (
          <div className="ln-note">
            <header className="ln-header">
              <h1>picoCTF 解題紀錄</h1>
              <p className="ln-subtitle">
                以「可重現、可驗證」為目標整理解題流程：工具 → 觀察 → 推理 → 驗證。
              </p>
            </header>

            <Section title="快速工具清單">
              <SimpleTable headers={["工具", "用途", "常用用法"]} rows={toolRows} />
            </Section>

            <Section title="使用方式">
              <Callout title="操作" tone="info">
                左側先選擇難度，再點選題目進入詳細解法。
              </Callout>
            </Section>

            <hr className="ln-hr" />
            <footer className="ln-footer">
              <small>Last updated: picoCTF overview</small>
            </footer>
          </div>
        )}

        {currentProblem && (
          <div className="ln-note">
            <header className="ln-header">
              <h1>{currentProblem.title}</h1>
              <p className="ln-subtitle">
                Difficulty：{difficultyLabels[currentProblem.difficulty] || "未知"}
              </p>
            </header>

            <Section title="解題步驟（Procedure）">
              <ol className="ln-ol">
                {currentProblem.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </Section>

            {/* Repetitions 題目：程式碼區域改成 ln-code 風格 */}
            {currentProblem.id === "repetitions" && (
              <Section title="程式碼範例（Code Samples）">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    className="btn"
                    onClick={() => setVisibleCode(visibleCode === "code1" ? null : "code1")}
                  >
                    程式一
                  </button>
                  <button
                    className="ghost btn"
                    onClick={() => setVisibleCode(visibleCode === "code2" ? null : "code2")}
                  >
                    程式二
                  </button>
                </div>

                {visibleCode === "code1" && (
                  <>
                    <Callout title="用途" tone="ok">
                      多層 Base64 自動解碼（直到不再是 Base64 為止）。
                    </Callout>
                    <CodeBlock
                      code={`import base64

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
                    />
                  </>
                )}

                {visibleCode === "code2" && (
                  <>
                    <Callout title="用途" tone="ok">
                      對特定的 base64 payload 反覆解碼直到失敗。
                    </Callout>
                    <CodeBlock
                      code={`import base64

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
                    />
                  </>
                )}
              </Section>
            )}

            {currentProblem.note && (
              <Section title="備註（Notes）">
                <Callout title="注意" tone="warn">
                  {currentProblem.note}
                </Callout>
              </Section>
            )}

            <hr className="ln-hr" />
            <footer className="ln-footer">
              <small>Last updated: {currentProblem.title}</small>
            </footer>
          </div>
        )}
      </main>
    </>
  );
}

/* ---------- UI primitives (match LinuxNotebook) ---------- */

function Section({ title, children }) {
  return (
    <section className="ln-section">
      <h2 className="ln-h2">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ title, tone = "info", children }) {
  return (
    <div className={`ln-callout ln-${tone}`}>
      <div className="ln-callout-title">{title}</div>
      <div className="ln-callout-body">{children}</div>
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="ln-code">
      <code>{code}</code>
    </pre>
  );
}

function SimpleTable({ headers, rows }) {
  return (
    <div className="ln-table-wrap">
      <table className="ln-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              {r.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

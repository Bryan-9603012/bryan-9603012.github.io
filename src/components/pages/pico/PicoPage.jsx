// src/components/pages/pico/PicoPage.jsx
import { useMemo, useState } from "react";
import "../../LinuxNotesModal.css";

import { problems, toolRows, difficultyLabels } from "./pico.data";
import { Section, Callout, CodeBlock, SimpleTable } from "../../notes-ui/NotePrimitives";

export default function PicoPage() {
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");
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
      {/* ===== Sidebar ===== */}
      <aside className="lnm-sidebar">
        <div style={{ padding: "10px 10px 6px" }}>
          <div style={{ fontWeight: 800, marginBottom: "6px" }}>難度</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {(["easy", "normal", "hard"]).map((d) => (
              <button
                key={d}
                className={`lnm-item ${currentDifficulty === d ? "active" : ""}`}
                onClick={() => setDifficulty(d)}
                style={{ textAlign: "center" }}
              >
                {difficultyLabels[d]}
              </button>
            ))}
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
              {/* ✅ 這裡就是你要改成 BOM 那種表格 */}
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
              {/* ✅ head-dump 不要旁邊數字：用 ul */}
              {currentProblem.id === "head-dump" ? (
                <ul className="ln-ul">
                  {currentProblem.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <ol className="ln-ol">
                  {currentProblem.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              )}
            </Section>

            {/* Repetitions：保留你的 code 展示邏輯，但用 ln-code 風格 */}
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

flag = """..."""

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
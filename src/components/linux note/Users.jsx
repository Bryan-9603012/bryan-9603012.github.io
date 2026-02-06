export default function Users() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>使用者管理（User Management）</h1>
        <p className="ln-subtitle">
          使用者管理決定「你是誰、你屬於誰、你能不能變成別人」——是權限管理之上的第二道安全邊界。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        使用者管理決定「你是誰、你屬於誰、你能不能變成別人」→ 這是權限管理之上的第二道安全邊界。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具 / 機制", "管什麼"]}
          rows={[
            ["使用者帳號", "useradd / userdel", "建立 / 刪除帳號"],
            ["群組", "groupadd / groupdel", "群組管理"],
            ["身分查詢", "whoami / id", "目前身分與群組"],
            ["權限提升", "su / sudo", "身分切換與授權"],
            ["驗證", "PAM", "登入與驗證規則"],
            ["設定檔", "/etc/passwd / /etc/shadow", "帳號與密碼資訊"],
          ]}
        />
      </Section>

      <Section title="Linux 使用者模型（必懂）">
        <h3 className="ln-h3">三種核心帳號類型</h3>
        <SimpleTable
          headers={["類型", "UID", "說明"]}
          rows={[
            ["root", "0", "系統最高權限"],
            ["system", "1–999", "系統服務用"],
            ["normal", "≥1000", "一般使用者"],
          ]}
        />
        <Callout title="資安提醒：UID=0 才是真正的 root" tone="warn">
          「root」不只是名字；真正的 root 是 UID=0。任何 UID=0 的帳號都等同 root。
        </Callout>
      </Section>

      <Section title="關鍵設定檔（必背）">
        <SimpleTable
          headers={["檔案", "內容", "誰能讀"]}
          rows={[
            ["/etc/passwd", "帳號資訊（含 shell、home 等）", "everyone"],
            ["/etc/shadow", "密碼雜湊", "root only"],
            ["/etc/group", "群組資訊", "everyone"],
            ["/etc/sudoers", "sudo 規則", "root only"],
          ]}
        />
        <CodeBlock
          code={`cat /etc/passwd
sudo cat /etc/shadow`}
        />
      </Section>

      <Section title="使用者 / 群組管理指令架構">
        <h3 className="ln-h3">使用者</h3>
        <CodeBlock
          code={`useradd user
userdel user
usermod -aG sudo user
passwd user`}
        />

        <h3 className="ln-h3">群組</h3>
        <CodeBlock
          code={`groupadd group
groupdel group
groups user`}
        />

        <Callout title="實務習慣" tone="info">
          權限多半給「群組」，不要直接給「人」；這是最小權限原則落地的方式。
        </Callout>
      </Section>

      <Section title="身分查詢（高頻）">
        <CodeBlock
          code={`whoami
id
groups
loginctl`}
        />
        <Callout title="資安定錨（滲透 / 稽核第一件事）" tone="warn">
          先確認你是誰（UID/GID/群組），再做任何判斷。
        </Callout>
      </Section>

      <Section title="su vs sudo（重點比較）">
        <SimpleTable
          headers={["項目", "su", "sudo"]}
          rows={[
            ["密碼", "root 密碼", "使用者密碼"],
            ["記錄", "通常無", "有 log"],
            ["控制細度", "低", "高"],
            ["安全性", "較差", "較佳"],
          ]}
        />
        <CodeBlock
          code={`su -
sudo <command>
sudo -l`}
        />
        <Callout title="資安提醒" tone="info">
          sudo ≠ root；sudo 是「被授權的 root 行為」，授權範圍取決於 sudoers 規則。
        </Callout>
      </Section>

      <Section title="sudoers 規則（高風險）">
        <CodeBlock
          code={`visudo

# 範例
user ALL=(ALL) ALL
user ALL=(ALL) NOPASSWD:/usr/bin/vim`}
        />
        <Callout title="高風險警告" tone="danger">
          NOPASSWD + 可取得 shell 的程式（vim/nano/python/bash 等）常等於「直接提權」。
          實務上要用命令白名單、參數限制或替代方案避免。
        </Callout>
      </Section>

      <Section title="PAM（進階但關鍵）">
        <p>
          PAM 決定：登入條件、密碼複雜度、登入失敗鎖定、MFA / OTP 等。
        </p>
        <CodeBlock code={`ls /etc/pam.d/`} />
        <Callout title="為什麼 PAM 很重要？" tone="warn">
          防爆破、鎖帳號、密碼策略通常都在 PAM 這層做。很多防禦不是靠「換密碼」而是靠 PAM 規則。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard
          level="Low"
          items={[
            "列舉使用者與群組（Account Discovery）",
            "判斷誰可 sudo（sudo -l）",
            "操作自己 home、設 user cron、放 SSH key（若可寫）",
          ]}
        />
        <RiskCard
          level="Medium"
          items={[
            "user + sudo misconfig：用 GTFOBins 提權（依允許指令而定）",
            "濫用高權限群組（docker、adm 等）做橫向 / 提權",
            "盜用合法帳號（Valid Accounts）維持存活",
          ]}
        />
        <RiskCard
          level="High"
          items={[
            "取得 UID 0（root）= 完整系統控制",
            "新增高權限帳號並加入 sudo/wheel",
            "修改 PAM / sudoers 來改變驗證流程與持久化",
          ]}
        />
      </Section>

      <Section title="常見迷思澄清">
        <ul className="ln-ul">
          <li>❌ 一般 user 不能改 sudoers（除非 misconfig / 漏洞 / 已提權）</li>
          <li>❌ 不能直接「偽裝成 root」就變 root（看 UID/GID 與授權）</li>
          <li>❌ hard link 不能讀 /etc/shadow</li>
        </ul>

        <Callout title="真正提權通常經過" tone="danger">
          sudo 規則 / SUID / kernel exploit / service misconfig（不是改名字就能提權）。
        </Callout>
      </Section>

      <Section title="對應 MITRE ATT&CK（索引）">
        <ul className="ln-ul">
          <li>T1078 – Valid Accounts</li>
          <li>T1098 – Account Manipulation</li>
          <li>T1548.003 – Abuse Elevation Control Mechanism: Sudo</li>
          <li>T1556 – Modify Authentication Process</li>
          <li>T1087 – Account Discovery</li>
          <li>T1069 – Permission Groups Discovery</li>
        </ul>
      </Section>

      <Section title="防禦與稽核重點（實務清單）">
        <ul className="ln-ul">
          <li>最小權限：不要預設給 sudo</li>
          <li>sudo 僅允許必要指令（命令白名單），避免可取得 shell 的程式</li>
          <li>強制密碼期限與鎖定策略（PAM / chage）</li>
          <li>定期盤點帳號與群組（getent）</li>
          <li>稽核誰能 sudo（sudo -l）</li>
        </ul>

        <CodeBlock
          code={`chage -l user
sudo -l
getent passwd
getent group`}
        />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Users module</small>
      </footer>
    </div>
  );
}

/* ---------- Small UI primitives (match Permissions.jsx style) ---------- */

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

function RiskCard({ level, items }) {
  const tone =
    level === "High" ? "danger" : level === "Medium" ? "warn" : "ok";

  return (
    <div className={`ln-risk ln-${tone}`}>
      <div className="ln-risk-head">
        <span className="ln-risk-badge">{level}</span>
      </div>
      <ul className="ln-ul">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

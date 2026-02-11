import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Users() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>使用者管理（User Management）</h1>
        <p className="ln-subtitle">
          使用者管理決定「你是誰、你屬於誰、你能不能變成別人」——權限之上的第二道安全邊界。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        使用者管理 → 決定身分（Identity）與授權提升（Elevation）的邊界。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具 / 機制", "管什麼"]}
          rows={[
            ["使用者帳號", "useradd / userdel", "建立 / 刪除帳號"],
            ["群組", "groupadd / groupdel", "群組管理"],
            ["身分查詢", "whoami / id", "目前身分"],
            ["權限提升", "su / sudo", "身分切換"],
            ["驗證", "PAM", "登入與驗證規則"],
            ["設定檔", "/etc/passwd / /etc/shadow", "帳號與密碼"],
          ]}
        />
      </Section>

      <Section title="Linux 使用者模型（必懂）">
        <SimpleTable
          headers={["類型", "UID", "說明"]}
          rows={[
            ["root", "0", "系統最高權限（UID=0 才是真 root）"],
            ["system", "1–999", "系統服務用帳號"],
            ["normal", "≥1000", "一般使用者"],
          ]}
        />
        <Callout title="資安提醒" tone="warn">
          「名字叫 root」不等於 root；真正判斷是 UID 是否為 0。
        </Callout>
      </Section>

      <Section title="關鍵設定檔（必背）">
        <SimpleTable
          headers={["檔案", "內容", "誰能讀"]}
          rows={[
            ["/etc/passwd", "帳號資訊", "everyone"],
            ["/etc/shadow", "密碼雜湊", "root only"],
            ["/etc/group", "群組資訊", "everyone"],
            ["/etc/sudoers", "sudo 規則", "root only"],
          ]}
        />
        <CodeBlock
          code={`cat /etc/passwd
sudo cat /etc/shadow
sudo visudo`}
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
      </Section>

      <Section title="身分查詢（滲透 / 稽核第一件事）">
        <CodeBlock
          code={`whoami
id
groups
loginctl`}
        />
        <Callout title="資安流程" tone="info">
          先確認「你是誰、你在哪個群組、你能 sudo 什麼」再決定後續動作。
        </Callout>
      </Section>

      <Section title="su vs sudo（重點比較）">
        <SimpleTable
          headers={["項目", "su", "sudo"]}
          rows={[
            ["密碼", "root 密碼", "使用者密碼"],
            ["記錄", "通常沒有", "有 log（較可稽核）"],
            ["控制細度", "低", "高（可命令白名單）"],
            ["安全性", "❌", "✅（正確設定前提）"],
          ]}
        />
        <CodeBlock
          code={`su -
sudo command
sudo -l`}
        />
        <Callout title="資安提醒" tone="warn">
          sudo ≠ root，本質是「被授權的 root 行為」。
        </Callout>
      </Section>

      <Section title="sudoers 規則（高風險）">
        <CodeBlock
          code={`# 用 visudo 編輯（避免語法炸掉整台）
visudo

# 範例
user ALL=(ALL) ALL
user ALL=(ALL) NOPASSWD:/usr/bin/vim`}
        />
        <Callout title="危險組合" tone="danger">
          NOPASSWD + 可執行 shell/逃逸程式（GTFOBins）= 直接提權入口。
        </Callout>
      </Section>

      <Section title="PAM（進階但關鍵）">
        <CodeBlock code={`ls /etc/pam.d/`} />
        <ul className="ln-ul">
          <li>登入條件</li>
          <li>密碼複雜度</li>
          <li>登入失敗鎖定</li>
          <li>MFA / OTP</li>
        </ul>
        <Callout title="重點" tone="info">
          很多防爆破、防暴力破解策略都在 PAM。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard
          level="Low"
          items={["列舉使用者與群組", "判斷誰可 sudo", "操作自己 home、設 user cron"]}
        />
        <RiskCard
          level="Medium"
          items={[
            "sudo misconfig（可執行特定程式）",
            "GTFOBins 提權",
            "濫用高權限群組（docker、adm）",
            "透過 SSH key 長期存活",
          ]}
        />
        <RiskCard
          level="High"
          items={[
            "Abuse Sudo（錯誤 sudo 規則）",
            "新增高權限帳號（useradd + sudo）",
            "修改 PAM / 認證流程",
            "取得 UID 0 → 完整系統控制",
          ]}
        />
      </Section>

      <Section title="常見迷思澄清">
        <ul className="ln-ul">
          <li>❌ 一般 user 不能改 sudoers（除非有錯誤授權）</li>
          <li>❌ 不能直接「偽裝成 root」</li>
          <li>❌ hard link 不能讀 /etc/shadow</li>
          <li>✅ 真正提權通常經過：sudo 規則 / SUID / kernel exploit / service misconfig</li>
        </ul>
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

      <Section title="防禦與稽核重點（實務）">
        <ul className="ln-ul">
          <li>最小權限：不要預設 sudo</li>
          <li>sudo 命令白名單（只允許必要指令）</li>
          <li>密碼期限與鎖定策略（chage）</li>
          <li>定期盤點帳號與群組（getent）</li>
        </ul>
        <CodeBlock
          code={`sudo -l
chage -l user
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

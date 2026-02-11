import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Permissions() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>權限管理（Permissions）</h1>
        <p className="ln-subtitle">
          權限管理決定「誰（Who）可以對什麼（What）做什麼（How）」——Linux 安全邊界的第一道防線。
        </p>
      </header>

      <Callout title="模組定位" tone="info">
        權限管理決定「誰（Who）可以對什麼（What）做什麼（How）」→ 這是 Linux 所有安全邊界的第一道防線
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "機制", "管什麼"]}
          rows={[
            ["基本權限", "rwx", "讀 / 寫 / 執行", "檔案與目錄操作"],
            ["身分", "owner / group / others", "權限套用對象", "權限歸屬"],
            ["進階權限", "SUID / SGID / Sticky", "權限暫借與限制", "提權與限制"],
            ["能力", "Linux Capabilities", "精細化 root 權限", "拆解特權"],
            ["ACL", "getfacl / setfacl", "額外權限規則", "隱性規則"],
          ]}
        />
      </Section>

      <Section title="基本權限模型（必背）">
        <CodeBlock
          code={`-rwxr-x---
 ││││││
 │││││└─ others
 │││└── group
 └└└── owner`}
        />
        <SimpleTable
          headers={["符號", "數值", "意義"]}
          rows={[
            ["r", "4", "讀"],
            ["w", "2", "寫"],
            ["x", "1", "執行"],
          ]}
        />
        <Callout title="資安提醒：Linux 只套用「一組」權限" tone="warn">
          Linux 只會套用 owner / group / others 其中一組，不會疊加。
        </Callout>
      </Section>

      <Section title="核心指令架構（必背）">
        <h3 className="ln-h3">查看權限</h3>
        <CodeBlock
          code={`ls -l
ls -il      # 看 inode
stat file`}
        />

        <h3 className="ln-h3">修改權限</h3>
        <CodeBlock
          code={`chmod 755 file
chmod u+x file
chmod g-w file`}
        />

        <h3 className="ln-h3">修改擁有者 / 群組</h3>
        <CodeBlock
          code={`chown user file
chown user:group file
chgrp group file`}
        />
      </Section>

      <Section title="特殊權限（高風險）">
        <SimpleTable
          headers={["權限", "數值", "作用", "風險"]}
          rows={[
            ["SUID", "4xxx", "用檔案擁有者身分執行", "提權（Privilege Escalation）"],
            ["SGID", "2xxx", "用群組身分執行", "權限擴散（Privilege Spread）"],
            ["Sticky", "1xxx", "只能刪自己的檔案", "/tmp 防護（Deletion Control）"],
          ]}
        />

        <h3 className="ln-h3">查看 SUID</h3>
        <CodeBlock code={`find / -perm -4000 2>/dev/null   # SUID`} />

        <Callout title="資安提醒：SUID 是最常見的提權入口" tone="danger">
          只要 SUID 程式可被濫用（或搭配 misconfig），就可能從一般使用者提權。
        </Callout>
      </Section>

      <Section title="Hard Link / Symbolic Link（重點）">
        <h3 className="ln-h3">Hard Link</h3>
        <ul className="ln-ul">
          <li>同一個 inode</li>
          <li>不能跨檔案系統</li>
          <li>不能 link 目錄</li>
          <li>不能突破權限</li>
        </ul>
        <CodeBlock code={`ln file hardlink`} />

        <h3 className="ln-h3">Symbolic Link</h3>
        <ul className="ln-ul">
          <li>指向路徑</li>
          <li>可跨檔案系統</li>
          <li>權限依「目標檔案」</li>
        </ul>
        <CodeBlock code={`ln -s file symlink`} />

        <Callout title="迷思澄清" tone="info">
          Hard link 不能讓 user 讀 root-only 檔案（例如 /etc/shadow）。
        </Callout>
      </Section>

      <Section title="ACL（進階但常被忽略）">
        <CodeBlock
          code={`getfacl file
setfacl -m u:user:rwx file
setfacl -b file      # 清除 ACL`}
        />
        <Callout title="資安提醒：ACL 是隱性權限來源" tone="warn">
          ACL 容易造成「你以為沒權限，但其實有」或「你以為有，但被 mask 掉」的誤判。
        </Callout>
      </Section>

      <Section title="資安視角：攻擊者能做什麼？">
        <h3 className="ln-h3">一般 user 權限下（正常情況）</h3>
        <ul className="ln-ul">
          <li>建立惡意檔案</li>
          <li>設 cron（user crontab）</li>
          <li>在 $HOME 放後門</li>
          <li>濫用系統中存在的 SUID 程式</li>
        </ul>

        <h3 className="ln-h3">權限正確時，做不到的事</h3>
        <ul className="ln-ul">
          <li>讀 /etc/shadow</li>
          <li>改 root 檔案</li>
          <li>用 hard link 提權</li>
          <li>更改核心系統設定</li>
        </ul>
      </Section>

      <Section title="風險分級（High / Medium / Low）">
        <RiskCard
          level="High"
          items={[
            "濫用 SUID / SGID 提權",
            "修改系統關鍵檔權限（/etc/shadow、/etc/sudoers）",
            "配合 library hijacking（通常需要權限錯誤前提）",
          ]}
        />
        <RiskCard
          level="Medium"
          items={[
            "寫入可執行目錄（/usr/local/bin 誤設）",
            "權限錯誤導致 cron / service 被寫入",
            "ACL 設定錯誤造成隱性存取",
          ]}
        />
        <RiskCard level="Low" items={["操作自己的 $HOME", "建立一般檔案、script"]} />
      </Section>

      <Section title="對應 MITRE ATT&CK（索引）">
        <ul className="ln-ul">
          <li>T1222.002 – File Permission Modification</li>
          <li>T1548.001 – Setuid / Setgid</li>
          <li>T1574.002 – Library Hijacking（需權限錯誤）</li>
          <li>T1564.001 – Hidden Files（搭配可見性）</li>
        </ul>
      </Section>

      <Section title="防禦與稽核重點（實務清單）">
        <ul className="ln-ul">
          <li>最小權限原則（Least Privilege）</li>
          <li>權限給群組，不直接給人</li>
          <li>定期掃描 SUID</li>
          <li>定期檢查可寫目錄（尤其 system path）</li>
          <li>權限異動需記錄（auditd / AIDE）</li>
        </ul>

        <CodeBlock
          code={`find / -perm -4000 2>/dev/null   # SUID 掃描
find / -writable -type d 2>/dev/null`}
        />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Permissions module</small>
      </footer>
    </div>
  );
}
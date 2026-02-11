import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function LinuxSecurity() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>A4 — Linux Security（資安版）</h1>
        <p className="ln-subtitle">
          目標：降低攻擊面、限制權限、提升入侵成本、提高可偵測性。
        </p>
      </header>

      <Callout title="核心責任（Security Objective）" tone="info">
        Linux Security 的本質不是「完全防禦」，而是：讓攻擊更難、存活更短、行為更容易被發現。
      </Callout>

      <Section title="Linux 安全四大基石（一定要記）">
        <SimpleTable
          headers={["基石", "重點", "風險等級"]}
          rows={[
            ["Patch Management（更新）", "OS/Kernel/套件修補已知漏洞（CVE）", "🔴 High"],
            ["Access Control（存取控制）", "Least Privilege、禁 root 直登、sudo 精準授權", "🔴 High"],
            ["Attack Surface Reduction（減少暴露）", "關服務、禁弱驗證、封鎖不必要連線", "🟠 Medium-High"],
            ["Detection & Auditing（偵測稽核）", "Logs/NTP/檢查 cron/SUID/world-writable", "🟡 Medium"],
          ]}
        />
        <CodeBlock code={`apt update && apt dist-upgrade`} />
      </Section>

      <Section title="SSH Hardening（必考重點）">
        <CodeBlock
          code={`# sshd_config 方向
PermitRootLogin no
PasswordAuthentication no`}
        />
        <Callout title="風險等級" tone="danger">
          SSH 弱設定（允許密碼、允許 root）是最常見的入口。
        </Callout>
      </Section>

      <Section title="核心防護機制（Kernel / Host）">
        <SimpleTable
          headers={["機制", "用途", "風險等級"]}
          rows={[
            ["SELinux / AppArmor（MAC）", "強制存取控制，限制入侵後破壞範圍", "🟠 Medium-High"],
          ]}
        />
      </Section>

      <Section title="檢測與掃描工具">
        <SimpleTable
          headers={["工具", "用途"]}
          rows={[
            ["Lynis", "系統弱點稽核"],
            ["chkrootkit / rkhunter", "Rootkit 偵測"],
            ["Snort", "IDS"],
            ["Fail2ban", "暴力破解防禦"],
          ]}
        />
      </Section>

      <Section title="TCP Wrappers（補強層）">
        <ul className="ln-ul">
          <li>服務層級 allow/deny（不是防火牆替代品）</li>
          <li>設定檔：/etc/hosts.allow、/etc/hosts.deny</li>
          <li>順序：allow → deny（第一條符合即生效）</li>
        </ul>
      </Section>

      <Section title="常見高風險錯誤設定（考試 + 實務）">
        <SimpleTable
          headers={["問題", "風險"]}
          rows={[
            ["world-writable 檔案", "提權、後門"],
            ["過多 SUID binary", "LPE"],
            ["過期 kernel", "已知 exploit"],
            ["cron 誤設", "Persistence"],
          ]}
        />
        <RiskCard level="High" items={["未更新系統", "sudo 設太大", "服務開太多", "稽核不足"]} />
      </Section>

      <Section title="MITRE ATT&CK（你筆記對應）">
        <ul className="ln-ul">
          <li>T1068 – Exploitation for Privilege Escalation</li>
          <li>T1190 – Exploit Public-Facing Application</li>
          <li>T1078 – Valid Accounts</li>
          <li>T1548.003 – Abuse sudo</li>
          <li>T1053 – Scheduled Task</li>
          <li>T1564 – Hide Artifacts</li>
          <li>T1110 – Brute Force</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Linux Security A4 module</small>
      </footer>
    </div>
  );
}

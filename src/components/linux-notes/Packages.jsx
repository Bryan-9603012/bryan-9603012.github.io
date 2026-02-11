import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Packages() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>軟體包管理（Package Management）</h1>
        <p className="ln-subtitle">
          套件管理決定「你安裝了什麼、從哪裡來、是不是最新與可信」——直接影響供應鏈風險與漏洞面。
        </p>
      </header>

      <Callout title="模組定位（一句話）" tone="info">
        套件管理 = Patch Management + Supply Chain 安全的入口。
      </Callout>

      <Section title="類型 / 工具 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "工具", "管什麼"]}
          rows={[
            ["Debian/Ubuntu", "apt / dpkg", "安裝、更新、移除套件"],
            ["RHEL/CentOS/Fedora", "dnf / yum / rpm", "安裝、更新、移除套件"],
            ["原始碼安裝", "make / install", "自行編譯與部署（風險高）"],
            ["Repo / Key", "sources.list / GPG", "來源與可信度"],
          ]}
        />
      </Section>

      <Section title="核心指令（必背）">
        <h3 className="ln-h3">apt（Ubuntu / Debian）</h3>
        <CodeBlock
          code={`sudo apt update
sudo apt upgrade
sudo apt install <pkg>
sudo apt remove <pkg>
sudo apt autoremove`}
        />

        <h3 className="ln-h3">查詢</h3>
        <CodeBlock
          code={`apt search <keyword>
apt show <pkg>
dpkg -l | grep <pkg>`}
        />
      </Section>

      <Section title="資安視角：Patch Management（更新）">
        <CodeBlock code={`apt update && apt dist-upgrade`} />
        <Callout title="風險" tone="danger">
          未更新系統 = 已知漏洞（CVE）直接可用（尤其 public-facing / kernel / openssh）。
        </Callout>
      </Section>

      <Section title="Repo / GPG Key（供應鏈重點）">
        <ul className="ln-ul">
          <li>不要亂加不明 PPA / 第三方 Repo</li>
          <li>來源越多，供應鏈面越大</li>
          <li>Key 被污染 = 你信任的更新就可能變惡意</li>
        </ul>
        <CodeBlock
          code={`# Ubuntu/Debian 常見位置
cat /etc/apt/sources.list
ls /etc/apt/sources.list.d/`}
        />
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["列舉已安裝套件與版本", "尋找過舊版本漏洞"]} />
        <RiskCard
          level="Medium"
          items={[
            "污染 repo / 加入惡意來源",
            "利用安裝腳本（curl | bash）",
            "弱權限導致可寫入安裝路徑",
          ]}
        />
        <RiskCard
          level="High"
          items={[
            "root 權限下植入惡意套件或更新",
            "替換系統關鍵 binary（供應鏈/持久化）",
          ]}
        />
      </Section>

      <Section title="對應 MITRE ATT&CK（索引）">
        <ul className="ln-ul">
          <li>T1195 – Supply Chain Compromise（概念對應）</li>
          <li>T1105 – Ingress Tool Transfer（下載工具）</li>
          <li>T1068 – Exploitation for Privilege Escalation（未修補）</li>
        </ul>
      </Section>

      <Section title="防禦與稽核重點">
        <ul className="ln-ul">
          <li>定期更新與重開機流程（kernel/openssh）</li>
          <li>Repo 來源最小化（只留必要）</li>
          <li>避免 curl | bash；改用可驗證的簽章/校驗</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Packages module</small>
      </footer>
    </div>
  );
}

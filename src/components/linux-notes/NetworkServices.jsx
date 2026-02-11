import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function NetworkServices() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>網路服務（SSH / NFS / Web / VPN）</h1>
        <p className="ln-subtitle">
          決定「誰能從網路進來、用什麼方式、連線後能做什麼」——對外攻擊面（Attack Surface）最大的區塊。
        </p>
      </header>

      <Callout title="模組定位" tone="danger">
        每開一個服務 = 新的入口（新的漏洞面 / 認證面 / 設定面）。
      </Callout>

      <Section title="類型 / 服務 / 管什麼（總覽）">
        <SimpleTable
          headers={["類型", "服務 / 工具", "管什麼"]}
          rows={[
            ["遠端登入", "SSH", "遠端 shell / 指令"],
            ["檔案共享", "NFS", "遠端檔案系統"],
            ["Web", "Apache / Nginx / Python http", "HTTP 服務"],
            ["檔案傳輸", "SCP / SFTP", "安全傳檔"],
            ["隧道", "VPN（OpenVPN）", "內網連線（信任邊界延伸）"],
          ]}
        />
      </Section>

      <Section title="SSH（最高頻、最高風險）">
        <CodeBlock
          code={`systemctl start ssh
systemctl status ssh
systemctl enable ssh

ssh user@host
ssh -i key user@host

# 設定檔
cat /etc/ssh/sshd_config`}
        />
        <Callout title="高風險設定" tone="danger">
          PermitRootLogin yes、PasswordAuthentication yes
        </Callout>
        <Callout title="建議" tone="ok">
          PermitRootLogin no、PasswordAuthentication no（只用 key-based）
        </Callout>
      </Section>

      <Section title="SSH Key 管理（你前面問過）">
        <CodeBlock
          code={`ssh-keygen
ssh-copy-id user@host`}
        />
        <Callout title="資安提醒" tone="warn">
          Key 被偷 = 完全繞過密碼；Key 本身不是防禦縱深。
        </Callout>
      </Section>

      <Section title="NFS（被低估的高風險）">
        <CodeBlock
          code={`systemctl status nfs-kernel-server
cat /etc/exports`}
        />
        <Callout title="危險設定" tone="danger">
          no_root_squash（可能導致 root 權限濫用）
        </Callout>
      </Section>

      <Section title="Web Server（HTTP ≠ 安全）">
        <CodeBlock
          code={`sudo apt install apache2
systemctl start apache2

python3 -m http.server 8000`}
        />
        <ul className="ln-ul">
          <li>傳檔</li>
          <li>C2</li>
          <li>臨時後門</li>
        </ul>
      </Section>

      <Section title="VPN（信任邊界）">
        <CodeBlock code={`openvpn --config file.ovpn`} />
        <Callout title="重點" tone="warn">
          VPN 不是「自動安全」，它只是把內網邊界延伸出去；VPN 節點是高價值資產。
        </Callout>
      </Section>

      <Section title="攻擊者視角（風險分級）">
        <RiskCard level="Low" items={["Web banner / 公開 HTTP"]} />
        <RiskCard level="Medium" items={["SSH password login", "弱 key 管理", "NFS read-only"]} />
        <RiskCard level="High" items={["SSH key 泄漏", "NFS no_root_squash", "VPN 節點被攻陷"]} />
      </Section>

      <Section title="常見迷思澄清">
        <ul className="ln-ul">
          <li>❌ 換 SSH key = 自動安全</li>
          <li>❌ 重灌一台 = 全網安全</li>
          <li>✅ 現實：內部節點被攻陷 → 橫向移動（SSH/NFS/VPN 都可能是跳板）</li>
        </ul>
      </Section>

      <Section title="防禦重點（實務）">
        <ul className="ln-ul">
          <li>最小化開放服務</li>
          <li>防火牆（ufw / nftables）</li>
          <li>SSH：僅 key + 限制來源 IP</li>
          <li>NFS：僅內網、拒絕危險選項</li>
          <li>VPN 節點：強化監控與硬化</li>
        </ul>
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Network Services module</small>
      </footer>
    </div>
  );
}

import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function Containerization() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>容器化（Containerization）</h1>
        <p className="ln-subtitle">
          隔離應用執行環境，但「不等於」隔離作業系統：多個容器共享 Host Kernel。
        </p>
      </header>

      <Callout title="關鍵一句話" tone="warn">
        Container = Process Isolation，不是 OS Isolation。
      </Callout>

      <Section title="技術基礎（Linux 核心機制）">
        <SimpleTable
          headers={["機制", "說明"]}
          rows={[
            ["Namespaces", "pid/net/mnt/user：隔離視角"],
            ["cgroups", "CPU/Memory/Disk 限制"],
            ["Capabilities", "拆解 root 權限（如 CAP_SYS_ADMIN）"],
            ["MAC", "AppArmor/SELinux：強制存取控制"],
          ]}
        />
        <Callout title="重點" tone="danger">
          任何一層設錯，容器就不是沙盒。
        </Callout>
      </Section>

      <Section title="Docker（應用導向容器）">
        <ul className="ln-ul">
          <li>Image（不可變）→ Container（可丟棄）</li>
          <li>預設安全性「相對好」，但仍可被誤用</li>
        </ul>
        <Callout title="高風險地雷" tone="danger">
          --privileged、-v /:/host、container 內 root/sudo、非 rootless
        </Callout>
      </Section>

      <Section title="LXC（系統級容器）">
        <ul className="ln-ul">
          <li>行為像輕量 VM</li>
          <li>彈性大但安全責任更重</li>
        </ul>
        <Callout title="高風險設計" tone="danger">
          未用 user namespace：container root ≈ host root（非常危險）
        </Callout>
      </Section>

      <Section title="風險等級總覽（資安視角）">
        <SimpleTable
          headers={["風險", "說明"]}
          rows={[
            ["🔴 高", "Privileged container、Docker group 濫用、docker.sock"],
            ["🟠 中", "掛載 host volume、弱隔離"],
            ["🟡 低", "最小權限的 app container"],
          ]}
        />
      </Section>

      <Section title="對應 MITRE ATT&CK（重點）">
        <ul className="ln-ul">
          <li>T1611 – Escape to Host</li>
          <li>T1548.003 – Abuse Sudo（Docker group）</li>
          <li>T1068 – Privilege Escalation（Kernel）</li>
          <li>T1574.002 – Library Hijacking（volume 情境）</li>
        </ul>
      </Section>

      <Section title="防禦重點（怎麼用才安全）">
        <ul className="ln-ul">
          <li>使用 rootless Docker</li>
          <li>禁止 --privileged</li>
          <li>不掛載 /、/proc、/sys</li>
          <li>capabilities：--cap-drop=ALL（再逐步加回必要）</li>
          <li>啟用 AppArmor / SELinux</li>
          <li>容器盡量 stateless（不要當長期藏後門的地方）</li>
        </ul>
        <CodeBlock code={`docker run --cap-drop=ALL ...`} />
      </Section>

      <Section title="與 VM 的根本差異（常考）">
        <SimpleTable
          headers={["項目", "Container", "VM"]}
          rows={[
            ["Kernel", "共享", "獨立"],
            ["隔離強度", "中", "高"],
            ["效能", "高", "較低"],
            ["Escape 風險", "有", "極低"],
          ]}
        />
        <Callout title="一句話" tone="info">
          容器是 DevOps 工具，不是資安邊界。
        </Callout>
      </Section>

      <Section title="攻防定位">
        <RiskCard
          level="High"
          items={[
            "container shell → volume 橫向 / docker.sock / kernel exploit / capability abuse",
            "防禦者視角：container 是跳板，一旦被打穿要假設 host 也在風險中",
          ]}
        />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Containerization module</small>
      </footer>
    </div>
  );
}

import { Section, Callout, CodeBlock, SimpleTable, RiskCard } from "./_ui";

export default function RemoteDesktop() {
  return (
    <div className="ln-note">
      <header className="ln-header">
        <h1>遠端桌面（Remote Desktop）</h1>
        <p className="ln-subtitle">
          提供遠端 GUI 存取能力，但同時擴大攻擊面：把「本地操作權限」延伸到網路另一端。
        </p>
      </header>

      <Callout title="核心責任（Security Purpose）" tone="danger">
        ✅ 管理便利性 / ❌ 高價值攻擊入口（Initial Access / Lateral Movement）
      </Callout>

      <Section title="技術分類（先分清世界）">
        <SimpleTable
          headers={["類型", "關鍵特性", "本質"]}
          rows={[
            ["X11 / XServer", "本地渲染、遠端執行", "協定層（非單純遠端桌面）"],
            ["VNC", "遠端渲染整個桌面", "傳輸畫面（RFB）"],
            ["RDP", "Windows 為主", "OS 綁定協定"],
            ["XDMCP", "整個 GUI 重導", "過時且不安全"],
          ]}
        />
      </Section>

      <Section title="X11（資安角度）">
        <ul className="ln-ul">
          <li>App 在遠端執行、GUI 在本地渲染</li>
          <li>預設 TCP/6000–6010，原生不加密</li>
          <li>Network Transparent，但安全性差（不包 SSH 的話）</li>
        </ul>
        <Callout title="唯一安全方式" tone="ok">
          只用 SSH X11 Forwarding（ssh -X / -Y）
        </Callout>
        <CodeBlock code={`ssh -X user@host /usr/bin/app`} />
      </Section>

      <Section title="VNC（資安角度）">
        <ul className="ln-ul">
          <li>桌面在遠端渲染、傳輸整個畫面</li>
          <li>預設 TCP/5900+</li>
          <li>若未加密：風險極高</li>
        </ul>
      </Section>

      <Section title="主要攻擊面與風險等級">
        <SimpleTable
          headers={["技術", "風險說明"]}
          rows={[
            ["X11 TCP 6000 對外", "可截圖、鍵盤監聽、視窗竊取"],
            ["XDMCP (UDP/177)", "可 MITM、完整 GUI 接管"],
            ["未加密 VNC", "密碼竊聽、桌面劫持"],
          ]}
        />
      </Section>

      <Section title="可接受配置（正確使用）">
        <ul className="ln-ul">
          <li>VNC + SSH Tunnel（VNC 僅綁 localhost）</li>
          <li>SSH 強化：key-based + 限制來源</li>
          <li>能 CLI 就 CLI；GUI 不當日常存取</li>
        </ul>
      </Section>

      <Section title="對應 MITRE ATT&CK（索引）">
        <ul className="ln-ul">
          <li>T1021.001 – Remote Services: SSH</li>
          <li>T1021.004 – Remote Services: VNC</li>
          <li>T1078 – Valid Accounts</li>
          <li>T1056.001 – Keylogging（X11 環境）</li>
          <li>T1040 – Network Sniffing</li>
          <li>T1557 – Man-in-the-Middle</li>
          <li>T1563.002 – RDP / GUI Access</li>
        </ul>
      </Section>

      <Section title="防禦與硬化建議（實務）">
        <h3 className="ln-h3">X11</h3>
        <ul className="ln-ul">
          <li>❌ 禁止 TCP 對外</li>
          <li>✅ 僅允許 ssh -X / -Y</li>
          <li>🔒 防火牆封鎖 6000–6010</li>
        </ul>

        <h3 className="ln-h3">VNC</h3>
        <ul className="ln-ul">
          <li>❌ 不對外開 5900</li>
          <li>✅ 僅允許 localhost + SSH Tunnel</li>
          <li>🔐 強密碼 / view-only 限制</li>
        </ul>

        <RiskCard
          level="High"
          items={[
            "GUI 是高價值橫向移動目標；不要把 GUI 當成「更方便的 SSH」",
          ]}
        />
      </Section>

      <hr className="ln-hr" />
      <footer className="ln-footer">
        <small>Last updated: Remote Desktop module</small>
      </footer>
    </div>
  );
}
